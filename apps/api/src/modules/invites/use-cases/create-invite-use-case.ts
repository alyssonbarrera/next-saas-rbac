import type { Invite, Member, Organization } from '@prisma/client'
import type { Role } from '@saas/auth'

import { AppError } from '@/core/errors/app-error'
import { MembersRepository } from '@/modules/members/repositories/members-repository'
import { getUserPermissions } from '@/utils/get-user-permissions'

import type { InvitesRepository } from '../repositories/invites-repository'

export type CreateInviteUseCaseRequest = {
  role: Role
  email: string

  userId: string
  membership: Member
  organization: Organization
}

type CreateInviteUseCaseResponse = {
  invite: Invite
}

export class CreateInviteUseCase {
  constructor(
    private invitesRepository: InvitesRepository,
    private membersRepository: MembersRepository,
  ) {}

  async execute({
    role,
    email,
    userId,
    membership,
    organization,
  }: CreateInviteUseCaseRequest): Promise<CreateInviteUseCaseResponse> {
    const { cannot } = getUserPermissions(userId, membership.role)

    if (cannot('create', 'Invite')) {
      throw new AppError('You are not allowed to create a new invite.', 403)
    }

    const [, domain] = email.split('@')

    if (
      organization.shouldAttachUsersByDomain &&
      organization.domain === domain
    ) {
      throw new AppError(
        `Users with ${domain} domain will join your organization automatically on login.`,
        403,
      )
    }

    const inviteWithSameEmail =
      await this.invitesRepository.findByEmailAndOrganization(
        email,
        organization.id,
      )

    if (inviteWithSameEmail) {
      throw new AppError(
        'Another invite with the same email already exists.',
        409,
      )
    }

    const memberWithSameEmail =
      await this.membersRepository.findByEmailAndOrganization(
        email,
        organization.id,
      )

    if (memberWithSameEmail) {
      throw new AppError(
        'A member with this e-mail already belongs to your organization.',
        409,
      )
    }

    const invite = await this.invitesRepository.save({
      role,
      email,
      authorId: userId,
      organizationId: organization.id,
    })

    return { invite }
  }
}
