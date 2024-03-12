import { GetCountryBySlugUseCase } from './get-country-by-slug'
import { InMemoryCountriesRepository } from 'test/repositories/in-memory-countries-repository'
import { makeCountry } from 'test/factories/make-country'
import { Slug } from '@/domain/livescore/enterprise/entities/value-objects/slug'

let inMemoryCountriesRepository: InMemoryCountriesRepository
let sut: GetCountryBySlugUseCase

describe('Get Country By Slug', () => {
  beforeEach(() => {
    inMemoryCountriesRepository = new InMemoryCountriesRepository()
    sut = new GetCountryBySlugUseCase(inMemoryCountriesRepository)
  })

  it('should be able to get a country by slug', async () => {
    const newCountry = makeCountry({
      slug: Slug.create('example-country'),
    })

    await inMemoryCountriesRepository.create(newCountry)

    const result = await sut.execute({
      slug: newCountry.slug.value,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.country).toBe(newCountry)
  })
})
