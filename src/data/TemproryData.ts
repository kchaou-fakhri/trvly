import {TrvlyCity} from '@model/index';

export const Places: TrvlyCity[] = [
  {
    name: 'Pyramids of Giza',
    country: 'Egypt',
    description:
      'The iconic pyramids built during the Old Kingdom of ancient Egypt, considered one of the Seven Wonders of the Ancient World.',
    point: {latitude: 31.1342, longitude: 29.9792},
    details: {
      year_built: '2560 BC',
      type: 'Historical Landmark',
    },
  },
  {
    name: 'Amphitheater of El Jem',
    country: 'Tunisia',
    description:
      'A well-preserved Roman amphitheater in the town of El Jem, showcasing the grandeur of Roman architecture.',
    point: {latitude: 35.2968, longitude: 10.7062},
    details: {
      year_built: '238 AD',
      type: 'Historical Landmark',
    },
  },
  {
    name: 'Al-Qarawiyyin Mosque',
    country: 'Morocco',
    description:
      'One of the oldest universities in the world, also functioning as a mosque and cultural hub in Fez.',
    point: {latitude: 34.0654, longitude: -4.9781},
    details: {
      year_built: 'null',
      year_established: '859 AD',
      type: 'Religious and Educational',
    },
  },
  {
    name: 'Petra',
    country: 'Jordan',
    description:
      "An ancient city carved into rose-red sandstone cliffs, known as the 'Rose City.'",
    point: {latitude: 35.4444, longitude: 30.3285},
    details: {
      year_built: '312 BC',
      type: 'Archaeological Site',
    },
  },
  {
    name: 'Djemaa el-Fna',
    country: 'Morocco',
    description:
      'A bustling square and marketplace in Marrakesh, offering food, entertainment, and cultural experiences.',
    point: {latitude: 31.6258, longitude: -7.9893},
    details: {
      year_built: '11th century',
      type: 'Cultural Hub',
    },
  },
];
