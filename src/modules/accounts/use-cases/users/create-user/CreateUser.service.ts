import { inject, injectable } from 'tsyringe';

import { CreateUserRequestDTO } from '@accounts:dtos/CreateUserRequest.dto';
import { CreateUserResponse } from '@accounts:dtos/CreateUserResponse.dto';

import { EmailInUseError } from '@accounts:errors/EmailInUse.error';
import { InvalidDataError } from '@accounts:errors/InvalidData.error';
import { PasswordsDontMatchError } from '@accounts:errors/PasswordsDontMatch.error';

import { UserMap } from '@accounts:mappers/User.map';

import { UsersRepositoryInterface } from '@accounts:repositories-interfaces/UsersRepository.interface';

import { ValidationProviderInterface } from '@shared:providers/validation/Validation.provider.interface';
import { HashProviderInterface } from '@shared:providers/hash/Hash.provider.interface';

import { prepareStringToDatabase } from '@shared/utils/prepareStringToDatabase';

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

    // *** --- Hashes the password ---------------------------------------------------------- *** //
    const passwordHash = await this.hashProvider.hash(password);


    // *** ---- Creates user in db ---------------------------------------------------------- *** //
    const user = await this.usersRepository.create({
      // ? ---- Prepare String to database removes useless spaces and etc... ---- ? //
      name: prepareStringToDatabase(name),
      lastName: prepareStringToDatabase(lastName),
      email: prepareStringToDatabase(email),
      password: passwordHash
    });


    // *** ---- Removes password from user -------------------------------------------------- *** //
    return UserMap.toDto(user);
  }
}
