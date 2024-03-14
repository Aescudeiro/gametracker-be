import { CountriesRepository } from '@/domain/livescore/application/repositories/countries-repository'
import { LeaguesRepository } from '@/domain/livescore/application/repositories/leagues-repository'
import { UsersRepository } from '@/domain/livescore/application/repositories/users-repository'
import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaCountriesRepository } from './prisma/repositories/countries-repository'
import { PrismaLeaguesRepository } from './prisma/repositories/leagues-repository'
import { PrismaUsersRepository } from './prisma/repositories/users-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: CountriesRepository,
      useClass: PrismaCountriesRepository,
    },
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: LeaguesRepository,
      useClass: PrismaLeaguesRepository,
    },
  ],
  exports: [
    PrismaService,
    CountriesRepository,
    UsersRepository,
    LeaguesRepository,
  ],
})
export class DatabaseModule {}
