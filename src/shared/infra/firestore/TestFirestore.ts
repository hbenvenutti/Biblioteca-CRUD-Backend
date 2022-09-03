import { TestDatabaseInterface } from '@shared:infra/database/TestDatabase.interface';
import { database }from '@firestore/firestore';
import { generateTestUser } from '@accounts:entities/TestUser';
import { Book } from '@books:entities/Book';
import { User } from '@accounts:entities/User';
import { generateOneBook, generateThreeBooks } from '@books:entities/TestBook';

// ---------------------------------------------------------------------------------------------- //

/**
 * Class that implements the methods needed in integration tests.
 */
class TestFirestore implements TestDatabaseInterface {
  private database = database;
  private books = this.database.collection('books');

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


  // *** ---- Books ------------------------------------------------------------------------- *** //
  async deleteAllBooks(): Promise<void> {
    const books = await this.books.get();

    const batch = this.database.batch();

    books.docs.forEach(doc => batch.delete(doc.ref));

    await batch.commit();
  }
  // -------------------------------------------------------------------------------------------- //

  async seedBook(): Promise<Book> {
    const { title, author, edition, publisher, synopsis } = generateOneBook();

    const { id } = await this.books
      .add({ title, author, edition, publisher, synopsis });

    return { id, title, author, edition, publisher, synopsis };
  }

  // -------------------------------------------------------------------------------------------- //

  async seedThreeBooks(): Promise<Book[]> {
    const booksData = generateThreeBooks();

    let counter = 0;

    const books: Book[] = [];

    while (counter < 3) {
      const { title, edition, publisher, author, synopsis } = booksData[counter];
      const { id } = await this.books.add({ title, edition, publisher, author, synopsis });

      books.push({ id, title, edition, publisher, author, synopsis });

      counter++;
    }

    return books;
  }

  // -------------------------------------------------------------------------------------------- //

  async getBook(id: string): Promise<Book | undefined> {
    const doc = await this.books.doc(id).get();

    return doc.exists
      ? doc.data() as Book
      : undefined;
  }
}

// ---------------------------------------------------------------------------------------------- //

export { TestFirestore };
