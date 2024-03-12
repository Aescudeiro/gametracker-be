import { Encrypter } from "@/domain/livescore/application/cryptography/encrypter";

export class FakeEcrypter implements Encrypter {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return JSON.stringify(payload);
  }
}
