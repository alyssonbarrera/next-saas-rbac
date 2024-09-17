import type { FastifyReply, FastifyRequest } from 'fastify'

type FastifyRequestWithBody = FastifyRequest<{
  Params: {
    slug: string
  }
}>

export class GetOrganizationController {
  async handle(request: FastifyRequestWithBody, reply: FastifyReply) {
    const { slug } = request.params
    const { organization } = await request.getUserMembership(slug)

    return reply.status(200).send({ organization })
  }
}
