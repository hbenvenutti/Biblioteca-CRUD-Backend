import { User } from '@accounts:entities/User';
import { Book } from '@books:entities/Book';

// ---------------------------------------------------------------------------------------------- //

/**
 * Interface that serves as a model to implement database methods for tests.
 *
 * If it is chosen to change the database, there is no need to change any test.
 *
 * Just create a class that implements this interface.
 */
export interface TestDatabaseInterface {
  // *** ---- User -------------------------------------------------------------------------- *** //
  seedUser(): Promise<User>;
  deleteAllUsers(): Promise<void>;
  getUserPassword(id: string): Promise<string>


  seedBook(): Promise<Book>;
  seedThreeBooks(): Promise<Book[]>;
  getBook(id: string): Promise<Book | undefined>;
  deleteAllBooks(): Promise<void>;

}
