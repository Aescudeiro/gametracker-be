import { InMemoryCountriesRepository } from 'test/repositories/in-memory-countries-repository'
import { makeCountry } from 'test/factories/make-country'
import { DeleteCountryUseCase } from './delete-country'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryCountriesRepository: InMemoryCountriesRepository
let sut: DeleteCountryUseCase

describe('Delete country', () => {
  beforeEach(() => {
    inMemoryCountriesRepository = new InMemoryCountriesRepository()
    sut = new DeleteCountryUseCase(inMemoryCountriesRepository)
  })

  it('should be able to delete a country', async () => {
    const newCountry = makeCountry({}, new UniqueEntityID('country-1'))

    await inMemoryCountriesRepository.create(newCountry)

    await sut.execute({
      countryId: newCountry.id.toString(),
    })

    expect(inMemoryCountriesRepository.items).toHaveLength(0)
  })
})
