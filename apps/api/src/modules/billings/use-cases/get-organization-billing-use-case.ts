import type { Member, Organization } from '@prisma/client'

import { AppError } from '@/core/errors/app-error'
import { MembersRepository } from '@/modules/members/repositories/members-repository'
import { ProjectsRepository } from '@/modules/projects/repositories/projects-repository'
import { getUserPermissions } from '@/utils/get-user-permissions'

type GetOrganizationBillingUseCaseRequest = {
  userId: string
  membership: Member
  organization: Organization
}

type GetOrganizationBillingUseCaseResponse = {
  billing: {
    seats: {
      amount: number
      unit: number
      price: number
    }
    projects: {
      amount: number
      unit: number
      price: number
    }
    total: number
  }
}

const SEAT_UNIT_PRICE = 10
const PROJECT_UNIT_PRICE = 20

export class GetOrganizationBillingUseCase {
  constructor(
    private membersRepository: MembersRepository,
    private projectsRepository: ProjectsRepository,
  ) {}

  async execute({
    userId,
    membership,
    organization,
  }: GetOrganizationBillingUseCaseRequest): Promise<GetOrganizationBillingUseCaseResponse> {
    const { cannot } = getUserPermissions(userId, membership.role)

    if (cannot('get', 'Billing')) {
      throw new AppError(
        'You are not allowed to get billing details from this organization.',
        403,
      )
    }

    const [ammountOfMembers, ammountOfProjects] = await Promise.all([
      this.membersRepository.countByOrganization(organization.id),
      this.projectsRepository.countByOrganization(organization.id),
    ])

    return {
      billing: {
        seats: {
          amount: ammountOfMembers,
          unit: SEAT_UNIT_PRICE,
          price: ammountOfMembers * SEAT_UNIT_PRICE,
        },
        projects: {
          amount: ammountOfProjects,
          unit: PROJECT_UNIT_PRICE,
          price: ammountOfProjects * PROJECT_UNIT_PRICE,
        },
        total:
          ammountOfMembers * SEAT_UNIT_PRICE +
          ammountOfProjects * PROJECT_UNIT_PRICE,
      },
    }
  }
}
