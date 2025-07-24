export interface StarData {
  id: string;
  x: number;
  y: number;
  z: number;
  magnitude: number;
  name?: string;
}

export interface ConstellationData {
  name: string;
  zodiacSign?: string;
  dates?: string;
  stars: StarData[];
  connections: [number, number][];
  description: string;
  element: 'fire' | 'earth' | 'air' | 'water';
  traits: string[];
}

export const constellations: ConstellationData[] = [
  {
    name: "Aries",
    zodiacSign: "aries",
    dates: "March 21 - April 19",
    element: "fire",
    traits: ["Bold", "Ambitious", "Confident", "Impulsive"],
    description: "The Ram - First sign of the zodiac, known for leadership and pioneering spirit.",
    stars: [
      { id: "hamal", x: 15, y: 8, z: -20, magnitude: 2.0, name: "Hamal" },
      { id: "sheratan", x: 12, y: 6, z: -18, magnitude: 2.6, name: "Sheratan" },
      { id: "mesarthim", x: 10, y: 4, z: -22, magnitude: 4.1, name: "Mesarthim" }
    ],
    connections: [[0, 1], [1, 2]]
  },
  {
    name: "Taurus",
    zodiacSign: "taurus", 
    dates: "April 20 - May 20",
    element: "earth",
    traits: ["Reliable", "Patient", "Practical", "Stubborn"],
    description: "The Bull - Known for stability, sensuality, and determination.",
    stars: [
      { id: "aldebaran", x: 20, y: 12, z: -25, magnitude: 0.9, name: "Aldebaran" },
      { id: "elnath", x: 18, y: 15, z: -23, magnitude: 1.7, name: "Elnath" },
      { id: "alcyone", x: 22, y: 10, z: -27, magnitude: 2.9, name: "Alcyone" }
    ],
    connections: [[0, 1], [0, 2]]
  },
  {
    name: "Gemini",
    zodiacSign: "gemini",
    dates: "May 21 - June 20", 
    element: "air",
    traits: ["Adaptable", "Curious", "Social", "Indecisive"],
    description: "The Twins - Represents duality, communication, and versatility.",
    stars: [
      { id: "castor", x: 25, y: 18, z: -30, magnitude: 1.6, name: "Castor" },
      { id: "pollux", x: 27, y: 16, z: -28, magnitude: 1.1, name: "Pollux" },
      { id: "alhena", x: 29, y: 14, z: -32, magnitude: 1.9, name: "Alhena" }
    ],
    connections: [[0, 1], [1, 2]]
  },
  {
    name: "Cancer",
    zodiacSign: "cancer",
    dates: "June 21 - July 22",
    element: "water", 
    traits: ["Nurturing", "Emotional", "Intuitive", "Protective"],
    description: "The Crab - Associated with home, family, and emotional depth.",
    stars: [
      { id: "altarf", x: 32, y: 20, z: -35, magnitude: 3.5, name: "Altarf" },
      { id: "acubens", x: 30, y: 22, z: -33, magnitude: 4.3, name: "Acubens" },
      { id: "asellus", x: 34, y: 18, z: -37, magnitude: 3.9, name: "Asellus Australis" }
    ],
    connections: [[0, 1], [1, 2]]
  },
  {
    name: "Leo",
    zodiacSign: "leo",
    dates: "July 23 - August 22",
    element: "fire",
    traits: ["Confident", "Generous", "Dramatic", "Loyal"],
    description: "The Lion - Represents courage, creativity, and natural leadership.",
    stars: [
      { id: "regulus", x: 38, y: 25, z: -40, magnitude: 1.4, name: "Regulus" },
      { id: "denebola", x: 42, y: 23, z: -38, magnitude: 2.1, name: "Denebola" },
      { id: "algieba", x: 36, y: 27, z: -42, magnitude: 2.6, name: "Algieba" }
    ],
    connections: [[0, 1], [0, 2], [1, 2]]
  },
  {
    name: "Virgo",
    zodiacSign: "virgo",
    dates: "August 23 - September 22",
    element: "earth",
    traits: ["Analytical", "Practical", "Helpful", "Perfectionist"],
    description: "The Maiden - Associated with precision, service, and attention to detail.",
    stars: [
      { id: "spica", x: 45, y: 28, z: -45, magnitude: 1.0, name: "Spica" },
      { id: "zavijava", x: 43, y: 30, z: -43, magnitude: 3.6, name: "Zavijava" },
      { id: "porrima", x: 47, y: 26, z: -47, magnitude: 2.7, name: "Porrima" }
    ],
    connections: [[0, 1], [0, 2]]
  },
  {
    name: "Libra",
    zodiacSign: "libra",
    dates: "September 23 - October 22",
    element: "air",
    traits: ["Diplomatic", "Balanced", "Social", "Indecisive"],
    description: "The Scales - Represents harmony, justice, and relationships.",
    stars: [
      { id: "zubenelgenubi", x: 50, y: 32, z: -50, magnitude: 2.8, name: "Zubenelgenubi" },
      { id: "zubeneschamali", x: 52, y: 30, z: -48, magnitude: 2.6, name: "Zubeneschamali" },
      { id: "brachium", x: 48, y: 34, z: -52, magnitude: 3.3, name: "Brachium" }
    ],
    connections: [[0, 1], [0, 2]]
  },
  {
    name: "Scorpio", 
    zodiacSign: "scorpio",
    dates: "October 23 - November 21",
    element: "water",
    traits: ["Intense", "Passionate", "Mysterious", "Transformative"],
    description: "The Scorpion - Associated with depth, transformation, and hidden truths.",
    stars: [
      { id: "antares", x: 55, y: 35, z: -55, magnitude: 1.1, name: "Antares" },
      { id: "shaula", x: 58, y: 33, z: -53, magnitude: 1.6, name: "Shaula" },
      { id: "sargas", x: 53, y: 37, z: -57, magnitude: 1.9, name: "Sargas" }
    ],
    connections: [[0, 1], [0, 2], [1, 2]]
  },
  {
    name: "Sagittarius",
    zodiacSign: "sagittarius", 
    dates: "November 22 - December 21",
    element: "fire",
    traits: ["Adventurous", "Optimistic", "Philosophical", "Restless"],
    description: "The Archer - Represents exploration, wisdom, and higher learning.",
    stars: [
      { id: "kaus", x: 62, y: 38, z: -60, magnitude: 1.8, name: "Kaus Australis" },
      { id: "nunki", x: 60, y: 40, z: -58, magnitude: 2.0, name: "Nunki" },
      { id: "ascella", x: 64, y: 36, z: -62, magnitude: 2.6, name: "Ascella" }
    ],
    connections: [[0, 1], [1, 2], [0, 2]]
  },
  {
    name: "Capricorn",
    zodiacSign: "capricorn",
    dates: "December 22 - January 19", 
    element: "earth",
    traits: ["Ambitious", "Disciplined", "Patient", "Traditional"],
    description: "The Goat - Associated with achievement, responsibility, and structure.",
    stars: [
      { id: "deneb", x: 68, y: 42, z: -65, magnitude: 2.9, name: "Deneb Algedi" },
      { id: "nashira", x: 66, y: 44, z: -63, magnitude: 3.7, name: "Nashira" },
      { id: "algedi", x: 70, y: 40, z: -67, magnitude: 3.6, name: "Algedi" }
    ],
    connections: [[0, 1], [0, 2]]
  },
  {
    name: "Aquarius",
    zodiacSign: "aquarius",
    dates: "January 20 - February 18",
    element: "air", 
    traits: ["Independent", "Innovative", "Humanitarian", "Detached"],
    description: "The Water Bearer - Represents innovation, friendship, and social consciousness.",
    stars: [
      { id: "sadalsuud", x: 75, y: 45, z: -70, magnitude: 2.9, name: "Sadalsuud" },
      { id: "sadalmelik", x: 73, y: 47, z: -68, magnitude: 3.0, name: "Sadalmelik" },
      { id: "sadachbia", x: 77, y: 43, z: -72, magnitude: 3.8, name: "Sadachbia" }
    ],
    connections: [[0, 1], [0, 2]]
  },
  {
    name: "Pisces",
    zodiacSign: "pisces",
    dates: "February 19 - March 20",
    element: "water",
    traits: ["Compassionate", "Artistic", "Intuitive", "Dreamy"],
    description: "The Fishes - Associated with spirituality, imagination, and empathy.",
    stars: [
      { id: "alpherg", x: 80, y: 48, z: -75, magnitude: 3.6, name: "Alpherg" },
      { id: "fumalsamakah", x: 78, y: 50, z: -73, magnitude: 4.3, name: "Fumalsamakah" },
      { id: "revati", x: 82, y: 46, z: -77, magnitude: 4.8, name: "Revati" }
    ],
    connections: [[0, 1], [1, 2]]
  }
];

export const getZodiacSign = (month: number, day: number): ConstellationData | null => {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return constellations[0]; // Aries
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return constellations[1]; // Taurus
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return constellations[2]; // Gemini
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return constellations[3]; // Cancer
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return constellations[4]; // Leo
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return constellations[5]; // Virgo
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return constellations[6]; // Libra
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return constellations[7]; // Scorpio
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return constellations[8]; // Sagittarius
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return constellations[9]; // Capricorn
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return constellations[10]; // Aquarius
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return constellations[11]; // Pisces
  return null;
};