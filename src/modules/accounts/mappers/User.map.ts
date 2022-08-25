import { User } from '@accounts:entities/User';
import { CreateUserResponse } from '@accounts:dtos/CreateUserResponse.dto';

export class UserMap {
  static toDto(data: User): CreateUserResponse {
    const { id, name, lastName, email } = data;

    const user = { id, name, lastName, email };

    return user;
  }
}

