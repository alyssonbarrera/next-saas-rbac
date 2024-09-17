export type UpdateOrganizationDTO = {
  name: string
  domain?: string | null
  avatarUrl?: string | null
  shouldAttachUsersByDomain?: boolean
}
