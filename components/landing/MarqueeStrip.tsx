import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Colors, Fonts } from '../../constants/theme';

const MARQUEE_ITEMS = [
  'Direct from Indian estates',
  'Roasted to order',
  'Taste quiz personalisation',
  'Free brewing guide every month',
  'Ships across India',
  'Specialty Coffee Association sourced',
];

export function MarqueeStrip() {
  const translateX = useSharedValue(0);

  useEffect(() => {
    // Animate from 0 to -50% (since we duplicate the content)
    translateX.value = withRepeat(
      withTiming(-50, {
        duration: 24000,
        easing: Easing.linear,
      }),
      -1, // infinite
      false // don't reverse
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: `${translateX.value}%` }],
  }));

  const renderItems = () => (
    <>
      {MARQUEE_ITEMS.map((item, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.diamond}>✦</Text>
          <Text style={styles.text}>{item}</Text>
        </View>
      ))}
    </>
  );

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.inner, animatedStyle]}>
        {/* Render items twice for seamless loop */}
        {renderItems()}
        {renderItems()}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.gold,
    paddingVertical: 12,
    overflow: 'hidden',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  diamond: {
    fontSize: 13,
    color: 'rgba(30, 17, 10, 0.6)',
    marginRight: 11,
  },
  text: {
    fontFamily: Fonts.bodyBold,
    fontSize: 13,
    color: Colors.espresso,
    letterSpacing: 0.96,
    textTransform: 'uppercase',
  },
});
