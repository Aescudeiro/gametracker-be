import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { CountryFactory } from 'test/factories/make-country'
import { UserFactory } from 'test/factories/make-user'

describe('Fetch leagues from FDA (E2E)', () => {
  let app: INestApplication
  let jwt: JwtService
  let userFactory: UserFactory
  let countryFactory: CountryFactory
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, CountryFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    userFactory = moduleRef.get<UserFactory>(UserFactory)
    countryFactory = moduleRef.get<CountryFactory>(CountryFactory)
    jwt = moduleRef.get<JwtService>(JwtService)
    prisma = moduleRef.get<PrismaService>(PrismaService)

    await app.init()
  })

  test('[GET] /fda-leagues', async () => {
    const user = await userFactory.makePrismaUser()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    await Promise.all([
      countryFactory.makePrismaCountry({ name: 'Oman', alpha: 'PT' }),
      countryFactory.makePrismaCountry({ name: 'Wales', alpha: 'ES' }),
    ])

    const response = await request(app.getHttpServer())
      .get('/fda-leagues')
      .set('Authorization', `Bearer ${accessToken}`)

    const leagues = await prisma.league.findMany()

    expect(response.status).toBe(200)
    expect(leagues.length).toBeGreaterThan(1)
  })
})
