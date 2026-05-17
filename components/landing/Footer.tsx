import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Colors, Fonts, Spacing } from '../../constants/theme';
import { useResponsive } from '../../hooks/useResponsive';

const footerLinks = {
  product: [
    { label: 'How it works', href: '#how' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Our estates', href: '#proof' },
    { label: 'Gift a subscription', href: '#' },
  ],
  learn: [
    { label: 'Brewing guides', href: '#' },
    { label: 'Indian origins map', href: '#' },
    { label: 'Taste quiz', href: '/quiz/intro' },
    { label: 'Blog', href: '#' },
  ],
  company: [
    { label: 'About us', href: '#' },
    { label: 'Our sourcing', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Instagram', href: '#' },
  ],
};

export function Footer() {
  const { isMobile } = useResponsive();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Top Section */}
        <View style={[styles.top, isMobile && styles.topMobile]}>
          {/* Brand */}
          <View style={styles.brand}>
            <Text style={styles.logo}>
              Brew<Text style={styles.logoAccent}>Line</Text>
            </Text>
            <Text style={styles.brandDescription}>
              Indian single-origin specialty coffee, curated to your taste. Roasted to order. Delivered monthly.
            </Text>
          </View>

          {/* Product Links */}
          <View style={styles.column}>
            <Text style={styles.columnTitle}>Product</Text>
            {footerLinks.product.map((link, index) => (
              <Pressable key={index}>
                <Text style={styles.link}>{link.label}</Text>
              </Pressable>
            ))}
          </View>

          {/* Learn Links */}
          <View style={styles.column}>
            <Text style={styles.columnTitle}>Learn</Text>
            {footerLinks.learn.map((link, index) => (
              <Pressable key={index}>
                <Text style={styles.link}>{link.label}</Text>
              </Pressable>
            ))}
          </View>

          {/* Company Links */}
          <View style={styles.column}>
            <Text style={styles.columnTitle}>Company</Text>
            {footerLinks.company.map((link, index) => (
              <Pressable key={index}>
                <Text style={styles.link}>{link.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Bottom Section */}
        <View style={[styles.bottom, isMobile && styles.bottomMobile]}>
          <Text style={styles.copyright}>
            © 2025 BrewLine. Made with <Text style={styles.heart}>♥</Text> for India's coffee drinkers.
          </Text>
          <View style={styles.policies}>
            <Pressable>
              <Text style={styles.policyLink}>Privacy Policy</Text>
            </Pressable>
            <Pressable>
              <Text style={styles.policyLink}>Terms of Service</Text>
            </Pressable>
            <Pressable>
              <Text style={styles.policyLink}>Refund Policy</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.espresso,
    paddingVertical: 48,
    paddingHorizontal: Spacing.lg,
  },
  content: {
    maxWidth: 1080,
    marginHorizontal: 'auto',
  },

  // Top Section
  top: {
    flexDirection: 'row',
    gap: 48,
    paddingBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(246, 237, 218, 0.08)',
    marginBottom: 32,
  },
  topMobile: {
    flexDirection: 'column',
    gap: 32,
  },

  // Brand
  brand: {
    flex: 1,
  },
  logo: {
    fontFamily: Fonts.display,
    fontSize: 24,
    fontWeight: '700',
    color: Colors.cream,
    marginBottom: 12,
    letterSpacing: -0.48,
  },
  logoAccent: {
    color: Colors.terracotta,
  },
  brandDescription: {
    fontFamily: Fonts.body,
    fontSize: 13.5,
    color: 'rgba(246, 237, 218, 0.55)',
    lineHeight: 22,
    maxWidth: 220,
  },

  // Columns
  column: {
    gap: 8,
  },
  columnTitle: {
    fontFamily: Fonts.bodyBold,
    fontSize: 12.5,
    color: 'rgba(246, 237, 218, 0.35)',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  link: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: 'rgba(246, 237, 218, 0.55)',
    paddingVertical: 4,
  },

  // Bottom Section
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  bottomMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  copyright: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: 'rgba(246, 237, 218, 0.55)',
  },
  heart: {
    color: Colors.terracotta,
  },
  policies: {
    flexDirection: 'row',
    gap: 24,
    flexWrap: 'wrap',
  },
  policyLink: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: 'rgba(246, 237, 218, 0.4)',
  },
});
