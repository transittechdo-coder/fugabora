// Feeding by growth stage and vaccination / routine care schedules.
// STATUS: NOT VET-REVIEWED. Amounts are typical guides; local feed labels and extension officers come first.

export const FEEDING = {
  chicken: {
    note: { sw: 'Maji safi muda wote. Kuku hunywa maji karibu mara 2 ya chakula.', en: 'Clean water at all times. Birds drink about twice as much as they eat.' },
    types: [
      { id: 'broiler', sw: 'Kuku wa nyama (broiler)', en: 'Broilers', stages: [
        { from: 0, to: 2, unit: 'week', feed: { sw: 'Starter', en: 'Starter' }, gPerDay: [20, 45] },
        { from: 3, to: 4, unit: 'week', feed: { sw: 'Grower', en: 'Grower' }, gPerDay: [60, 120] },
        { from: 5, to: 6, unit: 'week', feed: { sw: 'Finisher', en: 'Finisher' }, gPerDay: [140, 180] },
      ] },
      { id: 'layer', sw: 'Kuku wa mayai (layer)', en: 'Layers', stages: [
        { from: 0, to: 8, unit: 'week', feed: { sw: 'Chick mash', en: 'Chick mash' }, gPerDay: [15, 50] },
        { from: 9, to: 18, unit: 'week', feed: { sw: 'Growers mash', en: 'Growers mash' }, gPerDay: [55, 90] },
        { from: 19, to: 80, unit: 'week', feed: { sw: 'Layers mash', en: 'Layers mash' }, gPerDay: [110, 130] },
      ] },
      { id: 'village', sw: 'Kuku wa kienyeji', en: 'Village chickens', stages: [
        { from: 0, to: 8, unit: 'week', feed: { sw: 'Chick mash + kuchakura', en: 'Chick mash + scavenging' }, gPerDay: [15, 40] },
        { from: 9, to: 80, unit: 'week', feed: { sw: 'Kuchakura + nyongeza ya pumba, mahindi, mabaki', en: 'Scavenging + bran, maize, leftovers' }, gPerDay: [40, 70] },
      ] },
    ],
  },
  cattle: {
    note: { sw: 'Ng’ombe wa maziwa anahitaji maji lita 50–100 kwa siku.', en: 'A dairy cow needs 50–100 litres of water a day.' },
    types: [
      { id: 'dairy', sw: 'Ng’ombe wa maziwa', en: 'Dairy cow', stages: [
        { from: 0, to: 3, unit: 'month', feed: { sw: 'Maziwa (10% ya uzito wake) + calf pellets kuanzia wiki 2', en: 'Milk (10% of body weight) + calf pellets from week 2' } },
        { from: 4, to: 24, unit: 'month', feed: { sw: 'Majani mazuri, hay, madini, maji', en: 'Good grass, hay, minerals, water' } },
        { from: 25, to: 180, unit: 'month', feed: { sw: 'Majani ~10% ya uzito + dairy meal ~1 kg kwa kila lita 2 za maziwa zaidi ya lita 5', en: 'Fodder ~10% of body weight + dairy meal ~1 kg per 2 litres of milk above 5 litres' } },
      ] },
      { id: 'beef', sw: 'Ng’ombe wa nyama / kienyeji', en: 'Beef / local cattle', stages: [
        { from: 0, to: 6, unit: 'month', feed: { sw: 'Kunyonya mama + majani laini', en: 'Suckling + soft grass' } },
        { from: 7, to: 180, unit: 'month', feed: { sw: 'Malisho, hay wakati wa kiangazi, jiwe la madini', en: 'Grazing, hay in dry season, mineral lick' } },
      ] },
    ],
  },
  goat: {
    note: { sw: 'Mbuzi hupenda kula majani ya miti na vichaka. Weka jiwe la madini.', en: 'Goats prefer browsing shrubs and tree leaves. Provide a mineral lick.' },
    types: [
      { id: 'goat', sw: 'Mbuzi', en: 'Goats', stages: [
        { from: 0, to: 3, unit: 'month', feed: { sw: 'Maziwa ya mama + majani laini kuanzia wiki 2', en: "Mother's milk + soft leaves from week 2" } },
        { from: 4, to: 12, unit: 'month', feed: { sw: 'Majani, matawi, pumba kidogo (100–200 g)', en: 'Leaves, browse, a little bran (100–200 g)' } },
        { from: 13, to: 120, unit: 'month', feed: { sw: 'Malisho + 250–500 g pumba kwa mbuzi wa maziwa', en: 'Browse + 250–500 g concentrate for dairy goats' } },
      ] },
    ],
  },
  pig: {
    note: { sw: 'Usilishe mabaki ya chakula yasiyochemshwa (hueneza homa ya nguruwe).', en: 'Never feed uncooked kitchen swill (spreads African swine fever).' },
    types: [
      { id: 'pig', sw: 'Nguruwe', en: 'Pigs', stages: [
        { from: 0, to: 2, unit: 'month', feed: { sw: 'Maziwa ya mama + creep feed', en: "Sow's milk + creep feed" }, gPerDay: [100, 500] },
        { from: 3, to: 4, unit: 'month', feed: { sw: 'Grower', en: 'Grower' }, gPerDay: [1000, 1800] },
        { from: 5, to: 8, unit: 'month', feed: { sw: 'Finisher', en: 'Finisher' }, gPerDay: [2000, 3000] },
      ] },
    ],
  },
  dog: {
    note: { sw: 'Mbwa hula mara 2 kwa siku (watoto mara 3–4). Usimpe mifupa ya kuku iliyopikwa.', en: 'Adult dogs eat twice a day (puppies 3–4 times). No cooked chicken bones.' },
    types: [{ id: 'dog', sw: 'Mbwa', en: 'Dogs', stages: [
      { from: 0, to: 12, unit: 'month', feed: { sw: 'Chakula cha watoto wa mbwa au uji + nyama/samaki', en: 'Puppy food or porridge + meat/fish' } },
      { from: 13, to: 180, unit: 'month', feed: { sw: 'Ugali/wali + nyama, samaki au dagaa + mboga', en: 'Ugali/rice + meat, fish or sardines + vegetables' } },
    ] }],
  },
  rabbit: {
    note: { sw: 'Sungura wanahitaji majani makavu na maji muda wote.', en: 'Rabbits need hay and water at all times.' },
    types: [{ id: 'rabbit', sw: 'Sungura', en: 'Rabbits', stages: [
      { from: 0, to: 2, unit: 'month', feed: { sw: 'Maziwa ya mama, kisha majani laini', en: "Mother's milk, then soft greens" } },
      { from: 3, to: 60, unit: 'month', feed: { sw: 'Majani makavu, mboga, pellets 100–150 g', en: 'Hay, greens, 100–150 g pellets' } },
    ] }],
  },
}

// age in weeks; repeatEvery in weeks (null = once)
export const VACCINES = {
  chicken: [
    { name: { sw: 'Marek', en: "Marek's" }, at: 0, note: { sw: 'Siku ya kwanza (hatchery)', en: 'Day 1 (at hatchery)' } },
    { name: { sw: 'Kideri (Newcastle)', en: 'Newcastle' }, at: 1, repeatEvery: 12, note: { sw: 'I-2 kila miezi 3', en: 'I-2 every 3 months' } },
    { name: { sw: 'Gumboro', en: 'Gumboro' }, at: 2, note: { sw: 'Rudia wiki 3 kama daktari ataelekeza', en: 'Repeat at week 3 if advised' } },
    { name: { sw: 'Ndui ya kuku', en: 'Fowl pox' }, at: 6 },
    { name: { sw: 'Dawa ya minyoo', en: 'Deworming' }, at: 8, repeatEvery: 12, routine: true },
  ],
  cattle: [
    { name: { sw: 'Ndigana kali (ITM)', en: 'ECF (ITM)' }, at: 4, note: { sw: 'Mara moja, kwa daktari', en: 'Once, by a vet' } },
    { name: { sw: 'Brucellosis (ndama wa kike)', en: 'Brucellosis (heifers)' }, at: 13 },
    { name: { sw: 'Chambavu', en: 'Blackquarter' }, at: 26, repeatEvery: 52 },
    { name: { sw: 'Kimeta', en: 'Anthrax' }, at: 26, repeatEvery: 52 },
    { name: { sw: 'Miguu na midomo', en: 'FMD' }, at: 26, repeatEvery: 26 },
    { name: { sw: 'Ugonjwa wa ngozi (LSD)', en: 'Lumpy skin' }, at: 26, repeatEvery: 52 },
    { name: { sw: 'Homa ya mapafu (CBPP)', en: 'CBPP' }, at: 26, repeatEvery: 52, note: { sw: 'Kwenye kampeni za serikali', en: 'In government campaigns' } },
    { name: { sw: 'Kuogesha kupe', en: 'Tick dipping' }, at: 4, repeatEvery: 1, routine: true },
    { name: { sw: 'Dawa ya minyoo', en: 'Deworming' }, at: 12, repeatEvery: 13, routine: true },
  ],
  goat: [
    { name: { sw: 'Sotoka (PPR)', en: 'PPR' }, at: 13, repeatEvery: 156 },
    { name: { sw: 'Homa ya mapafu ya mbuzi (CCPP)', en: 'CCPP' }, at: 13, repeatEvery: 52 },
    { name: { sw: 'Kimeta', en: 'Anthrax' }, at: 26, repeatEvery: 52 },
    { name: { sw: 'Dawa ya minyoo', en: 'Deworming' }, at: 8, repeatEvery: 13, routine: true },
  ],
  sheep: [
    { name: { sw: 'Sotoka (PPR)', en: 'PPR' }, at: 13, repeatEvery: 156 },
    { name: { sw: 'Ndui ya kondoo', en: 'Sheep pox' }, at: 13, repeatEvery: 52 },
    { name: { sw: 'Dawa ya minyoo', en: 'Deworming' }, at: 8, repeatEvery: 13, routine: true },
  ],
  pig: [
    { name: { sw: 'Erysipelas', en: 'Erysipelas' }, at: 8, repeatEvery: 26 },
    { name: { sw: 'Dawa ya minyoo', en: 'Deworming' }, at: 6, repeatEvery: 13, routine: true },
  ],
  dog: [
    { name: { sw: 'Distemper / Parvo', en: 'Distemper / Parvo' }, at: 6, note: { sw: 'Rudia wiki 9 na 12', en: 'Repeat at weeks 9 and 12' } },
    { name: { sw: 'Kichaa cha mbwa', en: 'Rabies' }, at: 12, repeatEvery: 52 },
    { name: { sw: 'Dawa ya minyoo', en: 'Deworming' }, at: 2, repeatEvery: 13, routine: true },
  ],
  cat: [
    { name: { sw: 'Panleukopenia / mafua', en: 'Panleukopenia / cat flu' }, at: 8, note: { sw: 'Rudia wiki 12', en: 'Repeat at week 12' } },
    { name: { sw: 'Kichaa cha mbwa', en: 'Rabies' }, at: 12, repeatEvery: 52 },
  ],
}
