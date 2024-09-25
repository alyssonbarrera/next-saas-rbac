'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

import { getCurrentOrg } from '@/auth'
import { updateProjectRequest } from '@/http/requests/projects/update-project-request'
import { createProjectSchema } from '@/validations/schemas/create-project-schema'

export async function updateProjectAction(data: FormData) {
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

  const projectSlug = cookies().get('project')?.value

  const { name, description } = result.data

  try {
    await updateProjectRequest({
      name,
      description,
      projectSlug: projectSlug!,
      organizationSlug: currentOrganization!,
    })

    revalidateTag(`${currentOrganization}/project/${projectSlug}`)
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
