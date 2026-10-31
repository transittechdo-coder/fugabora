// Symptoms shown in the checker. "for" lists which animals the sign applies to.
// danger: true means the sign alone triggers "call a vet now".

const ALL_MAMMALS = ['cattle', 'goat', 'sheep', 'pig', 'dog', 'cat', 'rabbit', 'donkey', 'camel']
const RUMINANTS = ['cattle', 'goat', 'sheep', 'camel']
const BIRDS = ['chicken', 'duck', 'turkey', 'guineafowl', 'pigeon']

export const SYMPTOM_GROUPS = {
  general: { sw: 'Hali ya jumla', en: 'General' },
  gut: { sw: 'Tumbo na kinyesi', en: 'Gut and droppings' },
  breath: { sw: 'Kupumua', en: 'Breathing' },
  skin: { sw: 'Ngozi, macho na mdomo', en: 'Skin, eyes and mouth' },
  move: { sw: 'Kutembea na fahamu', en: 'Movement and behaviour' },
  repro: { sw: 'Uzazi na maziwa', en: 'Breeding and milk' },
}

export const SYMPTOMS = [
  { id: 'sudden_death', g: 'general', sw: 'Vifo vya ghafla', en: 'Sudden death(s)', danger: true, for: [...ALL_MAMMALS, ...BIRDS] },
  { id: 'many_sick', g: 'general', sw: 'Wanyama wengi wanaumwa kwa pamoja', en: 'Many animals sick at once', danger: true, for: [...ALL_MAMMALS, ...BIRDS] },
  { id: 'fever', g: 'general', sw: 'Homa (mwili wa moto)', en: 'Fever (hot body)', for: ALL_MAMMALS },
  { id: 'no_appetite', g: 'general', sw: 'Hali chakula', en: 'Not eating', for: [...ALL_MAMMALS, ...BIRDS] },
  { id: 'weight_loss', g: 'general', sw: 'Kukonda', en: 'Losing weight', for: [...ALL_MAMMALS, ...BIRDS] },
  { id: 'weak', g: 'general', sw: 'Udhaifu, kulala chini', en: 'Weak, lying down', for: [...ALL_MAMMALS, ...BIRDS] },
  { id: 'pale', g: 'general', sw: 'Macho au fizi kupauka (weupe)', en: 'Pale eyes or gums', for: ALL_MAMMALS },
  { id: 'yellow_eyes', g: 'general', sw: 'Macho ya njano', en: 'Yellow eyes or gums', for: RUMINANTS },
  { id: 'swollen_nodes', g: 'general', sw: 'Tezi kuvimba (chini ya sikio, mbele ya bega)', en: 'Swollen lymph nodes (below ear, front of shoulder)', for: ['cattle'] },
  { id: 'ruffled', g: 'general', sw: 'Manyoya kusimama, kusinzia', en: 'Ruffled feathers, sleepy', for: BIRDS },
  { id: 'blood_openings', g: 'general', sw: 'Damu nyeusi puani, mdomoni au njia ya haja', en: 'Dark blood from nose, mouth or anus', danger: true, for: [...RUMINANTS, 'pig', 'donkey'] },

  { id: 'diarrhoea', g: 'gut', sw: 'Kuharisha', en: 'Diarrhoea', for: [...ALL_MAMMALS] },
  { id: 'bloody_diarrhoea', g: 'gut', sw: 'Kuharisha damu', en: 'Bloody diarrhoea', for: [...ALL_MAMMALS] },
  { id: 'green_droppings', g: 'gut', sw: 'Kinyesi cha kijani', en: 'Green droppings', for: BIRDS },
  { id: 'white_droppings', g: 'gut', sw: 'Kinyesi cheupe, majimaji', en: 'White watery droppings', for: BIRDS },
  { id: 'bloody_droppings', g: 'gut', sw: 'Kinyesi chenye damu', en: 'Bloody droppings', for: BIRDS },
  { id: 'yellow_droppings', g: 'gut', sw: 'Kinyesi cha njano', en: 'Yellow droppings', for: BIRDS },
  { id: 'vomiting', g: 'gut', sw: 'Kutapika', en: 'Vomiting', for: ['pig', 'dog', 'cat'] },
  { id: 'bloat', g: 'gut', sw: 'Tumbo kuvimba (upande wa kushoto)', en: 'Swollen belly (left side)', danger: true, for: RUMINANTS },
  { id: 'red_urine', g: 'gut', sw: 'Mkojo mwekundu au wa rangi ya kahawa', en: 'Red or coffee-coloured urine', for: RUMINANTS },
  { id: 'constipation', g: 'gut', sw: 'Kufunga choo', en: 'Constipation', for: RUMINANTS },

  { id: 'cough', g: 'breath', sw: 'Kukohoa', en: 'Coughing', for: [...ALL_MAMMALS] },
  { id: 'hard_breathing', g: 'breath', sw: 'Kupumua kwa shida', en: 'Hard breathing', for: [...ALL_MAMMALS, ...BIRDS] },
  { id: 'nasal_discharge', g: 'breath', sw: 'Makamasi puani', en: 'Runny nose', for: [...ALL_MAMMALS, ...BIRDS] },
  { id: 'sneezing', g: 'breath', sw: 'Kupiga chafya', en: 'Sneezing', for: [...BIRDS, 'cat', 'rabbit'] },

  { id: 'mouth_sores', g: 'skin', sw: 'Vidonda au malengelenge mdomoni', en: 'Mouth sores or blisters', for: [...RUMINANTS, 'pig'] },
  { id: 'drooling', g: 'skin', sw: 'Kutoa mate mengi', en: 'Drooling', for: [...ALL_MAMMALS] },
  { id: 'skin_lumps', g: 'skin', sw: 'Vivimbe kwenye ngozi', en: 'Lumps on the skin', for: RUMINANTS },
  { id: 'scabs', g: 'skin', sw: 'Vipele au magamba', en: 'Scabs or crusts', for: [...RUMINANTS, ...BIRDS, 'rabbit'] },
  { id: 'itching', g: 'skin', sw: 'Kujikuna, nywele kunyonyoka', en: 'Itching, hair loss', for: [...ALL_MAMMALS] },
  { id: 'eye_discharge', g: 'skin', sw: 'Machozi au usaha machoni', en: 'Eye discharge', for: [...ALL_MAMMALS, ...BIRDS] },
  { id: 'cloudy_eyes', g: 'skin', sw: 'Macho kuwa na ukungu', en: 'Cloudy eyes', for: ['cattle'] },
  { id: 'swollen_face', g: 'skin', sw: 'Uso, midomo au ulimi kuvimba', en: 'Swollen face, lips or tongue', for: [...RUMINANTS, ...BIRDS, 'donkey'] },
  { id: 'purple_skin', g: 'skin', sw: 'Ngozi ya masikio na tumbo kuwa zambarau', en: 'Purple ears and belly skin', for: ['pig'] },
  { id: 'red_patches', g: 'skin', sw: 'Madoa mekundu ya umbo la almasi', en: 'Red diamond-shaped patches', for: ['pig'] },
  { id: 'comb_pale', g: 'skin', sw: 'Upanga kupauka', en: 'Pale comb', for: ['chicken', 'turkey', 'guineafowl'] },
  { id: 'ticks', g: 'skin', sw: 'Kupe wengi', en: 'Many ticks', for: [...RUMINANTS, 'dog', 'donkey'] },
  { id: 'bottle_jaw', g: 'skin', sw: 'Uvimbe chini ya taya', en: 'Swelling under the jaw', for: ['goat', 'sheep', 'cattle'] },

  { id: 'lame', g: 'move', sw: 'Kuchechemea', en: 'Limping', for: [...ALL_MAMMALS] },
  { id: 'leg_swelling', g: 'move', sw: 'Mguu au bega kuvimba (linakwaruza likibonywa)', en: 'Swollen leg or shoulder (crackles when pressed)', danger: true, for: ['cattle', 'sheep', 'goat'] },
  { id: 'twisted_neck', g: 'move', sw: 'Shingo kupinda', en: 'Twisted neck', for: BIRDS },
  { id: 'trembling', g: 'move', sw: 'Kutetemeka au kifafa', en: 'Trembling or fits', for: [...ALL_MAMMALS, ...BIRDS] },
  { id: 'aggressive', g: 'move', sw: 'Ukali usio wa kawaida, kuuma vitu', en: 'Unusual aggression, biting things', danger: true, for: ['dog', 'cat', 'cattle', 'goat', 'donkey'] },
  { id: 'cant_swallow', g: 'move', sw: 'Kushindwa kumeza, taya kulegea', en: "Can't swallow, jaw hanging", danger: true, for: ['dog', 'cat', 'cattle', 'goat'] },
  { id: 'circling', g: 'move', sw: 'Kuzunguka au kugonga kichwa', en: 'Circling or head pressing', for: RUMINANTS },

  { id: 'abortion', g: 'repro', sw: 'Kutupa mimba', en: 'Abortion', for: [...RUMINANTS, 'pig'] },
  { id: 'many_abortions', g: 'repro', sw: 'Mimba nyingi kutupwa baada ya mvua nyingi', en: 'Many abortions after heavy rain', danger: true, for: RUMINANTS },
  { id: 'retained_placenta', g: 'repro', sw: 'Kondo la nyuma kubaki', en: 'Retained afterbirth', for: RUMINANTS },
  { id: 'udder_swollen', g: 'repro', sw: 'Kiwele kuvimba au kuwa moto', en: 'Swollen or hot udder', for: ['cattle', 'goat', 'sheep', 'camel'] },
  { id: 'milk_clots', g: 'repro', sw: 'Maziwa yenye mabonge au damu', en: 'Clots or blood in milk', for: ['cattle', 'goat', 'sheep', 'camel'] },
  { id: 'milk_drop', g: 'repro', sw: 'Maziwa kupungua', en: 'Milk drop', for: ['cattle', 'goat', 'sheep', 'camel'] },
  { id: 'egg_drop', g: 'repro', sw: 'Mayai kupungua', en: 'Fewer eggs', for: BIRDS },
]

export const symptomsFor = (animalId) => SYMPTOMS.filter((s) => s.for.includes(animalId))
export const symptomById = (id) => SYMPTOMS.find((s) => s.id === id)
