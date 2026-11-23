export function Title({ title, sub, children }: { title: string; sub?: string; children?: React.ReactNode }) {
  return <div className="flex flex-wrap items-end justify-between gap-4"><div><h1 className="text-3xl font-medium tracking-tightest">{title}</h1>{sub && <p className="mt-1 text-black/60">{sub}</p>}</div>{children}</div>;
}
export function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return <div className="card p-5"><p className="text-sm text-black/55">{label}</p><p className="mt-3 text-4xl font-medium tracking-tightest">{value}</p></div>;
}
