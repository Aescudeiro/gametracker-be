import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { UsersRepository } from "@/domain/livescore/application/repositories/users-repository";
import { User } from "@/domain/livescore/enterprise/entities/user";
import { PrismaUserMapper } from "../mappers/prisma-user-mapper";

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prismaSerivce: PrismaService) {}

  async create(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user);

    await this.prismaSerivce.user.create({
      data,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaSerivce.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }
}
