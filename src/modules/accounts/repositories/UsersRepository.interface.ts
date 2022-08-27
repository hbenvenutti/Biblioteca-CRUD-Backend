import { UserCreationData } from '@accounts:dtos/Users.dto';
import { User } from '@accounts:entities/User';

export interface UsersRepositoryInterface {
  create(data: UserCreationData): Promise<User>;
  list(): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User[]>;
  delete(id: string): Promise<void>;
}
