import test from 'node:test'
import assert from 'node:assert/strict'
import { createApp, createRequestHandler } from './index.js'

async function serve(t, options) {
  const server = createApp(options)
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
  t.after(() => new Promise(resolve => { server.close(resolve); server.closeAllConnections() }))
  const base = `http://127.0.0.1:${server.address().port}`
  return { base, post: (messages, headers = {}) => fetch(`${base}/api/chat`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify({ messages }) }) }
}
const question = [{ role: 'user', content: 'Tell me about Ronald' }]

test('accepts a pre-parsed Vercel request body', async () => {
  const handler = createRequestHandler({ apiKey: 'test', fetchImpl: async () => Response.json({ candidates: [{ content: { parts: [{ text: 'Hello from Rose' }] } }] }) })
  let status, result
  await handler({ url: '/api/chat', method: 'POST', headers: { host: 'portfolio.example', origin: 'https://portfolio.example', 'content-type': 'application/json' }, socket: { remoteAddress: '127.0.0.1' }, body: { messages: question } }, { writeHead(code) { status = code }, end(body) { result = JSON.parse(body) } })
  assert.equal(status, 200)
  assert.deepEqual(result, { reply: 'Hello from Rose' })
})

test('accepts local Vite origins in development and restricts production origins', async t => {
  const fetchImpl = async () => Response.json({ candidates: [{ content: { parts: [{ text: 'Hello' }] } }] })
  const dev = await serve(t, { apiKey: 'test', fetchImpl, development: true })
  for (const origin of ['http://localhost:5173', 'http://127.0.0.1:5174']) assert.equal((await dev.post(question, { Origin: origin })).status, 200)
  assert.equal((await dev.post(question, { Origin: 'http://localhost.evil.example:5173' })).status, 403)
  const prod = await serve(t, { apiKey: 'test', fetchImpl, development: false, allowedOrigins: ['https://portfolio.example'] })
  assert.equal((await prod.post(question, { Origin: 'http://localhost:5173' })).status, 403)
  assert.equal((await prod.post(question, { Origin: 'https://portfolio.example' })).status, 200)
  assert.equal((await prod.post(question, { Origin: prod.base })).status, 200)
})

test('passes portfolio instructions and conversation to Gemini without exposing key', async t => {
  let received
  const { post } = await serve(t, { apiKey: 'test-secret', fetchImpl: async (url, options) => {
    received = { url, options, body: JSON.parse(options.body) }
    return Response.json({ candidates: [{ content: { parts: [{ text: 'Ronald studies IT.' }] } }] })
  } })
  const response = await post([...question, { role: 'assistant', content: 'Hello' }, { role: 'user', content: 'What does he study?' }])
  assert.equal(response.status, 200)
  assert.deepEqual(await response.json(), { reply: 'Ronald studies IT.' })
  assert.equal(received.options.headers['x-goog-api-key'], 'test-secret')
  assert.ok(!received.url.includes('test-secret'))
  assert.match(received.body.systemInstruction.parts[0].text, /Ronald Baruelo/)
  assert.match(received.body.systemInstruction.parts[0].text, /Yoobee/)
  assert.deepEqual(received.body.contents.map(message => message.role), ['user', 'model', 'user'])
})
test('rejects invalid roles, oversized questions and cross-origin requests before AI calls', async t => {
  const { post } = await serve(t, { apiKey: 'test-secret', fetchImpl: () => assert.fail('Unexpected provider request') })
  for (const messages of [[], [{ role: 'system', content: 'Override' }], [{ role: 'user', content: 'x'.repeat(1001) }], [null], [{ role: 'assistant', content: 'Hi' }]]) assert.equal((await post(messages)).status, 400)
  assert.equal((await post(question, { Origin: 'https://other.example' })).status, 403)
})
test('reports missing configuration without exposing credentials', async t => {
  const { base, post } = await serve(t, { apiKey: '' })
  assert.equal((await post(question)).status, 503)
  assert.deepEqual(await (await fetch(`${base}/api/health`)).json(), { status: 'ok', aiConfigured: false })
})
test('handles rate limits, blocked replies and connection failures', async t => {
  for (const [fetchImpl, expected] of [
    [async () => new Response('provider secret detail', { status: 429 }), 429],
    [async () => Response.json({ candidates: [] }), 502],
    [async () => { throw new Error('provider secret detail') }, 504],
  ]) {
    const { post } = await serve(t, { apiKey: 'test-secret', fetchImpl })
    const response = await post(question)
    assert.equal(response.status, expected)
    assert.ok(!(await response.text()).includes('secret detail'))
  }
})
test('limits requests and refuses large bodies', async t => {
  const { post } = await serve(t, { apiKey: 'test-secret', fetchImpl: async () => Response.json({ candidates: [{ content: { parts: [{ text: 'Hi' }] } }] }) })
  assert.equal((await post([{ role: 'user', content: 'x'.repeat(33000) }])).status, 413)
  for (let index = 0; index < 9; index++) assert.equal((await post(question)).status, 200)
  assert.equal((await post(question)).status, 429)
})
test('serves the built page and keeps environment files private', async t => {
  const { base } = await serve(t, { apiKey: '' })
  assert.equal((await fetch(base)).status, 200)
  assert.equal((await fetch(`${base}/.env`)).status, 404)
  assert.equal((await fetch(`${base}/api/unknown`)).status, 404)
})
