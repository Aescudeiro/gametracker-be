import { AppModule } from "@/infra/app.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import { hash } from "bcryptjs";
import request from "supertest";

describe("Create country (E2E)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get<PrismaService>(PrismaService);
    jwt = moduleRef.get<JwtService>(JwtService);

    await app.init();
  });

  test("[GET] /countries", async () => {
    const user = await prisma.user.create({
      data: {
        name: "John Doe",
        email: "johndoe@example.com",
        password: await hash("123456", 8),
      },
    });

    const accessToken = jwt.sign({ sub: user.id.toString() });

    await prisma.country.createMany({
      data: [
        {
          name: "Portugal",
          alpha: "PT",
          slug: "portugal",
        },
        {
          name: "Spain",
          alpha: "ES",
          slug: "spain",
        },
      ],
    });

    const response = await request(app.getHttpServer())
      .get("/countries")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      countries: [
        expect.objectContaining({
          name: "Portugal",
        }),
        expect.objectContaining({
          name: "Spain",
        }),
      ],
    });
  });
});
