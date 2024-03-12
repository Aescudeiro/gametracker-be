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

  test("[POST] /countries", async () => {
    const user = await prisma.user.create({
      data: {
        name: "John Doe",
        email: "johndoe@example.com",
        password: await hash("123456", 8),
      },
    });

    const accessToken = jwt.sign({ sub: user.id });

    const response = await request(app.getHttpServer())
      .post("/countries")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "Portugal",
        alpha: "PT",
        hash_image: "hash",
      });

    expect(response.status).toBe(201);

    const countryOnDatabase = await prisma.country.findFirst({
      where: {
        alpha: "PT",
        name: "Portugal",
        hashImage: "hash",
      },
    });

    expect(countryOnDatabase).toBeTruthy();
  });
});
