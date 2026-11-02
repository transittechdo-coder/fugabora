# FugaBora

**"Fuga bora" means "keep animals well."** FugaBora is a Swahili-first website and app that helps Tanzanian livestock keepers and pet owners spot possible animal diseases early, give safe first aid, feed their animals well, and remember vaccinations.

Built by the Mikocheni B group (Form Five, PMCs).

> FugaBora is an advisory decision-support tool. It does not give a formal diagnosis and does not replace a licensed veterinarian.

## Folder layout

| Folder | What goes in it |
|---|---|
| `docs/` | Master plan, reminders, proposal updates, meeting notes |
| `research/` | Farmer and vet interview notes, survey results |
| `knowledge-base/` | Disease, symptom, feeding and vaccine data (must be vet-reviewed) |
| `design/` | Screen designs, logo, colours, icons |
| `website/` | The FugaBora website (built first) |
| `app/` | The FugaBora app (installable PWA, later Android) |
| `supabase/` | Database tables and migrations |
| `assets/` | Images, audio for voice guidance |

## Tools

- **Code editor:** VS Code
- **Database and logins:** Supabase project `fugabora`
- **Code storage and history:** GitHub repository `fugabora`
- **Hosting:** GitHub Pages, deployed automatically on every push to `main` (see `.github/workflows/pages.yml`)

## Build order

1. Knowledge base (chickens → cattle and goats → other animals)
2. Website
3. App (PWA)
4. Supabase sync and accounts
5. Pilot with farmers and a vet

See `docs/MASTER-PLAN.md` for the full plan.
