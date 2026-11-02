// Shared symptom vocabulary. `danger: true` triggers the "call a vet now" alert on its own.
// `for` limits which animals see the symptom (omit = all).
export const SYMPTOMS = {
  sudden_death: { sw: 'Vifo vya ghafla', en: 'Sudden death', danger: true, cat: 'general' },
  many_sick: { sw: 'Wengi wanaumwa kwa pamoja', en: 'Many sick at once', danger: true, cat: 'general' },
  fever: { sw: 'Homa / mwili wa moto', en: 'Fever / hot body', cat: 'general' },
  not_eating: { sw: 'Haili chakula', en: 'Not eating', cat: 'general' },
  weak: { sw: 'Unyonge, kulala sana', en: 'Weak, lying down a lot', cat: 'general' },
  weight_loss: { sw: 'Kukonda', en: 'Weight loss', cat: 'general' },
  pale: { sw: 'Macho / fizi kupauka', en: 'Pale eyes or gums', cat: 'general' },
  jaundice: { sw: 'Macho / fizi njano', en: 'Yellow eyes or gums', cat: 'general' },
  swollen_nodes: { sw: 'Tezi kuvimba (chini ya sikio / bega)', en: 'Swollen lymph nodes (ear, shoulder)', cat: 'general', for: ['cattle'] },

  cough: { sw: 'Kukohoa', en: 'Coughing', cat: 'breathing' },
  hard_breathing: { sw: 'Kupumua kwa shida', en: 'Hard breathing', cat: 'breathing' },
  nasal_discharge: { sw: 'Makamasi puani', en: 'Nasal discharge', cat: 'breathing' },
  sneezing: { sw: 'Kupiga chafya', en: 'Sneezing', cat: 'breathing' },
  neck_stretched: { sw: 'Kunyoosha shingo kupumua', en: 'Neck stretched to breathe', cat: 'breathing' },

  diarrhoea: { sw: 'Kuharisha', en: 'Diarrhoea', cat: 'gut' },
  bloody_diarrhoea: { sw: 'Kuharisha damu', en: 'Bloody diarrhoea', cat: 'gut' },
  green_diarrhoea: { sw: 'Kuharisha kijani', en: 'Green diarrhoea', cat: 'gut', for: ['chicken'] },
  white_diarrhoea: { sw: 'Kuharisha cheupe majimaji', en: 'White watery diarrhoea', cat: 'gut', for: ['chicken'] },
  yellow_diarrhoea: { sw: 'Kuharisha njano', en: 'Yellow diarrhoea', cat: 'gut', for: ['chicken'] },
  vomiting: { sw: 'Kutapika', en: 'Vomiting', cat: 'gut', for: ['pig', 'dog', 'cat'] },
  bloat: { sw: 'Tumbo kuvimba upande wa kushoto', en: 'Left belly swollen', danger: true, cat: 'gut', for: ['cattle', 'goat', 'sheep'] },
  red_urine: { sw: 'Mkojo mwekundu / kahawia', en: 'Red or brown urine', cat: 'gut', for: ['cattle', 'goat', 'sheep'] },

  mouth_sores: { sw: 'Vidonda mdomoni', en: 'Mouth sores', cat: 'skin' },
  drooling: { sw: 'Kudondosha mate', en: 'Drooling', cat: 'skin' },
  foot_blisters: { sw: 'Malengelenge kwatoni', en: 'Blisters on feet', cat: 'skin', for: ['cattle', 'goat', 'sheep', 'pig'] },
  lame: { sw: 'Kuchechemea', en: 'Limping', cat: 'skin' },
  skin_lumps: { sw: 'Vinundu ngozini', en: 'Lumps on skin', cat: 'skin' },
  scabs: { sw: 'Vipele / magamba', en: 'Scabs or crusts', cat: 'skin' },
  itching: { sw: 'Kuwashwa, manyoya kunyonyoka', en: 'Itching, hair loss', cat: 'skin' },
  purple_skin: { sw: 'Ngozi zambarau (masikio, tumbo)', en: 'Purple skin (ears, belly)', danger: true, cat: 'skin', for: ['pig'] },
  diamond_skin: { sw: 'Madoa mekundu ya pembe nne', en: 'Red diamond patches', cat: 'skin', for: ['pig'] },
  muscle_swelling: { sw: 'Uvimbe wa moto mguuni unaolia ukibonyezwa', en: 'Hot leg swelling that crackles', danger: true, cat: 'skin', for: ['cattle'] },
  swollen_face: { sw: 'Uso / midomo kuvimba', en: 'Swollen face or lips', cat: 'skin' },
  bottle_jaw: { sw: 'Uvimbe chini ya taya', en: 'Swelling under jaw', cat: 'skin', for: ['goat', 'sheep', 'cattle'] },
  comb_scabs: { sw: 'Vipele kwenye upanga', en: 'Scabs on comb', cat: 'skin', for: ['chicken'] },
  ruffled: { sw: 'Manyoya kusimama, kusinzia', en: 'Ruffled feathers, sleepy', cat: 'skin', for: ['chicken'] },

  twisted_neck: { sw: 'Shingo kupinda', en: 'Twisted neck', cat: 'brain', for: ['chicken'] },
  circling: { sw: 'Kuzunguka, kugonga kichwa', en: 'Circling, head pressing', cat: 'brain' },
  fits: { sw: 'Kifafa / kutetemeka', en: 'Fits or trembling', danger: true, cat: 'brain' },
  aggression: { sw: 'Ukali usio wa kawaida, kuuma vitu', en: 'Unusual aggression, biting objects', danger: true, cat: 'brain', for: ['dog', 'cat', 'cattle'] },
  cant_swallow: { sw: 'Kushindwa kumeza', en: 'Cannot swallow', danger: true, cat: 'brain', for: ['dog', 'cat', 'cattle'] },
  paralysis: { sw: 'Kupooza', en: 'Paralysis', danger: true, cat: 'brain' },

  abortion: { sw: 'Kutupa mimba', en: 'Abortion', cat: 'production', for: ['cattle', 'goat', 'sheep', 'pig'] },
  milk_drop: { sw: 'Maziwa kupungua', en: 'Milk drop', cat: 'production', for: ['cattle', 'goat'] },
  udder_swollen: { sw: 'Kiwele kuvimba / maziwa yenye mabonge', en: 'Swollen udder or clotted milk', cat: 'production', for: ['cattle', 'goat'] },
  egg_drop: { sw: 'Mayai kupungua', en: 'Fewer eggs', cat: 'production', for: ['chicken'] },
  blood_openings: { sw: 'Damu nyeusi puani / mdomoni baada ya kifo', en: 'Dark blood from nose or mouth after death', danger: true, cat: 'general', for: ['cattle', 'goat', 'sheep'] },
  eye_discharge: { sw: 'Machozi / tongotongo', en: 'Eye discharge', cat: 'breathing' },
  cloudy_eyes: { sw: 'Macho kuwa na ukungu', en: 'Cloudy eyes', cat: 'breathing', for: ['cattle'] },
}

export const SYMPTOM_CATS = {
  general: { sw: 'Hali ya jumla', en: 'General' },
  breathing: { sw: 'Kupumua na macho', en: 'Breathing and eyes' },
  gut: { sw: 'Tumbo na kinyesi', en: 'Belly and droppings' },
  skin: { sw: 'Ngozi, mdomo, miguu', en: 'Skin, mouth, feet' },
  brain: { sw: 'Tabia na neva', en: 'Behaviour and nerves' },
  production: { sw: 'Uzalishaji', en: 'Production' },
}

export const symptomsFor = (animalId) =>
  Object.entries(SYMPTOMS)
    .filter(([, s]) => !s.for || s.for.includes(animalId))
    .map(([id, s]) => ({ id, ...s }))
