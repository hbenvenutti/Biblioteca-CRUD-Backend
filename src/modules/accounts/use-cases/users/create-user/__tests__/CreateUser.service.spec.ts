import 'reflect-metadata';

import { EmailInUseError } from '@accounts:errors/EmailInUse.error';
import { PasswordsDontMatchError } from '@accounts:errors/PasswordsDontMatch.error';

import { InvalidDataError } from '@errors/InvalidData.error';

import { UsersRepositoryInterface } from '@accounts:repositories-interfaces/UsersRepository.interface';
import { UsersRepositoryMock } from '@accounts:repositories-interfaces/mock/UsersRepository.mock';

import { CreateUserService } from '@accounts:use-cases/users/create-user/CreateUser.service';

import { HashProviderInterface } from '@shared:providers/hash/Hash.provider.interface';
import { MockValidationProvider } from '@shared:providers/validation/Validation.mock.provider';
import { ValidationProviderInterface } from '@shared:providers/validation/Validation.provider.interface';
import { MockHashProvider } from '@shared:providers/hash/Hash.mock.provider';
import { TestUser, TestUserData } from '@accounts:entities/TestUser';

// ---------------------------------------------------------------------------------------------- //

describe('Create User Service', () => {
  let usersRepository: UsersRepositoryInterface;
  let validationProvider: ValidationProviderInterface;
  let hashProvider: HashProviderInterface;
  let createUserService: CreateUserService;

  let data: TestUserData;

  beforeEach(async () => {
    usersRepository = new UsersRepositoryMock();
    validationProvider = new MockValidationProvider();
    hashProvider = new MockHashProvider();
    createUserService = new CreateUserService(usersRepository, validationProvider, hashProvider);

    data = await TestUser.generateTestUser();
  });

  // *** ---- Successful User Creation ------------------------------------------------------ *** //

  it('should return a user with an id', async () => {
    const user = await createUserService.execute(data);

    expect(user).toHaveProperty('id');
    expect(user.name).toEqual(data.name);
    expect(user.lastName).toEqual(data.lastName);
    expect(user.email).toEqual(data.email);
  });

  // -------------------------------------------------------------------------------------------- //

  it('should return a user without its password', async () => {
    const user = await createUserService.execute(data);

    expect(user).not.toHaveProperty('password');
  });

  // *** ---- Data Validation and Treatment ------------------------------------------------- *** //

  it('should fail if e-mail is already in use', async () => {
    await createUserService.execute(data);

    expect(async () => {
      await createUserService.execute(data);
    })
      .rejects
      .toEqual(new EmailInUseError());
  });

  // -------------------------------------------------------------------------------------------- //

  it('should remove useless spaces from name', async () => {
    data.name = ' john';

    const user = await createUserService.execute(data);

    expect(user.name).toEqual('john');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should remove useless spaces from last name', async () => {
    data.lastName = ' doe ';

    const user = await createUserService.execute(data);

    expect(user.lastName).toEqual('doe');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should remove useless spaces from e-mail', async () => {
    data.email = 'johndoe@email.com ';

    const user = await createUserService.execute(data);

    expect(user.email).toEqual('johndoe@email.com');
  });


  // -------------------------------------------------------------------------------------------- //

  it('should turn name into lowercase', async () => {
    data.name = 'John';

    const user = await createUserService.execute(data);

    expect(user.name).toEqual('john');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should turn last name into lowercase', async () => {
    data.lastName = 'doE';

    const user = await createUserService.execute(data);

    expect(user.lastName).toEqual('doe');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should turn email into lowercase', async () => {
    data.email = 'JOHNDOE@EMAIL.COM ';

    const user = await createUserService.execute(data);

    expect(user.email).toEqual('johndoe@email.com');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should fail if passwords don\'t match', async () => {
    data.password = '@Password';
    data.passwordConfirmation = 'Password2';

    expect(async () => {
      await createUserService.execute(data);
    })
      .rejects
      .toEqual(new PasswordsDontMatchError());
  });

  // *** ---- Validation Provider ----------------------------------------------------------- *** //

  it('should call validation provider', async() => {
    const validateUserCreationData = jest.spyOn(validationProvider, 'validateUserCreationData');

    await createUserService.execute(data);

    expect(validateUserCreationData).toHaveBeenCalled();
  });

  // -------------------------------------------------------------------------------------------- //

  it('should throw an error if validation return is false', async () => {
    data.email = 'invalid';

    expect(async () => {
      await createUserService.execute(data);
    })
      .rejects
      .toEqual(new InvalidDataError());
  });

  // *** ---- Hash Provider ----------------------------------------------------------------- *** //
  it('should call the hash provider', async () => {
    const hash = jest.spyOn(hashProvider, 'hash');

    await createUserService.execute(data);

    expect(hash).toHaveBeenCalled();
  });
});
