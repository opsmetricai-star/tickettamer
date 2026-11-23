export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden>
      <defs>
        <linearGradient id="tt-sw" x1="14" y1="54" x2="62" y2="14" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f59e8b" /><stop offset="1" stopColor="#7a8cee" />
        </linearGradient>
        <linearGradient id="tt-body" x1="8" y1="14" x2="56" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1c2358" /><stop offset="1" stopColor="#0a0a0b" />
        </linearGradient>
        <mask id="tt-notch" maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64">
          <rect width="64" height="64" fill="#fff" />
          <circle cx="8" cy="31" r="4.5" fill="#000" /><circle cx="56" cy="31" r="4.5" fill="#000" />
        </mask>
      </defs>
      <path d="M14 53C38 60 62 48 61 12C59 36 40 47 14 53Z" fill="url(#tt-sw)" />
      <g transform="rotate(-20 32 31)">
        <rect x="8" y="14" width="48" height="34" rx="7" fill="url(#tt-body)" mask="url(#tt-notch)" />
        <path d="M21 31.5l8 8 14-15" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className={light ? "rounded-lg bg-white p-0.5" : ""}><LogoMark /></span>
      <span className={`text-[22px] font-medium tracking-tight ${light ? "text-white" : ""}`}>TicketTamer</span>
    </span>
  );
}
