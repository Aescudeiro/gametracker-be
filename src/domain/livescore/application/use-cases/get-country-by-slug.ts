import { Country } from "@/domain/livescore/enterprise/entities/country";
import { CountriesRepository } from "../repositories/countries-repository";
import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";

interface GetCountryBySlugUseCaseRequest {
  slug: string;
}

type GetCountryBySlugUseCaseResponse = Either<
  ResourceNotFoundError,
  { country: Country }
>;

export class GetCountryBySlugUseCase {
  constructor(private countryRepository: CountriesRepository) {}

  async execute({
    slug,
  }: GetCountryBySlugUseCaseRequest): Promise<GetCountryBySlugUseCaseResponse> {
    const country = await this.countryRepository.findBySlug(slug);

    if (!country) {
      return left(new ResourceNotFoundError());
    }

    return right({ country });
  }
}
