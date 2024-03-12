import { Either, left, right } from '@/core/either'
import { Country } from '@/domain/livescore/enterprise/entities/country'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { CountriesRepository } from '@/domain/livescore/application/repositories/countries-repository'

interface EditCountryUseCaseRequest {
  countryId: string
  name?: string
  alpha?: string
}

type EditCountryUseCaseResponse = Either<
  ResourceNotFoundError,
  { country: Country }
>

@Injectable()
export class EditCountryUseCase {
  constructor(private countryRepository: CountriesRepository) {}

  async execute({
    countryId,
    alpha,
    name,
  }: EditCountryUseCaseRequest): Promise<EditCountryUseCaseResponse> {
    const country = await this.countryRepository.findById(countryId)

    if (!country) {
      return left(new ResourceNotFoundError())
    }

    if (name) {
      country.name = name
    }

    if (alpha) {
      country.alpha = alpha
    }

    await this.countryRepository.save(country)

    return right({ country })
  }
}
