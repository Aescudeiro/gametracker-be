import { Either, left, right } from "@/core/either";
import { CountriesRepository } from "../repositories/countries-repository";
import { Country } from "@/domain/livescore/enterprise/entities/country";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";

interface EditCountryUseCaseRequest {
  countryId: string;
  name?: string;
  alpha?: string;
}

type EditCountryUseCaseResponse = Either<
  ResourceNotFoundError,
  { country: Country }
>;

export class EditCountryUseCase {
  constructor(private countryRepository: CountriesRepository) {}

  async execute({
    countryId,
    alpha,
    name,
  }: EditCountryUseCaseRequest): Promise<EditCountryUseCaseResponse> {
    const country = await this.countryRepository.findById(countryId);

    if (!country) {
      return left(new ResourceNotFoundError());
    }

    if (name) {
      country.name = name;
    }

    if (alpha) {
      country.alpha = alpha;
    }

    await this.countryRepository.save(country);

    return right({ country });
  }
}
