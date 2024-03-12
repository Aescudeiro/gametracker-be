import { CreateCountryUseCase } from './create-country'
import { InMemoryCountriesRepository } from 'test/repositories/in-memory-countries-repository'

let inMemoryCountriesRepository: InMemoryCountriesRepository
let sut: CreateCountryUseCase

describe('Create Country', () => {
  beforeEach(() => {
    inMemoryCountriesRepository = new InMemoryCountriesRepository()
    sut = new CreateCountryUseCase(inMemoryCountriesRepository)
  })

  it('should be able to create a country', async () => {
    const result = await sut.execute({
      name: 'Brazil',
      alpha: 'BR',
      hashImage: 'hash',
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryCountriesRepository.items[0]).toEqual(result.value?.country)
  })
})
