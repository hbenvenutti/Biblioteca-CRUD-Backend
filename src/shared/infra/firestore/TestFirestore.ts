import { TestDatabaseInterface } from '@shared/infra/database/TestDatabase.interface';
import { database }from '@firestore/firestore';

// ---------------------------------------------------------------------------------------------- //

/**
 * Class that implements the methods needed in integration tests.
 */
class TestFirestore implements TestDatabaseInterface {
  private database = database;

  async deleteAllUsers(): Promise<void> {
    const users = await this.database.collection('users').get();

    const batch = this.database.batch();

    users.docs.forEach(doc => batch.delete(doc.ref));

    await batch.commit();
  }

  async getUserPassword(id: string): Promise<string> {
    const document = await this.database
      .collection('users')
      .doc(id)
      .get();

    const user = document.data();

    return user?.password as string;
  }
}

export { TestFirestore };
