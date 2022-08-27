import { User } from '@accounts:entities/User';
import { UserResponseData } from '@accounts:dtos/Users.dto';

export class UserMap {
  static toDto(data: User): UserResponseData {
    const { id, name, lastName, email } = data;

    const user = { id, name, lastName, email };

    return user;
  }
}

