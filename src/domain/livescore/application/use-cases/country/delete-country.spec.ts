import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeCountry } from 'test/factories/make-country'
import { InMemoryCountriesRepository } from 'test/repositories/in-memory-countries-repository'
import { DeleteCountryUseCase } from './delete-country'

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

    const result = await sut.execute({
      countryId: newCountry.id.toString(),
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryCountriesRepository.items).toHaveLength(0)
  })
})
