# FugaBora

**Fuga bora, gundua ugonjwa mapema.** (Keep animals well. Catch sickness early.)

A Swahili-first web app (installable PWA) that helps Tanzanian livestock keepers and pet owners spot possible diseases early, give safe first aid, feed well, and remember vaccinations. Works on phones, tablets, PCs and TVs, and works offline.

Built by **Mikocheni B**, Form Five PMCs.

> FugaBora is an advisory decision-support tool. It does not give a formal diagnosis and does not replace a licensed veterinarian. All disease content is a **draft awaiting vet review**.

## Features (version 0.1)

| Page | Route | What it does |
|---|---|---|
| Home | `/` | Overview, features, all 16 animals and their release version |
| Symptom checker | `/angalia` | 4 steps: animal → symptoms → questions → top 3 possible diseases, first aid, red "call a vet" alert |
| Disease library | `/magonjwa` | 41 diseases, search by Swahili, English or local name (mdondo, sotoka, ndigana…) |
| Disease detail | `/magonjwa/:id` | Signs, first aid, prevention, zoonotic and reportable warnings |
| Feeding guide | `/lishe` | Stage-by-stage feeding for broilers, layers, village chickens, dairy, goats, pigs, dogs, with calculator |
| My animals | `/mifugo-yangu` | Record animals/groups, automatic vaccine and dipping reminders |
| Help | `/msaada` | Danger signs, who to call, reportable and zoonotic disease lists |
| About | `/kuhusu` | Safety rules, 8-week plan, sources, system status |

Animals in the checker now: cattle, goats, chickens, sheep, pigs, dogs, cats.

## Run it on your PC

You need **Node.js 20+** (nodejs.org) and **Git** (git-scm.com).

```bash
cd Documents/FugaBora/app      # or wherever you unzipped it
npm install                    # first time only
copy .env.example .env.local   # Windows (use cp on Mac/Linux)
npm run dev                    # open http://localhost:5173
```

## Build

```bash
npm run build           # offline PWA in dist/  → upload to Netlify
npm run build:preview   # one self-contained HTML file in dist-preview/
```

## Project structure

```
src/
  data/          ← the knowledge base (edit these after vet review)
    animals.js     16 animals, which version each arrives in
    symptoms.js    50 symptoms, danger flags
    diseases.js    41 diseases: signs + weights, first aid, prevention
    care.js        feeding guides, vaccine schedules, contacts
  lib/
    engine.js      symptom scoring + red-flag rules
    i18n.jsx       Swahili / English switch
    storage.js     offline storage on the phone
    reminders.js   vaccine due-date maths
    supabase.js    cloud connection (anonymous reports)
  components/    Layout (top bar, phone tab bar, disclaimer), icons, disease card
  pages/         one file per screen
supabase/migrations/   database tables and security rules
```

## How the symptom checker scores

Each disease lists its signs with a weight (3 = key sign, 2 = common, 1 = sometimes).

`score = 0.6 × (weight of matched signs ÷ total weight) + 0.4 × (matched signs ÷ signs the farmer picked)`, plus small bonuses for young animals and many sick. The top 3 are shown.

The **"call a vet now"** alert fires if any danger sign is picked, many animals are sick, any have died, or the top result is an emergency disease.

## Database (Supabase project `fugabora`)

- `symptom_reports`: anonymous reports (animal, symptoms, top disease, urgent). Anyone can add; nobody can read through the public API.
- `animals`: per-user animal records for future sign-in sync. Each user sees only their own.

Security advisor: no warnings.

## Safety rules (do not break these)

1. Say "possible diseases", never a diagnosis.
2. No drug names or doses in the app.
3. Mark reportable (24-hour) and zoonotic diseases clearly.
4. Every disease entry must be signed off by a vet before the pilot (VCT review).
