import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Fonts, Spacing, Typography } from '../../constants/theme';
import { useResponsive } from '../../hooks/useResponsive';

const steps = [
  {
    number: '01',
    title: 'Take the taste quiz',
    description:
      `Tell us what you drink now, how you brew it, and how adventurous you feel. Takes two minutes. No specialty knowledge needed — we'll ask things like "do you like your chai strong or mild," not "describe your preferred extraction ratio."`,
  },
  {
    number: '02',
    title: 'We match you to an estate',
    description:
      'Our curation team matches your profile to a single-origin Indian estate. Beans are roasted to order and shipped within 48 hours. Every box includes tasting notes and a one-page brewing guide — no barista vocabulary required.',
  },
  {
    number: '03',
    title: 'Rate it. We improve.',
    description:
      'After each box, tell us what you thought with one tap. Loved the brightness? We dial into more of that. Found it too bitter? We adjust. Your next box is always better than your last.',
  },
];

export function HowItWorks() {
  const { isMobile, isTablet } = useResponsive();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.espresso, Colors.bark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.overlay} />

      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.label}>How it works</Text>
          <Text style={[styles.heading, isMobile && styles.headingMobile]}>
            Three steps from order to your first cup.
          </Text>
          <Text style={styles.intro}>
            We handle everything between the estate and your kitchen.
          </Text>
        </View>

        {/* Steps */}
        <View style={[styles.steps, isMobile && styles.stepsMobile]}>
          {steps.map((step, index) => (
            <View key={index} style={styles.step}>
              {/* Divider (not on first step, only on tablet+) */}
              {index > 0 && !isMobile && <View style={styles.divider} />}

              <Text style={styles.stepNumber}>{step.number}</Text>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepDescription}>{step.description}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingVertical: Spacing.section,
    paddingHorizontal: Spacing.lg,
    overflow: 'hidden',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(193, 98, 58, 0.05)',
  },
  content: {
    maxWidth: 1080,
    marginHorizontal: 'auto',
    position: 'relative',
    zIndex: 1,
  },

  // Header
  header: {
    maxWidth: 560,
    marginBottom: 64,
  },
  label: {
    fontFamily: Fonts.bodyBold,
    fontSize: 12,
    color: Colors.ember,
    letterSpacing: 2.24,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  heading: {
    ...Typography.displayMedium,
    color: Colors.cream,
    marginBottom: 16,
  },
  headingMobile: {
    fontSize: 28,
    lineHeight: 34,
  },
  intro: {
    ...Typography.bodyMedium,
    color: 'rgba(246, 237, 218, 0.65)',
  },

  // Steps
  steps: {
    flexDirection: 'row',
    gap: 0,
  },
  stepsMobile: {
    flexDirection: 'column',
  },
  step: {
    flex: 1,
    paddingRight: 24,
    position: 'relative',
  },
  divider: {
    position: 'absolute',
    left: 0,
    top: 40,
    width: 1,
    height: '60%',
    backgroundColor: 'rgba(246, 237, 218, 0.12)',
  },

  // Step Content
  stepNumber: {
    fontFamily: Fonts.display,
    fontSize: 56,
    fontWeight: '700',
    color: 'rgba(193, 98, 58, 0.3)',
    lineHeight: 56,
    marginBottom: 16,
  },
  stepTitle: {
    ...Typography.headingSmall,
    color: Colors.cream,
    marginBottom: 10,
  },
  stepDescription: {
    fontFamily: Fonts.body,
    fontSize: 14.5,
    color: 'rgba(246, 237, 218, 0.62)',
    lineHeight: 24,
  },
});
