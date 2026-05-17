import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Fonts, Spacing, Radius, Typography } from '../../constants/theme';
import { useResponsive } from '../../hooks/useResponsive';
import { Button } from '../ui/Button';
import { Tag } from '../ui/Tag';

// Checkmark SVG component
const CheckIcon = () => (
  <Text style={styles.checkIcon}>✓</Text>
);

export function Hero() {
  const router = useRouter();
  const { isMobile } = useResponsive();

  const origins = [
    'Araku Valley',
    'Chikmagalur',
    'Coorg',
    'Yercaud',
    'Bababudangiri',
    '+ rotating seasonal estates',
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.espresso, Colors.bark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Decorative overlay */}
      <View style={styles.overlay} />

      <View style={styles.content}>
        {/* Badge */}
        <View style={styles.badge}>
          <Text style={styles.badgeIcon}>☕</Text>
          <Text style={styles.badgeText}>Single-origin Indian specialty coffee</Text>
        </View>

        {/* Headline */}
        <Text style={[styles.headline, isMobile && styles.headlineMobile]}>
          Better coffee at home —{'\n'}
          <Text style={styles.headlineItalic}>without barista school.</Text>
        </Text>

        {/* Subtext */}
        <Text style={[styles.subtext, isMobile && styles.subtextMobile]}>
          A monthly subscription that sends you curated single-origin Indian beans, a brewing guide you'll actually read, and one useful accessory. Take a two-minute taste quiz and we do the rest.
        </Text>

        {/* Actions */}
        <View style={[styles.actions, isMobile && styles.actionsMobile]}>
          <Button
            label="Take the taste quiz →"
            variant="primary"
            onPress={() => router.push('/quiz/intro')}
          />
          <Button
            label="See how it works"
            variant="light"
            onPress={() => router.push('/quiz/intro')}
          />
        </View>

        {/* Trust Strip */}
        <View style={[styles.trust, isMobile && styles.trustMobile]}>
          <View style={styles.trustItem}>
            <CheckIcon />
            <Text style={styles.trustText}>Cancel anytime, no questions</Text>
          </View>
          <View style={styles.trustItem}>
            <CheckIcon />
            <Text style={styles.trustText}>First box satisfaction guarantee</Text>
          </View>
          <View style={styles.trustItem}>
            <CheckIcon />
            <Text style={styles.trustText}>Pause, skip, or swap any month</Text>
          </View>
        </View>

        {/* Origin Tags */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.origins}
        >
          {origins.map((origin, index) => (
            <Tag
              key={index}
              label={origin}
              variant="default"
              size="small"
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingTop: 140,
    paddingBottom: 80,
    paddingHorizontal: Spacing.lg,
    overflow: 'hidden',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(107, 51, 32, 0.15)',
  },
  content: {
    maxWidth: 1080,
    marginHorizontal: 'auto',
    position: 'relative',
    zIndex: 1,
  },

  // Badge
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(193, 98, 58, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(193, 98, 58, 0.4)',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
    marginBottom: 28,
  },
  badgeIcon: {
    fontSize: 14,
  },
  badgeText: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 13,
    color: Colors.ember,
    letterSpacing: 0.8,
  },

  // Headline
  headline: {
    ...Typography.displayLarge,
    color: Colors.cream,
    marginBottom: 22,
    maxWidth: 740,
  },
  headlineMobile: {
    fontSize: 36,
    lineHeight: 42,
  },
  headlineItalic: {
    fontFamily: Fonts.displayItalic,
    fontStyle: 'italic',
    color: Colors.ember,
  },

  // Subtext
  subtext: {
    ...Typography.bodyLarge,
    color: 'rgba(246, 237, 218, 0.72)',
    maxWidth: 540,
    lineHeight: 30,
    marginBottom: 38,
  },
  subtextMobile: {
    fontSize: 16,
    lineHeight: 26,
  },

  // Actions
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 56,
    flexWrap: 'wrap',
  },
  actionsMobile: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },

  // Trust Strip
  trust: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    marginBottom: 64,
    flexWrap: 'wrap',
  },
  trustMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 12,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkIcon: {
    fontSize: 16,
    color: 'rgba(246, 237, 218, 0.7)',
  },
  trustText: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: 'rgba(246, 237, 218, 0.55)',
  },

  // Origins
  origins: {
    gap: 12,
    paddingRight: Spacing.lg,
  },
});
