import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  withSequence,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Fonts } from '../../constants/theme';

const messages = [
  'Reading your taste profile...',
  'Matching you to Indian estates...',
  'Picking your first accessory...',
];

export default function LoadingScreen() {
  const router = useRouter();
  const [messageIndex, setMessageIndex] = useState(0);
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    // Rotate coffee bean icon
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1500,
        easing: Easing.linear,
      }),
      -1, // infinite
      false
    );

    // Cycle through messages
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => {
        if (prev < messages.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 600);

    // Navigate to result after 1.8 seconds
    const timeout = setTimeout(() => {
      router.replace('/quiz/result');
    }, 1800);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(timeout);
    };
  }, []);

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.cream, Colors.parchment]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.content}>
        <Animated.Text style={[styles.icon, animatedIconStyle]}>☕</Animated.Text>
        <Animated.Text style={[styles.text, animatedTextStyle]}>
          {messages[messageIndex]}
        </Animated.Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  icon: {
    fontSize: 72,
    marginBottom: 32,
  },
  text: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 18,
    color: Colors.muted,
    textAlign: 'center',
  },
});
