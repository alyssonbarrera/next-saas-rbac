export type CreateProjectDTO = {
  name: string
  description: string
  avatarUrl?: string | null
  slug: string

  organizationId: string
  ownerId: string
}
