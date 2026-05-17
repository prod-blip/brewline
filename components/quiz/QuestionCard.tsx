import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, Typography } from '../../constants/theme';
import { useResponsive } from '../../hooks/useResponsive';
import { OptionCard } from './OptionCard';
import type { QuizQuestion } from '../../constants/quiz';

interface QuestionCardProps {
  question: QuizQuestion;
  selectedAnswer: string | null;
  onSelectOption: (optionId: string) => void;
}

export function QuestionCard({
  question,
  selectedAnswer,
  onSelectOption,
}: QuestionCardProps) {
  const { isMobile } = useResponsive();

  return (
    <View style={styles.container}>
      {/* Question */}
      <Text style={[styles.question, isMobile && styles.questionMobile]}>
        {question.question}
      </Text>

      {/* Helper Text */}
      {question.helper && (
        <Text style={styles.helper}>{question.helper}</Text>
      )}

      {/* Options */}
      <View style={[styles.options, isMobile && styles.optionsMobile]}>
        {question.options.map((option) => (
          <OptionCard
            key={option.id}
            option={option}
            selected={selectedAnswer === option.id}
            onPress={() => onSelectOption(option.id)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  question: {
    ...Typography.displayMedium,
    color: Colors.espresso,
    marginBottom: 12,
  },
  questionMobile: {
    fontSize: 28,
    lineHeight: 34,
  },
  helper: {
    fontFamily: Fonts.displayItalic,
    fontStyle: 'italic',
    fontSize: 16,
    color: Colors.muted,
    marginBottom: 32,
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  optionsMobile: {
    flexDirection: 'column',
  },
});
