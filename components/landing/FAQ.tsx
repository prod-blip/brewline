import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, LayoutAnimation, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Fonts, Spacing, Radius, Typography } from '../../constants/theme';
import { useResponsive } from '../../hooks/useResponsive';
import { Button } from '../ui/Button';

const faqs = [
  {
    question: "What if my first box has beans I don't like?",
    answer: "Your first box is guaranteed. If you're not happy with it — for any reason — we'll resend a different origin at no extra charge. No returns, no forms, just a message to us. We'd rather earn your second month than take your money for a bad first experience.",
  },
  {
    question: "I'm not a coffee expert. Will I understand the brewing guide?",
    answer: "That's exactly who we write it for. Each guide assumes you own a kettle and maybe one brewing device — French press, Moka pot, even a simple V60. We don't use words like \"extraction yield\" without explaining them. If you've ever made Nescafe, you can follow our guide.",
  },
  {
    question: 'How do I cancel? Is it one of those nightmare cancellation flows?',
    answer: "One click in your account dashboard. No form, no phone call, no reason required. We're not in the business of holding you hostage — we'd rather you pause for two months and come back than cancel angrily. You can also pause or skip a month if life gets busy.",
  },
  {
    question: 'What brewing equipment do I need?',
    answer: 'At minimum: a kettle and something to brew with — even a pour-over filter works. Every box includes an accessory that improves your setup incrementally. We don\'t require an expensive espresso machine. If you\'re starting from scratch, your first box guide will tell you the one ₹400 thing worth buying.',
  },
  {
    question: 'Are these Indian beans actually good — or is this a "support local" pitch?',
    answer: 'Araku Valley coffee won awards at the Specialty Coffee Association of Europe long before anyone was paying attention to Indian origins. Chikmagalur has grown coffee for over a century. These beans compete internationally — we just happen to think you should be discovering them first. We\'re not asking you to lower your standards for patriotism.',
  },
  {
    question: 'Where do you ship? How long does delivery take?',
    answer: 'Across India — metros and Tier-2 cities. Most deliveries arrive within 3–5 business days of dispatch. We roast and ship within 48 hours of your billing date, so your beans are always fresh. If you\'re in Pune, Bengaluru, Mumbai, Delhi, or Hyderabad, expect 2–3 days.',
  },
];

export function FAQ() {
  const router = useRouter();
  const { isMobile } = useResponsive();
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggleItem = (index: number) => {
    if (Platform.OS !== 'web') {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={[styles.layout, isMobile && styles.layoutMobile]}>
          {/* Sidebar */}
          <View style={styles.sidebar}>
            <Text style={styles.label}>Questions</Text>
            <Text style={[styles.heading, isMobile && styles.headingMobile]}>
              The stuff you actually want to know.
            </Text>
            <Text style={styles.intro}>
              We've tried to answer honestly — including the parts where subscriptions can go wrong.
            </Text>
            {!isMobile && (
              <Button
                label="Start my first box"
                variant="primary"
                onPress={() => router.push('/quiz/intro')}
                style={{ marginTop: 32 }}
              />
            )}
          </View>

          {/* FAQ List */}
          <View style={styles.list}>
            {faqs.map((faq, index) => (
              <View key={index}>
                {index === 0 && <View style={styles.topBorder} />}
                <Pressable
                  onPress={() => toggleItem(index)}
                  style={styles.item}
                >
                  <Text style={styles.question}>{faq.question}</Text>
                  <View style={[styles.icon, openIndex === index && styles.iconOpen]}>
                    <Text style={styles.iconText}>+</Text>
                  </View>
                </Pressable>

                {openIndex === index && (
                  <View style={styles.answerContainer}>
                    <Text style={styles.answer}>{faq.answer}</Text>
                  </View>
                )}

                <View style={styles.divider} />
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.linen,
    paddingVertical: Spacing.section,
    paddingHorizontal: Spacing.lg,
  },
  content: {
    maxWidth: 1080,
    marginHorizontal: 'auto',
  },

  // Layout
  layout: {
    flexDirection: 'row',
    gap: 64,
    alignItems: 'flex-start',
  },
  layoutMobile: {
    flexDirection: 'column',
    gap: 40,
  },

  // Sidebar
  sidebar: {
    flex: 1,
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
    marginBottom: 16,
  },
  headingMobile: {
    fontSize: 28,
    lineHeight: 34,
  },
  intro: {
    fontFamily: Fonts.body,
    fontSize: 14.5,
    color: Colors.muted,
  },

  // FAQ List
  list: {
    flex: 2,
  },
  topBorder: {
    height: 1,
    backgroundColor: 'rgba(107, 51, 32, 0.1)',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    paddingVertical: 20,
  },
  question: {
    flex: 1,
    fontFamily: Fonts.bodyBold,
    fontSize: 15,
    color: Colors.espresso,
    lineHeight: 22,
  },
  icon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.cream,
    borderWidth: 1.5,
    borderColor: 'rgba(107, 51, 32, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconOpen: {
    backgroundColor: Colors.terracotta,
    borderColor: Colors.terracotta,
    transform: [{ rotate: '45deg' }],
  },
  iconText: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.muted,
  },

  // Answer
  answerContainer: {
    paddingBottom: 20,
  },
  answer: {
    fontFamily: Fonts.body,
    fontSize: 14.5,
    color: Colors.muted,
    lineHeight: 25,
    maxWidth: 540,
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: 'rgba(107, 51, 32, 0.1)',
  },
});
