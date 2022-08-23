import { CreateUserDTO } from '@accounts:dtos/CreateUser.dto';
import { User } from '@accounts:entities/User';
import { UsersRepositoryInterface } from '@accounts:repositories-interfaces/UsersRepository.interface';

export class UsersRepositoryMock implements UsersRepositoryInterface {
  create(data: CreateUserDTO): Promise<User> {
    throw new Error('Method not implemented.');
  }
  list(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  findByEmail(email: string): Promise<User> | undefined {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
