import { PaginationParams } from '@/core/repositories/pagination-params'
import { League } from '../../enterprise/entities/league'

export abstract class LeaguesRepository {
  abstract create(league: League): Promise<void>

  abstract findBySlug(slug: string): Promise<League | null>

  abstract findById(id: string): Promise<League | null>

  abstract findMany(params: PaginationParams): Promise<League[]>

  abstract findManyByCountryId(
    countryId: string,
    params: PaginationParams,
  ): Promise<League[]>

  abstract delete(league: League): Promise<void>

  abstract save(league: League): Promise<void>
}
