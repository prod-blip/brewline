import { supabase } from './supabase';

export type SignupPayload = {
  plan: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  brewSetup: string;
};

export async function createSignup(payload: SignupPayload) {
  if (!supabase) {
    throw new Error('Supabase is not configured.');
  }

  const { error } = await supabase.from('signups').insert({
    plan: payload.plan,
    name: payload.name.trim(),
    email: payload.email.trim().toLowerCase(),
    phone: payload.phone.trim() || null,
    city: payload.city.trim(),
    brew_setup: payload.brewSetup.trim() || null,
  });

  if (error) {
    throw error;
  }
}
