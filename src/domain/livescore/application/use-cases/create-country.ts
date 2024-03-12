import { Country } from "@/domain/livescore/enterprise/entities/country";
import { CountriesRepository } from "../repositories/countries-repository";
import { Either, left, right } from "@/core/either";
import { Injectable } from "@nestjs/common";
import { CountryAlreadyExistsError } from "./errors/country-already-exists-error";
import { Slug } from "../../enterprise/entities/value-objects/slug";

interface CreateCountryUseCaseRequest {
  name: string;
  alpha: string;
  hashImage: string;
}

type CreateCountryUseCaseResponse = Either<
  CountryAlreadyExistsError,
  { country: Country }
>;

@Injectable()
export class CreateCountryUseCase {
  constructor(private countryRepository: CountriesRepository) {}

  async execute({
    name,
    alpha,
    hashImage,
  }: CreateCountryUseCaseRequest): Promise<CreateCountryUseCaseResponse> {
    const countryWithSameName = await this.countryRepository.findBySlug(
      Slug.createFromText(name).value,
    );

    if (countryWithSameName) {
      return left(new CountryAlreadyExistsError(name));
    }

    const country = Country.create({
      name,
      alpha,
      hashImage,
    });

    await this.countryRepository.create(country);

    return right({ country });
  }
}
