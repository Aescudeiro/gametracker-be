import { InMemoryCountriesRepository } from 'test/repositories/in-memory-countries-repository'
import { makeCountry } from 'test/factories/make-country'
import { FetchCountriesUseCase } from './fetch-countries'

let inMemoryCountriesRepository: InMemoryCountriesRepository
let sut: FetchCountriesUseCase

describe('Fetch countries', () => {
  beforeEach(() => {
    inMemoryCountriesRepository = new InMemoryCountriesRepository()
    sut = new FetchCountriesUseCase(inMemoryCountriesRepository)
  })

  it('should be able to fetch countries', async () => {
    await inMemoryCountriesRepository.create(makeCountry())
    await inMemoryCountriesRepository.create(makeCountry())
    await inMemoryCountriesRepository.create(makeCountry())
    await inMemoryCountriesRepository.create(makeCountry())

    const result = await sut.execute({ page: 1 })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.countries).toHaveLength(4)
  })

  it('should be able to fetch countries with pagination', async () => {
    for (let i = 0; i < 22; i++) {
      await inMemoryCountriesRepository.create(makeCountry())
    }

    const result = await sut.execute({ page: 2 })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.countries).toHaveLength(2)
  })
})
