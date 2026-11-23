export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden>
      <path d="M20 3 35 11.5v17L20 37 5 28.5v-17L20 3Z" fill="#0a0a0b" />
      <path d="M11 15.5h18v3.2a2.3 2.3 0 0 0 0 4.6v3.2H11v-3.2a2.3 2.3 0 0 0 0-4.6v-3.2Z" fill="#fff" />
      <path d="M22.5 17.5v7" stroke="#0a0a0b" strokeWidth="1.4" strokeDasharray="1.6 1.6" />
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
