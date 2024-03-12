import { Country } from '@/domain/livescore/enterprise/entities/country'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { CountriesRepository } from '@/domain/livescore/application/repositories/countries-repository'

interface GetCountryBySlugUseCaseRequest {
  slug: string
}

type GetCountryBySlugUseCaseResponse = Either<
  ResourceNotFoundError,
  { country: Country }
>

@Injectable()
export class GetCountryBySlugUseCase {
  constructor(private countryRepository: CountriesRepository) {}

  async execute({
    slug,
  }: GetCountryBySlugUseCaseRequest): Promise<GetCountryBySlugUseCaseResponse> {
    const country = await this.countryRepository.findBySlug(slug)

    if (!country) {
      return left(new ResourceNotFoundError())
    }

    return right({ country })
  }
}
