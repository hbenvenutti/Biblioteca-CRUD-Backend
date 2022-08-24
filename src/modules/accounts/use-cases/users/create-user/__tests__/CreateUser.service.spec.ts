import 'reflect-metadata';

import { EmailInUseError } from '@accounts:errors/EmailInUse.error';
import { InvalidDataError } from '@accounts:errors/InvalidData.error';
import { PasswordsDontMatchError } from '@accounts:errors/PasswordsDontMatch.error';

import { UsersRepositoryInterface } from '@accounts:repositories-interfaces/UsersRepository.interface';
import { UsersRepositoryMock } from '@accounts:repositories-interfaces/mock/UsersRepository.mock';

import { CreateUserService } from '@accounts:use-cases/users/create-user/CreateUser.service';

import { HashProviderInterface } from '@shared:providers/hash/Hash.provider.interface';
import { MockValidationProvider } from '@shared:providers/validation/Validation.mock.provider';
import { ValidationProviderInterface } from '@shared:providers/validation/Validation.provider.interface';
import { MockHashProvider } from '@shared/containers/providers/hash/Hash.mock.provider';

// ---------------------------------------------------------------------------------------------- //

describe('Create User Service', () => {
  let usersRepository: UsersRepositoryInterface;
  let validationProvider: ValidationProviderInterface;
  let hashProvider: HashProviderInterface;
  let createUserService: CreateUserService;

  beforeEach(() => {
    usersRepository = new UsersRepositoryMock();
    validationProvider = new MockValidationProvider();
    hashProvider = new MockHashProvider();
    createUserService = new CreateUserService(usersRepository, validationProvider, hashProvider);
  });

  // *** ---- Successful User Creation ------------------------------------------------------ *** //

  it('should return a user with an id', async () => {
    const data = {
      name: 'john',
      lastName: 'doe',
      email:'johndoe@email.com',
      password: '@Password',
      passwordConfirmation: '@Password'
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
      password: '@Password',
      passwordConfirmation: '@Password'
    };

    const user = await createUserService.execute(data);

    expect(user).not.toHaveProperty('password');
  });

  // *** ---- Data Validation and Treatment ------------------------------------------------- *** //

  it('should fail if e-mail is already in use', async () => {
    const data = {
      name: 'john',
      lastName: 'doe',
      email: 'johndoe@email.com',
      password: '@Password',
      passwordConfirmation: '@Password'
    };

    await createUserService.execute(data);

    expect(async () => {
      await createUserService.execute(data);
    })
      .rejects
      .toEqual(new EmailInUseError());
  });

  // -------------------------------------------------------------------------------------------- //

  it('should remove useless spaces from strings', async () => {
    const data = {
      name: ' john',
      lastName: ' doe ',
      email: 'johndoe@email.com ',
      password: '@Password',
      passwordConfirmation: '@Password'
    };

    const user = await createUserService.execute(data);

    expect(user.name).toEqual('john');
    expect(user.lastName).toEqual('doe');
    expect(user.email).toEqual('johndoe@email.com');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should turn strings to lowercase', async () => {
    const data = {
      name: 'John',
      lastName: 'doE',
      email: 'JOHNDOE@EMAIL.COM ',
      password: '@Password',
      passwordConfirmation: '@Password'
    };

    const user = await createUserService.execute(data);

    expect(user.name).toEqual('john');
    expect(user.lastName).toEqual('doe');
    expect(user.email).toEqual('johndoe@email.com');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should fail if passwords don\'t match', async () => {
    const data = {
      name: 'john',
      lastName: 'doe',
      email: 'johndoe@email.com',
      password: '@Password',
      passwordConfirmation: 'Password2'
    };

    expect(async () => {
      await createUserService.execute(data);
    })
      .rejects
      .toEqual(new PasswordsDontMatchError());
  });

  // *** ---- Validation Provider ----------------------------------------------------------- *** //

  it('should call validation provider', async() => {
    const validateUserCreationData = jest.spyOn(validationProvider, 'validateUserCreationData');

    const data = {
      name: 'john',
      lastName: 'doe',
      email: 'johndoe@email.com',
      password: '@Password',
      passwordConfirmation: '@Password'
    };

    await createUserService.execute(data);

    expect(validateUserCreationData).toHaveBeenCalled();
  });

  // -------------------------------------------------------------------------------------------- //

  it('should throw an error if validation return is false', async () => {
    const data = {
      name: 'john',
      lastName: 'doe',
      email: 'invalid',
      password: '@Password',
      passwordConfirmation: '@Password'
    };

    expect(async () => {
      await createUserService.execute(data);
    })
      .rejects
      .toEqual(new InvalidDataError());
  });

  // *** ---- Hash Provider ----------------------------------------------------------------- *** //
  it('should call the hash provider', async () => {
    const hash = jest.spyOn(hashProvider, 'hash');

    const data = {
      name: 'john',
      lastName: 'doe',
      email: 'johndoe@email.com',
      password: '@Password',
      passwordConfirmation: '@Password'
    };

    await createUserService.execute(data);

    expect(hash).toHaveBeenCalled();
  });
});
