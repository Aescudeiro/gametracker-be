import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { League } from '@/domain/livescore/enterprise/entities/league'
import { Slug } from '@/domain/livescore/enterprise/entities/value-objects/slug'
import { Prisma, League as PrismaLeague } from '@prisma/client'

export class PrismaLeagueMapper {
  static toDomain(raw: PrismaLeague): League {
    return League.create(
      {
        name: raw.name,
        countryId: new UniqueEntityID(raw.countryId),
        slug: Slug.create(raw.slug),
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(league: League): Prisma.LeagueUncheckedCreateInput {
    return {
      id: league.id.toString(),
      name: league.name,
      countryId: league.countryId.toString(),
      slug: league.slug.value,
    }
  }
}
