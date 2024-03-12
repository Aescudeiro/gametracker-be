import { Country } from "@/domain/livescore/enterprise/entities/country";
import { CountriesRepository } from "../repositories/countries-repository";
import { Either, right } from "@/core/either";
import { Injectable } from "@nestjs/common";

interface FetchCountriesUseCaseRequest {
  page: number;
}

type FetchCountriesUseCaseResponse = Either<null, { countries: Country[] }>;

@Injectable()
export class FetchCountriesUseCase {
  constructor(private countryRepository: CountriesRepository) {}

  async execute({
    page,
  }: FetchCountriesUseCaseRequest): Promise<FetchCountriesUseCaseResponse> {
    const countries = await this.countryRepository.findMany({ page });

    return right({ countries });
  }
}
