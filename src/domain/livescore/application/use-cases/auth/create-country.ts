import { Country } from '@/domain/livescore/enterprise/entities/country'
import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { CountryAlreadyExistsError } from '@/domain/livescore/application/use-cases/country/errors/country-already-exists-error'
import { CountriesRepository } from '@/domain/livescore/application/repositories/countries-repository'
import { Slug } from '@/domain/livescore/enterprise/entities/value-objects/slug'

interface CreateCountryUseCaseRequest {
  name: string
  alpha: string
}

type CreateCountryUseCaseResponse = Either<
  CountryAlreadyExistsError,
  { country: Country }
>

@Injectable()
export class CreateCountryUseCase {
  constructor(private countryRepository: CountriesRepository) {}

  async execute({
    name,
    alpha,
  }: CreateCountryUseCaseRequest): Promise<CreateCountryUseCaseResponse> {
    const countryWithSameName = await this.countryRepository.findBySlug(
      Slug.createFromText(name).value,
    )

    if (countryWithSameName) {
      return left(new CountryAlreadyExistsError(name))
    }

    const country = Country.create({
      name,
      alpha,
    })

    await this.countryRepository.create(country)

    return right({ country })
  }
}
