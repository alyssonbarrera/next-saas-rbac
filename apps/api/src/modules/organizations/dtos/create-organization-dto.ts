export type CreateOrganizationDTO = {
  name: string
  slug: string
  domain?: string
  shouldAttachUsersByDomain: boolean
  avatarUrl: string | null

  ownerId: string
}
