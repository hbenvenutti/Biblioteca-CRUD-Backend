import { TestDatabaseInterface } from '@shared:infra/database/TestDatabase.interface';
import { database }from '@firestore/firestore';
import { generateTestUser } from '@accounts:entities/TestUser';
import { Book } from '@books:entities/Book';
import { User } from '@accounts:entities/User';
import { TestBook } from '@books:entities/TestBook';

// ---------------------------------------------------------------------------------------------- //

/**
 * Class that implements the methods needed in integration tests.
 */
class TestFirestore implements TestDatabaseInterface {
  private database = database;

  // *** ---- Users ------------------------------------------------------------------------- *** //
  async deleteAllUsers(): Promise<void> {
    const users = await this.database.collection('users').get();

    const batch = this.database.batch();

    users.docs.forEach(doc => batch.delete(doc.ref));

    await batch.commit();
  }

  // -------------------------------------------------------------------------------------------- //

  async getUserPassword(id: string): Promise<string> {
    const document = await this.database
      .collection('users')
      .doc(id)
      .get();

    const user = document.data();

    return user?.password as string;
  }

  // -------------------------------------------------------------------------------------------- //

  async seedUser(): Promise<User> {
    const { email, passwordHash: password, name, lastName } = await generateTestUser();

    const { id } = await this.database
      .collection('users')
      .add({ name, lastName, email, password });

    return { id, name, lastName, email, password };
  }

  async seedBook(): Promise<Book> {
    const { title, author, edition, publisher, synopsis } = new TestBook();

    const { id } = await this.database
      .collection('books')
      .add({ title, author, edition, publisher, synopsis });

    return { id, title, author, edition, publisher, synopsis };
  }

  // *** ---- Books ------------------------------------------------------------------------- *** //
  async deleteAllBooks(): Promise<void> {
    const books = await this.database.collection('books').get();

    const batch = this.database.batch();

    books.docs.forEach(doc => batch.delete(doc.ref));

    await batch.commit();
  }
}

// ---------------------------------------------------------------------------------------------- //

export { TestFirestore };
