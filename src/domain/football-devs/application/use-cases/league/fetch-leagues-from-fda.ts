import { Either, right } from '@/core/either'
import { FDALeaguesRepository } from '@/domain/football-devs/application/repositories/fda-leagues-repository'
import { FDALeague } from '@/domain/football-devs/enterprise/entities/fda-league'
import { Injectable } from '@nestjs/common'

interface FetchLeaguesFromFDAUseCaseRequest {
  page: number
}

type FetchLeaguesFromFDAUseCaseResponse = Either<null, { leagues: FDALeague[] }>

@Injectable()
export class FetchLeaguesFromFDAUseCase {
  constructor(private fdaLeagueRepository: FDALeaguesRepository) {}

  async execute({
    page,
  }: FetchLeaguesFromFDAUseCaseRequest): Promise<FetchLeaguesFromFDAUseCaseResponse> {
    const leagues = await this.fdaLeagueRepository.fetchMany({ page })

    return right({ leagues })
  }
}
