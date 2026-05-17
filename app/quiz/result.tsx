import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Fonts, Spacing, Radius, Typography } from '../../constants/theme';
import { Button } from '../../components/ui/Button';
import { Tag } from '../../components/ui/Tag';
import { loadProgress, clearProgress } from '../../lib/storage';
import { match } from '../../lib/matcher';
import type { MatchResult } from '../../lib/matcher';
import type { Answers } from '../../constants/quiz';

export default function ResultScreen() {
  const router = useRouter();
  const [result, setResult] = useState<MatchResult | null>(null);

  // Animation values
  const profileOpacity = useSharedValue(0);
  const profileTranslateY = useSharedValue(20);
  const planOpacity = useSharedValue(0);
  const planTranslateY = useSharedValue(20);
  const originsOpacity = useSharedValue(0);
  const originsTranslateY = useSharedValue(20);
  const accessoryOpacity = useSharedValue(0);
  const accessoryTranslateY = useSharedValue(20);

  useEffect(() => {
    loadResult();
  }, []);

  useEffect(() => {
    if (result) {
      // Staggered fade-up animations
      profileOpacity.value = withTiming(1, { duration: 600 });
      profileTranslateY.value = withTiming(0, { duration: 600 });

      planOpacity.value = withDelay(150, withTiming(1, { duration: 600 }));
      planTranslateY.value = withDelay(150, withTiming(0, { duration: 600 }));

      originsOpacity.value = withDelay(300, withTiming(1, { duration: 600 }));
      originsTranslateY.value = withDelay(300, withTiming(0, { duration: 600 }));

      accessoryOpacity.value = withDelay(450, withTiming(1, { duration: 600 }));
      accessoryTranslateY.value = withDelay(450, withTiming(0, { duration: 600 }));
    }
  }, [result]);

  const loadResult = async () => {
    const progress = await loadProgress();
    if (!progress || Object.keys(progress.answers).length < 7) {
      // Not enough answers - redirect to intro
      Alert.alert(
        'Incomplete Quiz',
        'Please complete all 7 questions first.',
        [{ text: 'OK', onPress: () => router.replace('/quiz/intro') }]
      );
      return;
    }

    // Generate recommendation
    const recommendation = match(progress.answers as Answers);
    setResult(recommendation);
  };

  const handleRetake = async () => {
    await clearProgress();
    router.replace('/quiz/intro');
  };

  const profileStyle = useAnimatedStyle(() => ({
    opacity: profileOpacity.value,
    transform: [{ translateY: profileTranslateY.value }],
  }));

  const planStyle = useAnimatedStyle(() => ({
    opacity: planOpacity.value,
    transform: [{ translateY: planTranslateY.value }],
  }));

  const originsStyle = useAnimatedStyle(() => ({
    opacity: originsOpacity.value,
    transform: [{ translateY: originsTranslateY.value }],
  }));

  const accessoryStyle = useAnimatedStyle(() => ({
    opacity: accessoryOpacity.value,
    transform: [{ translateY: accessoryTranslateY.value }],
  }));

  if (!result) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading your results...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <LinearGradient
          colors={[Colors.terracotta, Colors.mahogany]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <Animated.View style={[styles.profileContent, profileStyle]}>
          <Text style={styles.profileEyebrow}>YOUR TASTE PROFILE</Text>
          <Text style={styles.profileName}>{result.profileName}</Text>
          <Text style={styles.profileDescription}>{result.profileDescription}</Text>
        </Animated.View>
      </View>

      <View style={styles.recommendations}>
        {/* Recommended Plan */}
        <Animated.View style={[styles.card, planStyle]}>
          <Text style={styles.cardLabel}>YOUR RECOMMENDED PLAN</Text>
          <Text style={styles.cardHeading}>
            {result.plan} • {result.planPrice}
          </Text>
          <Text style={styles.cardBody}>{result.planReason}</Text>

          <Button
            label={`Start my ${result.plan} plan →`}
            variant="primary"
            fullWidth
            onPress={() => router.push(`/signup?plan=${encodeURIComponent(result.plan)}`)}
            style={{ marginTop: 24 }}
          />

          {result.upgradeNudge && (
            <View style={styles.nudge}>
              <Text style={styles.nudgeIcon}>💡</Text>
              <Text style={styles.nudgeText}>{result.upgradeNudge}</Text>
            </View>
          )}
        </Animated.View>

        {/* Matched Origins */}
        <Animated.View style={[styles.card, originsStyle]}>
          <Text style={styles.cardLabel}>YOUR FIRST-BOX ORIGINS</Text>
          <View style={styles.originsTags}>
            {result.origins.map((origin, index) => (
              <Tag
                key={index}
                label={origin}
                variant="highlighted"
                size="medium"
              />
            ))}
          </View>
          <Text style={styles.cardBody}>
            These Indian estates match your taste profile. Each comes with a brewing guide and origin story.
          </Text>
        </Animated.View>

        {/* First Accessory */}
        <Animated.View style={[styles.card, accessoryStyle]}>
          <Text style={styles.cardLabel}>YOUR FIRST-BOX ACCESSORY</Text>
          <Text style={styles.accessoryIcon}>🎁</Text>
          <Text style={styles.cardBody}>{result.firstAccessory}</Text>
        </Animated.View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <Button
            label="Retake the quiz"
            variant="outline"
            fullWidth
            onPress={handleRetake}
          />
          <Text style={styles.actionHint}>
            Want to see different recommendations? Take the quiz again.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.parchment,
  },
  scrollContent: {
    paddingBottom: 64,
  },
  loadingText: {
    ...Typography.bodyLarge,
    color: Colors.muted,
    textAlign: 'center',
    padding: 32,
  },

  // Profile Header
  profileHeader: {
    paddingVertical: Spacing.section,
    paddingHorizontal: Spacing.xl,
    position: 'relative',
    overflow: 'hidden',
  },
  profileContent: {
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
  },
  profileEyebrow: {
    fontFamily: Fonts.bodyBold,
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    letterSpacing: 2.24,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  profileName: {
    ...Typography.displayLarge,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  profileDescription: {
    ...Typography.bodyLarge,
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
    maxWidth: 560,
    lineHeight: 28,
  },

  // Recommendations
  recommendations: {
    paddingHorizontal: Spacing.xl,
    gap: 24,
    maxWidth: 640,
    marginHorizontal: 'auto',
    width: '100%',
  },

  // Card
  card: {
    backgroundColor: Colors.linen,
    borderRadius: Radius.lg,
    padding: 32,
    borderWidth: 1,
    borderColor: 'rgba(107, 51, 32, 0.1)',
  },
  cardLabel: {
    fontFamily: Fonts.bodyBold,
    fontSize: 12,
    color: Colors.terracotta,
    letterSpacing: 2.24,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  cardHeading: {
    ...Typography.headingLarge,
    color: Colors.espresso,
    marginBottom: 12,
  },
  cardBody: {
    fontFamily: Fonts.body,
    fontSize: 15,
    color: Colors.muted,
    lineHeight: 24,
  },

  // Origins
  originsTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },

  // Accessory
  accessoryIcon: {
    fontSize: 48,
    marginBottom: 16,
  },

  // Nudge
  nudge: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: 'rgba(201, 145, 58, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(201, 145, 58, 0.3)',
    borderRadius: Radius.md,
    padding: 16,
    marginTop: 16,
  },
  nudgeIcon: {
    fontSize: 20,
  },
  nudgeText: {
    flex: 1,
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.charcoal,
    lineHeight: 20,
  },

  // Actions
  actions: {
    marginTop: 16,
    alignItems: 'center',
  },
  actionHint: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: Colors.muted,
    textAlign: 'center',
    marginTop: 12,
  },
});
