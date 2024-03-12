import { Encrypter } from '@/domain/livescore/application/cryptography/encrypter'
import { Module } from '@nestjs/common'
import { JwtEncryptor } from './jwt-encryptor'
import { HashComparer } from '@/domain/livescore/application/cryptography/hash-comparer'
import { BcryptHasher } from './bcrypt-hasher'
import { HashGenerator } from '@/domain/livescore/application/cryptography/hash-generator'

@Module({
  providers: [
    {
      provide: Encrypter,
      useClass: JwtEncryptor,
    },
    {
      provide: HashComparer,
      useClass: BcryptHasher,
    },
    {
      provide: HashGenerator,
      useClass: BcryptHasher,
    },
  ],
  exports: [Encrypter, HashComparer, HashGenerator],
})
export class CryptographyModule {}
