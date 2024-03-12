import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository copy'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { FakeEcrypter } from 'test/cryptography/fake-encrypter'
import { AuthenticateUserUseCase } from './authenticate-user'
import { makeUser } from 'test/factories/make-user'

let inMemoryUsersRepository: InMemoryUsersRepository
let fakeHasher: FakeHasher
let fakeEncrypter: FakeEcrypter
let sut: AuthenticateUserUseCase

describe('Authenticate User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    fakeHasher = new FakeHasher()
    fakeEncrypter = new FakeEcrypter()
    sut = new AuthenticateUserUseCase(
      inMemoryUsersRepository,
      fakeHasher,
      fakeEncrypter,
    )
  })

  it('should be able to authenticate a user', async () => {
    const user = makeUser({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('12345'),
    })

    inMemoryUsersRepository.create(user)

    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '12345',
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })
})
