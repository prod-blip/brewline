import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Colors, Fonts, Radius } from '../../constants/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'outline' | 'light';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
}: ButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.97, {
      damping: 15,
      stiffness: 300,
    });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 300,
    });
  };

  const buttonStyles = [
    styles.base,
    styles[variant],
    styles[`size_${size}`],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  const labelStyles = [
    styles.label,
    styles[`${variant}_label`],
    styles[`size_${size}_label`],
    disabled && styles.disabled_label,
    textStyle,
  ];

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      style={[animatedStyle, buttonStyles]}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? Colors.linen : Colors.terracotta}
        />
      ) : (
        <>
          {icon}
          <Text style={labelStyles}>{label}</Text>
        </>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 999,
    borderWidth: 2,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        userSelect: 'none',
      },
    }),
  },

  // Variants
  primary: {
    backgroundColor: Colors.terracotta,
    borderColor: Colors.terracotta,
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: Colors.mahogany,
  },
  light: {
    backgroundColor: Colors.cream,
    borderColor: Colors.cream,
  },

  // Sizes
  size_small: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  size_medium: {
    paddingHorizontal: 32,
    paddingVertical: 14,
  },
  size_large: {
    paddingHorizontal: 40,
    paddingVertical: 18,
  },

  // Labels
  label: {
    fontFamily: Fonts.bodyBold,
    letterSpacing: 0.32,
    ...Platform.select({
      web: {
        userSelect: 'none',
      },
    }),
  },
  primary_label: {
    color: Colors.linen,
  },
  outline_label: {
    color: Colors.espresso,
  },
  light_label: {
    color: Colors.espresso,
  },

  // Size labels
  size_small_label: {
    fontSize: 14,
  },
  size_medium_label: {
    fontSize: 15,
  },
  size_large_label: {
    fontSize: 16,
  },

  // Full width
  fullWidth: {
    width: '100%',
  },

  // Disabled
  disabled: {
    opacity: 0.5,
  },
  disabled_label: {
    opacity: 0.7,
  },
});
