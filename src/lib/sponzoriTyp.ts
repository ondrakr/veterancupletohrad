/** Jednotný typ sponzora/partnera pro UI a porovnání (MySQL ENUM / serializace přes RSC/JSON). */
export function normalizeSponsorTyp(typ: unknown): 'sponzor' | 'partner' {
  let v: unknown = typ;
  if (v && typeof v === 'object' && !Array.isArray(v)) {
    const o = v as { type?: string; data?: unknown };
    if (o.type === 'Buffer' && Array.isArray(o.data)) {
      v = new TextDecoder('utf-8', { fatal: false }).decode(Uint8Array.from(o.data as number[]));
    }
  }
  const s = String(v ?? '')
    .trim()
    .toLowerCase();
  return s === 'partner' ? 'partner' : 'sponzor';
}
