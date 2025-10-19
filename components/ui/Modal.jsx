'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { X } from 'lucide-react'
import Button from './Button'

export default function Modal({
  open,
  onClose,
  title,
  description,
  children,
  primaryAction,
  secondaryAction,
}) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
                <div className="flex items-start justify-between border-b border-slate-100 px-6 py-4">
                  <div>
                    <Dialog.Title className="text-lg font-semibold text-slate-900">
                      {title}
                    </Dialog.Title>
                    {description && (
                      <p className="mt-1 text-sm text-slate-500">{description}</p>
                    )}
                  </div>
                  <button
                    onClick={onClose}
                    className="rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
                <div className="px-6 py-4 text-sm text-slate-600">{children}</div>
                {(primaryAction || secondaryAction) && (
                  <div className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50 px-6 py-4 sm:flex-row sm:justify-end">
                    {secondaryAction && (
                      <Button
                        variant={secondaryAction.variant ?? 'secondary'}
                        onClick={secondaryAction.onClick}
                      >
                        {secondaryAction.label}
                      </Button>
                    )}
                    {primaryAction && (
                      <Button onClick={primaryAction.onClick} variant={primaryAction.variant ?? 'primary'}>
                        {primaryAction.label}
                      </Button>
                    )}
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
