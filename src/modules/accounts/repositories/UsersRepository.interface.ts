import { CreateUserDTO } from '@accounts/dtos/CreateUser.dto';
import { User } from '@accounts:entities/User';

export interface UsersRepositoryInterface {
  create(data: CreateUserDTO): Promise<User>;
  list(): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User[]>;
  delete(id: string): Promise<void>;
}
