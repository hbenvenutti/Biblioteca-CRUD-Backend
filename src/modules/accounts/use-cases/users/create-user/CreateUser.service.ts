import { inject, injectable } from 'tsyringe';

import { CreateUserRequestDTO } from '@accounts:dtos/CreateUserRequest.dto';
import { CreateUserResponse } from '@accounts:dtos/CreateUserResponse.dto';
import { EmailInUseError } from '@accounts:errors/EmailInUse.error';
import { PasswordsDontMatchError } from '@accounts:errors/PasswordsDontMatch.error';
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

    // ? ---- Compare Passwords --------------------------------------------------------------- ? //
    if (password !== passwordConfirmation) {
      throw new PasswordsDontMatchError();
    }

    //TODO: Verify if the e-mail is valid
    //TODO: Verify if data is valid

    // ? ---- Verify if user already exists --------------------------------------------------- ? //
    const emailInUse = await this.usersRepository.findByEmail(email);

    if (emailInUse) {
      throw new EmailInUseError();
    }

    //TODO: Crypt the password
    const passwordHash = password;

    //? ---- Creates user in db --------------------------------------------------------------- ? //
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
