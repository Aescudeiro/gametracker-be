import { InMemoryFDACountriesRepository } from 'test/repositories/in-memory-fda-countries-repository'
import { FetchCountriesFromFDAUseCase } from './fetch-countries-from-fda'
import { makeFDACountry } from 'test/factories/make-fda-country'

let inMemoryFDACountriesRepository: InMemoryFDACountriesRepository
let sut: FetchCountriesFromFDAUseCase

describe('fetch countries from FDA', () => {
  beforeEach(() => {
    inMemoryFDACountriesRepository = new InMemoryFDACountriesRepository()
    sut = new FetchCountriesFromFDAUseCase(inMemoryFDACountriesRepository)
  })

  it('should be able to fetch countries from FDA', async () => {
    await Promise.all([
      await inMemoryFDACountriesRepository.create(makeFDACountry()),
      await inMemoryFDACountriesRepository.create(makeFDACountry()),
      await inMemoryFDACountriesRepository.create(makeFDACountry()),
      await inMemoryFDACountriesRepository.create(makeFDACountry()),
    ])

    const result = await sut.execute({ page: 1 })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.countries).toHaveLength(4)
  })

  it('should be able to fetch countries from FDA with pagination', async () => {
    for (let i = 0; i < 22; i++) {
      await inMemoryFDACountriesRepository.create(makeFDACountry())
    }

    const result = await sut.execute({ page: 2 })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.countries).toHaveLength(2)
  })
})
