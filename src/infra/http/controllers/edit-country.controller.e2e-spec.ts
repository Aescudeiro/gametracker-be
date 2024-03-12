import { AppModule } from "@/infra/app.module";
import { DatabaseModule } from "@/infra/database/database.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { CountryFactory } from "test/factories/make-country";
import { UserFactory } from "test/factories/make-user";

describe("Edit country (E2E)", () => {
  let app: INestApplication;
  let userFactory: UserFactory;
  let countryFactory: CountryFactory;
  let prisma: PrismaService;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, CountryFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    userFactory = moduleRef.get<UserFactory>(UserFactory);
    countryFactory = moduleRef.get<CountryFactory>(CountryFactory);
    prisma = moduleRef.get<PrismaService>(PrismaService);
    jwt = moduleRef.get<JwtService>(JwtService);

    await app.init();
  });

  test("[put] /countries/:id", async () => {
    const user = await userFactory.makePrismaUser();

    const accessToken = jwt.sign({ sub: user.id.toString() });

    const country = await countryFactory.makePrismaCountry();
    const countryId = country.id.toString();

    const response = await request(app.getHttpServer())
      .put(`/countries/${countryId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "Portugal",
        alpha: "PT",
      });

    expect(response.status).toBe(204);

    const countryOnDatabase = await prisma.country.findFirst({
      where: {
        alpha: "PT",
        name: "Portugal",
      },
    });

    expect(countryOnDatabase).toBeTruthy();
  });
});
