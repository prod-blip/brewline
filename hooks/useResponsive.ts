import { useWindowDimensions } from 'react-native';
import { Breakpoints } from '../constants/theme';

/**
 * Custom hook for responsive design
 * Returns breakpoint booleans based on current window width
 *
 * Breakpoints:
 * - Mobile: 0-719px
 * - Tablet: 720-1023px
 * - Desktop: 1024px+
 */
export function useResponsive() {
  const { width, height } = useWindowDimensions();

  return {
    isMobile: width < Breakpoints.tablet,
    isTablet: width >= Breakpoints.tablet && width < Breakpoints.desktop,
    isDesktop: width >= Breakpoints.desktop,
    width,
    height,
  };
}
