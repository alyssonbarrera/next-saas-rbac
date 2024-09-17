import type { FastifyReply, FastifyRequest } from 'fastify'

type FastifyRequestWithBody = FastifyRequest<{
  Params: {
    slug: string
  }
}>

export class GetMembershipController {
  async handle(request: FastifyRequestWithBody, reply: FastifyReply) {
    const { slug } = request.params
    const { membership } = await request.getUserMembership(slug)

    return reply.status(200).send({
      membership: {
        id: membership.id,
        role: membership.role,
        organizationId: membership.organizationId,
      },
    })
  }
}
