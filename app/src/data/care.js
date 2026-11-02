// Feeding guides and vaccination schedules. STATUS: NEEDS VET / NUTRITIONIST REVIEW.
// Amounts are typical guide figures; feed labels and local advice come first.

export const FEEDING = [
  {
    id: 'broiler', animal: 'chicken', sw: 'Kuku wa nyama (broiler)', en: 'Broiler chickens', unit: { sw: 'g kwa kuku kwa siku', en: 'g per bird per day' },
    stages: [
      { sw: 'Wiki 1–2: Chakula cha kuanzia (starter)', en: 'Weeks 1–2: Starter feed', from: 0, to: 2, perDay: 30 },
      { sw: 'Wiki 3–4: Chakula cha kukuza (grower)', en: 'Weeks 3–4: Grower feed', from: 3, to: 4, perDay: 90 },
      { sw: 'Wiki 5–6: Chakula cha kumalizia (finisher)', en: 'Weeks 5–6: Finisher feed', from: 5, to: 8, perDay: 150 },
    ],
    tips: { sw: ['Maji safi wakati wote', 'Joto kwa vifaranga wiki ya kwanza', 'Wauze wiki 5–6'], en: ['Clean water at all times', 'Keep chicks warm in week one', 'Sell at weeks 5–6'] },
  },
  {
    id: 'layer', animal: 'chicken', sw: 'Kuku wa mayai (layer)', en: 'Layer chickens', unit: { sw: 'g kwa kuku kwa siku', en: 'g per bird per day' },
    stages: [
      { sw: 'Wiki 0–8: Chick mash', en: 'Weeks 0–8: Chick mash', from: 0, to: 8, perDay: 35 },
      { sw: 'Wiki 9–18: Grower mash', en: 'Weeks 9–18: Grower mash', from: 9, to: 18, perDay: 75 },
      { sw: 'Wiki 19+: Layer mash', en: 'Week 19+: Layer mash', from: 19, to: 100, perDay: 120 },
    ],
    tips: { sw: ['Ongeza maganda ya konokono kwa ganda imara', 'Mwanga saa 16 kwa siku wakati wa kutaga'], en: ['Add crushed shells for strong eggshells', '16 hours of light a day when laying'] },
  },
  {
    id: 'kienyeji', animal: 'chicken', sw: 'Kuku wa kienyeji', en: 'Village chickens', unit: { sw: 'g ya ziada kwa kuku kwa siku', en: 'extra g per bird per day' },
    stages: [
      { sw: 'Vifaranga: chakula cha kuanzia na mchwa', en: 'Chicks: starter feed plus termites', from: 0, to: 8, perDay: 30 },
      { sw: 'Wakubwa: kuchakura + nyongeza ya pumba na mabaki', en: 'Grown: scavenging plus bran and leftovers', from: 9, to: 100, perDay: 60 },
    ],
    tips: { sw: ['Wape mboga za majani', 'Banda la usiku lililo salama na safi'], en: ['Give green leaves', 'A safe, clean night house'] },
  },
  {
    id: 'dairy', animal: 'cattle', sw: 'Ng’ombe wa maziwa', en: 'Dairy cow', unit: { sw: 'kg ya pumba/concentrate kwa siku', en: 'kg concentrate per day' },
    stages: [
      { sw: 'Ndama mwezi 0–3: maziwa lita 4 + majani laini', en: 'Calf 0–3 months: 4 L milk + soft hay', from: 0, to: 3, perDay: 0.5 },
      { sw: 'Mtamba miezi 4–24: majani mengi + pumba kidogo', en: 'Heifer 4–24 months: plenty of forage + a little concentrate', from: 4, to: 24, perDay: 1 },
      { sw: 'Anayekamuliwa: kilo 1 kwa kila lita 2 juu ya lita 5', en: 'Milking: 1 kg per 2 L above 5 L', from: 25, to: 300, perDay: 4 },
    ],
    tips: { sw: ['Majani kilo 10% ya uzito wake kila siku', 'Maji lita 50–100 kwa siku', 'Madini (mineral lick) wakati wote'], en: ['Forage about 10% of body weight daily', '50–100 L of water a day', 'Mineral lick at all times'] },
  },
  {
    id: 'goat', animal: 'goat', sw: 'Mbuzi', en: 'Goats', unit: { sw: 'g ya pumba kwa siku', en: 'g concentrate per day' },
    stages: [
      { sw: 'Kitoto miezi 0–3: maziwa ya mama + majani laini', en: 'Kid 0–3 months: mother’s milk + soft leaves', from: 0, to: 3, perDay: 50 },
      { sw: 'Anayekua miezi 4–12', en: 'Growing 4–12 months', from: 4, to: 12, perDay: 200 },
      { sw: 'Mkubwa / mwenye mimba', en: 'Adult / pregnant', from: 13, to: 200, perDay: 400 },
    ],
    tips: { sw: ['Wanapenda majani ya miti (kulisha juu)', 'Maji safi kila siku', 'Banda lililoinuka kutoka ardhini'], en: ['They prefer browsing tree leaves', 'Clean water daily', 'A raised house off the ground'] },
  },
  {
    id: 'pig', animal: 'pig', sw: 'Nguruwe', en: 'Pigs', unit: { sw: 'kg ya chakula kwa siku', en: 'kg feed per day' },
    stages: [
      { sw: 'Kinguruwe wiki 3–8: creep feed', en: 'Piglet weeks 3–8: creep feed', from: 0, to: 2, perDay: 0.5 },
      { sw: 'Anayekua miezi 2–4', en: 'Grower 2–4 months', from: 2, to: 4, perDay: 1.5 },
      { sw: 'Kumalizia miezi 5–6', en: 'Finisher 5–6 months', from: 5, to: 7, perDay: 2.5 },
    ],
    tips: { sw: ['USIWALISHE mabaki ya nyama bila kuchemsha (huleta homa ya nguruwe)', 'Maji mengi safi'], en: ['NEVER feed uncooked meat scraps (spreads ASF)', 'Plenty of clean water'] },
  },
  {
    id: 'dog', animal: 'dog', sw: 'Mbwa', en: 'Dogs', unit: { sw: 'milo kwa siku', en: 'meals per day' },
    stages: [
      { sw: 'Mtoto miezi 2–6: milo 3–4', en: 'Puppy 2–6 months: 3–4 meals', from: 0, to: 6, perDay: 4 },
      { sw: 'Mkubwa: milo 2', en: 'Adult: 2 meals', from: 7, to: 200, perDay: 2 },
    ],
    tips: { sw: ['Usimpe mifupa ya kuku iliyopikwa', 'Maji safi wakati wote'], en: ['No cooked chicken bones', 'Clean water at all times'] },
  },
]

// Vaccination schedules. `everyDays` = repeat interval; `atDays` = one-off age-based doses.
// Confirm all dates with the District Veterinary Officer (DVO).
export const VACCINES = {
  chicken: [
    { sw: 'Kideri (I-2)', en: 'Newcastle (I-2)', firstDay: 7, everyDays: 90 },
    { sw: 'Gumboro dozi 1', en: 'Gumboro dose 1', firstDay: 12 },
    { sw: 'Gumboro dozi 2', en: 'Gumboro dose 2', firstDay: 24 },
    { sw: 'Ndui ya kuku', en: 'Fowl pox', firstDay: 42 },
    { sw: 'Dawa ya minyoo', en: 'Deworming', firstDay: 56, everyDays: 90 },
  ],
  cattle: [
    { sw: 'Miguu na midomo (FMD)', en: 'FMD', firstDay: 120, everyDays: 180 },
    { sw: 'Kimeta', en: 'Anthrax', firstDay: 180, everyDays: 365 },
    { sw: 'Chambavu', en: 'Blackquarter', firstDay: 180, everyDays: 365 },
    { sw: 'Homa ya mapafu (CBPP)', en: 'CBPP', firstDay: 180, everyDays: 365 },
    { sw: 'Brucellosis (majike tu, miezi 3–8)', en: 'Brucellosis (heifers, 3–8 months)', firstDay: 120 },
    { sw: 'Kuogesha / kunyunyizia kupe', en: 'Tick dipping / spraying', firstDay: 30, everyDays: 7 },
    { sw: 'Dawa ya minyoo', en: 'Deworming', firstDay: 90, everyDays: 90 },
  ],
  goat: [
    { sw: 'Sotoka (PPR)', en: 'PPR', firstDay: 90, everyDays: 1095 },
    { sw: 'Homa ya mapafu ya mbuzi (CCPP)', en: 'CCPP', firstDay: 90, everyDays: 365 },
    { sw: 'Figo laini', en: 'Enterotoxaemia', firstDay: 60, everyDays: 365 },
    { sw: 'Dawa ya minyoo', en: 'Deworming', firstDay: 60, everyDays: 90 },
  ],
  sheep: [
    { sw: 'Sotoka (PPR)', en: 'PPR', firstDay: 90, everyDays: 1095 },
    { sw: 'Figo laini', en: 'Enterotoxaemia', firstDay: 60, everyDays: 365 },
    { sw: 'Dawa ya minyoo', en: 'Deworming', firstDay: 60, everyDays: 90 },
  ],
  pig: [
    { sw: 'Erisipela', en: 'Erysipelas', firstDay: 60, everyDays: 180 },
    { sw: 'Dawa ya minyoo', en: 'Deworming', firstDay: 42, everyDays: 90 },
  ],
  dog: [
    { sw: 'Chanjo ya watoto wa mbwa (distemper, parvo)', en: 'Puppy vaccine (distemper, parvo)', firstDay: 56 },
    { sw: 'Kichaa cha mbwa', en: 'Rabies', firstDay: 90, everyDays: 365 },
    { sw: 'Dawa ya minyoo', en: 'Deworming', firstDay: 21, everyDays: 90 },
  ],
  cat: [
    { sw: 'Chanjo ya watoto wa paka', en: 'Kitten vaccine', firstDay: 56 },
    { sw: 'Kichaa cha mbwa', en: 'Rabies', firstDay: 90, everyDays: 365 },
  ],
}

export const CONTACTS = [
  { sw: 'Afisa Mifugo wa Wilaya (DVO)', en: 'District Veterinary Officer (DVO)', detail: { sw: 'Ofisi ya Halmashauri ya wilaya yako. Kwanza kwa magonjwa ya kuripotiwa.', en: 'Your district council office. First stop for reportable diseases.' } },
  { sw: 'Afisa Ugani wa Kata', en: 'Ward Extension Officer', detail: { sw: 'Ushauri wa karibu kuhusu ufugaji na chanjo.', en: 'Local advice on keeping animals and vaccines.' } },
  { sw: 'TVLA (Wakala wa Maabara ya Veterinari)', en: 'TVLA (Veterinary Laboratory Agency)', detail: { sw: 'Maabara za kanda: Arusha, Mwanza, Dodoma, Tanga, Iringa, Mtwara na nyingine. Chanjo za I-2, CAPRIVAC, BOVIVAC. tvla.go.tz', en: 'Zonal labs: Arusha, Mwanza, Dodoma, Tanga, Iringa, Mtwara and more. I-2, CAPRIVAC, BOVIVAC vaccines. tvla.go.tz' } },
  { sw: 'SUA (Chuo Kikuu cha Kilimo Sokoine)', en: 'SUA (Sokoine University of Agriculture)', detail: { sw: 'Hospitali ya wanyama na utafiti, Morogoro.', en: 'Veterinary hospital and research, Morogoro.' } },
  { sw: 'Baraza la Veterinari Tanzania (VCT)', en: 'Veterinary Council of Tanzania (VCT)', detail: { sw: 'Kuhakikisha daktari amesajiliwa.', en: 'Check that a vet is registered.' } },
  { sw: 'Wizara ya Mifugo na Uvuvi', en: 'Ministry of Livestock and Fisheries', detail: { sw: 'Miongozo na kampeni za chanjo. mifugouvuvi.go.tz', en: 'Guidelines and vaccination campaigns. mifugouvuvi.go.tz' } },
]
