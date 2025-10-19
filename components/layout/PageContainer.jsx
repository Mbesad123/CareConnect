export default function PageContainer({ title, description, actions, children }) {
  return (
    <section className="flex flex-col gap-6">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          {title && <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>}
          {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </header>
      <div className="grid gap-6">{children}</div>
    </section>
  )
}
