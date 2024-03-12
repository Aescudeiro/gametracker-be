import { BadRequestException, Controller, Get, Query } from "@nestjs/common";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { z } from "zod";
import { FetchCountriesUseCase } from "@/domain/livescore/application/use-cases/fetch-countries";
import { CountryPresenter } from "../presenters/country-presenter";

const pageQueryParamSchema = z
  .string()
  .optional()
  .default("1")
  .transform(Number)
  .pipe(z.number().min(1));

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema);

type PageQueryParamsSchema = z.infer<typeof pageQueryParamSchema>;

@Controller("/countries")
export class FetchCountriesController {
  constructor(private readonly fetchCountries: FetchCountriesUseCase) {}

  @Get()
  async handle(
    @Query("page", queryValidationPipe) page: PageQueryParamsSchema,
  ) {
    const result = await this.fetchCountries.execute({
      page,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const countries = result.value.countries;

    return { countries: countries.map(CountryPresenter.toHTTP) };
  }
}
