import { PaginationParams } from '@/core/repositories/pagination-params'
import { CountriesRepository } from '@/domain/livescore/application/repositories/countries-repository'
import { Country } from '@/domain/livescore/enterprise/entities/country'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaCountryMapper } from '../mappers/prisma-country-mapper'

@Injectable()
export class PrismaCountriesRepository implements CountriesRepository {
  constructor(private readonly prismaSerivce: PrismaService) {}

  async create(country: Country): Promise<void> {
    const data = PrismaCountryMapper.toPrisma(country)

    await this.prismaSerivce.country.create({
      data,
    })
  }

  async findBySlug(slug: string): Promise<Country | null> {
    const country = await this.prismaSerivce.country.findUnique({
      where: {
        slug,
      },
    })

    if (!country) {
      return null
    }

    return PrismaCountryMapper.toDomain(country)
  }

  async findById(id: string): Promise<Country | null> {
    const country = await this.prismaSerivce.country.findUnique({
      where: {
        id,
      },
    })

    if (!country) {
      return null
    }

    return PrismaCountryMapper.toDomain(country)
  }

  async findMany({ page }: PaginationParams): Promise<Country[]> {
    const countries = await this.prismaSerivce.country.findMany({
      take: 20,
      skip: (page - 1) * 20,
    })

    return countries.map(PrismaCountryMapper.toDomain)
  }

  async delete(country: Country): Promise<void> {
    const data = PrismaCountryMapper.toPrisma(country)

    await this.prismaSerivce.country.delete({
      where: {
        id: data.id,
      },
    })
  }

  async save(country: Country): Promise<void> {
    const data = PrismaCountryMapper.toPrisma(country)

    await this.prismaSerivce.country.update({
      where: {
        id: data.id,
      },
      data,
    })
  }
}
