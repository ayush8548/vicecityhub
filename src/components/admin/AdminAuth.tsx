"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Gamepad2, Lock, ShieldAlert, Loader2 } from "lucide-react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

interface AuthState {
  email: string | null;
  demo: boolean;
  supabaseConfigured: boolean;
  signOut: () => Promise<void>;
}

const Ctx = createContext<AuthState | null>(null);
export const useAdminAuth = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAdminAuth must be used inside AdminAuth");
  return v;
};

export function AdminAuth({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const [demo, setDemo] = useState(false);

  // Form state
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      setEmail(data.session?.user.email ?? null);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setEmail(session?.user.email ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword(form);
      if (error) setError(error.message);
    } finally {
      setBusy(false);
    }
  };

  const signOut = async () => {
    if (isSupabaseConfigured) {
      await createClient().auth.signOut();
    }
    setEmail(null);
    setDemo(false);
  };

  if (loading) {
    return (
      <div className="grid min-h-[70vh] place-items-center">
        <Loader2 className="h-8 w-8 animate-spin text-neon-pink" />
      </div>
    );
  }

  const authed = demo || Boolean(email);

  if (!authed) {
    return (
      <div className="section-pad mx-auto grid min-h-[80vh] max-w-md place-items-center">
        <div className="glass w-full p-8">
          <div className="mb-6 flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-neon-pink to-neon-purple">
              <Gamepad2 className="h-5 w-5 text-white" />
            </span>
            <div>
              <h1 className="font-display text-xl font-black">Admin Console</h1>
              <p className="text-xs text-faint">ViceCityHub control room</p>
            </div>
          </div>

          {isSupabaseConfigured ? (
            <form onSubmit={signIn} className="space-y-3">
              <Field
                label="Email"
                type="email"
                value={form.email}
                onChange={(v) => setForm((f) => ({ ...f, email: v }))}
              />
              <Field
                label="Password"
                type="password"
                value={form.password}
                onChange={(v) => setForm((f) => ({ ...f, password: v }))}
              />
              {error && (
                <p className="flex items-center gap-1.5 text-xs text-neon-pink">
                  <ShieldAlert className="h-3.5 w-3.5" /> {error}
                </p>
              )}
              <button
                type="submit"
                disabled={busy}
                className="btn-neon w-full justify-center"
              >
                {busy ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Lock className="h-4 w-4" /> Sign in
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="rounded-xl border border-neon-purple/30 bg-neon-purple/10 p-4 text-sm text-muted">
                <p className="font-semibold text-foreground">
                  Supabase not connected
                </p>
                <p className="mt-1 text-xs">
                  Add your Supabase keys to <code>.env.local</code> to enable
                  real auth and persistence. For now, explore the dashboard in
                  demo mode — changes live only in this browser session.
                </p>
              </div>
              <button
                onClick={() => setDemo(true)}
                className="btn-neon w-full justify-center"
              >
                Enter Demo Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <Ctx.Provider
      value={{ email, demo, supabaseConfigured: isSupabaseConfigured, signOut }}
    >
      {children}
    </Ctx.Provider>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-faint">
        {label}
      </span>
      <input
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/15 bg-night/60 px-3 py-2.5 text-sm outline-none transition focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/30"
      />
    </label>
  );
}
