import { FetchLeaguesFromFDAUseCase } from '@/domain/football-devs/application/use-cases/league/fetch-leagues-from-fda'
import { GetCountryBySlugUseCase } from '@/domain/livescore/application/use-cases/country/get-country-by-slug'
import { CreateLeagueUseCase } from '@/domain/livescore/application/use-cases/league/create-league'
import { Slug } from '@/domain/livescore/enterprise/entities/value-objects/slug'
import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamsSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/fda-leagues')
export class FetchLeaguesFromFDAController {
  constructor(
    private readonly fetchLeaguesFromFDA: FetchLeaguesFromFDAUseCase,
    private readonly getCountryBySlug: GetCountryBySlugUseCase,
    private readonly createLeague: CreateLeagueUseCase,
  ) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamsSchema,
  ) {
    const fetchLeaguesFromFDAResult = await this.fetchLeaguesFromFDA.execute({
      page,
    })

    if (fetchLeaguesFromFDAResult.isLeft()) {
      throw new BadRequestException()
    }

    for (const league of fetchLeaguesFromFDAResult.value.leagues) {
      if (!league.name || !league.class_name) {
        continue
      }

      const getCountryBySlugResult = await this.getCountryBySlug.execute({
        slug: Slug.createFromText(league.class_name).value,
      })

      if (getCountryBySlugResult.isLeft()) {
        continue
      }

      await this.createLeague.execute({
        name: league.name,
        countryId: getCountryBySlugResult.value.country.id.toString(),
      })
    }
  }
}
