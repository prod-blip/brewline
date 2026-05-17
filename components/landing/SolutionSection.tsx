import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, Spacing, Radius, Typography } from '../../constants/theme';
import { useResponsive } from '../../hooks/useResponsive';

const solutions = [
  {
    icon: '🧪',
    title: 'A quiz that actually learns your taste',
    description:
      'Two minutes. Seven questions. No jargon. We match you to Indian estates that suit your palate — and refine the match every month based on your feedback.',
    bgColor: 'rgba(193, 98, 58, 0.12)',
  },
  {
    icon: '📦',
    title: 'Beans + guide + one useful thing',
    description:
      '250g of freshly roasted single-origin beans, a brewing guide written in plain language, and one accessory that makes your home setup a little better every month.',
    bgColor: 'rgba(201, 145, 58, 0.12)',
  },
  {
    icon: '🌱',
    title: `Indian estates you've never heard of — yet`,
    description:
      'Araku. Chikmagalur. Yercaud. We partner directly with small Indian estates — better traceability, better freshness, and a story worth telling your friends.',
    bgColor: 'rgba(110, 126, 96, 0.12)',
  },
];

export function SolutionSection() {
  const { isMobile } = useResponsive();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.label}>The BrewLine way</Text>
          <Text style={[styles.heading, isMobile && styles.headingMobile]}>
            Curated for you. Explained to you. Delivered to you.
          </Text>
          <Text style={styles.intro}>
            Every box is matched to your taste profile and comes with everything you need to actually enjoy it — not just own it.
          </Text>
        </View>

        {/* Cards */}
        <View style={[styles.cards, isMobile && styles.cardsMobile]}>
          {solutions.map((solution, index) => (
            <View key={index} style={styles.card}>
              <View style={[styles.iconContainer, { backgroundColor: solution.bgColor }]}>
                <Text style={styles.icon}>{solution.icon}</Text>
              </View>
              <Text style={styles.cardTitle}>{solution.title}</Text>
              <Text style={styles.cardDescription}>{solution.description}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cream,
    paddingVertical: Spacing.section,
    paddingHorizontal: Spacing.lg,
  },
  content: {
    maxWidth: 1080,
    marginHorizontal: 'auto',
  },

  // Header
  header: {
    maxWidth: 620,
    marginBottom: 56,
  },
  label: {
    fontFamily: Fonts.bodyBold,
    fontSize: 12,
    color: Colors.terracotta,
    letterSpacing: 2.24,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  heading: {
    ...Typography.displayMedium,
    color: Colors.espresso,
    marginBottom: 16,
  },
  headingMobile: {
    fontSize: 28,
    lineHeight: 34,
  },
  intro: {
    ...Typography.bodyLarge,
    color: Colors.muted,
  },

  // Cards
  cards: {
    flexDirection: 'row',
    gap: 24,
  },
  cardsMobile: {
    flexDirection: 'column',
  },
  card: {
    flex: 1,
    backgroundColor: Colors.parchment,
    borderRadius: Radius.lg,
    padding: 32,
    borderWidth: 1,
    borderColor: 'rgba(107, 51, 32, 0.1)',
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: Radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    fontSize: 24,
  },
  cardTitle: {
    ...Typography.headingSmall,
    color: Colors.espresso,
    marginBottom: 12,
  },
  cardDescription: {
    fontFamily: Fonts.body,
    fontSize: 14.5,
    color: Colors.muted,
    lineHeight: 23,
  },
});
