import { prisma } from "@/lib/prisma"
import { PrismaUsersRepository } from "@/repositories/prisma-user-repository"
import { hash } from "bcryptjs"

interface RegisterUserCasesParams{
    name: string
    email: string
    password: string
}

export async function registerUserCases({name, email, password}: RegisterUserCasesParams) {
    const userWithSamePassword = await prisma.user.findUnique({where: {email}})

    if(userWithSamePassword){
      throw new Error("⚠️ User already exists!")
    }
  
    const password_hash = await hash(password, 6)
  
   const prismaUserRepository = new PrismaUsersRepository()

   await prismaUserRepository.create({name, email, password_hash})
}