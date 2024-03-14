import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { CountryFactory } from 'test/factories/make-country'
import { LeagueFactory } from 'test/factories/make-league'
import { UserFactory } from 'test/factories/make-user'

describe('Create league (E2E)', () => {
  let app: INestApplication
  let userFactory: UserFactory
  let countryFactory: CountryFactory
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, LeagueFactory, CountryFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    userFactory = moduleRef.get<UserFactory>(UserFactory)
    countryFactory = moduleRef.get<CountryFactory>(CountryFactory)

    prisma = moduleRef.get<PrismaService>(PrismaService)
    jwt = moduleRef.get<JwtService>(JwtService)

    await app.init()
  })

  test('[POST] /countries/:countryId/leagues', async () => {
    const user = await userFactory.makePrismaUser()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const country = await countryFactory.makePrismaCountry()

    const response = await request(app.getHttpServer())
      .post(`/countries/${country.id}/leagues`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Portugal',
      })

    expect(response.status).toBe(201)

    const leagueOnDatabase = await prisma.league.findFirst({
      where: {
        name: 'Portugal',
      },
    })

    expect(leagueOnDatabase).toBeTruthy()
  })
})
