import { PaginationParams } from '@/core/repositories/pagination-params'
import { LeaguesRepository } from '@/domain/livescore/application/repositories/leagues-repository'
import { League } from '@/domain/livescore/enterprise/entities/league'

export class InMemoryLeaguesRepository implements LeaguesRepository {
  public items: League[] = []

  async create(league: League): Promise<void> {
    this.items.push(league)
  }

  async findBySlug(slug: string): Promise<League | null> {
    const league = this.items.find((league) => league.slug.value === slug)

    if (!league) {
      return null
    }

    return league
  }

  async findById(id: string): Promise<League | null> {
    const league = this.items.find((league) => league.id.toString() === id)

    if (!league) {
      return null
    }

    return league
  }

  async findMany({ page }: PaginationParams): Promise<League[]> {
    const leagues = this.items.slice((page - 1) * 20, page * 20)

    return leagues
  }

  async findManyByCountryId(
    countryId: string,
    { page }: PaginationParams,
  ): Promise<League[]> {
    const leagues = this.items.filter(
      (league) => league.countryId.toString() === countryId,
    )

    return leagues.slice((page - 1) * 20, page * 20)
  }

  async delete(league: League): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === league.id)

    this.items.splice(itemIndex, 1)
  }

  async save(league: League): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === league.id)

    this.items[itemIndex] = league
  }
}
