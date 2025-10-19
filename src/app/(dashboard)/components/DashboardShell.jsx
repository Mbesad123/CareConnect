import PageContainer from '../../../components/layout/PageContainer'

export default function DashboardShell({ title, description, actions, children }) {
  return (
    <PageContainer title={title} description={description} actions={actions}>
      <div className="grid gap-6">{children}</div>
    </PageContainer>
  )
}
