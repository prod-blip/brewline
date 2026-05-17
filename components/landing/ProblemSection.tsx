import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Fonts, Spacing, Radius, Typography } from '../../constants/theme';
import { useResponsive } from '../../hooks/useResponsive';

const painPoints = [
  {
    icon: '😤',
    title: 'Too much choice, zero guidance',
    description:
      'Washed or natural? Light or medium roast? Ethiopian or Coorg? The jargon wall is real, and nobody wants to Google for 30 minutes before their morning cup.',
  },
  {
    icon: '💸',
    title: 'Subscriptions feel like a trap',
    description:
      '"I don\'t want a year of beans I won\'t drink." One bad box and you\'ve paid ₹1,200 to feel guilty about a bag of fancy coffee gathering dust.',
  },
  {
    icon: '🤷',
    title: 'Generic brands, no real education',
    description:
      'Most specialty brands sell beans. They don\'t tell you what to do with them — or what actually makes Indian single-origin special.',
  },
];

export function ProblemSection() {
  const { isMobile } = useResponsive();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={[styles.grid, isMobile && styles.gridMobile]}>
          {/* Visual Card */}
          <View style={styles.visualCard}>
            <LinearGradient
              colors={[Colors.bark, Colors.espresso]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.visualOverlay} />
            <Text style={styles.mugIcon}>☕</Text>
            <Text style={styles.quote}>
              "I bought Blue Tokai 3 months ago. Still sitting there."
            </Text>
          </View>

          {/* Problem Text */}
          <View style={styles.textSection}>
            <Text style={styles.label}>Sound familiar?</Text>
            <Text style={[styles.heading, isMobile && styles.headingMobile]}>
              You want better coffee. The category makes it hard.
            </Text>
            <Text style={styles.intro}>
              You've graduated from Nescafe in your head — but every attempt to actually upgrade runs into a wall.
            </Text>

            {/* Pain Points */}
            <View style={styles.painList}>
              {painPoints.map((point, index) => (
                <View key={index} style={styles.painItem}>
                  <Text style={styles.painIcon}>{point.icon}</Text>
                  <View style={styles.painContent}>
                    <Text style={styles.painTitle}>{point.title}</Text>
                    <Text style={styles.painDescription}>{point.description}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.linen,
    paddingVertical: Spacing.section,
    paddingHorizontal: Spacing.lg,
  },
  content: {
    maxWidth: 1080,
    marginHorizontal: 'auto',
  },
  grid: {
    flexDirection: 'row',
    gap: 64,
    alignItems: 'center',
  },
  gridMobile: {
    flexDirection: 'column',
    gap: 40,
  },

  // Visual Card
  visualCard: {
    flex: 1,
    aspectRatio: 4 / 3,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    position: 'relative',
  },
  visualOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(193, 98, 58, 0.15)',
  },
  mugIcon: {
    fontSize: 64,
    marginBottom: 16,
    zIndex: 1,
  },
  quote: {
    fontFamily: Fonts.displayItalic,
    fontStyle: 'italic',
    fontSize: 17,
    color: 'rgba(246, 237, 218, 0.75)',
    textAlign: 'center',
    maxWidth: 240,
    lineHeight: 25,
    zIndex: 1,
  },

  // Text Section
  textSection: {
    flex: 1,
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
    marginBottom: 20,
  },
  headingMobile: {
    fontSize: 28,
    lineHeight: 34,
  },
  intro: {
    ...Typography.bodyMedium,
    color: Colors.muted,
    marginBottom: 32,
  },

  // Pain Points
  painList: {
    gap: 16,
  },
  painItem: {
    flexDirection: 'row',
    gap: 16,
    backgroundColor: Colors.cream,
    borderRadius: Radius.md,
    padding: 16,
    borderLeftWidth: 3,
    borderLeftColor: Colors.terracotta,
  },
  painIcon: {
    fontSize: 18,
    marginTop: 2,
  },
  painContent: {
    flex: 1,
  },
  painTitle: {
    fontFamily: Fonts.bodyBold,
    fontSize: 15,
    color: Colors.espresso,
    marginBottom: 4,
  },
  painDescription: {
    fontFamily: Fonts.body,
    fontSize: 14.5,
    color: Colors.charcoal,
    lineHeight: 22,
  },
});
