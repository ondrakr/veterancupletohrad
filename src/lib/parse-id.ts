/** Kladné celé ID z dynamického segmentu URL nebo query (články, osobnosti, …). */
export function parsePositiveIntId(raw: string | undefined | null): number | null {
  if (raw == null || raw === '') return null;
  const n = Number.parseInt(String(raw), 10);
  if (!Number.isFinite(n) || n < 1 || !Number.isInteger(n)) return null;
  return n;
}
