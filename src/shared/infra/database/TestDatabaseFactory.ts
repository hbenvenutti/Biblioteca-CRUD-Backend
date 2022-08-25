import { TestDatabaseInterface } from '@shared/infra/database/TestDatabase.interface';
import { TestFirestore } from '@firestore/TestFirestore';

/**
 * Factory that serves as a middleware between tests and actual database.
 */
export class TestDatabaseFactory {
  testDatabase: TestDatabaseInterface;

  constructor() {
    this.testDatabase = new TestFirestore();
  }
}
