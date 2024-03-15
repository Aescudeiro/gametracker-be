import { PaginationParams } from '@/core/repositories/pagination-params'
import { FDALeaguesRepository } from '@/domain/football-devs/application/repositories/fda-leagues-repository'
import { FDALeague } from '@/domain/football-devs/enterprise/entities/fda-league'

export class InMemoryFDALeaguesRepository implements FDALeaguesRepository {
  public items: FDALeague[] = []

  async create(league: FDALeague): Promise<void> {
    this.items.push(league)
  }

  async fetchMany({ page }: PaginationParams): Promise<FDALeague[]> {
    const leagues = this.items.slice((page - 1) * 20, page * 20)

    return leagues
  }
}
