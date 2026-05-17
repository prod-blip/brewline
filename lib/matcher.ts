// Recommendation engine implementation from spec lines 242-366

import type { Answers } from '../constants/quiz';

export type Plan = 'Discovery' | 'Connoisseur' | 'Bean Hunter';

export interface MatchResult {
  plan: Plan;
  planPrice: string;
  planReason: string;
  profileName: string;
  profileDescription: string;
  origins: string[];
  firstAccessory: string;
  upgradeNudge?: string;
}

/**
 * Main matching function - takes quiz answers and returns recommendation
 */
export function match(a: Answers): MatchResult {
  const plan = matchPlan(a);
  const profile = matchProfile(a);
  const origins = matchOrigins(a);
  const firstAccessory = matchAccessory(a.gear);
  const upgradeNudge = nudge(a);

  return {
    plan,
    planPrice: planPrice(plan),
    planReason: planReason(plan, a),
    profileName: profile.name,
    profileDescription: profile.description,
    origins,
    firstAccessory,
    upgradeNudge,
  };
}

// ─── Plan Matching ───

function matchPlan(a: Answers): Plan {
  if (a.budget === 'discovery') return 'Discovery';
  if (a.budget === 'connoisseur') return 'Connoisseur';
  return 'Bean Hunter';
}

function planPrice(p: Plan): string {
  return p === 'Discovery' ? '₹599/month'
    : p === 'Connoisseur' ? '₹1,299/month'
    : '₹2,499/month';
}

function planReason(p: Plan, a: Answers): string {
  if (p === 'Discovery')
    return "Perfect entry point. Low commitment, high learning, easy to cancel if it's not for you.";
  if (p === 'Connoisseur')
    return "Two origins a month gives you contrast — you'll start identifying what you actually like, not just what you tolerate.";
  return "You want the rare stuff and the deep context. Bean Hunter is built for people exactly like you.";
}

// Nudge: if budget is Discovery but they drink 3+ cups/day, suggest Connoisseur
function nudge(a: Answers): string | undefined {
  if (a.budget === 'discovery' && a.volume === 'high')
    return "Heads up: 250g/month might run dry if you're a multi-cup drinker. Connoisseur (2 origins, 500g) might fit better — you can always start with Discovery and upgrade.";
  return undefined;
}

// ─── Profile Matching ───

function matchProfile(a: Answers): { name: string; description: string } {
  const taste = a.taste;
  const adventure = a.adventure;

  if (taste === 'bold' && adventure === 'low')
    return {
      name: 'The Steady Drinker',
      description: "You want strength and consistency, not surprises. We've got estates that deliver a reliable, bold cup every morning — no guessing games.",
    };

  if (taste === 'bold')
    return {
      name: 'The Bold Explorer',
      description: "You like coffee that announces itself. We'll send you full-bodied Indian origins that punch above their weight — dark chocolate, smoke, earth.",
    };

  if (taste === 'smooth')
    return {
      name: 'The Balanced Sipper',
      description: "You're drawn to coffees that play well — chocolatey, nutty, no rough edges. India does these beautifully, and you'll know within one cup why.",
    };

  if (taste === 'bright' && adventure === 'high')
    return {
      name: 'The Bright Seeker',
      description: "You want coffee that surprises you. We'll send you the floral, fruity, tea-like origins most people skip — Araku and Yercaud are about to change your week.",
    };

  if (taste === 'bright')
    return {
      name: 'The Curious Palette',
      description: "You like a little brightness in your cup. We'll ease you into fruit-forward Indian coffee with origins that are interesting but never weird.",
    };

  // Default for 'open' taste or other combinations
  return {
    name: 'The Open Discoverer',
    description: "You're here to learn what you like. We'll send a varied selection across our first three boxes, then dial in based on what you rate highest.",
  };
}

// ─── Origins Matching ───

function matchOrigins(a: Answers): string[] {
  if (a.taste === 'bold') return ['Coorg', 'Bababudangiri'];
  if (a.taste === 'smooth') return ['Chikmagalur', 'Wayanad'];
  if (a.taste === 'bright') return ['Araku Valley', 'Yercaud'];
  return ['Chikmagalur', 'Araku Valley', 'Coorg'];
}

// ─── Accessory Matching ───

function matchAccessory(gear: Answers['gear']): string {
  switch (gear) {
    case 'none':
      return 'A starter pour-over dripper + 50 filter papers — so you can brew your first box the day it arrives';
    case 'filter':
      return 'A precision burr-grind sample tuned for your South Indian filter';
    case 'immersion':
      return 'A calibrated bamboo scoop sized for your gear + a grind chart';
    case 'pourover':
      return 'Premium V60 filter papers + a brew-ratio reference card';
    case 'espresso':
      return 'A puck screen + dosing funnel — sized for 58mm portafilters';
    default:
      return 'A starter pour-over dripper + 50 filter papers';
  }
}
