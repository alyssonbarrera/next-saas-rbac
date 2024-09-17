export type CreateOrganizationDTO = {
  name: string
  slug: string
  domain?: string | null
  avatarUrl?: string | null
  shouldAttachUsersByDomain?: boolean

  ownerId: string
}
