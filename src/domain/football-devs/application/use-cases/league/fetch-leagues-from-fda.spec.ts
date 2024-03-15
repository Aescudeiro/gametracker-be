import { makeFDALeague } from 'test/factories/make-fda-league'
import { InMemoryFDALeaguesRepository } from 'test/repositories/in-memory-fda-leagues-repository'
import { FetchLeaguesFromFDAUseCase } from './fetch-leagues-from-fda'

let inMemoryFDALeaguesRepository: InMemoryFDALeaguesRepository
let sut: FetchLeaguesFromFDAUseCase

describe('fetch leagues from FDA', () => {
  beforeEach(() => {
    inMemoryFDALeaguesRepository = new InMemoryFDALeaguesRepository()
    sut = new FetchLeaguesFromFDAUseCase(inMemoryFDALeaguesRepository)
  })

  it('should be able to fetch leagues from FDA', async () => {
    await Promise.all([
      await inMemoryFDALeaguesRepository.create(makeFDALeague()),
      await inMemoryFDALeaguesRepository.create(makeFDALeague()),
      await inMemoryFDALeaguesRepository.create(makeFDALeague()),
      await inMemoryFDALeaguesRepository.create(makeFDALeague()),
    ])

    const result = await sut.execute({ page: 1 })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.leagues).toHaveLength(4)
  })

  it('should be able to fetch leagues from FDA with pagination', async () => {
    for (let i = 0; i < 22; i++) {
      await inMemoryFDALeaguesRepository.create(makeFDALeague())
    }

    const result = await sut.execute({ page: 2 })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.leagues).toHaveLength(2)
  })
})
