import { PaginationParams } from '@/core/repositories/pagination-params'
import { LeaguesRepository } from '@/domain/livescore/application/repositories/leagues-repository'
import { League } from '@/domain/livescore/enterprise/entities/league'
import { Injectable } from '@nestjs/common'
import { PrismaLeagueMapper } from '../mappers/prisma-league-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaLeaguesRepository implements LeaguesRepository {
  constructor(private readonly prismaSerivce: PrismaService) {}

  async create(league: League): Promise<void> {
    const data = PrismaLeagueMapper.toPrisma(league)

    await this.prismaSerivce.league.create({
      data,
    })
  }

  async findBySlug(slug: string): Promise<League | null> {
    const league = await this.prismaSerivce.league.findUnique({
      where: {
        slug,
      },
    })

    if (!league) {
      return null
    }

    return PrismaLeagueMapper.toDomain(league)
  }

  async findById(id: string): Promise<League | null> {
    const league = await this.prismaSerivce.league.findUnique({
      where: {
        id,
      },
    })

    if (!league) {
      return null
    }

    return PrismaLeagueMapper.toDomain(league)
  }

  async findMany({ page }: PaginationParams): Promise<League[]> {
    const leagues = await this.prismaSerivce.league.findMany({
      take: 20,
      skip: (page - 1) * 20,
    })

    return leagues.map(PrismaLeagueMapper.toDomain)
  }

  async findManyByCountryId(
    countryId: string,
    { page }: PaginationParams,
  ): Promise<League[]> {
    const leagues = await this.prismaSerivce.league.findMany({
      where: {
        countryId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return leagues.map(PrismaLeagueMapper.toDomain)
  }

  async delete(league: League): Promise<void> {
    const data = PrismaLeagueMapper.toPrisma(league)

    await this.prismaSerivce.league.delete({
      where: {
        id: data.id,
      },
    })
  }

  async save(league: League): Promise<void> {
    const data = PrismaLeagueMapper.toPrisma(league)

    await this.prismaSerivce.league.update({
      where: {
        id: data.id,
      },
      data,
    })
  }
}
