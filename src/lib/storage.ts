export interface BrandKit {
  brand: string;
  description: string;
  industry: string;
  audience: string;
  personality: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  typography: string;
  visual_style: string;
  photography_style: string;
  lighting_style: string;
  background_style: string;
  positioning: string;
  words_to_use: string;
  words_to_avoid: string;
  cta_language: string;
  visual_references: string;
  active: boolean;
}

export interface HistoryItem {
  id: string;
  date: string;
  mode: string;
  modeName: string;
  title: string;
  brief: string;
  prompt: string;
  ratio: string;
  style: string;
  result: Record<string, unknown>;
}

const BRAND_KEY = "ics.brandkit";
const HISTORY_KEY = "ics.history";

const isBrowser = () => typeof window !== "undefined";

export const EMPTY_BRAND_KIT: BrandKit = {
  brand: "",
  description: "",
  industry: "",
  audience: "",
  personality: "",
  primary_color: "#FF4F55",
  secondary_color: "#651017",
  accent_color: "#FFF3F3",
  typography: "",
  visual_style: "",
  photography_style: "",
  lighting_style: "",
  background_style: "",
  positioning: "",
  words_to_use: "",
  words_to_avoid: "",
  cta_language: "",
  visual_references: "",
  active: true,
};

export function loadBrandKit(): BrandKit | null {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(BRAND_KEY);
    return raw ? ({ ...EMPTY_BRAND_KIT, ...JSON.parse(raw) } as BrandKit) : null;
  } catch {
    return null;
  }
}

export function saveBrandKit(kit: BrandKit) {
  if (!isBrowser()) return;
  localStorage.setItem(BRAND_KEY, JSON.stringify(kit));
  window.dispatchEvent(new Event("ics:brandkit"));
}

export function clearBrandKit() {
  if (!isBrowser()) return;
  localStorage.removeItem(BRAND_KEY);
  window.dispatchEvent(new Event("ics:brandkit"));
}

export function brandKitPayload(): Record<string, string> | null {
  const kit = loadBrandKit();
  if (!kit || !kit.active) return null;
  const { active: _active, ...rest } = kit;
  const entries = Object.entries(rest).filter(([, v]) => v && v.trim().length > 0);
  return entries.length ? Object.fromEntries(entries) : null;
}

export function loadHistory(): HistoryItem[] {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? (JSON.parse(raw) as HistoryItem[]) : [];
  } catch {
    return [];
  }
}

export function saveHistoryItem(item: HistoryItem) {
  if (!isBrowser()) return;
  const items = [item, ...loadHistory()].slice(0, 100);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("ics:history"));
}

export function writeHistory(items: HistoryItem[]) {
  if (!isBrowser()) return;
  localStorage.setItem(HISTORY_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("ics:history"));
}

export function clearHistory() {
  writeHistory([]);
}
