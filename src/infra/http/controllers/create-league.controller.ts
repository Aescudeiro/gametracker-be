import { CreateLeagueUseCase } from '@/domain/livescore/application/use-cases/league/create-league'
import { LeagueAlreadyExistsError } from '@/domain/livescore/application/use-cases/league/errors/league-already-exists-error'
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

const createLeagueBodySchema = z.object({
  name: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createLeagueBodySchema)

type CreateLeagueBodySchema = z.infer<typeof createLeagueBodySchema>

@Controller('/countries/:countryId/leagues')
export class CreateLeagueController {
  constructor(private readonly createLeague: CreateLeagueUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: CreateLeagueBodySchema,
    @Param('countryId') countryId: string,
  ) {
    const { name } = body

    const result = await this.createLeague.execute({
      name,
      countryId,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case LeagueAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
