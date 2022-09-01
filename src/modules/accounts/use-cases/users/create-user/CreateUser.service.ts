import { inject, injectable } from 'tsyringe';

import { EmailInUseError } from '@accounts:errors/EmailInUse.error';
import { PasswordsDontMatchError } from '@accounts:errors/PasswordsDontMatch.error';
import { InvalidDataError } from '@errors/InvalidData.error';

import { UserCreationRequest, UserResponseData } from '@accounts:dtos/Users.dto';
import { UserMap } from '@accounts:mappers/User.map';
import { prepareStringToDatabase } from '@shared:utils/prepareStringToDatabase';

import type { UsersRepositoryInterface } from '@accounts:repositories-interfaces/UsersRepository.interface';
import type { ValidationProviderInterface } from '@shared:providers/validation/Validation.provider.interface';
import type { HashProviderInterface } from '@shared:providers/hash/Hash.provider.interface';

// ---------------------------------------------------------------------------------------------- //

@injectable()
export class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryInterface,

    @inject('ValidationProvider')
    private validationProvider: ValidationProviderInterface,

    @inject('HashProvider')
    private hashProvider: HashProviderInterface
  ) {}

  // -------------------------------------------------------------------------------------------- //

  async execute(data: UserCreationRequest): Promise<UserResponseData> {
    const { password, passwordConfirmation } = data;

    // *** ---- Compare Passwords ----------------------------------------------------------- *** //
    if (password !== passwordConfirmation) {
      throw new PasswordsDontMatchError();
    }


    // *** ---- Data Validation ------------------------------------------------------------- *** //
    const dataIsValid = await this.validationProvider.validateUserCreationData(data);

    if (!dataIsValid) {
      throw new InvalidDataError();
    }


    // *** ---- Data treatment for database ------------------------------------------------- *** //
    const name = prepareStringToDatabase(data.name);
    const lastName = prepareStringToDatabase(data.lastName);
    const email = prepareStringToDatabase(data.email);


    // *** ---- Verify if user already exists ----------------------------------------------- *** //
    const emailInUse = await this.usersRepository.findByEmail(email);

    if (emailInUse) {
      throw new EmailInUseError();
    }


    // *** --- Hashes the password ---------------------------------------------------------- *** //
    const passwordHash = await this.hashProvider.hash(password);


    // *** ---- Creates user in db ---------------------------------------------------------- *** //
    const user = await this.usersRepository.create({
      name,
      lastName,
      email,
      password: passwordHash
    });


    // *** ---- Removes password from user -------------------------------------------------- *** //
    return UserMap.toDto(user);
  }
}
