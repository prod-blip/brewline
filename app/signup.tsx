import React, { useMemo, useState } from 'react';
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors, Fonts, Radius, Spacing, Typography } from '../constants/theme';
import { Button } from '../components/ui/Button';
import { createSignup } from '../lib/signups';

const plans = ['Discovery', 'Connoisseur', 'Bean Hunter'] as const;
type Plan = typeof plans[number];

function normalizePlan(value: unknown): Plan {
  const plan = Array.isArray(value) ? value[0] : value;
  return plans.includes(plan as Plan) ? (plan as Plan) : 'Discovery';
}

export default function SignupScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ plan?: string }>();
  const initialPlan = useMemo(() => normalizePlan(params.plan), [params.plan]);

  const [plan, setPlan] = useState<Plan>(initialPlan);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [brewSetup, setBrewSetup] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const emailIsValid = /\S+@\S+\.\S+/.test(email.trim());
  const canSubmit = name.trim().length > 1 && emailIsValid && city.trim().length > 1;

  const handleSubmit = async () => {
    if (!canSubmit) {
      Alert.alert('Missing details', 'Please add your name, a valid email, and your delivery city.');
      return;
    }

    try {
      setSubmitting(true);
      await createSignup({
        plan,
        name,
        email,
        phone,
        city,
        brewSetup,
      });
      setSubmitted(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Please try again in a moment.';
      Alert.alert('Could not save signup', message);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <View style={styles.successContainer}>
        <View style={styles.successCard}>
          <Text style={styles.eyebrow}>You are on the list</Text>
          <Text style={styles.successHeading}>We saved your {plan} signup.</Text>
          <Text style={styles.successText}>
            We will email {email.trim()} with your first-box details, roast timing, and checkout link.
          </Text>
          <Button
            label="Back to home"
            variant="primary"
            onPress={() => router.replace('/')}
            style={styles.successButton}
          />
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={styles.eyebrow}>Start your first box</Text>
        <Text style={styles.heading}>Tell us where to send your coffee.</Text>
        <Text style={styles.intro}>
          We will use this to reserve your first BrewLine box and send the checkout link after your match is ready.
        </Text>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.sectionLabel}>Choose plan</Text>
        <View style={styles.planGrid}>
          {plans.map((item) => {
            const selected = item === plan;

            return (
              <Pressable
                key={item}
                onPress={() => setPlan(item)}
                style={[styles.planOption, selected && styles.planOptionSelected]}
              >
                <Text style={[styles.planName, selected && styles.planNameSelected]}>{item}</Text>
                <Text style={[styles.planHint, selected && styles.planHintSelected]}>
                  {item === 'Discovery'
                    ? 'Best first box'
                    : item === 'Connoisseur'
                      ? 'Most popular'
                      : 'Rare estates'}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.fields}>
          <Field
            label="Full name"
            value={name}
            onChangeText={setName}
            placeholder="Aarav Mehta"
            autoComplete="name"
          />
          <Field
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
          <Field
            label="Phone"
            value={phone}
            onChangeText={setPhone}
            placeholder="+91 98765 43210"
            keyboardType="phone-pad"
            autoComplete="tel"
          />
          <Field
            label="Delivery city"
            value={city}
            onChangeText={setCity}
            placeholder="Bengaluru"
          />
          <Field
            label="Current brewing setup"
            value={brewSetup}
            onChangeText={setBrewSetup}
            placeholder="French press, moka pot, V60, or just starting"
          />
        </View>

        <Button
          label="Reserve my first box"
          variant="primary"
          fullWidth
          onPress={handleSubmit}
          disabled={!canSubmit || submitting}
          loading={submitting}
          style={styles.submitButton}
        />
        <Text style={styles.microcopy}>
          No payment now. We will confirm your roast preference and address before checkout.
        </Text>
      </View>
    </ScrollView>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoComplete?: 'name' | 'email' | 'tel';
};

function Field({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  autoComplete,
}: FieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="rgba(122, 106, 90, 0.56)"
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.parchment,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: 48,
  },
  header: {
    maxWidth: 720,
    marginHorizontal: 'auto',
    marginBottom: 28,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 28,
    paddingVertical: 8,
  },
  backText: {
    fontFamily: Fonts.bodyBold,
    fontSize: 14,
    color: Colors.terracotta,
  },
  eyebrow: {
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
    marginBottom: 14,
  },
  intro: {
    ...Typography.bodyLarge,
    color: Colors.muted,
    maxWidth: 620,
  },
  formCard: {
    width: '100%',
    maxWidth: 720,
    marginHorizontal: 'auto',
    backgroundColor: Colors.linen,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(107, 51, 32, 0.12)',
    padding: 28,
  },
  sectionLabel: {
    fontFamily: Fonts.bodyBold,
    fontSize: 13,
    color: Colors.espresso,
    marginBottom: 12,
  },
  planGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 28,
  },
  planOption: {
    flexGrow: 1,
    flexBasis: 180,
    borderWidth: 1.5,
    borderColor: 'rgba(107, 51, 32, 0.16)',
    borderRadius: Radius.md,
    padding: 16,
    backgroundColor: Colors.parchment,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  planOptionSelected: {
    backgroundColor: Colors.espresso,
    borderColor: Colors.espresso,
  },
  planName: {
    fontFamily: Fonts.display,
    fontSize: 20,
    color: Colors.espresso,
    marginBottom: 4,
  },
  planNameSelected: {
    color: Colors.cream,
  },
  planHint: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 13,
    color: Colors.muted,
  },
  planHintSelected: {
    color: 'rgba(246, 237, 218, 0.72)',
  },
  fields: {
    gap: 18,
  },
  field: {
    gap: 8,
  },
  fieldLabel: {
    fontFamily: Fonts.bodyBold,
    fontSize: 13,
    color: Colors.espresso,
  },
  input: {
    minHeight: 52,
    borderWidth: 1.5,
    borderColor: 'rgba(107, 51, 32, 0.14)',
    borderRadius: Radius.sm,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    fontFamily: Fonts.body,
    fontSize: 15,
    color: Colors.espresso,
  },
  submitButton: {
    marginTop: 28,
  },
  microcopy: {
    fontFamily: Fonts.body,
    fontSize: 13,
    lineHeight: 20,
    color: Colors.muted,
    textAlign: 'center',
    marginTop: 14,
  },
  successContainer: {
    flex: 1,
    backgroundColor: Colors.parchment,
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  successCard: {
    maxWidth: 560,
    width: '100%',
    marginHorizontal: 'auto',
    backgroundColor: Colors.linen,
    borderRadius: Radius.lg,
    padding: 36,
    borderWidth: 1,
    borderColor: 'rgba(107, 51, 32, 0.12)',
  },
  successHeading: {
    ...Typography.displaySmall,
    color: Colors.espresso,
    marginBottom: 12,
  },
  successText: {
    ...Typography.bodyMedium,
    color: Colors.muted,
  },
  successButton: {
    marginTop: 28,
  },
});
