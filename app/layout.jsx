import './globals.css'

export const metadata = {
  title: 'CareConnect',
  description: 'Integrated patient management dashboard for modern clinics.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  )
}
