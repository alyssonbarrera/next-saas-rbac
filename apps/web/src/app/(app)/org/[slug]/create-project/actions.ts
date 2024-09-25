'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'

import { getCurrentOrg } from '@/auth'
import { createProjectRequest } from '@/http/requests/projects/create-project-request'
import { createProjectSchema } from '@/validations/schemas/create-project-schema'

export async function createProjectAction(data: FormData) {
  const currentOrganization = getCurrentOrg()

  const result = createProjectSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return {
      success: false,
      message: null,
      errors,
    }
  }

  const { name, description } = result.data

  try {
    await createProjectRequest({
      name,
      description,
      organizationSlug: currentOrganization!,
    })

    revalidateTag(`${currentOrganization}/projects`)
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
    message: 'Successfully saved the project.',
    errors: null,
  }
}
