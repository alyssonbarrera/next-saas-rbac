import { HTTPError } from 'ky'

type ExecuteServerActionWithHandlingProps = {
  action: () => Promise<void>
  successMessage?: string | null
}

type ExecuteServerActionWithHandlingResult = {
  success: boolean
  message: string | null
  errors: Record<string, string[]> | null
}

export async function executeServerActionWithHandling({
  action,
  successMessage,
}: ExecuteServerActionWithHandlingProps): Promise<ExecuteServerActionWithHandlingResult> {
  try {
    await action()
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json()

      return {
        success: false,
        message,
        errors: null,
      }
    }

    console.error(error)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }

  return {
    success: true,
    message: successMessage ?? null,
    errors: null,
  }
}
