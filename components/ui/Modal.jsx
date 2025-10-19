'use client'

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import Button from './Button'

export default function Modal({ title, description, open, onClose, children, primaryAction }) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-lg space-y-6 rounded-3xl border border-slate-800 bg-slate-900/95 p-8 shadow-2xl shadow-sky-500/5">
          <div className="space-y-2">
            <DialogTitle className="text-lg font-semibold text-slate-100">{title}</DialogTitle>
            {description && <p className="text-sm text-slate-400">{description}</p>}
          </div>
          <div className="space-y-4 text-sm text-slate-200">{children}</div>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
            {primaryAction}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
