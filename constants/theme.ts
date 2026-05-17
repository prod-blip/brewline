// Design tokens extracted from brewline-landing.html
// Source: HTML :root CSS variables (lines 15-38)

export const Colors = {
  espresso:   '#1E110A',
  bark:       '#3E1F0E',
  mahogany:   '#6B3320',
  terracotta: '#C1623A',
  ember:      '#E07040',
  gold:       '#C9913A',
  cream:      '#F6EDDA',
  parchment:  '#FAF5EA',
  linen:      '#FDF9F2',
  sage:       '#6E7E60',
  sageLight:  '#9EAD8E',
  charcoal:   '#2A2118',
  muted:      '#7A6A5A',
  white:      '#FFFFFF',
} as const;

export const Fonts = {
  display:       'PlayfairDisplay_700Bold',
  displayItalic: 'PlayfairDisplay_600SemiBold_Italic',
  body:          'DMSans_400Regular',
  bodyMedium:    'DMSans_500Medium',
  bodyBold:      'DMSans_600SemiBold',
} as const;

export const Radius = {
  sm: 6,
  md: 14,
  lg: 24,
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  section: 64,
} as const;

export const Breakpoints = {
  mobile: 0,
  tablet: 720,
  desktop: 1024,
} as const;

// Typography scales for different screen sizes
export const Typography = {
  displayLarge: {
    fontSize: 56,
    lineHeight: 62,
    letterSpacing: -1.2,
    fontFamily: Fonts.display,
  },
  displayMedium: {
    fontSize: 42,
    lineHeight: 48,
    letterSpacing: -0.8,
    fontFamily: Fonts.display,
  },
  displaySmall: {
    fontSize: 32,
    lineHeight: 38,
    letterSpacing: -0.4,
    fontFamily: Fonts.display,
  },
  headingLarge: {
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.2,
    fontFamily: Fonts.display,
  },
  headingMedium: {
    fontSize: 22,
    lineHeight: 28,
    fontFamily: Fonts.display,
  },
  headingSmall: {
    fontSize: 18,
    lineHeight: 24,
    fontFamily: Fonts.display,
  },
  bodyLarge: {
    fontSize: 18,
    lineHeight: 28,
    fontFamily: Fonts.body,
  },
  bodyMedium: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: Fonts.body,
  },
  bodySmall: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: Fonts.body,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: Fonts.bodyMedium,
  },
  label: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: Fonts.bodyBold,
    letterSpacing: 2.24,
    textTransform: 'uppercase' as const,
  },
};

// Mobile scaling: reduce font sizes by ~30% on mobile
export const getResponsiveTypography = (isMobile: boolean) => {
  const scale = isMobile ? 0.7 : 1;

  return {
    displayLarge: {
      ...Typography.displayLarge,
      fontSize: Typography.displayLarge.fontSize * scale,
      lineHeight: Typography.displayLarge.lineHeight * scale,
    },
    displayMedium: {
      ...Typography.displayMedium,
      fontSize: Typography.displayMedium.fontSize * scale,
      lineHeight: Typography.displayMedium.lineHeight * scale,
    },
    displaySmall: {
      ...Typography.displaySmall,
      fontSize: Typography.displaySmall.fontSize * scale,
      lineHeight: Typography.displaySmall.lineHeight * scale,
    },
    headingLarge: {
      ...Typography.headingLarge,
      fontSize: Typography.headingLarge.fontSize * scale,
      lineHeight: Typography.headingLarge.lineHeight * scale,
    },
    headingMedium: {
      ...Typography.headingMedium,
      fontSize: Typography.headingMedium.fontSize * scale,
      lineHeight: Typography.headingMedium.lineHeight * scale,
    },
    headingSmall: {
      ...Typography.headingSmall,
      fontSize: Typography.headingSmall.fontSize * scale,
      lineHeight: Typography.headingSmall.lineHeight * scale,
    },
    bodyLarge: {
      ...Typography.bodyLarge,
      fontSize: Typography.bodyLarge.fontSize * (isMobile ? 0.9 : 1),
      lineHeight: Typography.bodyLarge.lineHeight * (isMobile ? 0.9 : 1),
    },
    bodyMedium: Typography.bodyMedium,
    bodySmall: Typography.bodySmall,
    caption: Typography.caption,
    label: Typography.label,
  };
};

// Helper for responsive spacing
export const getResponsiveSpacing = (isMobile: boolean, isTablet: boolean) => {
  if (isMobile) {
    return {
      ...Spacing,
      section: Spacing.xl, // 32 instead of 64
    };
  }
  return Spacing;
};
