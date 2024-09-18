import type { Prisma } from '@prisma/client'

import type { CreateProjectDTO } from '@/modules/projects/dtos/create-project-dto'
import type { ProjectsRepository } from '@/modules/projects/repositories/projects-repository'

import { prisma } from '../prisma-service'

export class PrismaProjectsRepository implements ProjectsRepository {
  async save(data: CreateProjectDTO) {
    const project = await prisma.project.create({ data })

    return project
  }

  async findById(id: string) {
    const project = await prisma.project.findUnique({ where: { id } })

    return project
  }

  async findByIdAndOrganizationId(id: string, organizationId: string) {
    const project = await prisma.project.findUnique({
      where: { id, organizationId },
    })

    return project
  }

  async update(id: string, data: Prisma.ProjectUpdateInput) {
    const project = await prisma.project.update({
      where: { id },
      data,
    })

    return project
  }

  async delete(id: string) {
    await prisma.project.delete({ where: { id } })
  }
}
