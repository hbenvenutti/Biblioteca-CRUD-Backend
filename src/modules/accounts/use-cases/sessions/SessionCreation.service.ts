import { inject, injectable } from 'tsyringe';

import { SessionCreationRequest, SessionsCreationResponse } from '@accounts:dtos/Sessions.dto';
import { UsersRepositoryInterface } from '@accounts:repositories-interfaces/UsersRepository.interface';

// ---------------------------------------------------------------------------------------------- //

@injectable()
class SessionCreationService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryInterface
  ) {}
  async execute({ email, password }: SessionCreationRequest): Promise<SessionsCreationResponse> {
    throw new Error('Method not implemented.');
  }
}

// ---------------------------------------------------------------------------------------------- //

export { SessionCreationService };
