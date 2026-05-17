import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Fonts, Spacing, Typography } from '../../constants/theme';
import { useResponsive } from '../../hooks/useResponsive';
import { Button } from '../ui/Button';

export function FinalCTA() {
  const router = useRouter();
  const { isMobile } = useResponsive();

  return (
    <View style={styles.container}>
      {/* Decorative circles */}
      <View style={styles.circle1} />
      <View style={styles.circle2} />

      <View style={styles.content}>
        <Text style={styles.label}>Ready?</Text>
        <Text style={[styles.heading, isMobile && styles.headingMobile]}>
          Your first great cup of Indian coffee is two minutes away.
        </Text>
        <Text style={styles.description}>
          Take the taste quiz. We'll match you to the right estate. Your first box ships within 48 hours — and if you don't love it, we'll make it right.
        </Text>

        <View style={[styles.actions, isMobile && styles.actionsMobile]}>
          <Button
            label="Take the taste quiz →"
            variant="light"
            onPress={() => router.push('/quiz/intro')}
          />
          <Button
            label="See plans first"
            variant="outline"
            onPress={() => router.push('/quiz/intro')}
            style={styles.outlineButton}
            textStyle={styles.outlineButtonText}
          />
        </View>

        <Text style={styles.micro}>
          No credit card needed to take the quiz
          <Text style={styles.microSeparator}> · </Text>
          First-box satisfaction guarantee
          <Text style={styles.microSeparator}> · </Text>
          Cancel anytime
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: Colors.terracotta,
    paddingVertical: Spacing.section,
    paddingHorizontal: Spacing.lg,
    overflow: 'hidden',
  },

  // Decorative Circles
  circle1: {
    position: 'absolute',
    top: -60,
    right: -60,
    width: 360,
    height: 360,
    borderRadius: 180,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  circle2: {
    position: 'absolute',
    bottom: -80,
    left: -40,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
  },

  // Content
  content: {
    maxWidth: 640,
    marginHorizontal: 'auto',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
  },
  label: {
    fontFamily: Fonts.bodyBold,
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    letterSpacing: 2.24,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  heading: {
    ...Typography.displayMedium,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  headingMobile: {
    fontSize: 30,
    lineHeight: 38,
  },
  description: {
    ...Typography.bodyLarge,
    color: 'rgba(255, 255, 255, 0.78)',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 28,
  },

  // Actions
  actions: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
    marginBottom: 24,
    flexWrap: 'wrap',
  },
  actionsMobile: {
    flexDirection: 'column',
    width: '100%',
  },
  outlineButton: {
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  outlineButtonText: {
    color: '#fff',
  },

  // Micro Copy
  micro: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.55)',
    textAlign: 'center',
  },
  microSeparator: {
    marginHorizontal: 8,
  },
});
