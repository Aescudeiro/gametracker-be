import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { UserFactory } from 'test/factories/make-user'

describe('Fetch countries from FDA (E2E)', () => {
  let app: INestApplication
  let jwt: JwtService
  let userFactory: UserFactory
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    userFactory = moduleRef.get<UserFactory>(UserFactory)
    jwt = moduleRef.get<JwtService>(JwtService)
    prisma = moduleRef.get<PrismaService>(PrismaService)

    await app.init()
  })

  test('[GET] /fda-countries', async () => {
    const user = await userFactory.makePrismaUser()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const response = await request(app.getHttpServer())
      .get('/fda-countries')
      .set('Authorization', `Bearer ${accessToken}`)

    const countries = await prisma.country.findMany()

    expect(response.status).toBe(200)
    expect(countries.length).toBeGreaterThan(1)
  })
})
