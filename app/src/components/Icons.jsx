const base = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }

export const IconHome = () => <svg {...base}><path d="M3 11 12 4l9 7" /><path d="M5 10v10h14V10" /></svg>
export const IconSearch = () => <svg {...base}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
export const IconBook = () => <svg {...base}><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" /><path d="M4 19V5" /></svg>
export const IconLeaf = () => <svg {...base}><path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z" /><path d="M5 19 13 11" /></svg>
export const IconCalendar = () => <svg {...base}><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>
export const IconPhone = () => <svg {...base}><path d="M5 3h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z" /></svg>
export const IconAlert = () => <svg {...base}><path d="M12 9v4M12 17h.01" /><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /></svg>
export const IconInfo = () => <svg {...base}><circle cx="12" cy="12" r="10" /><path d="M12 8h.01M11 12h1v5h1" /></svg>
export const IconPerson = () => <svg {...base}><circle cx="12" cy="8" r="4" /><path d="M4 21c1-4 4-6 8-6s7 2 8 6" /></svg>
export const IconPlus = () => <svg {...base}><path d="M12 5v14M5 12h14" /></svg>
export const IconTrash = () => <svg {...base}><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" /></svg>
export const IconArrow = () => <svg {...base}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
export const IconBack = () => <svg {...base}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
export const IconWifiOff = () => <svg {...base}><path d="M2 8.8a15 15 0 0 1 20 0M5 12.6a10 10 0 0 1 14 0M8.5 16.4a5 5 0 0 1 7 0M12 20h.01" /><path d="m3 3 18 18" /></svg>

export const Logo = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true">
    <circle cx="16" cy="16" r="15" fill="var(--accent)" />
    <path d="M8.5 21.5c2-6 5-9 7.5-9s5.5 3 7.5 9" stroke="var(--on-accent)" strokeWidth="2.4" fill="none" strokeLinecap="round" />
    <path d="M16 12.5V7.5m0 0c-2.2 0-3.3 1.2-3.3 2.3M16 7.5c2.2 0 3.3 1.2 3.3 2.3" stroke="var(--on-accent)" strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
)
