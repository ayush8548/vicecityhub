"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Pencil, Trash2, X, Save, Upload, Loader2 } from "lucide-react";
import { GradientArt } from "@/components/ui/GradientArt";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { VERIFICATION, type VerificationStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "status"
  | "images"
  | "boolean";

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
}

export interface ManagedRecord {
  id: string;
  [key: string]: unknown;
}

const STATUSES: VerificationStatus[] = [
  "confirmed",
  "trailer_inferred",
  "speculation",
];

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export function EntityManager({
  title,
  table,
  fields,
  initial,
}: {
  title: string;
  table: string;
  fields: FieldDef[];
  initial: ManagedRecord[];
}) {
  const [items, setItems] = useState<ManagedRecord[]>(initial);
  const [editing, setEditing] = useState<ManagedRecord | null>(null);
  const [draft, setDraft] = useState<ManagedRecord | null>(null);
  const [saving, setSaving] = useState(false);

  const openNew = () => {
    const blank: ManagedRecord = { id: `tmp-${Date.now()}` };
    fields.forEach((f) => {
      blank[f.key] =
        f.type === "number"
          ? 0
          : f.type === "status"
            ? "speculation"
            : f.type === "boolean"
              ? false
              : "";
    });
    setDraft(blank);
    setEditing(null);
  };

  const openEdit = (rec: ManagedRecord) => {
    const copy: ManagedRecord = { ...rec };
    if (Array.isArray(copy.images)) copy.images = (copy.images as string[]).join(", ");
    setDraft(copy);
    setEditing(rec);
  };

  const save = async () => {
    if (!draft) return;
    setSaving(true);
    try {
      const payload: ManagedRecord = { ...draft };
      // normalize images back to array
      if (typeof payload.images === "string") {
        payload.images = (payload.images as string)
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      }
      if (typeof payload.title === "string" && !payload.slug) {
        payload.slug = slugify(payload.title as string);
      }

      if (isSupabaseConfigured) {
        const supabase = createClient();
        const isNew = String(payload.id).startsWith("tmp-");
        const dbRow = toSnake(payload, isNew);
        const { data, error } = isNew
          ? await supabase.from(table).insert(dbRow).select().single()
          : await supabase.from(table).update(dbRow).eq("id", payload.id).select().single();
        if (error) {
          alert(`Save failed: ${error.message}`);
          return;
        }
        const saved = fromSnake(data);
        setItems((prev) =>
          isNew ? [saved, ...prev] : prev.map((i) => (i.id === saved.id ? saved : i)),
        );
      } else {
        // Demo mode — session-only
        setItems((prev) =>
          editing
            ? prev.map((i) => (i.id === payload.id ? payload : i))
            : [payload, ...prev],
        );
      }
      setDraft(null);
      setEditing(null);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (rec: ManagedRecord) => {
    if (!confirm(`Delete "${rec.title ?? rec.id}"?`)) return;
    if (isSupabaseConfigured && !String(rec.id).startsWith("tmp-")) {
      const { error } = await createClient().from(table).delete().eq("id", rec.id);
      if (error) {
        alert(`Delete failed: ${error.message}`);
        return;
      }
    }
    setItems((prev) => prev.filter((i) => i.id !== rec.id));
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-black">{title}</h1>
          <p className="text-sm text-faint">
            {items.length} {items.length === 1 ? "entry" : "entries"}
            {!isSupabaseConfigured && " · demo mode (session only)"}
          </p>
        </div>
        <button onClick={openNew} className="btn-neon text-sm">
          <Plus className="h-4 w-4" /> New
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-wide text-faint">
            <tr>
              <th className="px-4 py-3">Item</th>
              <th className="hidden px-4 py-3 sm:table-cell">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((rec) => (
              <tr key={rec.id} className="border-t border-white/5">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="h-10 w-14 shrink-0 overflow-hidden rounded-lg">
                      <GradientArt
                        seed={
                          Array.isArray(rec.images)
                            ? (rec.images[0] as string)
                            : String(rec.images ?? rec.title)
                        }
                        label={String(rec.title ?? "")}
                      />
                    </span>
                    <div>
                      <div className="font-semibold">{String(rec.title ?? "Untitled")}</div>
                      <div className="line-clamp-1 max-w-xs text-xs text-faint">
                        {String(rec.description ?? "")}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="hidden px-4 py-3 sm:table-cell">
                  {rec.status ? (
                    <VerificationBadge
                      status={rec.status as VerificationStatus}
                      size="sm"
                    />
                  ) : (
                    "—"
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => openEdit(rec)}
                      className="rounded-lg border border-white/10 p-2 text-muted transition hover:border-neon-cyan hover:text-neon-cyan"
                      aria-label="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => remove(rec)}
                      className="rounded-lg border border-white/10 p-2 text-muted transition hover:border-neon-pink hover:text-neon-pink"
                      aria-label="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {draft && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDraft(null)}
            className="fixed inset-0 z-[70] grid place-items-center bg-night/80 p-4 backdrop-blur"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-2xl p-6"
            >
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-display text-lg font-black">
                  {editing ? "Edit" : "New"} entry
                </h2>
                <button onClick={() => setDraft(null)} aria-label="Close">
                  <X className="h-5 w-5 text-muted" />
                </button>
              </div>

              <div className="space-y-4">
                {fields.map((f) => (
                  <FieldInput
                    key={f.key}
                    def={f}
                    table={table}
                    value={draft[f.key]}
                    onChange={(v) =>
                      setDraft((d) => (d ? { ...d, [f.key]: v } : d))
                    }
                  />
                ))}
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={() => setDraft(null)}
                  className="btn-ghost text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={save}
                  disabled={saving}
                  className="btn-neon text-sm"
                >
                  <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FieldInput({
  def,
  table,
  value,
  onChange,
}: {
  def: FieldDef;
  table: string;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const base =
    "w-full rounded-xl border border-white/15 bg-night/60 px-3 py-2.5 text-sm outline-none transition focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/30";

  if (def.type === "boolean") {
    const checked = Boolean(value);
    return (
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-white/15 bg-night/60 px-3 py-2.5 text-sm transition hover:border-white/30"
      >
        <span className="text-xs font-semibold uppercase tracking-wide text-faint">
          {def.label}
        </span>
        <span
          className={cn(
            "relative h-6 w-11 rounded-full transition",
            checked ? "bg-neon-pink" : "bg-white/15",
          )}
        >
          <span
            className={cn(
              "absolute top-0.5 h-5 w-5 rounded-full bg-white transition",
              checked ? "left-[22px]" : "left-0.5",
            )}
          />
        </span>
      </button>
    );
  }

  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-faint">
        {def.label}
        {def.type === "images" && " (upload from your computer, or paste a URL)"}
      </span>
      {def.type === "textarea" ? (
        <textarea
          rows={4}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          className={base}
        />
      ) : def.type === "images" ? (
        <ImagesField
          value={String(value ?? "")}
          onChange={(v) => onChange(v)}
          table={table}
        />
      ) : def.type === "status" ? (
        <div className="flex flex-wrap gap-2">
          {STATUSES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onChange(s)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                value === s
                  ? "border-neon-pink bg-neon-pink/15 text-neon-pink"
                  : "border-white/15 text-muted hover:text-foreground",
              )}
            >
              {VERIFICATION[s].label}
            </button>
          ))}
        </div>
      ) : (
        <input
          type={def.type === "number" ? "number" : "text"}
          value={String(value ?? "")}
          onChange={(e) =>
            onChange(def.type === "number" ? Number(e.target.value) : e.target.value)
          }
          className={base}
        />
      )}
    </label>
  );
}

// --- Image field with direct upload to Supabase Storage ------------------
const STORAGE_BUCKET = "media";

function ImagesField({
  value,
  onChange,
  table,
}: {
  value: string;
  onChange: (v: string) => void;
  table: string;
}) {
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const urls = value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    if (!isSupabaseConfigured) {
      alert("Connect Supabase to upload images (add keys to .env.local).");
      return;
    }
    setBusy(true);
    try {
      const supabase = createClient();
      const added: string[] = [];
      for (const file of Array.from(files)) {
        const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
        const path = `${table}/${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 8)}.${ext}`;
        const { error } = await supabase.storage
          .from(STORAGE_BUCKET)
          .upload(path, file, { contentType: file.type, upsert: false });
        if (error) {
          alert(`Upload failed: ${error.message}`);
          continue;
        }
        const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
        added.push(data.publicUrl);
      }
      if (added.length) {
        // New uploads become the cover image (first), and we drop the
        // auto-generated local placeholder paths that have no real file.
        const kept = urls.filter(
          (u) => !/^\/images\/(characters|vehicles|news|guides|locations)\//.test(u),
        );
        onChange([...added, ...kept].join(", "));
      }
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-3">
      {/* manual entry still supported (paste a URL or gradient seed) */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Upload below, or paste an image URL"
        className="w-full rounded-xl border border-white/15 bg-night/60 px-3 py-2.5 text-sm outline-none transition focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/30"
      />

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy || !isSupabaseConfigured}
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-neon-cyan/40 bg-neon-cyan/10 px-3 py-2 text-sm font-semibold text-neon-cyan transition hover:bg-neon-cyan/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {busy ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
          {busy ? "Uploading…" : "Upload from computer"}
        </button>
        {!isSupabaseConfigured && (
          <span className="text-xs text-faint">
            Connect Supabase to enable uploads
          </span>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {urls.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {urls.map((u, i) => (
            <span
              key={`${u}-${i}`}
              className="group/thumb relative h-16 w-24 overflow-hidden rounded-lg border border-white/10"
            >
              <GradientArt seed={u} label="preview" />
              <button
                type="button"
                onClick={() => onChange(urls.filter((_, j) => j !== i).join(", "))}
                aria-label="Remove image"
                className="absolute right-1 top-1 grid h-5 w-5 cursor-pointer place-items-center rounded-full bg-night/80 text-muted opacity-0 transition hover:text-neon-pink group-hover/thumb:opacity-100"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// --- snake/camel helpers for Supabase columns ---------------------------
function toSnake(obj: ManagedRecord, dropId: boolean): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (dropId && k === "id") continue;
    out[k.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`)] = v;
  }
  return out;
}
function fromSnake(row: Record<string, unknown>): ManagedRecord {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(row)) {
    out[k.replace(/_([a-z])/g, (_, c) => c.toUpperCase())] = v;
  }
  return out as ManagedRecord;
}
