/** Line icons for basement zones + features (used in the library + properties). */
export function ElementIcon({ name, className }: { name: string; className?: string }) {
  const p = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  const W = (c: React.ReactNode) => <svg viewBox="0 0 24 24" className={className} {...p}>{c}</svg>
  switch (name) {
    case 'rec': return W(<><rect x="3" y="11" width="18" height="7" rx="1.5" /><path d="M3 13h18M6 18v1.5M18 18v1.5" /></>)
    case 'bed': return W(<><path d="M3 17v-4a2 2 0 012-2h14a2 2 0 012 2v4M3 17v2M21 17v2M3 14h18" /><path d="M7 11V9h4v2" /></>)
    case 'bath': return W(<><path d="M4 12h16v3a3 3 0 01-3 3H7a3 3 0 01-3-3v-3z" /><path d="M6 12V7a2 2 0 012-2h1M5 18l-1 2M19 18l1 2" /></>)
    case 'theater': return W(<><rect x="3" y="4" width="18" height="10" rx="1" /><path d="M5 18h3l1-2M19 18h-3l-1-2M9 16h6" /></>)
    case 'bar': return W(<><path d="M6 4h12l-5 7v6M13 17h-3M13 17h3" /><path d="M8 7h8" /></>)
    case 'office': return W(<><rect x="4" y="6" width="16" height="9" rx="1" /><path d="M9 18h6M12 15v3" /></>)
    case 'gym': return W(<><path d="M6 8v8M18 8v8M4 10v4M20 10v4M6 12h12" /></>)
    case 'play': return W(<><rect x="4" y="11" width="7" height="7" rx="1" /><circle cx="17" cy="14.5" r="3.5" /><path d="M14 8l2-3 2 3z" /></>)
    case 'laundry': return W(<><rect x="5" y="3" width="14" height="18" rx="2" /><circle cx="12" cy="13" r="4" /><path d="M8 6h.5M11 6h.5" /></>)
    case 'storage': return W(<><rect x="4" y="9" width="7" height="9" /><rect x="13" y="9" width="7" height="9" /><path d="M4 12h7M13 12h7" /></>)
    case 'mech': return W(<><rect x="6" y="3" width="12" height="18" rx="1.5" /><path d="M6 9h12" /><circle cx="12" cy="15" r="2.5" /></>)
    case 'egress': return W(<><rect x="6" y="6" width="12" height="12" rx="1" /><path d="M12 6v12M6 12h12" /><path d="M12 3l2 2M12 3l-2 2" /></>)
    case 'stairs': return W(<><path d="M4 20h4v-4h4v-4h4V8h4" /><path d="M4 20v-4h4v-4h4V8h4V4" opacity="0.4" /></>)
    case 'column': return W(<><rect x="9" y="4" width="6" height="16" rx="1" /><path d="M7 4h10M7 20h10" /></>)
    case 'furnace': return W(<><rect x="6" y="3" width="12" height="18" rx="1.5" /><rect x="9" y="6" width="6" height="5" rx="1" /><path d="M10 15c0 1 1 1.5 2 1.5s2-.5 2-1.5-1-1.5-2-3c-1 1.5-2 2-2 3z" /></>)
    case 'fireplace': return W(<><rect x="4" y="5" width="16" height="14" rx="1" /><path d="M8 19v-5h8v5" /><path d="M12 8c0 1 1 1.5 1 2.5S12 12 12 12s-1-.5-1-1.5S12 9 12 8z" /></>)
    case 'tv': return W(<><rect x="3" y="5" width="18" height="11" rx="1" /><path d="M9 19h6M12 16v3" /></>)
    case 'toilet': return W(<><path d="M7 4h3v5H7zM6 9h8v3a4 4 0 01-4 4 4 4 0 01-4-4V9z" /><path d="M10 16v4h4" /></>)
    case 'vanity': return W(<><rect x="4" y="9" width="16" height="9" rx="1" /><circle cx="12" cy="13" r="2.5" /><path d="M12 7v2M11 6h2" /></>)
    case 'shower': return W(<><path d="M12 3v3M12 6a5 5 0 015 5H7a5 5 0 015-5z" /><path d="M9 14v1M12 15v1M15 14v1M10 18v1M14 18v1" /></>)
    case 'tub': return W(<><path d="M4 11h16v4a3 3 0 01-3 3H7a3 3 0 01-3-3v-4z" /><path d="M7 11V8a2 2 0 014 0M6 18l-1 2M18 18l1 2" /></>)
    case 'wetbar': return W(<><rect x="4" y="6" width="16" height="12" rx="1" /><path d="M4 10h16M9 6v4M14 6v4" /></>)
    case 'sofa': return W(<><path d="M4 11V9a2 2 0 012-2h12a2 2 0 012 2v2" /><rect x="3" y="11" width="18" height="6" rx="2" /><path d="M6 17v2M18 17v2" /></>)
    case 'recliner': return W(<><path d="M5 18v-5l3-1V8a2 2 0 012-2h4a2 2 0 012 2v4l3 1v5" /><path d="M5 13h14" /></>)
    case 'pool': return W(<><rect x="3" y="7" width="18" height="10" rx="2" /><circle cx="8" cy="12" r="1.2" /><circle cx="12" cy="11" r="1.2" /><circle cx="12" cy="13.5" r="1.2" /></>)
    case 'subpanel': return W(<><rect x="7" y="3" width="10" height="18" rx="1.5" /><path d="M9.5 7h5M9.5 10h5M9.5 13h5M9.5 16h5" /></>)
    case 'sump': return W(<><rect x="4" y="5" width="16" height="14" rx="2" /><circle cx="12" cy="12" r="4" /><path d="M12 12V7M10 7h4" /></>)
    case 'dehumidifier': return W(<><rect x="6" y="4" width="12" height="16" rx="2" /><path d="M9 8h6M9 11h6" /><path d="M12 14c1 1 1 2 0 3-1-1-1-2 0-3z" /></>)
    case 'waterheater': return W(<><rect x="8" y="3" width="8" height="18" rx="4" /><path d="M10 7h4" /><path d="M12 3V2" /></>)
    default: return W(<rect x="4" y="4" width="16" height="16" rx="2" />)
  }
}
