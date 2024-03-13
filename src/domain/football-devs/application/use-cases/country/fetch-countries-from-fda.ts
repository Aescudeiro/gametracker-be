import { FDACountry } from '@/domain/football-devs/enterprise/entities/fda-country'
import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { FDACountriesRepository } from '@/domain/football-devs/application/repositories/fda-countries-repository'

interface FetchCountriesFromFDAUseCaseRequest {
  page: number
}

type FetchCountriesFromFDAUseCaseResponse = Either<
  null,
  { countries: FDACountry[] }
>

@Injectable()
export class FetchCountriesFromFDAUseCase {
  constructor(private fdaCountryRepository: FDACountriesRepository) {}

  async execute({
    page,
  }: FetchCountriesFromFDAUseCaseRequest): Promise<FetchCountriesFromFDAUseCaseResponse> {
    const countries = await this.fdaCountryRepository.fetchMany({ page })

    return right({ countries })
  }
}
