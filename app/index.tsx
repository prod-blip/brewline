import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Colors } from '../constants/theme';
import { Navigation } from '../components/landing/Navigation';
import { Hero } from '../components/landing/Hero';
import { MarqueeStrip } from '../components/landing/MarqueeStrip';
import { ProblemSection } from '../components/landing/ProblemSection';
import { SolutionSection } from '../components/landing/SolutionSection';
import { HowItWorks } from '../components/landing/HowItWorks';
import { PricingSection } from '../components/landing/PricingSection';
import { SocialProof } from '../components/landing/SocialProof';
import { FAQ } from '../components/landing/FAQ';
import { FinalCTA } from '../components/landing/FinalCTA';
import { Footer } from '../components/landing/Footer';

export default function LandingPage() {
  return (
    <View style={styles.container}>
      <Navigation />
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Hero />
        <MarqueeStrip />
        <ProblemSection />
        <SolutionSection />
        <HowItWorks />
        <PricingSection />
        <SocialProof />
        <FAQ />
        <FinalCTA />
        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.parchment,
  },
  scroll: {
    flex: 1,
  },
});
