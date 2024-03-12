import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { RegisterUserUseCase } from '@/domain/livescore/application/use-cases/register-user'
import { UserAlreadyExistsError } from '@/domain/livescore/application/use-cases/errors/user-already-exists-error'
import { Public } from '@/infra/auth/public'

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createAccountBodySchema)

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
@Public()
export class CreateAccountController {
  constructor(private readonly registerUser: RegisterUserUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(bodyValidationPipe) body: CreateAccountBodySchema) {
    const { name, email, password } = body

    const result = await this.registerUser.execute({
      name,
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UserAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
