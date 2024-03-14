import { FetchCountriesFromFDAUseCase } from '@/domain/football-devs/application/use-cases/country/fetch-countries-from-fda'
import { CreateCountryUseCase } from '@/domain/livescore/application/use-cases/country/create-country'
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

@Controller('/fda-countries')
export class FetchCountriesFromFDAController {
  constructor(
    private readonly fetchCountriesFromFDA: FetchCountriesFromFDAUseCase,
    private readonly createCountry: CreateCountryUseCase,
  ) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamsSchema,
  ) {
    const result = await this.fetchCountriesFromFDA.execute({
      page,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    for (const country of result.value.countries) {
      if (!country.name) {
        continue
      }

      await this.createCountry.execute({
        name: country.name,
        alpha: country.alpha,
      })
    }
  }
}
