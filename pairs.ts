export const DEFAULT_ENABLED_PAIRS = ["EURUSD", "GBPUSD", "USDJPY"] as const;

export function normalizeEnabledPairs(pairs: string[]): string[] {
  return [...new Set(pairs.map(pair => pair.replace("/", "").toUpperCase().trim())
    .filter(pair => /^[A-Z]{6}$/.test(pair)))];
}
