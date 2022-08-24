import { inject, injectable } from 'tsyringe';

import { CreateUserRequestDTO } from '@accounts:dtos/CreateUserRequest.dto';
import { CreateUserResponse } from '@accounts:dtos/CreateUserResponse.dto';
import { EmailInUseError } from '@accounts:errors/EmailInUse.error';
import { InvalidDataError } from '@accounts:errors/InvalidData.error';
import { PasswordsDontMatchError } from '@accounts:errors/PasswordsDontMatch.error';
import { UsersRepositoryInterface } from '@accounts:repositories-interfaces/UsersRepository.interface';
import { ValidationProviderInterface } from '@shared:containers/providers/validation/Validation.provider.interface';

// ---------------------------------------------------------------------------------------------- //

@injectable()
export class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryInterface,

    @inject('ValidationProvider')
    private validationProvider: ValidationProviderInterface
  ) {}

  async execute(data: CreateUserRequestDTO): Promise<CreateUserResponse> {
    const { name, lastName, email, password, passwordConfirmation } = data;

    // *** ---- Compare Passwords ----------------------------------------------------------- *** //

    if (password !== passwordConfirmation) {
      throw new PasswordsDontMatchError();
    }


    // *** ---- Data Validation ------------------------------------------------------------- *** //

    const dataIsValid = await this.validationProvider.validateUserCreationData(data);

    if (!dataIsValid) {
      throw new InvalidDataError();
    }


    // *** ---- Verify if user already exists ----------------------------------------------- *** //

    const emailInUse = await this.usersRepository.findByEmail(email);

    if (emailInUse) {
      throw new EmailInUseError();
    }

    //TODO: Crypt the password
    const passwordHash = password;


    // *** ---- Creates user in db ---------------------------------------------------------- *** //
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
