// FugaBora animal list. "phase" = which app version fully covers the animal.
// Every disease entry must be reviewed by a vet before the pilot (see knowledge-base/DISEASES-ALL.md).

export const ANIMALS = [
  { id: 'cattle', sw: "Ng'ombe", en: 'Cattle', group: 'livestock', phase: 1, use: { sw: 'Maziwa, nyama, kazi', en: 'Milk, meat, work' } },
  { id: 'goat', sw: 'Mbuzi', en: 'Goats', group: 'livestock', phase: 1, use: { sw: 'Nyama, maziwa', en: 'Meat, milk' } },
  { id: 'chicken', sw: 'Kuku', en: 'Chickens', group: 'poultry', phase: 1, use: { sw: 'Nyama, mayai', en: 'Meat, eggs' } },
  { id: 'sheep', sw: 'Kondoo', en: 'Sheep', group: 'livestock', phase: 2, use: { sw: 'Nyama, sufu', en: 'Meat, wool' } },
  { id: 'pig', sw: 'Nguruwe', en: 'Pigs', group: 'livestock', phase: 2, use: { sw: 'Nyama', en: 'Meat' } },
  { id: 'dog', sw: 'Mbwa', en: 'Dogs', group: 'pet', phase: 2, use: { sw: 'Ulinzi, urafiki', en: 'Guarding, company' } },
  { id: 'cat', sw: 'Paka', en: 'Cats', group: 'pet', phase: 2, use: { sw: 'Urafiki, kuzuia panya', en: 'Company, rat control' } },
  { id: 'duck', sw: 'Bata', en: 'Ducks', group: 'poultry', phase: 3, use: { sw: 'Nyama, mayai', en: 'Meat, eggs' } },
  { id: 'turkey', sw: 'Bata mzinga', en: 'Turkeys', group: 'poultry', phase: 3, use: { sw: 'Nyama', en: 'Meat' } },
  { id: 'guineafowl', sw: 'Kanga', en: 'Guinea fowl', group: 'poultry', phase: 3, use: { sw: 'Nyama, mayai', en: 'Meat, eggs' } },
  { id: 'pigeon', sw: 'Njiwa', en: 'Pigeons', group: 'poultry', phase: 3, use: { sw: 'Nyama, mapambo', en: 'Meat, hobby' } },
  { id: 'rabbit', sw: 'Sungura', en: 'Rabbits', group: 'livestock', phase: 3, use: { sw: 'Nyama, mbolea', en: 'Meat, manure' } },
  { id: 'donkey', sw: 'Punda', en: 'Donkeys', group: 'livestock', phase: 3, use: { sw: 'Kubeba mizigo', en: 'Carrying loads' } },
  { id: 'camel', sw: 'Ngamia', en: 'Camels', group: 'livestock', phase: 4, use: { sw: 'Maziwa, usafiri', en: 'Milk, transport' } },
  { id: 'fish', sw: 'Samaki', en: 'Fish (ponds)', group: 'aqua', phase: 4, use: { sw: 'Ufugaji wa samaki', en: 'Fish farming' } },
  { id: 'bees', sw: 'Nyuki', en: 'Bees', group: 'insect', phase: 4, use: { sw: 'Asali, nta', en: 'Honey, wax' } },
]

export const animalById = (id) => ANIMALS.find((a) => a.id === id)

export const GROUPS = {
  livestock: { sw: 'Mifugo', en: 'Livestock' },
  poultry: { sw: 'Ndege wa kufugwa', en: 'Poultry' },
  pet: { sw: 'Wanyama wa nyumbani', en: 'Pets' },
  aqua: { sw: 'Samaki', en: 'Aquaculture' },
  insect: { sw: 'Nyuki', en: 'Bees' },
}
