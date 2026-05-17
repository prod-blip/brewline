import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import WebSocket from 'ws';
import type { WebSocketLikeConstructor } from '@supabase/realtime-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const hasSupabaseConfig = Boolean(supabaseUrl && supabasePublishableKey);

if (!hasSupabaseConfig) {
  console.warn('Missing Supabase environment variables. Signup submissions will not be saved.');
}

export const supabase = hasSupabaseConfig
  ? createClient(supabaseUrl, supabasePublishableKey, {
      realtime: {
        transport: WebSocket as unknown as WebSocketLikeConstructor,
      },
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    })
  : null;
