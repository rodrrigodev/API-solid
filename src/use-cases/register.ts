import { prisma } from "@/lib/prisma"
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { UsersRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"

interface RegisterUseCasesParams{
    name: string
    email: string
    password: string
}

export class RegisterUseCases{

  constructor(private usersRepository: UsersRepository){}

 async  execute({name, email, password}: RegisterUseCasesParams) {
    const userWithSamePassword = await this.usersRepository.findByEmail(email)

    if(userWithSamePassword){
      throw new Error("⚠️ User already exists!")
    }
  
    const password_hash = await hash(password, 6)
  
  //  const prismaUserRepository = new PrismaUsersRepository()

   await this.usersRepository.create({name, email, password_hash})}
}