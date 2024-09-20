import { FormEvent, useState, useTransition } from 'react'

type FormState = {
  success: boolean
  message: string | null
  errors: Record<string, string[]> | null
}

export function useFormState(
  action: (data: FormData) => Promise<FormState>,
  initialState?: FormState,
) {
  const [isPending, startTransition] = useTransition()
  const [formState, setFormState] = useState<FormState>(
    initialState ?? {
      success: false,
      message: null,
      errors: null,
    },
  )

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    startTransition(async () => {
      const result = await action(formData)

      setFormState(result)
    })
  }

  return [formState, handleSubmit, isPending] as const
}
