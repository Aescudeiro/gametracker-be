import { PaginationParams } from '@/core/repositories/pagination-params'
import { FDALeague } from '../../enterprise/entities/fda-league'

export abstract class FDALeaguesRepository {
  abstract fetchMany(params: PaginationParams): Promise<FDALeague[]>
}
