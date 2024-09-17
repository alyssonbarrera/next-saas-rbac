export type CreateUserDTO = {
  name?: string | null
  email: string
  passwordHash?: string
  avatarUrl?: string | null
}
