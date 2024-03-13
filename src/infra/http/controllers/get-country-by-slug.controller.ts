import { GetCountryBySlugUseCase } from '@/domain/livescore/application/use-cases/country/get-country-by-slug'
import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { CountryPresenter } from '../presenters/country-presenter'

@Controller('/countries/:slug')
export class GetCountryBySlugController {
  constructor(private readonly getCountryBySlug: GetCountryBySlugUseCase) {}

  @Get()
  async handle(@Param('slug') slug: string) {
    const result = await this.getCountryBySlug.execute({
      slug,
    })

    if (result.isLeft()) {
      throw new BadRequestException(result.value.message)
    }

    return { country: CountryPresenter.toHTTP(result.value.country) }
  }
}
