import React, { useEffect } from 'react';
import { Pressable, Text, StyleSheet, Platform } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Colors, Fonts, Radius } from '../../constants/theme';
import type { QuizOption } from '../../constants/quiz';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface OptionCardProps {
  option: QuizOption;
  selected: boolean;
  onPress: () => void;
}

export function OptionCard({ option, selected, onPress }: OptionCardProps) {
  const scale = useSharedValue(1);
  const borderOpacity = useSharedValue(selected ? 1 : 0);
  const bgOpacity = useSharedValue(selected ? 1 : 0);

  useEffect(() => {
    scale.value = withSpring(selected ? 1.02 : 1, {
      damping: 15,
      stiffness: 300,
    });
    borderOpacity.value = withTiming(selected ? 1 : 0, { duration: 200 });
    bgOpacity.value = withTiming(selected ? 1 : 0, { duration: 200 });
  }, [selected]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    borderColor: `rgba(193, 98, 58, ${borderOpacity.value})`,
    backgroundColor: `rgba(246, 237, 218, ${bgOpacity.value * 0.5})`,
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.97, {
      damping: 15,
      stiffness: 300,
    });
  };

  const handlePressOut = () => {
    scale.value = withSpring(selected ? 1.02 : 1, {
      damping: 15,
      stiffness: 300,
    });
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.card, animatedStyle]}
    >
      <Text style={styles.icon}>{option.icon}</Text>
      <Text style={styles.label}>{option.label}</Text>
      {option.description && (
        <Text style={styles.description}>{option.description}</Text>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.linen,
    borderRadius: Radius.lg,
    borderWidth: 2,
    borderColor: Colors.linen,
    padding: 24,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        userSelect: 'none',
      },
    }),
  },
  icon: {
    fontSize: 32,
    marginBottom: 12,
  },
  label: {
    fontFamily: Fonts.bodyBold,
    fontSize: 16,
    color: Colors.espresso,
    marginBottom: 4,
  },
  description: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.muted,
    lineHeight: 20,
  },
});
