import { BadRequestException, Controller, Get, Param } from "@nestjs/common";
import { CountryPresenter } from "../presenters/country-presenter";
import { GetCountryBySlugUseCase } from "@/domain/livescore/application/use-cases/get-country-by-slug";

@Controller("/countries/:slug")
export class GetCountryBySlugController {
  constructor(private readonly getCountryBySlug: GetCountryBySlugUseCase) {}

  @Get()
  async handle(@Param("slug") slug: string) {
    const result = await this.getCountryBySlug.execute({
      slug,
    });

    console.log(result);

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    return { country: CountryPresenter.toHTTP(result.value.country) };
  }
}