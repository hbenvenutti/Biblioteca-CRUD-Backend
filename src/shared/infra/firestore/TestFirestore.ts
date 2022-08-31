import { TestDatabaseInterface } from '@shared:infra/database/TestDatabase.interface';
import { database }from '@firestore/firestore';
import { generateTestUser } from '@accounts:entities/TestUser';

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

  async seedUser(): Promise<void> {
    // ? ---- Only e-mail and passwords are needed for seeding at the moment. ----------------- ? //
    // ? ---- Firestore accepts the request without any property ------------------------------ ? //
    const { email, passwordHash: password } = await generateTestUser();

    await this.database
      .collection('users')
      .add({ email, password });

    return;
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
