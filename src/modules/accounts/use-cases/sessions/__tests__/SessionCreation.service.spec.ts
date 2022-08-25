import 'reflect-metadata';

import { NotFoundError } from '@accounts:errors/NotFound.error';
import { InvalidDataError } from '@accounts:errors/InvalidData.error';

import { UsersRepositoryMock } from '@accounts:repositories-interfaces/mock/UsersRepository.mock';
import { UsersRepositoryInterface } from '@accounts:repositories-interfaces/UsersRepository.interface';

import { SessionCreationService } from '@accounts:use-cases/sessions/SessionCreation.service';

import { HashProviderInterface } from '@shared:providers/hash/Hash.provider.interface';
import { MockHashProvider } from '@shared:providers/hash/Hash.mock.provider';

import { MockValidationProvider } from '@shared:providers/validation/Validation.mock.provider';
import { ValidationProviderInterface } from '@shared:providers/validation/Validation.provider.interface';

import { TokenProviderInterface } from '@shared:providers/token/TokenProvider.interface';
import { TokenMockProvider } from '@shared:providers/token/TokenMockProvider';

// ---------------------------------------------------------------------------------------------- //

describe('Session Creation Service', () => {
  let usersRepository: UsersRepositoryInterface;
  let hashProvider: HashProviderInterface;
  let validationProvider: ValidationProviderInterface;
  let tokenProvider: TokenProviderInterface;
  let sessionCreationService: SessionCreationService;

  const email = 'user@example.com';
  const password = '@Password248';

  const user = {
    email,
    password,
    passwordConfirmation: password,
    name: 'john',
    lastName: 'doe'
  };

  beforeAll(async () => {
    usersRepository = new UsersRepositoryMock();
    hashProvider = new MockHashProvider();
    validationProvider = new MockValidationProvider();
    tokenProvider = new TokenMockProvider();

    sessionCreationService =
      new SessionCreationService(usersRepository, hashProvider, validationProvider, tokenProvider);

    await usersRepository.create(user);
  });


  // *** ---- Success ----------------------------------------------------------------------- *** //

  it('should return a session token', async () => {
    const sessionResponse = await sessionCreationService.execute({ email, password });

    expect(sessionResponse).toHaveProperty('token');
    expect(sessionResponse.token).toBeTruthy();
  });

  // -------------------------------------------------------------------------------------------- //

  it('should return the user\'s data', async () => {
    const { user } = await sessionCreationService.execute({ email, password });

    expect(user).toHaveProperty('id');
    expect(user.email).toEqual(email);
  });

  // -------------------------------------------------------------------------------------------- //

  it('should not return user\'s password', async () => {
    const { user } = await sessionCreationService.execute({ email, password });

    expect(user).not.toHaveProperty('password');
  });


  // *** ---- Data Validation --------------------------------------------------------------- *** //

  it('should fail if user is not found', async () => {
    const email = 'wrong@email.com';

    expect(async () => {
      await sessionCreationService.execute({ email, password });
    })
      .rejects
      .toEqual(new NotFoundError);
  });

  // -------------------------------------------------------------------------------------------- //

  it('should fail if data is not valid', () => {
    const email = 'invalid';

    expect(async () => {
      await sessionCreationService.execute({ email, password });
    })
      .rejects
      .toEqual(new InvalidDataError);
  });

  // -------------------------------------------------------------------------------------------- //

  it('should fail if password does\'t match', async () => {
    const password = 'wrong-password';


    expect(async () => {
      await sessionCreationService.execute({ email, password });
    })
      .rejects
      .toEqual(new NotFoundError);
  });


  // *** ---- Providers  -------------------------------------------------------------------- *** //
  it('should call validation provider', async () => {
    const validateSessionData = jest.spyOn(validationProvider, 'validateSessionData');

    await sessionCreationService.execute({ email, password });

    expect(validateSessionData).toHaveBeenCalled();
  });

  // -------------------------------------------------------------------------------------------- //

  it('should call hash provider', async () => {
    const compare = jest.spyOn(hashProvider, 'compare');

    await sessionCreationService.execute({ email, password });

    expect(compare).toHaveBeenCalled();
  });

  // -------------------------------------------------------------------------------------------- //

  it('should call token provider', async () => {
    expect(true).toBeFalsy();
  });
});
