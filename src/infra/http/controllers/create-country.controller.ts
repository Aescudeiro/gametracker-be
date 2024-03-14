import { CreateCountryUseCase } from '@/domain/livescore/application/use-cases/country/create-country'
import { CountryAlreadyExistsError } from '@/domain/livescore/application/use-cases/country/errors/country-already-exists-error'
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

const createCountryBodySchema = z.object({
  name: z.string(),
  alpha: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createCountryBodySchema)

type CreateCountryBodySchema = z.infer<typeof createCountryBodySchema>

@Controller('/countries')
export class CreateCountryController {
  constructor(private readonly createCountry: CreateCountryUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(bodyValidationPipe) body: CreateCountryBodySchema) {
    const { name, alpha } = body

    const result = await this.createCountry.execute({
      name,
      alpha,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case CountryAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
