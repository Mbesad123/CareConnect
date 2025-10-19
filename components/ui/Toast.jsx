'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import { CheckCircle2, Info, ShieldAlert, X } from 'lucide-react'

const ToastContext = createContext(undefined)

const icons = {
  success: CheckCircle2,
  info: Info,
  warning: ShieldAlert,
  error: ShieldAlert,
}

export function ToastProvider({ children }) {
  const [mounted, setMounted] = useState(false)
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    setMounted(true)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const pushToast = useCallback(({ title, description, type = 'info', duration = 4000 }) => {
    setToasts((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        title,
        description,
        type,
        duration,
      },
    ])
  }, [])

  useEffect(() => {
    if (!toasts.length) return
    const timers = toasts.map((toast) =>
      setTimeout(() => {
        removeToast(toast.id)
      }, toast.duration)
    )
    return () => timers.forEach((timer) => clearTimeout(timer))
  }, [toasts, removeToast])

  const value = useMemo(() => ({ pushToast, removeToast }), [pushToast, removeToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      {mounted &&
        createPortal(
          <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex flex-col items-center gap-2 px-4">
            {toasts.map((toast) => {
              const Icon = icons[toast.type] ?? Info
              return (
                <div
                  key={toast.id}
                  className={clsx(
                    'pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-2xl border px-4 py-3 shadow-lg shadow-slate-900/10 backdrop-blur',
                    toast.type === 'success' && 'border-emerald-200 bg-emerald-50 text-emerald-900',
                    toast.type === 'info' && 'border-primary-200 bg-primary-50 text-primary-900',
                    toast.type === 'warning' && 'border-amber-200 bg-amber-50 text-amber-900',
                    toast.type === 'error' && 'border-red-200 bg-red-50 text-red-900'
                  )}
                >
                  <Icon className="mt-1 h-5 w-5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{toast.title}</p>
                    {toast.description && (
                      <p className="mt-1 text-sm text-slate-700/80">{toast.description}</p>
                    )}
                  </div>
                  <button
                    onClick={() => removeToast(toast.id)}
                    className="rounded-full p-1 text-slate-500 transition hover:bg-white/60 hover:text-slate-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )
            })}
          </div>,
          document.getElementById('toast-root') ?? document.body
        )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
