import { inject, injectable } from 'tsyringe';

import { CreateUserRequestDTO } from '@accounts:dtos/CreateUserRequest.dto';
import { CreateUserResponse } from '@accounts:dtos/CreateUserResponse.dto';
import { UsersRepositoryInterface } from '@accounts:repositories-interfaces/UsersRepository.interface';

// ---------------------------------------------------------------------------------------------- //

@injectable()
export class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryInterface
  ) {}

  async execute(data: CreateUserRequestDTO): Promise<CreateUserResponse> {
    const { name, lastName, email, password, passwordConfirmation } = data;

    //TODO: Verify if password match
    if (password !== passwordConfirmation) {
      throw new Error('Method not implemented.');
    }

    //TODO: Verify if the e-mail is valid
    //TODO: Verify if data is valid
    //TODO: Verify if e-mail is not in use

    //TODO: Crypt the password
    const passwordHash = password;

    //? ---- Creates user in db ---------------------------------------------------------------- ?//
    const user = await this.usersRepository.create({
      name,
      lastName,
      email,
      password: passwordHash
    });

    //TODO: Return user without password
    return user;
  }
}
