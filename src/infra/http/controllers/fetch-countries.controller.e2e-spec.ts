import { AppModule } from "@/infra/app.module";
import { DatabaseModule } from "@/infra/database/database.module";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { CountryFactory } from "test/factories/make-country";
import { UserFactory } from "test/factories/make-user";

describe("Fetch countries (E2E)", () => {
  let app: INestApplication;
  let jwt: JwtService;
  let userFactory: UserFactory;
  let countryFactory: CountryFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, CountryFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    userFactory = moduleRef.get<UserFactory>(UserFactory);
    countryFactory = moduleRef.get<CountryFactory>(CountryFactory);
    jwt = moduleRef.get<JwtService>(JwtService);

    await app.init();
  });

  test("[GET] /countries", async () => {
    const user = await userFactory.makePrismaUser();

    const accessToken = jwt.sign({ sub: user.id.toString() });

    const countries = await Promise.all([
      countryFactory.makePrismaCountry(),
      countryFactory.makePrismaCountry(),
    ]);

    const response = await request(app.getHttpServer())
      .get("/countries")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      countries: [
        expect.objectContaining({
          name: countries[0].name,
        }),
        expect.objectContaining({
          name: countries[1].name,
        }),
      ],
    });
  });
});
