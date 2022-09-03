import { UsersRepository } from '@accounts:repositories/Users.repository';
import { BooksRepository } from '@books:repositories/Books.repository';
import { UsersRepositoryInterface } from '@accounts:repositories-interfaces/UsersRepository.interface';
import { BooksRepositoryInterface } from '@books:repositories-interfaces/BooksRepository.interface';

// ---------------------------------------------------------------------------------------------- //
export class RepositoryFactory {
  usersRepository: UsersRepositoryInterface = new UsersRepository();
  booksRepository: BooksRepositoryInterface = new BooksRepository();
}
