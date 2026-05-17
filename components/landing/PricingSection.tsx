import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Fonts, Spacing, Radius, Typography } from '../../constants/theme';
import { useResponsive } from '../../hooks/useResponsive';
import { Button } from '../ui/Button';

const tiers = [
  {
    name: 'Discovery',
    tagline: 'Perfect for your first specialty box',
    price: '₹599',
    period: '/ month',
    features: [
      '250g freshly roasted single-origin beans',
      'Curated to your taste quiz result',
      'Brewing guide + origin story card',
      'One useful brewing accessory',
      'Cancel or pause anytime',
    ],
    featured: false,
  },
  {
    name: 'Connoisseur',
    tagline: 'For the curious explorer',
    price: '₹1,299',
    period: '/ month',
    features: [
      'Two origins per month (contrast tasting)',
      'Full-size brewing accessory every month',
      'Video tasting notes from the roaster',
      'Priority access to seasonal micro-lots',
      'Community members\' brewing calls (monthly)',
      'Cancel or pause anytime',
    ],
    featured: true,
  },
  {
    name: 'Bean Hunter',
    tagline: 'For the deeply curious',
    price: '₹2,499',
    period: '/ month',
    features: [
      'Rare + micro-lot estates, before they sell out',
      'Direct estate sourcing notes + farmer profiles',
      'Premium equipment accessory (≥₹600 value)',
      '1:1 onboarding call with our head roaster',
      'Curated gifting boxes at member pricing',
      'Cancel or pause anytime',
    ],
    featured: false,
  },
];

export function PricingSection() {
  const router = useRouter();
  const { isMobile } = useResponsive();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.label}>Choose your plan</Text>
          <Text style={[styles.heading, isMobile && styles.headingMobile]}>
            Start where you are. Upgrade when you're ready.
          </Text>
          <Text style={styles.intro}>
            All plans include the taste quiz, brewing guide, and our satisfaction guarantee on your first box.
          </Text>
        </View>

        {/* Pricing Cards */}
        {isMobile ? (
          <View style={styles.cardsMobile}>
            {tiers.map((tier, index) => (
              <PricingCard key={index} tier={tier} onPress={() => router.push(`/signup?plan=${encodeURIComponent(tier.name)}`)} />
            ))}
          </View>
        ) : (
          <View style={styles.cardsDesktop}>
            {tiers.map((tier, index) => (
              <PricingCard key={index} tier={tier} onPress={() => router.push(`/signup?plan=${encodeURIComponent(tier.name)}`)} />
            ))}
          </View>
        )}

        {/* Footer Note */}
        <Text style={styles.note}>
          Not sure which to pick? Start with Discovery. You can upgrade any month. ✦ First-box guarantee on all plans.
        </Text>
      </View>
    </View>
  );
}

function PricingCard({ tier, onPress }: { tier: typeof tiers[0]; onPress: () => void }) {
  const isFeature = tier.featured;

  return (
    <View style={[styles.card, isFeature && styles.cardFeatured]}>
      {isFeature && <View style={styles.badge}>
        <Text style={styles.badgeText}>Most Popular</Text>
      </View>}

      <Text style={[styles.cardName, isFeature && styles.cardNameFeatured]}>
        {tier.name}
      </Text>
      <Text style={[styles.cardTagline, isFeature && styles.cardTaglineFeatured]}>
        {tier.tagline}
      </Text>

      {/* Price */}
      <View style={styles.priceContainer}>
        <Text style={[styles.priceAmount, isFeature && styles.priceAmountFeatured]}>
          {tier.price}
        </Text>
        <Text style={[styles.pricePeriod, isFeature && styles.pricePeriodFeatured]}>
          {tier.period}
        </Text>
      </View>

      {/* Divider */}
      <View style={[styles.divider, isFeature && styles.dividerFeatured]} />

      {/* Features */}
      <View style={styles.features}>
        {tier.features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <View style={[styles.check, isFeature && styles.checkFeatured]}>
              <Text style={[styles.checkIcon, isFeature && styles.checkIconFeatured]}>✓</Text>
            </View>
            <Text style={[styles.featureText, isFeature && styles.featureTextFeatured]}>
              {feature}
            </Text>
          </View>
        ))}
      </View>

      {/* CTA */}
      <Button
        label={`Start ${tier.name} →`}
        variant={isFeature ? 'primary' : 'outline'}
        fullWidth
        onPress={onPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.parchment,
    paddingVertical: Spacing.section,
    paddingHorizontal: Spacing.lg,
  },
  content: {
    maxWidth: 1080,
    marginHorizontal: 'auto',
  },

  // Header
  header: {
    alignItems: 'center',
    maxWidth: 560,
    marginHorizontal: 'auto',
    marginBottom: 56,
  },
  label: {
    fontFamily: Fonts.bodyBold,
    fontSize: 12,
    color: Colors.terracotta,
    letterSpacing: 2.24,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  heading: {
    ...Typography.displayMedium,
    color: Colors.espresso,
    marginBottom: 12,
    textAlign: 'center',
  },
  headingMobile: {
    fontSize: 28,
    lineHeight: 34,
  },
  intro: {
    ...Typography.bodyMedium,
    color: Colors.muted,
    textAlign: 'center',
  },

  // Cards
  cardsDesktop: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'flex-start',
    marginBottom: 28,
  },
  cardsMobile: {
    gap: 20,
    maxWidth: 420,
    marginHorizontal: 'auto',
    marginBottom: 28,
  },

  // Card
  card: {
    flex: 1,
    backgroundColor: Colors.linen,
    borderRadius: Radius.lg,
    padding: 36,
    borderWidth: 1.5,
    borderColor: 'rgba(107, 51, 32, 0.12)',
    position: 'relative',
  },
  cardFeatured: {
    backgroundColor: Colors.bark,
    borderColor: Colors.bark,
    transform: [{ scale: 1.03 }],
    shadowColor: Colors.bark,
    shadowOffset: { width: 0, height: 24 },
    shadowOpacity: 0.35,
    shadowRadius: 60,
    elevation: 10,
  },

  // Badge
  badge: {
    position: 'absolute',
    top: -14,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  badgeText: {
    backgroundColor: Colors.terracotta,
    color: '#fff',
    fontFamily: Fonts.bodyBold,
    fontSize: 11.5,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    paddingVertical: 5,
    paddingHorizontal: 14,
    borderRadius: 999,
  },

  // Card Content
  cardName: {
    fontFamily: Fonts.display,
    fontSize: 21,
    fontWeight: '600',
    color: Colors.espresso,
    marginBottom: 4,
  },
  cardNameFeatured: {
    color: Colors.cream,
  },
  cardTagline: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: Colors.muted,
    marginBottom: 22,
  },
  cardTaglineFeatured: {
    color: 'rgba(246, 237, 218, 0.6)',
  },

  // Price
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 24,
  },
  priceAmount: {
    fontFamily: Fonts.display,
    fontSize: 42,
    fontWeight: '700',
    color: Colors.espresso,
    lineHeight: 42,
  },
  priceAmountFeatured: {
    color: Colors.cream,
  },
  pricePeriod: {
    fontFamily: Fonts.body,
    fontSize: 13.5,
    color: Colors.muted,
    marginLeft: 4,
  },
  pricePeriodFeatured: {
    color: 'rgba(246, 237, 218, 0.6)',
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: 'rgba(107, 51, 32, 0.1)',
    marginVertical: 22,
  },
  dividerFeatured: {
    backgroundColor: 'rgba(246, 237, 218, 0.12)',
  },

  // Features
  features: {
    gap: 12,
    marginBottom: 32,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 11,
  },
  check: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(193, 98, 58, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  checkFeatured: {
    backgroundColor: 'rgba(246, 237, 218, 0.15)',
  },
  checkIcon: {
    fontSize: 10.5,
    color: Colors.terracotta,
  },
  checkIconFeatured: {
    color: Colors.cream,
  },
  featureText: {
    flex: 1,
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.charcoal,
    lineHeight: 21,
  },
  featureTextFeatured: {
    color: 'rgba(246, 237, 218, 0.85)',
  },

  // Footer Note
  note: {
    fontFamily: Fonts.body,
    fontSize: 13.5,
    color: Colors.muted,
    textAlign: 'center',
  },
});
