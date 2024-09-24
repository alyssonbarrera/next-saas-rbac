'use client'

import { useQuery } from '@tanstack/react-query'
import { ChevronsUpDown, Loader2, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Fragment } from 'react'

import { getProjectsRequest } from '@/http/requests/projects/get-projects-request'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Skeleton } from '../ui/skeleton'

export function ProjectSwitcher() {
  const { slug: organizationSlug, project: projectSlug } = useParams<{
    slug: string
    project: string
  }>()

  const { data, isLoading } = useQuery({
    queryKey: [organizationSlug, 'projects'],
    queryFn: () => getProjectsRequest(organizationSlug),
    enabled: !!organizationSlug,
  })

  const currentProject =
    data && projectSlug
      ? data?.projects.find((project) => project.slug === projectSlug)
      : null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-[168px] items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary">
        {isLoading ? (
          <Fragment>
            <Skeleton className="size-4 rounded-full" />
            <Skeleton className="h-4 flex-1" />
          </Fragment>
        ) : (
          <Fragment>
            {currentProject ? (
              <Fragment>
                <Avatar className="size-4">
                  {currentProject.avatarUrl && (
                    <AvatarImage src={currentProject.avatarUrl} />
                  )}
                  <AvatarFallback />
                </Avatar>
                <span className="truncate text-left">
                  {currentProject.name}
                </span>
              </Fragment>
            ) : (
              <span className="text-muted-foreground">Select project</span>
            )}
          </Fragment>
        )}
        {isLoading ? (
          <Loader2 className="ml-auto size-4 shrink-0 animate-spin text-muted-foreground" />
        ) : (
          <ChevronsUpDown className="ml-auto size-4 shrink-0 text-muted-foreground" />
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        alignOffset={-16}
        sideOffset={12}
        className="w-[200px]"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Projects</DropdownMenuLabel>

          {data &&
            data.projects.map((project) => (
              <DropdownMenuItem key={project.id} asChild>
                <Link href={`/org/${organizationSlug}/project/${project.slug}`}>
                  <Avatar className="mr-2 size-4">
                    {project.avatarUrl && (
                      <AvatarImage src={project.avatarUrl} />
                    )}
                    <AvatarFallback />
                  </Avatar>
                  <span className="line-clamp-1">{project.name}</span>
                </Link>
              </DropdownMenuItem>
            ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href={`/org/${organizationSlug}/create-project`}>
            <PlusCircle className="mr-2 size-4" />
            Create new
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
