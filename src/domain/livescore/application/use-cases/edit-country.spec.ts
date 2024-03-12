import { InMemoryCountriesRepository } from 'test/repositories/in-memory-countries-repository'
import { makeCountry } from 'test/factories/make-country'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { EditCountryUseCase } from './edit-country'

let inMemoryCountriesRepository: InMemoryCountriesRepository
let sut: EditCountryUseCase

describe('Edit country', () => {
  beforeEach(() => {
    inMemoryCountriesRepository = new InMemoryCountriesRepository()
    sut = new EditCountryUseCase(inMemoryCountriesRepository)
  })

  it('should be able to edit a country', async () => {
    const newCountry = makeCountry({}, new UniqueEntityID('country-1'))

    await inMemoryCountriesRepository.create(newCountry)

    await sut.execute({
      countryId: newCountry.id.toString(),
      name: 'Brazil',
      alpha: 'BR',
    })

    expect(inMemoryCountriesRepository.items[0]).toMatchObject({
      name: 'Brazil',
      alpha: 'BR',
    })
  })
})
