import { database } from '@firestore/firestore';

import { CreateUserDTO } from '@accounts:dtos/CreateUser.dto';
import { User } from '@accounts:entities/User';
import { UsersRepositoryInterface } from '@accounts:repositories-interfaces/UsersRepository.interface';

// ---------------------------------------------------------------------------------------------- //

class UsersRepository implements UsersRepositoryInterface {
  private users = database.collection('users');

  async create({ email, name, lastName, password }: CreateUserDTO): Promise<User> {
    const { id } = await this.users.add({
      email,
      name,
      password,
      lastName
    });

    const user = {
      id,
      email,
      name,
      lastName,
      password
    };

    return user;
  }

  list(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }

  findByEmail(email: string): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }

  findById(id: string): Promise<User[]> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

// ---------------------------------------------------------------------------------------------- //

export { UsersRepository };
