import 'reflect-metadata';

import { CreateUserService } from '@accounts:use-cases/users/create-user/CreateUser.service';
import { EmailInUseError } from '@accounts:errors/EmailInUse.error';
import { UsersRepositoryInterface } from '@accounts:repositories-interfaces/UsersRepository.interface';
import { UsersRepositoryMock } from '@accounts:repositories-interfaces/mock/UsersRepository.mock';
import { PasswordsDontMatchError } from '@accounts:errors/PasswordsDontMatch.error';
import { ValidationMockProvider } from '@shared:containers/providers/validation/Validation.mock.provider';
import { ValidationProviderInterface } from '@shared:containers/providers/validation/Validation.provider.interface';


// ---------------------------------------------------------------------------------------------- //

describe('Create User Service', () => {
  let usersRepository: UsersRepositoryInterface;
  let validationProvider: ValidationProviderInterface;
  let createUserService: CreateUserService;

  beforeEach(() => {
    usersRepository = new UsersRepositoryMock();
    validationProvider = new ValidationMockProvider();
    createUserService = new CreateUserService(usersRepository, validationProvider);
  });

  // ? ---- Successful User Creation ---------------------------------------------------------- ? //

  it('should return a user with an id', async () => {
    const data = {
      name: 'john',
      lastName: 'doe',
      email:'johndoe@email.com',
      password: '@Hçflkdçfl151',
      passwordConfirmation: '@Hçflkdçfl151'
    };

    const user = await createUserService.execute(data);

    expect(user).toHaveProperty('id');
    expect(user.name).toEqual(data.name);
    expect(user.lastName).toEqual(data.lastName);
    expect(user.email).toEqual(data.email);
  });

  // -------------------------------------------------------------------------------------------- //

  it('should return a user without its password', async () => {
    const data = {
      name: 'john',
      lastName: 'doe',
      email:'johndoe@email.com',
      password: '@Hçflkdçfl151',
      passwordConfirmation: '@Hçflkdçfl151'
    };

    const user = await createUserService.execute(data);

    expect(user).not.toHaveProperty('password');
  });

  // ? ---- Data Validation ------------------------------------------------------------------- ? //

  it('should fail if e-mail is already in use', async () => {
    const data = {
      name: 'john',
      lastName: 'doe',
      email: 'johndoe@email.com',
      password: '@Hçflkdçfl151',
      passwordConfirmation: '@Hçflkdçfl151'
    };

    await createUserService.execute(data);

    expect(async () => {
      await createUserService.execute(data);
    })
      .rejects.toEqual(new EmailInUseError());
  });

  // -------------------------------------------------------------------------------------------- //

  it('should fail if passwords don\'t match', async () => {
    const data = {
      name: 'john',
      lastName: 'doe',
      email: 'johndoe@email.com',
      password: '@Hçflkdçfl151',
      passwordConfirmation: 'Password2'
    };

    expect(async () => {
      await createUserService.execute(data);
    })
      .rejects.toEqual(new PasswordsDontMatchError());
  });

  // -------------------------------------------------------------------------------------------- //

  it('should call validation provider', async() => {
    const validateUserCreationData = jest.spyOn(validationProvider, 'validateUserCreationData');

    const data = {
      name: 'john',
      lastName: 'doe',
      email: 'johndoe@email.com',
      password: '@Hçflkdçfl151',
      passwordConfirmation: '@Hçflkdçfl151'
    };

    await createUserService.execute(data);

    expect(validateUserCreationData).toHaveBeenCalled();
  });
});
