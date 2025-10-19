'use client'

import clsx from 'clsx'

export default function PageContainer({ className, children }) {
  return <div className={clsx('mx-auto w-full max-w-6xl px-6 pb-24 pt-12', className)}>{children}</div>
}
