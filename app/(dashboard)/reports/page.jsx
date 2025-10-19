import { reportFilters, listReports } from './lib/reportUtils'
import SectionTitle from '@/components/layout/SectionTitle'
import PageContainer from '@/components/layout/PageContainer'
import Button from '@/components/ui/Button'

const reports = listReports()

export default function ReportsPage() {
  return (
    <PageContainer className="space-y-12">
      <SectionTitle
        eyebrow="Insights"
        title="Reports & analytics"
        description="Monitor quality initiatives, patient satisfaction, and financial performance."
      />
      <div className="flex flex-wrap gap-3">
        {reportFilters.map((filter) => (
          <Button key={filter} variant="secondary">
            {filter}
          </Button>
        ))}
        <Button>Create report</Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {reports.map((report) => (
          <article key={report.id} className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/50">
            <h3 className="text-lg font-semibold text-slate-100">{report.title}</h3>
            <p className="mt-1 text-xs uppercase tracking-wider text-slate-500">
              {report.createdAt} • {report.author}
            </p>
            <p className="mt-4 text-sm text-slate-300">{report.summary}</p>
            <div className="mt-6 flex gap-3">
              <Button variant="ghost">View</Button>
              <Button variant="ghost">Download</Button>
            </div>
          </article>
        ))}
      </div>
    </PageContainer>
  )
}
