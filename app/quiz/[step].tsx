import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors, Fonts, Spacing } from '../../constants/theme';
import { ProgressBar } from '../../components/quiz/ProgressBar';
import { QuestionCard } from '../../components/quiz/QuestionCard';
import { QUIZ_QUESTIONS } from '../../constants/quiz';
import { loadProgress, saveProgress } from '../../lib/storage';
import type { Answers } from '../../constants/quiz';

export default function QuizStepScreen() {
  const { step } = useLocalSearchParams<{ step: string }>();
  const router = useRouter();
  const stepNumber = parseInt(step, 10);

  // Find the question for this step
  const question = QUIZ_QUESTIONS.find((q) => q.step === stepNumber);

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [allAnswers, setAllAnswers] = useState<Partial<Answers>>({});

  // Load previous answers on mount
  useEffect(() => {
    loadPreviousAnswers();
  }, []);

  const loadPreviousAnswers = async () => {
    const progress = await loadProgress();
    if (progress) {
      setAllAnswers(progress.answers);
      // Set selected answer if exists for this question
      if (question && progress.answers[question.id as keyof Answers]) {
        setSelectedAnswer(progress.answers[question.id as keyof Answers] as string);
      }
    }
  };

  // Redirect if invalid step
  if (!question || stepNumber < 1 || stepNumber > 7) {
    router.replace('/quiz/intro');
    return null;
  }

  const handleSelectOption = async (optionId: string) => {
    setSelectedAnswer(optionId);

    // Update answers object
    const updatedAnswers = {
      ...allAnswers,
      [question.id]: optionId,
    };
    setAllAnswers(updatedAnswers);

    // Save to storage immediately
    await saveProgress(updatedAnswers, stepNumber);

    // Auto-advance after 350ms
    setTimeout(() => {
      if (stepNumber === 7) {
        // Last question - go to loading screen
        router.push('/quiz/loading');
      } else {
        // Go to next question
        router.push(`/quiz/${stepNumber + 1}`);
      }
    }, 350);
  };

  const handleBack = () => {
    if (stepNumber === 1) {
      router.back();
    } else {
      router.push(`/quiz/${stepNumber - 1}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Back Button */}
        {stepNumber > 1 && (
          <Pressable onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backText}>← Back</Text>
          </Pressable>
        )}

        {/* Progress Bar */}
        <ProgressBar current={stepNumber} total={7} />

        {/* Question Label */}
        <Text style={styles.questionLabel}>QUESTION {stepNumber} OF 7</Text>

        {/* Question Card */}
        <QuestionCard
          question={question}
          selectedAnswer={selectedAnswer}
          onSelectOption={handleSelectOption}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.parchment,
  },
  content: {
    flex: 1,
    padding: Spacing.xl,
    maxWidth: 800,
    marginHorizontal: 'auto',
    width: '100%',
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  backText: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 14,
    color: Colors.muted,
  },
  questionLabel: {
    fontFamily: Fonts.bodyBold,
    fontSize: 12,
    color: Colors.terracotta,
    letterSpacing: 2.24,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
});
