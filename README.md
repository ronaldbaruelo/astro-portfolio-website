# Dark Cybersecurity Portfolio — React + Vite

A personal cybersecurity and IT portfolio for Ronald Baruelo, built with React, Vite and plain CSS. Rose uses a Node.js backend to generate portfolio answers with Google Gemini.

## Requirements

- VS Code
- Node.js **20.19+ or 22.12+** (or a later compatible release)
- npm

Check your versions in the VS Code terminal:

```bash
node -v
npm -v
```

## Run locally

1. Extract the zip and open the `ronald-cybersecurity-portfolio` folder in VS Code.
2. Open **Terminal → New Terminal**.
3. Run:

```bash
npm install
npm run dev
```

4. Open the localhost URL printed by Vite, normally `http://localhost:5173/`.
5. Edit `src/data.js` and `src/index.css`. Save to see updates instantly.

To stop the server, press **Control+C** in the terminal.

## Customise the content

**`src/data.js`** contains your name, role, about paragraph, project descriptions, skills, email, LinkedIn and GitHub URLs. Put your real contact details here before publishing. By default email and social URLs are intentionally empty, so the site does not link to an invented account.

For each project, set its `link` to a public GitHub repository, project page or approved report when it is ready to share. Keep confidential lab files, real IPs, credentials and identifying information out of public project reports.

Optional resume:
- Put a PDF at `public/resume.pdf`
- Change `resumeUrl: ''` to `resumeUrl: '/resume.pdf'` in `src/data.js`

**`src/App.jsx`** contains React components (header, hero, about, skills, project cards, education and contact). **`src/index.css`** contains the colours, layout and responsive styles.

## Build for publishing

```bash
npm run build
```

Vite generates `dist`. For live Rose replies, deploy this project to a host that runs Node.js, use build command `npm run build` and start command `npm start`. Set `GEMINI_API_KEY`, `GEMINI_MODEL` and `HOST=0.0.0.0` as server environment variables. The server serves both the built website and `/api/chat`. Publishing only `dist` provides the portfolio without its AI backend.

## File structure

```
ronald-cybersecurity-portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx
│   ├── data.js
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Troubleshooting

- If you get `node: command not found`, install the current supported Node.js LTS release, restart VS Code and try again.
- If you see `Unsupported engine`, upgrade Node to a version supported by Vite.
- If port `5173` is already in use, Vite may use the next available port. Open the URL shown in the terminal.
- You **do not** need the VS Code Live Server extension for this React project. Use `npm run dev`.
# Rose portfolio chat

## Update an existing Vercel project

This project includes Vercel functions at `api/chat.js` and `api/health.js`, plus `vercel.json` for the Vite build. Deploy the whole source project, not just `dist`.

Link this folder to your existing Vercel project to preserve its domain. If deploying through Git, update the repository already connected to that project. Set the Vercel root directory to the folder containing this `package.json`, build command to `npm run build`, and output directory to `dist`.

In the existing Vercel project's environment settings, add `GEMINI_API_KEY` and `GEMINI_MODEL` using your private local values. Set `NODE_ENV=production`. Never commit `.env`. Deploy a preview first, check `/api/health` and a Rose reply, then promote the tested deployment to production. In-memory rate limits are per function instance; use Vercel-level rate limits for public traffic.

The floating “Ask Rose” button opens a portfolio guide inspired by the desktop IT Gadgets assistant. It includes quick prompts, recent conversations and a new-chat action. Conversations are saved only in this browser and can be removed with “Clear all conversations” in chat history.

Rose sends conversation context to `/api/chat`. The server calls Gemini with portfolio facts from `src/data.js` and education instructions in `server/index.js`. No database is required. The original caravan assistant remains separate.

## Enable live AI locally

1. Copy `.env.example` to `.env` and set `GEMINI_API_KEY` to your Gemini key. An existing key may already have been copied from your desktop assistant. Never put keys in `src/` or in a `VITE_` variable.
2. In one terminal run `npm run server` (port 5002).
3. In another terminal run `npm run dev`, then open Vite's printed URL. Vite proxies `/api` to port 5002. If you change the backend port, update `vite.config.js` too.
4. Ask Rose a question. Errors retain your question so you can send it again. `http://127.0.0.1:5002/api/health` reports whether a key is configured, without returning the key.

For a production-style local run, use `npm run build` followed by `npm start` and visit `http://127.0.0.1:5002`.

The default model is `gemini-2.5-flash`, matching the desktop assistant. Set `GEMINI_MODEL` to another available Gemini text model if your account no longer supports it. Usage is charged or quota-limited by your Google account. Messages go to Google for generation and are saved in this browser for chat history. Replies can be inaccurate; keep portfolio facts up to date.

The server validates message roles and sizes, uses a 30-second provider timeout and limits each connection IP to ten requests per minute in memory. On public hosting behind a proxy, configure host-level rate limits and usage budgets; the application does not trust forwarded IP headers, so proxy traffic may share a limit. Multi-instance deployments need a shared rate limiter.

Run `npm test` to check request validation, provider handling, history mapping, rate limiting and static serving. These tests mock Gemini and do not spend API quota. Run `npm run build` before the tests that check the built page.
