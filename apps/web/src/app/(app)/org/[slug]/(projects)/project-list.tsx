import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { ArrowRight, UserCircle } from 'lucide-react'

import { getCurrentOrg } from '@/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getProjectsRequest } from '@/http/requests/projects/get-projects-request'

dayjs.extend(relativeTime)

export async function ProjectList() {
  const currentOrganization = getCurrentOrg()
  const { projects } = await getProjectsRequest(currentOrganization!)

  return (
    <div className="grid grid-cols-3 gap-4">
      {projects.map((project) => (
        <Card key={project.id} className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-xl font-medium">
              {project.name}
            </CardTitle>
            <CardDescription className="line-clamp-2 leading-relaxed">
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
                {project.owner.name || 'Unknown'}
              </span>{' '}
              {dayjs(project.createdAt).fromNow()}
            </span>

            <Button size="xs" variant="outline" className="ml-auto">
              View <ArrowRight className="ml-2 size-3" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
