import { createBrowserClient } from "@supabase/ssr";

export const supabaseEnv = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL,
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
};

/** True when real Supabase credentials are present. */
export const isSupabaseConfigured = Boolean(
  supabaseEnv.url && supabaseEnv.anonKey,
);

/** Browser client. Only call when isSupabaseConfigured is true. */
export function createClient() {
  return createBrowserClient(supabaseEnv.url!, supabaseEnv.anonKey!);
}
