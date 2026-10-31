# FugaBora Master Plan

Last updated: 31 October 2026
Status: Planning and prototype stage. Concept, target users, description, proposal and version-1 scope are done.

---

## 1. What we are building

| Part | What it is | Built with |
|---|---|---|
| **Website** | Public site: about the project, Swahili guides, symptom-checker demo, news, contacts, app access | HTML/CSS/JS (later React), hosted online |
| **App** | Installable app (PWA) for phones, tablets, PCs and TVs. Works offline. | Same code base as website, later wrapped for Android Play Store |
| **Database** | Accounts, farmer records, reports, outbreak data | Supabase project `fugabora` |
| **Code storage** | All code and version history | GitHub repository `fugabora` |

**Decision:** We build one **PWA**, not Flutter. One code base works on every screen size, opens in a browser, and installs like an app. If we need the Play Store later, we wrap it with Capacitor. (The earlier work-plan table mentioned Flutter. We drop that so the team learns one tool.)

**Design style:** "Liquid Glass" look (frosted, see-through panels) adapted for the web. Rule: text must stay easy to read on cheap phones in bright sunlight, so glass is used on bars and cards, with a solid fallback when the phone is slow or the user turns on "reduce transparency".

---

## 2. Animals covered

FugaBora will cover all common animals kept in Tanzanian homes and farms, added in phases so each one is checked properly.

| Phase | Animals |
|---|---|
| **Version 1 (8 weeks)** | Ng'ombe (cattle), Mbuzi (goats), Kuku (chickens) |
| **Version 2** | Kondoo (sheep), Nguruwe (pigs), Mbwa (dogs), Paka (cats) |
| **Version 3** | Bata (ducks), Bata mzinga (turkeys), Kanga (guinea fowl), Njiwa (pigeons), Sungura (rabbits), Punda (donkeys) |
| **Later** | Samaki (fish farming), Nyuki (bees), Ngamia (camels) |

---

## 3. App features

### Version 1 (must have)
1. Choose animal
2. Symptom checker: tap symptoms, answer follow-up questions, see top 3 *possible* diseases
3. Red-flag alert: "Mwite daktari wa mifugo sasa" for dangerous signs
4. First aid and care steps (never drug doses)
5. Disease library in Swahili
6. Feeding guide by animal and growth stage, with a feed calculator
7. My animals: record animals, get vaccination and routine-care reminders
8. Swahili first, English switch
9. Works offline
10. Disclaimer and terms screen on first use

### Version 2
- Photo upload of symptoms (droppings, skin, eyes)
- Swahili voice input
- Audio first-aid guidance for low-literacy users
- "Which animal should I keep?" advisor (land, money, water, market)
- Nearby vets and agro-vet shops with call button
- Digital animal health passport with QR code

### Version 3
- Community sickness heatmap and outbreak alerts (anonymous)
- Agro-vet price and stock checker
- SMS and USSD for feature phones
- Farm records: milk, eggs, weight, costs

---

## 4. Technical plan

### Offline-first
- The symptom list, diseases, scoring logic and feeding data are stored **on the phone**, so the core app works with no internet.
- Farmer records are saved on the phone first (browser storage), then synced to Supabase when internet returns.

### Swahili dialect glossary
- A table that maps regional names to standard terms. Example: *Mdondo* and *Kideri* both mean Newcastle disease. *Ndigana kali* means East Coast Fever.
- When a farmer types a local name, the app finds the right disease.

### USSD / SMS (Version 3, outline only)
Feature phones cannot run the app, so they get a simple numbered menu:
```
*150*XX#
1. Ng'ombe  2. Mbuzi  3. Kuku
→ 1. Dalili (symptoms)  2. Chanjo (vaccines)  3. Mwite daktari
→ numbered symptom list → short SMS with possible diseases + red flag
```
Needs a paid USSD shortcode (e.g. through Africa's Talking) and approval, so for the school project we show it as a **demo/prototype**, not live.

### AI
- Version 1 uses **rule-based scoring** (symptom weights). It is free, works offline, and every answer can be checked by a vet.
- An AI language model (for free-text and voice) is a later add-on. It costs money per use and needs internet.

---

## 5. Safety, legal and ethics

- **Disclaimer on first open:** "FugaBora ni chombo cha ushauri tu. Haitoi uchunguzi rasmi na haichukui nafasi ya daktari wa mifugo aliyesajiliwa." (FugaBora is an advisory decision-support tool. It does not give a formal diagnosis or replace a licensed veterinarian.)
- Results say "possible diseases", never a final diagnosis.
- No drug names with doses. Medicines go through a vet or agro-vet.
- Warnings for diseases that spread to people: kichaa cha mbwa (rabies), kimeta (anthrax), brucellosis.
- **Veterinary Council of Tanzania (VCT) review** of the content is a required milestone before the pilot.
- Farmer data: ask consent, store only what is needed, outbreak data shared only without names.

**Partners to approach:** District Veterinary Office, Sokoine University of Agriculture (SUA), Tanzania Veterinary Laboratory Agency (TVLA), Veterinary Council of Tanzania (VCT).

---

## 6. 8-week work plan

| Week | Work | Output |
|---|---|---|
| 1 | Interviews: farmers and 1–2 vets/extension officers. Set up GitHub, Supabase, folders. | Interview notes, accounts ready |
| 2 | Knowledge base for chickens, cattle, goats. Vet review. | Reviewed disease, feeding and vaccine tables |
| 3 | Design screens (Liquid Glass style). Build the **website**. | Website live |
| 4 | Build app: symptom checker and disease library | Working checker offline |
| 5 | Build app: feeding guide, my animals, reminders, language switch | All v1 features |
| 6 | Supabase sync, testing, fixing, accuracy test against vet answers | Tested app |
| 7 | Pilot with farmers in one area | Feedback and results |
| 8 | Analyse results, final report, presentation | Report and slides |

*Note: the earlier suggested table targeted 30 farmers in week 1 and a full USSD build in week 5. Both are too much for 8 weeks with school, so we aim for 10–15 farmers in interviews and leave USSD as a demo.*

---

## 7. Success targets (KPIs)

| Target | Measure |
|---|---|
| Accuracy | App's top-3 list includes the vet's diagnosis in more than 80% of test cases |
| Safety | 100% of critical cases trigger the "call a vet" alert |
| Ease of use | More than 85% of pilot farmers rate the Swahili as clear and easy |
| Speed | A farmer finishes a symptom check in under 2 minutes |
| Offline | All v1 features work with no internet |

---

## 8. How FugaBora can earn money (later)

Core advice stays **free** for farmers. Income comes from:
- Agro-vet shops and vets paying a small monthly fee to be listed or featured nearby (e.g. TZS 10,000–20,000/month)
- Feed and medicine brands sponsoring clearly labelled cards in the feeding guide
- Anonymous regional disease-trend reports for government, NGOs and universities
- Small commission on group-buying of feed and vaccines

---

## 9. Trusted sources for the knowledge base

- Merck Veterinary Manual (online)
- Tanzania Ministry of Livestock and Fisheries, and TVLA (vaccination schedules, guidelines)
- Sokoine University of Agriculture (SUA) repository
- FAO animal health manuals
- GALVmed factsheets

Every disease entry must record which source it came from and who reviewed it.

---

## 10. Status summary

Done: concept, target users, description, proposal, version-1 scope, Supabase project, folder structure.
Next: GitHub repository, interviews, knowledge-base review, website.
