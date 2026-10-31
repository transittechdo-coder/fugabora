# FugaBora app

Swahili-first livestock and pet health app (installable PWA). Works offline.

## Run it on your PC

1. Install **Node.js** (LTS) from nodejs.org.
2. Open this `app` folder in VS Code, then open the terminal (Ctrl + `).
3. Run once: `npm install`
4. Start: `npm run dev` then open the link it shows (usually http://localhost:5173).
5. Build for hosting: `npm run build` (output goes to `dist/`).

Copy `.env.example` to `.env.local` to connect Supabase.

## Folders

| Path | What |
|---|---|
| `src/data/` | Knowledge base: animals, symptoms, diseases, feeding, vaccines (**needs vet review**) |
| `src/lib/engine.js` | Offline symptom-scoring engine |
| `src/pages/` | Home, Check, Diseases, Feeding, My animals, About |
| `src/components/` | Layout, disclaimer, cards, icons |
| `src/styles/app.css` | Liquid Glass design system (light + dark) |

## Pages

- `/` Mwanzo (home)
- `/kagua` Kagua dalili (symptom checker, 7 animals)
- `/magonjwa` Disease library (39 diseases, search by local name)
- `/lishe` Feeding guide and calculator
- `/mifugo-yangu` My animals and vaccine reminders
- `/kuhusu` About, plan, sources
