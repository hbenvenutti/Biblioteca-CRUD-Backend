import 'reflect-metadata';

import { AppError } from '@errors/App.error';
import { UsersRepositoryInterface } from '@accounts:repositories-interfaces/UsersRepository.interface';
import { UsersRepositoryMock } from '@accounts:repositories-interfaces/mock/UsersRepository.mock';

import { CreateUserService } from '@accounts:use-cases/users/create-user/CreateUser.service';

// ---------------------------------------------------------------------------------------------- //

describe('Create User Service', () => {
  let usersRepository: UsersRepositoryInterface;
  let createUserService: CreateUserService;

  beforeEach(() => {
    usersRepository = new UsersRepositoryMock();
    createUserService = new CreateUserService(usersRepository);
  });

  it('should fail if passwords don\'t match', async () => {
    const user = {
      name: 'john',
      lastName: 'doe',
      email: 'johndoe@email.com',
      password: '@Hçflkdçfl151',
      passwordConfirmation: 'Password2'
    };

    expect(async () => {
      await createUserService.execute(user);
    })
      .rejects.toEqual(new AppError('Passwords don\'t match'));
  });
});
