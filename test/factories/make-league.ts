import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  League,
  LeagueProps,
} from '@/domain/livescore/enterprise/entities/league'
import { PrismaLeagueMapper } from '@/infra/database/prisma/mappers/prisma-league-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

export function makeLeague(
  override: Partial<LeagueProps> = {},
  id?: UniqueEntityID,
) {
  const country = League.create(
    {
      name: faker.location.country(),
      countryId: new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return country
}

@Injectable()
export class LeagueFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaLeague(data: Partial<LeagueProps> = {}): Promise<League> {
    const league = makeLeague(data)

    await this.prisma.league.create({
      data: PrismaLeagueMapper.toPrisma(league),
    })

    return league
  }
}
