import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors, Fonts, Spacing, Radius, Typography } from '../../constants/theme';
import { useResponsive } from '../../hooks/useResponsive';
import { Tag } from '../ui/Tag';

const testimonials = [
  {
    stars: 5,
    quote: 'I want better coffee, but I don\'t want to feel like a fool ordering at a specialty café. BrewLine is the first thing that made me feel like I knew what I was doing.',
    name: 'Aakash M.',
    title: 'Product Manager, Pune · Connoisseur plan',
    avatar: 'A',
    avatarColor: 'linear-gradient(135deg, #6B3320, #3E1F0E)',
  },
  {
    stars: 5,
    quote: 'Subscriptions feel risky — I was convinced I\'d end up with a year of beans I wouldn\'t drink. Three months in and I\'ve rated every single box a 9 or 10. The quiz is scarily accurate.',
    name: 'Riya S.',
    title: 'UX Designer, Bengaluru · Discovery plan',
    avatar: 'R',
    avatarColor: 'linear-gradient(135deg, #C1623A, #6B3320)',
  },
  {
    stars: 5,
    quote: 'If you teach me, I\'ll trust you. BrewLine actually taught me. I can now tell you the difference between Araku and Chikmagalur without Googling it. That\'s new for me.',
    name: 'Karthik N.',
    title: 'Founder, Hyderabad · Bean Hunter plan',
    avatar: 'K',
    avatarColor: 'linear-gradient(135deg, #6E7E60, #6B3320)',
  },
];

const origins = [
  { name: 'Araku Valley', highlighted: true },
  { name: 'Chikmagalur', highlighted: false },
  { name: 'Yercaud', highlighted: true },
  { name: 'Coorg', highlighted: false },
  { name: 'Bababudangiri', highlighted: false },
  { name: 'Wayanad', highlighted: false },
  { name: 'Anaimalai', highlighted: true },
  { name: '+ rotating micro-lots', highlighted: false },
];

export function SocialProof() {
  const { isMobile } = useResponsive();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.label}>Real subscribers</Text>
          <Text style={[styles.heading, isMobile && styles.headingMobile]}>
            From Nescafe to knowing your estate.
          </Text>
          <Text style={styles.intro}>
            What people say after their first three boxes.
          </Text>
        </View>

        {/* Testimonials */}
        <View style={[styles.reviews, isMobile && styles.reviewsMobile]}>
          {testimonials.map((testimonial, index) => (
            <View key={index} style={styles.reviewCard}>
              {/* Stars */}
              <Text style={styles.stars}>{'★'.repeat(testimonial.stars)}</Text>

              {/* Quote */}
              <Text style={styles.quote}>{testimonial.quote}</Text>

              {/* Reviewer */}
              <View style={styles.reviewer}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{testimonial.avatar}</Text>
                </View>
                <View>
                  <Text style={styles.reviewerName}>{testimonial.name}</Text>
                  <Text style={styles.reviewerTitle}>{testimonial.title}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Origins Strip */}
        <View style={styles.originsStrip}>
          <View style={[styles.originsLeft, isMobile && styles.originsLeftMobile]}>
            <Text style={styles.originsHeading}>
              Indian estates. Only Indian estates.
            </Text>
            <Text style={styles.originsDescription}>
              We don't blend with imports. Every bean in your box was grown in India — which means better freshness, better traceability, and a category no one else owns.
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.originsTags}
          >
            {origins.map((origin, index) => (
              <Tag
                key={index}
                label={origin.name}
                variant={origin.highlighted ? 'highlighted' : 'default'}
                size="medium"
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cream,
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
    maxWidth: 500,
    marginHorizontal: 'auto',
    marginBottom: 48,
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
    marginBottom: 10,
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

  // Reviews
  reviews: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 64,
  },
  reviewsMobile: {
    flexDirection: 'column',
    maxWidth: 480,
    marginHorizontal: 'auto',
  },
  reviewCard: {
    flex: 1,
    backgroundColor: Colors.parchment,
    borderRadius: Radius.lg,
    padding: 28,
    borderWidth: 1,
    borderColor: 'rgba(107, 51, 32, 0.08)',
  },
  stars: {
    fontSize: 13.5,
    color: Colors.gold,
    letterSpacing: 1.28,
    marginBottom: 16,
  },
  quote: {
    fontFamily: Fonts.displayItalic,
    fontStyle: 'italic',
    fontSize: 16,
    color: Colors.espresso,
    lineHeight: 25,
    marginBottom: 16,
  },

  // Reviewer
  reviewer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.mahogany,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontFamily: Fonts.display,
    fontSize: 16,
    fontWeight: '700',
    color: Colors.linen,
  },
  reviewerName: {
    fontFamily: Fonts.bodyBold,
    fontSize: 14,
    color: Colors.espresso,
  },
  reviewerTitle: {
    fontFamily: Fonts.body,
    fontSize: 12.5,
    color: Colors.muted,
  },

  // Origins Strip
  originsStrip: {
    backgroundColor: Colors.espresso,
    borderRadius: Radius.lg,
    padding: 40,
    gap: 40,
  },
  originsLeft: {
    flex: 1,
  },
  originsLeftMobile: {
    marginBottom: 0,
  },
  originsHeading: {
    ...Typography.headingLarge,
    color: Colors.cream,
    marginBottom: 8,
  },
  originsDescription: {
    fontFamily: Fonts.body,
    fontSize: 14.5,
    color: 'rgba(246, 237, 218, 0.6)',
    lineHeight: 22,
  },
  originsTags: {
    gap: 10,
    paddingRight: 40,
  },
});
