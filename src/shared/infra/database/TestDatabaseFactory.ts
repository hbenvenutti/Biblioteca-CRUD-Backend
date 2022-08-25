import { TestDatabaseInterface } from '@shared/infra/database/TestDatabase.interface';
import { TestFirestore } from '@firestore/TestFirestore';

export class TestDatabaseFactory {
  testDatabase: TestDatabaseInterface;

  constructor() {
    this.testDatabase = new TestFirestore();
  }
}
