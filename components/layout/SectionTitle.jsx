'use client'

export default function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="space-y-2">
      {eyebrow && <p className="text-xs uppercase tracking-widest text-sky-400/80">{eyebrow}</p>}
      <h2 className="text-3xl font-semibold tracking-tight text-slate-100">{title}</h2>
      {description && <p className="max-w-3xl text-sm text-slate-400">{description}</p>}
    </div>
  )
}
