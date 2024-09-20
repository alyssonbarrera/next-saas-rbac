import { ReactNode } from 'react'

type FieldErrorMessageProps = {
  children: ReactNode
}

export function FieldErrorMessage({ children }: FieldErrorMessageProps) {
  return (
    <p className="text-xs font-medium text-red-500 dark:text-red-400">
      {children}
    </p>
  )
}
