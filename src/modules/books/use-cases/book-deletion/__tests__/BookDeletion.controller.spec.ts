import request from 'supertest';
import server from '@shared:app/App';

import { TestDatabaseInterface } from '@shared:infra/database/TestDatabase.interface';
import { TestDatabaseFactory } from '@shared:infra/database/TestDatabaseFactory';
import { createSession } from '@shared:utils/tests/createSession';
import { Book } from '@books:entities/Book';

// ---------------------------------------------------------------------------------------------- //

describe('book deletion controller', () => {
  const database: TestDatabaseInterface = new TestDatabaseFactory().testDatabase;

  let token: string;
  let book: Book;

  beforeAll(async () => {
    await database.deleteAllBooks();
    await database.deleteAllUsers();
    await database.seedUser();

    token = await createSession();
  });

  beforeEach(async () => {
    book = await database.seedBook();
  });

  afterAll(async () => {
    await database.deleteAllBooks();
    await database.deleteAllUsers();
  });

  it('should not delete a book if user is not authenticated', async () => {
    const response = await request(server).delete(`/books/${book.id}`);

    const { body } = response;

    expect(response.status).toEqual(401);
    expect(body.message).toEqual('unauthorized');
    expect(body.status).toEqual('error');
  });

  it('should delete a book from database', async () => {
    const response = await request(server)
      .delete(`/books/${book.id}`)
      .set({ authorization: `bearer ${token}` });

    const bookStillExists = await database.getBook(book.id);

    expect(response.status).toEqual(204);
    expect(bookStillExists).toBeFalsy();
  });
});
