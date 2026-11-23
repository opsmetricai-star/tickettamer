"use client";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from "recharts";

export function Charts({ days, cats, sent }: { days: { day: string; tickets: number; resolved: number }[]; cats: { name: string; value: number }[]; sent: { name: string; value: number }[] }) {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="card p-5 lg:col-span-2"><p className="mb-4 font-semibold">Volume and AI resolutions</p><div className="h-64"><ResponsiveContainer><LineChart data={days}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="day" fontSize={12} /><YAxis allowDecimals={false} fontSize={12} width={28} /><Tooltip /><Line dataKey="tickets" stroke="#0a0a0b" strokeWidth={2} dot={false} /><Line dataKey="resolved" stroke="#5f6fe0" strokeWidth={2} dot={false} /></LineChart></ResponsiveContainer></div></div>
      <div className="card p-5"><p className="mb-4 font-semibold">Top categories</p><div className="h-60">{cats.length ? <ResponsiveContainer><BarChart data={cats} layout="vertical"><XAxis type="number" allowDecimals={false} fontSize={12} /><YAxis type="category" dataKey="name" width={110} fontSize={12} /><Tooltip /><Bar dataKey="value" fill="#5f6fe0" radius={4} /></BarChart></ResponsiveContainer> : <p className="text-sm text-black/50">No data yet.</p>}</div></div>
      <div className="card p-5"><p className="mb-4 font-semibold">Sentiment</p><div className="h-60"><ResponsiveContainer><BarChart data={sent}><XAxis dataKey="name" fontSize={12} /><YAxis allowDecimals={false} fontSize={12} width={28} /><Tooltip /><Bar dataKey="value" fill="#8fe3cf" radius={4} /></BarChart></ResponsiveContainer></div></div>
    </div>
  );
}
