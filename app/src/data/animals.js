// FugaBora animal list. `v` = release version; checker = has a symptom checker in this build.
export const ANIMALS = [
  { id: 'cattle', icon: '🐄', sw: "Ng'ombe", en: 'Cattle', use: { sw: 'Maziwa, nyama, kazi', en: 'Milk, meat, work' }, group: 'livestock', v: 1, checker: true },
  { id: 'goat', icon: '🐐', sw: 'Mbuzi', en: 'Goats', use: { sw: 'Nyama, maziwa', en: 'Meat, milk' }, group: 'livestock', v: 1, checker: true },
  { id: 'chicken', icon: '🐔', sw: 'Kuku', en: 'Chickens', use: { sw: 'Mayai, nyama', en: 'Eggs, meat' }, group: 'poultry', v: 1, checker: true },
  { id: 'sheep', icon: '🐑', sw: 'Kondoo', en: 'Sheep', use: { sw: 'Nyama, sufu', en: 'Meat, wool' }, group: 'livestock', v: 2, checker: true },
  { id: 'pig', icon: '🐖', sw: 'Nguruwe', en: 'Pigs', use: { sw: 'Nyama', en: 'Meat' }, group: 'livestock', v: 2, checker: true },
  { id: 'dog', icon: '🐕', sw: 'Mbwa', en: 'Dogs', use: { sw: 'Ulinzi, urafiki', en: 'Guarding, company' }, group: 'pet', v: 2, checker: true },
  { id: 'cat', icon: '🐈', sw: 'Paka', en: 'Cats', use: { sw: 'Urafiki, kuzuia panya', en: 'Company, rat control' }, group: 'pet', v: 2, checker: true },
  { id: 'duck', icon: '🦆', sw: 'Bata', en: 'Ducks', use: { sw: 'Mayai, nyama', en: 'Eggs, meat' }, group: 'poultry', v: 3 },
  { id: 'turkey', icon: '🦃', sw: 'Bata mzinga', en: 'Turkeys', use: { sw: 'Nyama', en: 'Meat' }, group: 'poultry', v: 3 },
  { id: 'guineafowl', icon: '🐦', sw: 'Kanga', en: 'Guinea fowl', use: { sw: 'Nyama, mayai', en: 'Meat, eggs' }, group: 'poultry', v: 3 },
  { id: 'pigeon', icon: '🕊️', sw: 'Njiwa', en: 'Pigeons', use: { sw: 'Nyama, mapambo', en: 'Meat, hobby' }, group: 'poultry', v: 3 },
  { id: 'rabbit', icon: '🐇', sw: 'Sungura', en: 'Rabbits', use: { sw: 'Nyama, mbolea', en: 'Meat, manure' }, group: 'livestock', v: 3 },
  { id: 'donkey', icon: '🫏', sw: 'Punda', en: 'Donkeys', use: { sw: 'Kubeba mizigo', en: 'Carrying loads' }, group: 'livestock', v: 3 },
  { id: 'camel', icon: '🐪', sw: 'Ngamia', en: 'Camels', use: { sw: 'Maziwa, usafiri', en: 'Milk, transport' }, group: 'livestock', v: 4 },
  { id: 'fish', icon: '🐟', sw: 'Samaki', en: 'Fish farming', use: { sw: 'Chakula, kipato', en: 'Food, income' }, group: 'other', v: 4 },
  { id: 'bees', icon: '🐝', sw: 'Nyuki', en: 'Bees', use: { sw: 'Asali, nta', en: 'Honey, wax' }, group: 'other', v: 4 },
]

export const animalById = (id) => ANIMALS.find((a) => a.id === id)
