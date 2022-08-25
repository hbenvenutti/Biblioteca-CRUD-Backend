import { TestDatabaseInterface } from '@shared/infra/database/TestDatabase.interface';
import { database }from '@firestore/firestore';

export class TestFirestore implements TestDatabaseInterface {
  private database = database;

  async deleteAllUsers(): Promise<void> {
    const users = await this.database.collection('users').get();

    const batch = this.database.batch();

    users.docs.forEach(doc => batch.delete(doc.ref));

    await batch.commit();
  }
}
