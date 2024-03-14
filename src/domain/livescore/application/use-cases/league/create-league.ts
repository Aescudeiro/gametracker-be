import { Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { League } from '@/domain/livescore/enterprise/entities/league'
import { Slug } from '@/domain/livescore/enterprise/entities/value-objects/slug'
import { Injectable } from '@nestjs/common'
import { LeaguesRepository } from '../../repositories/leagues-repository'
import { LeagueAlreadyExistsError } from './errors/league-already-exists-error'

interface CreateLeagueUseCaseRequest {
  name: string
  countryId: string
}

type CreateLeagueUseCaseResponse = Either<
  LeagueAlreadyExistsError,
  { league: League }
>

@Injectable()
export class CreateLeagueUseCase {
  constructor(private leagueRepository: LeaguesRepository) {}

  async execute({
    name,
    countryId,
  }: CreateLeagueUseCaseRequest): Promise<CreateLeagueUseCaseResponse> {
    const leagueWithSameName = await this.leagueRepository.findBySlug(
      Slug.createFromText(name).value,
    )

    if (leagueWithSameName) {
      return left(new LeagueAlreadyExistsError(name))
    }

    const league = League.create({
      name,
      countryId: new UniqueEntityID(countryId),
    })

    await this.leagueRepository.create(league)

    return right({ league })
  }
}
