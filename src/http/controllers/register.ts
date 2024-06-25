import { z } from 'zod'
import { prisma } from '../../lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import { hash } from 'bcryptjs'
import { registerUserCases } from '@/use-cases/register'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const userSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.coerce.string().min(8),
  })

  const { name, email, password } = userSchema.parse(request.body)

  try{

    await registerUserCases({email, name, password})
  }catch (error){
    reply.status(409).send()
  }

  reply.status(201).send()
}
