import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing } from '../../constants/theme';
import { Button } from '../../components/ui/Button';
import { loadProgress, clearProgress } from '../../lib/storage';

export default function QuizIntro() {
  const router = useRouter();
  const [hasProgress, setHasProgress] = useState(false);
  const [savedStep, setSavedStep] = useState(0);

  useEffect(() => {
    checkProgress();
  }, []);

  const checkProgress = async () => {
    const progress = await loadProgress();
    if (progress && progress.step > 0 && progress.step <= 7) {
      setHasProgress(true);
      setSavedStep(progress.step);
    }
  };

  const handleStartNew = async () => {
    if (hasProgress) {
      Alert.alert(
        'Start Over?',
        'This will clear your previous answers.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Start New',
            onPress: async () => {
              await clearProgress();
              router.push('/quiz/1');
            },
          },
        ]
      );
    } else {
      router.push('/quiz/1');
    }
  };

  const handleResume = () => {
    router.push(`/quiz/${savedStep}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Find your coffee profile in 2 minutes</Text>
        <Text style={styles.subtitle}>
          Seven questions. No jargon. We'll match you to the right Indian estate and the right plan.
        </Text>

        <View style={styles.actions}>
          {hasProgress ? (
            <>
              <Button
                label={`Continue from question ${savedStep} →`}
                variant="primary"
                fullWidth
                onPress={handleResume}
              />
              <Button
                label="Start over"
                variant="outline"
                fullWidth
                onPress={handleStartNew}
              />
            </>
          ) : (
            <Button
              label="Start the quiz →"
              variant="primary"
              fullWidth
              onPress={handleStartNew}
            />
          )}
        </View>

        <Text style={styles.micro}>
          No email or signup needed to see your result.
        </Text>

        <Button
          label="← Back to home"
          variant="light"
          onPress={() => router.back()}
          style={{ marginTop: 32 }}
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
    justifyContent: 'center',
    maxWidth: 560,
    marginHorizontal: 'auto',
    width: '100%',
  },
  title: {
    ...Typography.displayMedium,
    color: Colors.espresso,
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    ...Typography.bodyLarge,
    color: Colors.muted,
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: 28,
  },
  actions: {
    gap: 12,
    marginBottom: 16,
  },
  micro: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 13,
    color: Colors.muted,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
