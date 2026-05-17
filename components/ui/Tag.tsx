import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors, Fonts, Radius } from '../../constants/theme';

export interface TagProps {
  label: string;
  variant?: 'default' | 'highlighted' | 'light';
  size?: 'small' | 'medium';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Tag({
  label,
  variant = 'default',
  size = 'medium',
  style,
  textStyle,
}: TagProps) {
  return (
    <View style={[styles.base, styles[variant], styles[`size_${size}`], style]}>
      <Text style={[styles.label, styles[`${variant}_label`], styles[`size_${size}_label`], textStyle]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: Radius.sm,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Variants
  default: {
    backgroundColor: 'rgba(246, 237, 218, 0.08)',
    borderColor: 'rgba(246, 237, 218, 0.15)',
  },
  highlighted: {
    backgroundColor: 'rgba(193, 98, 58, 0.25)',
    borderColor: 'rgba(193, 98, 58, 0.4)',
  },
  light: {
    backgroundColor: Colors.cream,
    borderColor: 'rgba(107, 51, 32, 0.1)',
  },

  // Sizes
  size_small: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  size_medium: {
    paddingHorizontal: 14,
    paddingVertical: 7,
  },

  // Labels
  label: {
    fontFamily: Fonts.bodyMedium,
    letterSpacing: 0.64,
  },
  default_label: {
    color: 'rgba(246, 237, 218, 0.6)',
  },
  highlighted_label: {
    color: Colors.ember,
  },
  light_label: {
    color: Colors.espresso,
  },

  // Size labels
  size_small_label: {
    fontSize: 11,
  },
  size_medium_label: {
    fontSize: 12.5,
  },
});
