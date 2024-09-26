'use server'

import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

import { getCurrentOrg } from '@/auth'
import { deleteProjectRequest } from '@/http/requests/projects/delete-project-request'
import { updateProjectRequest } from '@/http/requests/projects/update-project-request'
import { executeServerActionWithHandling } from '@/utils/execute-server-action-with-handling'
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

  async function executeUpdateProject() {
    await updateProjectRequest({
      name,
      description,
      projectSlug: projectSlug!,
      organizationSlug: currentOrganization!,
    })

    revalidateTag(`${currentOrganization}/project/${projectSlug}`)
  }

  return await executeServerActionWithHandling({
    action: executeUpdateProject,
    successMessage: 'Successfully saved the project.',
  })
}

export async function deleteProjectAction(projectId: string) {
  const currentOrganization = getCurrentOrg()

  await deleteProjectRequest({
    projectId,
    organizationSlug: currentOrganization!,
  })

  revalidateTag(`${currentOrganization}/projects`)
}
