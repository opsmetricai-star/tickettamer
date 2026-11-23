// Original illustration: moon + two walking figures on a plaza (CSS/SVG, not the reference asset)
export function HeroArt() {
  return (
    <svg viewBox="0 0 560 520" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="moon" cx="35%" cy="30%"><stop offset="0" stopColor="#fff" /><stop offset="1" stopColor="#d9def6" /></radialGradient>
      </defs>
      <circle cx="170" cy="120" r="92" fill="url(#moon)" />
      <circle cx="140" cy="95" r="14" fill="#c9cff0" opacity=".6" /><circle cx="205" cy="150" r="20" fill="#c9cff0" opacity=".5" />
      <g fill="#fff" opacity=".7"><circle cx="40" cy="60" r="2" /><circle cx="470" cy="90" r="2" /><circle cx="330" cy="40" r="1.6" /><circle cx="500" cy="200" r="1.6" /></g>
      {/* figure 1 */}
      <g transform="translate(250 190)">
        <circle cx="46" cy="14" r="22" fill="#e9c3a4" /><path d="M24 12c4-18 38-20 44 0-12-8-30-8-44 0Z" fill="#6b4b3a" />
        <path d="M26 44h42l16 150H18Z" fill="#9b8fb7" /><path d="M20 190h26l-8 110H8Z" fill="#6f6890" /><path d="M54 190h28l22 100H72Z" fill="#6f6890" />
        <rect x="2" y="296" width="44" height="12" rx="6" fill="#fff" /><rect x="76" y="286" width="46" height="12" rx="6" fill="#fff" />
        <rect x="68" y="80" width="26" height="42" rx="4" fill="#223" transform="rotate(-12 68 80)" />
      </g>
      {/* figure 2 */}
      <g transform="translate(380 215)">
        <circle cx="40" cy="14" r="21" fill="#e5b896" /><path d="M18 16c0-24 44-26 44 0v8c-10-10-34-10-44 0Z" fill="#3a2a30" />
        <path d="M22 42h38l10 160H10Z" fill="#f1ecf7" /><path d="M16 196h26l-6 96H8Z" fill="#7d6fa6" /><path d="M48 196h24l14 90H62Z" fill="#7d6fa6" />
        <rect x="0" y="288" width="42" height="12" rx="6" fill="#fff" /><rect x="64" y="280" width="44" height="12" rx="6" fill="#fff" />
        <rect x="-26" y="150" width="62" height="80" rx="10" fill="#c24b4b" /><path d="M-10 150c0-26 30-26 30 0" stroke="#8d2f35" strokeWidth="5" fill="none" />
      </g>
    </svg>
  );
}
