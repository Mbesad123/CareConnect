import DashboardShell from '../components/DashboardShell'
import Button from '../../../components/ui/Button'
import Input from '../../../components/ui/Input'

export default function SettingsPage() {
  return (
    <DashboardShell
      title="Workspace settings"
      description="Tailor CareConnect to match your organization’s structure, brand, and workflows."
      actions={<Button variant="secondary">Save changes</Button>}
    >
      <section className="grid gap-6 rounded-3xl border border-slate-200/70 bg-white/70 p-6 shadow-card lg:grid-cols-2">
        <div className="space-y-4">
          <Input label="Organization name" defaultValue="CareConnect Clinic" />
          <Input label="Support email" defaultValue="support@careconnect.health" />
          <Input label="Primary phone" defaultValue="+1 (415) 555-0198" />
        </div>
        <div className="space-y-4">
          <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
            Notification preferences
            <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100">
              <option>Daily digest</option>
              <option>Real-time alerts</option>
              <option>Weekly summary</option>
            </select>
          </label>
          <label className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-slate-50/70 p-4 text-sm text-slate-600">
            <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
            Enable automatic appointment reminders
          </label>
          <label className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-slate-50/70 p-4 text-sm text-slate-600">
            <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
            Share patient feedback summaries weekly
          </label>
        </div>
      </section>
    </DashboardShell>
  )
}
