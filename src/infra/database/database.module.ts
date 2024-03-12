import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaCountriesRepository } from './prisma/repositories/countries-repository'
import { CountriesRepository } from '@/domain/livescore/application/repositories/countries-repository'
import { UsersRepository } from '@/domain/livescore/application/repositories/users-repository'
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
  ],
  exports: [PrismaService, CountriesRepository, UsersRepository],
})
export class DatabaseModule {}
