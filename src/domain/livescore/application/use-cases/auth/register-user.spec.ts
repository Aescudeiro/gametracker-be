import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository copy'
import { RegisterUserUseCase } from './register-user'
import { FakeHasher } from 'test/cryptography/fake-hasher'

let inMemoryUsersRepository: InMemoryUsersRepository
let fakeHasher: FakeHasher
let sut: RegisterUserUseCase

describe('Register User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    fakeHasher = new FakeHasher()
    sut = new RegisterUserUseCase(inMemoryUsersRepository, fakeHasher)
  })

  it('should be able to register a new user', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345',
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual({ user: inMemoryUsersRepository.items[0] })
  })

  it('should hash user password upon registration', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345',
    })

    const hashedPassword = await fakeHasher.hash('12345')

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryUsersRepository.items[0].password).toEqual(hashedPassword)
  })
})