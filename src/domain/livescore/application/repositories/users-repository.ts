import { User } from "@/domain/livescore/enterprise/entities/user";

export abstract class UsersRepository {
  abstract create(user: User): Promise<void>;

  abstract findByEmail(id: string): Promise<User | null>;
}
