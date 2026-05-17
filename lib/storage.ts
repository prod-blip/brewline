import AsyncStorage from '@react-native-async-storage/async-storage';
import { Answers } from '../constants/quiz';

const KEY = 'brewline-quiz-progress';

export interface QuizProgress {
  answers: Partial<Answers>;
  step: number;
  savedAt: number;
}

/**
 * Save quiz progress to AsyncStorage
 * Called immediately after each answer is selected
 */
export async function saveProgress(
  answers: Partial<Answers>,
  step: number
): Promise<void> {
  try {
    const progress: QuizProgress = {
      answers,
      step,
      savedAt: Date.now(),
    };
    await AsyncStorage.setItem(KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save quiz progress:', error);
  }
}

/**
 * Load saved quiz progress from AsyncStorage
 * Returns null if no progress exists
 */
export async function loadProgress(): Promise<QuizProgress | null> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return null;

    const progress = JSON.parse(raw) as QuizProgress;
    return progress;
  } catch (error) {
    console.error('Failed to load quiz progress:', error);
    return null;
  }
}

/**
 * Clear all quiz progress from AsyncStorage
 * Called when user starts a new quiz or completes it
 */
export async function clearProgress(): Promise<void> {
  try {
    await AsyncStorage.removeItem(KEY);
  } catch (error) {
    console.error('Failed to clear quiz progress:', error);
  }
}

/**
 * Get the current step number from saved progress
 * Returns 0 if no progress exists
 */
export async function getCurrentStep(): Promise<number> {
  const progress = await loadProgress();
  return progress?.step ?? 0;
}

/**
 * Check if quiz has been completed
 * (All 7 questions answered)
 */
export async function isQuizComplete(): Promise<boolean> {
  const progress = await loadProgress();
  if (!progress) return false;

  const answerCount = Object.keys(progress.answers).length;
  return answerCount >= 7;
}
