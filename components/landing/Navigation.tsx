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
        <Pressable onPress={() => router.push('/')}>
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
              variant="primary"
              size="small"
              onPress={() => router.push('/quiz/intro')}
            />
          </View>
        )}

        {/* Mobile CTA */}
        {isMobile && (
          <Button
            label="Start →"
            variant="primary"
            size="small"
            onPress={() => router.push('/quiz/intro')}
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
    backgroundColor: 'rgba(246, 237, 218, 0.92)',
    ...Platform.select({
      web: {
        backdropFilter: 'blur(12px)',
      },
    }),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(107, 51, 32, 0.12)',
    paddingVertical: 14,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 1080,
    marginHorizontal: 'auto',
    paddingHorizontal: Spacing.lg,
  },
  logo: {
    fontFamily: Fonts.display,
    fontSize: 24,
    fontWeight: '700',
    color: Colors.espresso,
    letterSpacing: -0.48,
  },
  logoAccent: {
    color: Colors.terracotta,
  },
  links: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 28,
  },
  link: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 14,
    color: Colors.muted,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
});
