export interface PlanetData {
  name: string;
  radius: number;
  distance: number;
  color: string;
  rotationSpeed: number;
  orbitSpeed: number;
  texture?: string;
  facts: string[];
  type: 'terrestrial' | 'gas-giant' | 'dwarf';
  moons: number;
  discoveryYear?: number;
}

export const planetData: PlanetData[] = [
  {
    name: 'Mercury',
    radius: 0.3,
    distance: 4,
    color: '#8C7853',
    rotationSpeed: 0.01,
    orbitSpeed: 0.02,
    facts: [
      'Closest planet to the Sun',
      'No atmosphere, extreme temperatures',
      'One day lasts 176 Earth days',
      'Named after Roman messenger god'
    ],
    type: 'terrestrial',
    moons: 0,
    discoveryYear: -3000
  },
  {
    name: 'Venus',
    radius: 0.45,
    distance: 6,
    color: '#FFC649',
    rotationSpeed: -0.005,
    orbitSpeed: 0.015,
    facts: [
      'Hottest planet in the solar system',
      'Thick, toxic atmosphere',
      'Rotates backwards (retrograde)',
      'Often called Earth\'s twin'
    ],
    type: 'terrestrial',
    moons: 0,
    discoveryYear: -3000
  },
  {
    name: 'Earth',
    radius: 0.5,
    distance: 8,
    color: '#6B93D6',
    rotationSpeed: 0.02,
    orbitSpeed: 0.01,
    facts: [
      'The only known planet with life',
      '71% of surface covered by water',
      'Protected by magnetic field',
      'Perfect distance from Sun for liquid water'
    ],
    type: 'terrestrial',
    moons: 1,
    discoveryYear: -3000
  },
  {
    name: 'Mars',
    radius: 0.35,
    distance: 10,
    color: '#CD5C5C',
    rotationSpeed: 0.018,
    orbitSpeed: 0.008,
    facts: [
      'Known as the Red Planet',
      'Has polar ice caps',
      'Home to largest volcano in solar system',
      'Day length similar to Earth (24.6 hours)'
    ],
    type: 'terrestrial',
    moons: 2,
    discoveryYear: -3000
  },
  {
    name: 'Jupiter',
    radius: 1.2,
    distance: 15,
    color: '#D8CA9D',
    rotationSpeed: 0.04,
    orbitSpeed: 0.005,
    facts: [
      'Largest planet in our solar system',
      'Great Red Spot is a giant storm',
      'Acts as solar system\'s vacuum cleaner',
      'Has more than 80 moons'
    ],
    type: 'gas-giant',
    moons: 95,
    discoveryYear: -3000
  },
  {
    name: 'Saturn',
    radius: 1.0,
    distance: 20,
    color: '#FAD5A5',
    rotationSpeed: 0.035,
    orbitSpeed: 0.003,
    facts: [
      'Famous for its spectacular rings',
      'Less dense than water',
      'Has hexagonal storm at north pole',
      'Titan is larger than Mercury'
    ],
    type: 'gas-giant',
    moons: 146,
    discoveryYear: -3000
  },
  {
    name: 'Uranus',
    radius: 0.8,
    distance: 25,
    color: '#4FD0E7',
    rotationSpeed: 0.025,
    orbitSpeed: 0.002,
    facts: [
      'Rotates on its side (98° tilt)',
      'Made of water, methane, and ammonia',
      'Has faint rings',
      'Coldest planetary atmosphere'
    ],
    type: 'gas-giant',
    moons: 28,
    discoveryYear: 1781
  },
  {
    name: 'Neptune',
    radius: 0.75,
    distance: 30,
    color: '#4B70DD',
    rotationSpeed: 0.03,
    orbitSpeed: 0.001,
    facts: [
      'Windiest planet (up to 2,100 km/h)',
      'Predicted mathematically before discovery',
      'Takes 165 Earth years to orbit Sun',
      'Has the strongest magnetic field'
    ],
    type: 'gas-giant',
    moons: 16,
    discoveryYear: 1846
  }
];

export const sunData = {
  name: 'Sun',
  radius: 2,
  color: '#FDB813',
  facts: [
    'Contains 99.86% of solar system\'s mass',
    'Core temperature: 15 million°C',
    'Light takes 8 minutes to reach Earth',
    'Will burn for another 5 billion years'
  ]
};