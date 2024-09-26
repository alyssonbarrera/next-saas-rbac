import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { TriangleAlert, UserCircle } from 'lucide-react'

import { ability } from '@/auth'
import { DangerZoneCard } from '@/components/danger-zone-card'
import { DeleteProjectButton } from '@/components/delete-project-button'
import { ProjectForm } from '@/components/forms/project-form'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getProjectRequest } from '@/http/requests/projects/get-project-request'

dayjs.extend(relativeTime)

type ProjectProps = {
  params: {
    slug: string
    project: string
  }
}

export default async function Project({ params }: ProjectProps) {
  const { slug: organizationSlug, project: projectSlug } = params

  const { project } = await getProjectRequest({
    organizationSlug,
    projectSlug,
  })

  console.log('project page', {
    projectId: project.id,
    organizationSlug,
    projectSlug,
  })

  const permissions = await ability()
  const canGetProject = permissions?.can('get', 'Project')
  const canDeleteProject = permissions?.can('delete', 'Project')
  const canUpdateProject = permissions?.can('update', 'Project')

  if (!canGetProject) {
    return (
      <p className="text-sm text-muted-foreground">
        You are not allowed to see this project.
      </p>
    )
  }

  return (
    <div className="space-y-4">
      <Card key={project.id} className="flex flex-col justify-between">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{project.name}</CardTitle>
          <CardDescription className="leading-relaxed">
            {project.description}
          </CardDescription>
        </CardHeader>

        <CardFooter className="flex items-center gap-1.5">
          {project.owner.avatarUrl ? (
            <Avatar className="size-4">
              <AvatarFallback />
              <AvatarImage src={project.owner.avatarUrl} />
            </Avatar>
          ) : (
            <UserCircle className="size-4" />
          )}

          <span className="truncate text-xs text-muted-foreground">
            <span className="font-medium text-foreground">
              {project.owner.name ?? 'Someone'}
            </span>{' '}
            {dayjs(project.createdAt).fromNow()}
          </span>
        </CardFooter>
      </Card>

      {canUpdateProject && (
        <Card>
          <CardHeader>
            <CardTitle>Project settings</CardTitle>
            <CardDescription>Update project details</CardDescription>
          </CardHeader>

          <CardContent>
            <ProjectForm isUpdating initialData={project} />
          </CardContent>

          <CardFooter>
            <TriangleAlert className="mr-2 size-4 text-yellow-600" />

            <span className="text-sm text-muted-foreground">
              If you update the project name, the project URL won't be updated.
            </span>
          </CardFooter>
        </Card>
      )}

      {canDeleteProject && (
        <DangerZoneCard
          title="Delete project"
          description="This action cannot be undone. This will permanently delete this project."
        >
          <DeleteProjectButton
            projectId={project.id}
            organizationSlug={organizationSlug}
          />
        </DangerZoneCard>
      )}
    </div>
  )
}
