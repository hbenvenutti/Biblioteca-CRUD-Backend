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

  async findByEmail(email: string): Promise<User | undefined> {
    const document = await this.users.where('email', '==', email).get();

    if (document.empty) {
      return undefined;
    }

    const id = document.docs[0].id;
    const { name, lastName, password } = document.docs[0].data();

    const user = {
      id,
      name,
      lastName,
      email,
      password
    };

    return user;
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
