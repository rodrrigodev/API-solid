import { z } from 'zod'
import { prisma } from '../../lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import { hash } from 'bcryptjs'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const userSchema = z.object({
    name: z.string(),
    email: z.string(),
    passwordHash: z.coerce.string().min(8),
  })

  const { name, email, passwordHash } = userSchema.parse(request.body)

  const userWithSamePassword = await prisma.user.findUnique({where: {email}})

  if(userWithSamePassword){
    reply.status(409).send()
  }

  const password_hash = await hash(passwordHash, 6)

  await prisma.user.create({
    data: { name, email, password_hash },
  })

  reply.status(201).send()
}
