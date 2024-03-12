import { Either, left, right } from '@/core/either'
import { CountriesRepository } from '../repositories/countries-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'

interface DeleteCountryUseCaseRequest {
  countryId: string
}

type DeleteCountryUseCaseResponse = Either<ResourceNotFoundError, unknown>

@Injectable()
export class DeleteCountryUseCase {
  constructor(private countryRepository: CountriesRepository) {}

  async execute({
    countryId,
  }: DeleteCountryUseCaseRequest): Promise<DeleteCountryUseCaseResponse> {
    const country = await this.countryRepository.findById(countryId)

    if (!country) {
      return left(new ResourceNotFoundError())
    }

    await this.countryRepository.delete(country)

    return right({})
  }
}
