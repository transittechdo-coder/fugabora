# FugaBora: setup guide for the team (step by step)

Do these once, on the PC, when it is switched on.

## 1. Install the tools

1. **Node.js**: go to nodejs.org, download the **LTS** version, install with all defaults.
2. **Git**: go to git-scm.com, download for Windows, install with all defaults.
3. Check: open **Command Prompt** and type:
   ```
   node --version
   git --version
   ```
   Both should show a version number.

## 2. Put the project in place

1. Download `FugaBora-app.zip` from the Claude chat.
2. Right-click it → **Extract All** → choose `Documents\FugaBora\app`.

## 3. Open in VS Code and run

1. VS Code → **File → Open Folder** → `Documents\FugaBora\app`.
2. **Terminal → New Terminal**, then type:
   ```
   npm install
   copy .env.example .env.local
   npm run dev
   ```
3. Ctrl+click the `http://localhost:5173` link. The app opens.
4. To see it on your phone: same Wi-Fi, run `npm run dev -- --host`, and open the "Network" address on the phone.

## 4. Put it on GitHub

1. Create an **empty private** repository named `fugabora` at github.com/new (no README).
2. In the VS Code terminal:
   ```
   git init
   git add .
   git commit -m "FugaBora version 0.1"
   git branch -M main
   git remote add origin https://github.com/transittechdo-coder/fugabora.git
   git push -u origin main
   ```
   It will ask you to sign in to GitHub in the browser the first time.

## 5. Put it online (Netlify, free)

1. app.netlify.com → **Add new site → Import from GitHub** → choose `fugabora`.
2. Build command: `npm run build`. Publish directory: `dist`.
3. **Environment variables**: add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (copy from `.env.example`).
4. Deploy. You get a link like `fugabora.netlify.app` that works on any phone and can be installed ("Add to Home screen").

## 6. Every time you change something

```
git add .
git commit -m "what you changed"
git push
```
Netlify updates the website automatically.
