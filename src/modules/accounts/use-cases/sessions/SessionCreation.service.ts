import { inject, injectable } from 'tsyringe';

import { SessionCreationRequest, SessionsCreationResponse } from '@accounts:dtos/Sessions.dto';

import { InvalidDataError } from '@accounts:errors/InvalidData.error';
import { NotFoundError } from '@accounts:errors/NotFound.error';

import { UsersRepositoryInterface } from '@accounts:repositories-interfaces/UsersRepository.interface';

import { HashProviderInterface } from '@shared:providers/hash/Hash.provider.interface';
import { ValidationProviderInterface } from '@shared:providers/validation/Validation.provider.interface';

// ---------------------------------------------------------------------------------------------- //

@injectable()
class SessionCreationService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryInterface,

    @inject('HashProvider')
    private hashProvider: HashProviderInterface,

    @inject('ValidationProvider')
    private validationProvider: ValidationProviderInterface
  ) {}

  async execute({ email, password }: SessionCreationRequest): Promise<SessionsCreationResponse> {
    // *** ---- Request data validation ----------------------------------------------------- *** //
    const emailIsValid = await this.validationProvider.validateSessionData({ email, password });

    if (!emailIsValid) {
      throw new InvalidDataError();
    }

    // *** ---- Verify if user exists ------------------------------------------------------- *** //
    const userExists = await this.usersRepository.findByEmail(email);

    if (!userExists) {
      throw new NotFoundError();
    }

    // TODO: Compare passwords
    // TODO: Generate a session token
    // TODO: Return user and session token
    
    throw new Error('Method not implemented.');
  }
}

// ---------------------------------------------------------------------------------------------- //

export { SessionCreationService };
