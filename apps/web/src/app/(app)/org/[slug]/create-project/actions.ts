'use server'

import { revalidateTag } from 'next/cache'

import { getCurrentOrg } from '@/auth'
import { createProjectRequest } from '@/http/requests/projects/create-project-request'
import { executeServerActionWithHandling } from '@/utils/execute-server-action-with-handling'
import { createProjectSchema } from '@/validations/schemas/create-project-schema'

export async function createProjectAction(data: FormData) {
  const currentOrganization = await getCurrentOrg()

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

  async function executeCreateProject() {
    await createProjectRequest({
      name,
      description,
      organizationSlug: currentOrganization!,
    })

    revalidateTag(`${currentOrganization}/projects`)
  }

  return await executeServerActionWithHandling({
    action: executeCreateProject,
    successMessage: 'Successfully saved the project.',
  })
}
