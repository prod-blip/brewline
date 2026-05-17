import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Fonts, Spacing } from '../../constants/theme';
import { useResponsive } from '../../hooks/useResponsive';
import { Button } from '../ui/Button';

export function Navigation() {
  const router = useRouter();
  const { isMobile } = useResponsive();

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        {/* Logo */}
        <Pressable onPress={() => router.push('/')} style={styles.brand}>
          <View style={styles.brandMark}>
            <Text style={styles.brandMarkText}>B</Text>
          </View>
          <Text style={styles.logo}>
            Brew<Text style={styles.logoAccent}>Line</Text>
          </Text>
        </Pressable>

        {/* Nav Links - Hidden on mobile */}
        {!isMobile && (
          <View style={styles.links}>
            <Pressable>
              <Text style={styles.link}>How it works</Text>
            </Pressable>
            <Pressable>
              <Text style={styles.link}>Pricing</Text>
            </Pressable>
            <Pressable>
              <Text style={styles.link}>FAQ</Text>
            </Pressable>
            <Button
              label="Start your first box →"
              variant="light"
              size="small"
              onPress={() => router.push('/quiz/intro')}
              style={styles.navButton}
            />
          </View>
        )}

        {/* Mobile CTA */}
        {isMobile && (
          <Button
            label="Start →"
            variant="light"
            size="small"
            onPress={() => router.push('/quiz/intro')}
            style={styles.navButton}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: 'rgba(30, 17, 10, 0.92)',
    ...Platform.select({
      web: {
        backdropFilter: 'blur(14px)',
      },
    }),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(246, 237, 218, 0.14)',
    paddingVertical: 12,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 1080,
    minHeight: 44,
    marginHorizontal: 'auto',
    paddingHorizontal: Spacing.lg,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minHeight: 44,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  brandMark: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.cream,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.28)',
  },
  brandMarkText: {
    fontFamily: Fonts.display,
    fontSize: 18,
    lineHeight: 22,
    color: Colors.espresso,
  },
  logo: {
    fontFamily: Fonts.display,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 30,
    color: Colors.cream,
    letterSpacing: 0,
  },
  logoAccent: {
    color: Colors.ember,
  },
  links: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    minHeight: 44,
  },
  navButton: {
    minHeight: 36,
    marginLeft: 12,
  },
  link: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 14,
    lineHeight: 20,
    color: 'rgba(246, 237, 218, 0.78)',
    paddingVertical: 8,
    paddingHorizontal: 10,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
});
