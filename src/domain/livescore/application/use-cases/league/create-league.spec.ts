import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeCountry } from 'test/factories/make-country'
import { InMemoryLeaguesRepository } from 'test/repositories/in-memory-leagues-repository'
import { CreateLeagueUseCase } from './create-league'

let inMemoryLeaguesRepository: InMemoryLeaguesRepository
let sut: CreateLeagueUseCase

describe('Create League', () => {
  beforeEach(() => {
    inMemoryLeaguesRepository = new InMemoryLeaguesRepository()
    sut = new CreateLeagueUseCase(inMemoryLeaguesRepository)
  })

  it('should be able to create a league', async () => {
    const country = makeCountry({}, new UniqueEntityID('country-1'))

    const result = await sut.execute({
      name: 'Primeira Liga',
      countryId: country.id,
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryLeaguesRepository.items[0]).toEqual(result.value?.league)
  })
})
