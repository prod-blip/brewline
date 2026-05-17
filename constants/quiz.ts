// Quiz data structure from spec lines 172-237

export interface QuizOption {
  id: string;
  label: string;
  value: string;
  icon: string;
  description?: string;
}

export interface QuizQuestion {
  id: string;
  step: number;
  type: 'single-choice';
  question: string;
  helper?: string;
  options: QuizOption[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Q1 - Starting Point
  {
    id: 'level',
    step: 1,
    type: 'single-choice',
    question: "What's your coffee starting point?",
    helper: "Where you are right now, not where you want to be.",
    options: [
      {
        id: 'beginner',
        label: 'Mostly instant (Nescafe, Bru, Sunrise)',
        value: 'beginner',
        icon: '☕',
      },
      {
        id: 'filter',
        label: 'South Indian filter coffee',
        value: 'filter',
        icon: '🫖',
      },
      {
        id: 'dabbler',
        label: 'Café-bought specialty (Blue Tokai, Third Wave, Starbucks)',
        value: 'dabbler',
        icon: '🏪',
      },
      {
        id: 'open',
        label: "I switch around / not sure",
        value: 'open',
        icon: '🤷',
      },
    ],
  },

  // Q2 - How do you drink it?
  {
    id: 'style',
    step: 2,
    type: 'single-choice',
    question: 'How do you usually drink it?',
    options: [
      {
        id: 'black',
        label: 'Black, or with very little milk',
        value: 'black',
        icon: '🖤',
      },
      {
        id: 'milky',
        label: 'With milk and sugar, chai-style',
        value: 'milky',
        icon: '🥛',
      },
      {
        id: 'cold',
        label: 'Cold brew or iced',
        value: 'cold',
        icon: '🧊',
      },
      {
        id: 'open',
        label: 'Still figuring it out',
        value: 'open',
        icon: '🤔',
      },
    ],
  },

  // Q3 - Brewing Gear
  {
    id: 'gear',
    step: 3,
    type: 'single-choice',
    question: 'What do you brew with at home?',
    helper: "If you've ever wanted to buy fancy equipment but didn't — say so.",
    options: [
      {
        id: 'none',
        label: 'Just hot water and a spoon',
        value: 'none',
        icon: '🥄',
      },
      {
        id: 'filter',
        label: 'South Indian filter',
        value: 'filter',
        icon: '🫖',
      },
      {
        id: 'immersion',
        label: 'French press / Moka pot / AeroPress',
        value: 'immersion',
        icon: '⚙️',
      },
      {
        id: 'pourover',
        label: 'Pour-over / V60 / Chemex',
        value: 'pourover',
        icon: '💧',
      },
      {
        id: 'espresso',
        label: 'Espresso machine',
        value: 'espresso',
        icon: '🤖',
      },
    ],
  },

  // Q4 - Flavor Preferences
  {
    id: 'taste',
    step: 4,
    type: 'single-choice',
    question: 'What flavors pull you in?',
    helper: "Pick what sounds delicious, not what sounds sophisticated.",
    options: [
      {
        id: 'bold',
        label: 'Strong, bold, dark-chocolate energy',
        value: 'bold',
        icon: '🍫',
      },
      {
        id: 'smooth',
        label: 'Smooth, nutty, chocolatey, balanced',
        value: 'smooth',
        icon: '🥜',
      },
      {
        id: 'bright',
        label: 'Bright, fruity, tea-like',
        value: 'bright',
        icon: '🍓',
      },
      {
        id: 'open',
        label: 'Surprise me — I want to try everything',
        value: 'open',
        icon: '✨',
      },
    ],
  },

  // Q5 - Adventure Level
  {
    id: 'adventure',
    step: 5,
    type: 'single-choice',
    question: 'How adventurous are you feeling?',
    options: [
      {
        id: 'low',
        label: 'Play it safe — start me with crowd favorites',
        value: 'low',
        icon: '🛡️',
      },
      {
        id: 'mid',
        label: "I'll try anything once",
        value: 'mid',
        icon: '🌍',
      },
      {
        id: 'high',
        label: 'Send me the weird stuff — micro-lots, experimentals',
        value: 'high',
        icon: '🚀',
      },
    ],
  },

  // Q6 - Volume
  {
    id: 'volume',
    step: 6,
    type: 'single-choice',
    question: 'How much coffee do you drink?',
    options: [
      {
        id: 'low',
        label: '1 cup a day or less',
        value: 'low',
        icon: '☕',
      },
      {
        id: 'mid',
        label: '2–3 cups a day',
        value: 'mid',
        icon: '☕☕',
      },
      {
        id: 'high',
        label: 'Multi-cup person, all day',
        value: 'high',
        icon: '☕☕☕',
      },
    ],
  },

  // Q7 - Budget
  {
    id: 'budget',
    step: 7,
    type: 'single-choice',
    question: 'What feels like a comfortable monthly spend?',
    helper: "Honest answer here — you can always upgrade later.",
    options: [
      {
        id: 'discovery',
        label: 'Under ₹700 — let me dip a toe',
        value: 'discovery',
        icon: '💰',
      },
      {
        id: 'connoisseur',
        label: '₹1,000–1,500 — I\'m ready to commit',
        value: 'connoisseur',
        icon: '💰💰',
      },
      {
        id: 'hunter',
        label: '₹2,000+ — give me the good stuff',
        value: 'hunter',
        icon: '💰💰💰',
      },
    ],
  },
];

// Type for all quiz answers
export interface Answers {
  level?: 'beginner' | 'filter' | 'dabbler' | 'open';
  style?: 'black' | 'milky' | 'cold' | 'open';
  gear?: 'none' | 'filter' | 'immersion' | 'pourover' | 'espresso';
  taste?: 'bold' | 'smooth' | 'bright' | 'open';
  adventure?: 'low' | 'mid' | 'high';
  volume?: 'low' | 'mid' | 'high';
  budget?: 'discovery' | 'connoisseur' | 'hunter';
}
