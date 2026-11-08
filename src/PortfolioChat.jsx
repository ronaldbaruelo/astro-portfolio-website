import { useEffect, useRef, useState } from 'react'
import { Bot, History, MessageCircle, Plus, Send, X } from 'lucide-react'

const storageKey = 'ronald-portfolio-chats-v1'
const prompts = ['Tell me about Ronald', 'What are his skills?', 'Show me his projects', 'How can I contact him?']
function loadChats() {
  try {
    const value = JSON.parse(localStorage.getItem(storageKey))
    return Array.isArray(value) ? value.filter(chat => chat && typeof chat.id === 'string' && typeof chat.title === 'string' && Array.isArray(chat.messages) && chat.messages.every((message, index) => message && message.role === (index % 2 ? 'assistant' : 'user') && typeof message.content === 'string')).slice(0, 20).map(chat => ({ ...chat, messages: chat.messages.length % 2 ? chat.messages.slice(0, -1) : chat.messages })) : []
  } catch { return [] }
}

export default function PortfolioChat() {
  const [open, setOpen] = useState(false)
  const [chats, setChats] = useState(loadChats)
  const [activeId, setActiveId] = useState(null)
  const [history, setHistory] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const sendingRef = useRef(false)
  const inputRef = useRef(null)
  const messagesRef = useRef(null)
  const triggerRef = useRef(null)
  const active = chats.find(chat => chat.id === activeId)

  useEffect(() => { try { localStorage.setItem(storageKey, JSON.stringify(chats)) } catch { /* Chat still works when storage is unavailable. */ } }, [chats])
  useEffect(() => { if (open && !history) inputRef.current?.focus() }, [open, history])
  useEffect(() => { if (messagesRef.current) messagesRef.current.scrollTop = messagesRef.current.scrollHeight }, [active, open, loading, error])
  function close() { setOpen(false); triggerRef.current?.focus() }
  async function send(text) {
    const question = text.trim()
    if (!question || sendingRef.current) return
    sendingRef.current = true
    const id = activeId || crypto.randomUUID()
    const previousMessages = active?.messages || []
    const messages = [...previousMessages, { role: 'user', content: question }]
    const title = active?.title || question.slice(0, 45)
    setChats(previous => [{ id, title, messages }, ...previous.filter(chat => chat.id !== id)].slice(0, 20))
    setActiveId(id); setInput(''); setHistory(false)
    setLoading(true); setError('')
    try {
      const response = await fetch('/api/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...previousMessages.slice(-8).map(message => ({ role: message.role, content: message.content.slice(0, 3000) })), { role: 'user', content: question }] }),
        signal: AbortSignal.timeout(35000),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(result.error || 'Pearl’s server is unavailable. Please try again shortly.')
      if (typeof result.reply !== 'string' || !result.reply.trim()) throw new Error('Pearl returned an empty answer. Please try again.')
      setChats(previous => previous.map(chat => chat.id === id ? { ...chat, messages: [...messages, { role: 'assistant', content: result.reply }].slice(-100) } : chat))
    } catch (failure) {
      setChats(previous => previous.map(chat => chat.id === id ? { ...chat, messages: previousMessages } : chat))
      setInput(question)
      setError(failure.name === 'TimeoutError' ? 'Pearl took too long to reply. Please try again.' : failure instanceof TypeError ? 'Could not connect to Pearl. Make sure the backend is running and try again.' : failure.message)
    } finally { setLoading(false); sendingRef.current = false; inputRef.current?.focus() }
  }
  return <>
    {open && <section className="portfolio-chat" id="portfolio-chat" role="region" aria-label="Pearl portfolio assistant" onKeyDown={event => { if (event.key === 'Escape') close() }}>
      <header className="chat-header">
        <span className="pearl-avatar" aria-hidden="true"><Bot size={24} /></span>
        <div className="chat-heading"><strong>Pearl Assistant</strong><span><i /> Portfolio guide</span></div>
        <button type="button" onClick={() => setHistory(!history)} aria-label="Chat history" aria-pressed={history}><History size={17} /></button>
        <button type="button" disabled={loading} onClick={() => { setActiveId(null); setInput(''); setError(''); setHistory(false); inputRef.current?.focus() }} aria-label="New chat"><Plus size={19} /></button>
        <button type="button" onClick={close} aria-label="Close chat"><X size={19} /></button>
      </header>
      {history ? <div className="chat-history"><h3>Recent conversations</h3>{chats.length ? chats.map(chat => <button type="button" disabled={loading} key={chat.id} onClick={() => { setActiveId(chat.id); setError(''); setHistory(false) }}><MessageCircle size={15} />{chat.title}</button>) : <p>No conversations yet.</p>}{chats.length > 0 && <button type="button" disabled={loading} onClick={() => { setChats([]); setActiveId(null); setError('') }}>Clear all conversations</button>}</div> : <>
        <div className="chat-messages" ref={messagesRef}>
          {!active?.messages.length ? <div className="chat-welcome"><span className="chat-welcome-icon"><Bot size={28} /></span><span className="chat-eyebrow">WELCOME TO MY PORTFOLIO</span><h3>Hi, I’m Pearl<span>.</span></h3><p>Get to know Ronald’s work.<br />What would you like to explore?</p><div className="chat-prompts">{prompts.map(prompt => <button type="button" key={prompt} onClick={() => send(prompt)}>{prompt}<span>↗</span></button>)}</div></div> : <div className="chat-transcript" role="log" aria-live="polite" aria-relevant="additions">{active.messages.map((message, index) => <div className={`chat-message chat-message-${message.role}`} key={index}><span>{message.role === 'user' ? 'YOU' : 'PEARL'}</span><p>{message.content}</p></div>)}</div>}
          {loading && <p className="chat-thinking" role="status">Pearl is thinking…</p>}
          {error && <p className="chat-error" role="alert">{error}</p>}
        </div>
        <form className="chat-compose" onSubmit={event => { event.preventDefault(); send(input) }}><label className="chat-input-row"><span className="sr-only">Your question</span><input ref={inputRef} disabled={loading} value={input} onChange={event => setInput(event.target.value)} placeholder="Ask about Ronald’s work…" maxLength={1000} /><button type="submit" disabled={loading || !input.trim()} aria-label="Send message"><Send size={17} /></button></label><p>Powered by Gemini · Messages sent to Google · Saved in this browser</p></form>
      </>}
    </section>}
    <button ref={triggerRef} type="button" className="chat-launcher" aria-expanded={open} aria-controls="portfolio-chat" onClick={() => open ? close() : setOpen(true)}>{open ? <X size={21} /> : <span className="pearl-launcher-icon" aria-hidden="true"><Bot size={24} /></span>}<span>{open ? 'Close chat' : 'Ask Pearl'}</span>{!open && <i />}</button>
  </>
}
