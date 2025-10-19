import clsx from 'clsx'

export function Table({ children, className }) {
  return (
    <div className={clsx('overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card', className)}>
      <table className="min-w-full divide-y divide-slate-200">{children}</table>
    </div>
  )
}

export function TableHeader({ children }) {
  return <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">{children}</thead>
}

export function TableRow({ children }) {
  return <tr className="divide-x divide-slate-200 text-sm text-slate-700">{children}</tr>
}

export function TableHead({ children, className }) {
  return <th className={clsx('px-4 py-3 font-medium', className)}>{children}</th>
}

export function TableBody({ children }) {
  return <tbody className="divide-y divide-slate-100 bg-white">{children}</tbody>
}

export function TableCell({ children, className }) {
  return <td className={clsx('px-4 py-3', className)}>{children}</td>
}

export default Table
