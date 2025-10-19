import PageContainer from '@/components/layout/PageContainer'
import SectionTitle from '@/components/layout/SectionTitle'
import Button from '@/components/ui/Button'

export default function HomePage() {
  return (
    <PageContainer>
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-10 py-24 text-center">
        <SectionTitle
          eyebrow="Welcome to CareConnect"
          title="Coordinate patient care with confidence"
          description="Manage patients, appointments, clinical reports, and practice settings from a single intuitive dashboard."
        />
        <div className="flex flex-wrap justify-center gap-4">
          <Button href="/login">Sign in</Button>
          <Button href="/signup" variant="secondary">
            Create an account
          </Button>
        </div>
        <p className="max-w-xl text-sm text-slate-400">
          CareConnect is a demo experience showcasing an end-to-end clinical workflow. Authentication, data fetching, and
          UI state management are wired up with modern Next.js features so you can focus on delivering exceptional care.
        </p>
      </div>
    </PageContainer>
  )
}
