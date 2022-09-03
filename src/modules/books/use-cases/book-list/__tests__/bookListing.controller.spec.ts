import request from 'supertest';

import server from '@shared:app/App';

import { TestDatabaseInterface } from '@shared:infra/database/TestDatabase.interface';
import { TestDatabaseFactory } from '@shared:infra/database/TestDatabaseFactory';
import { Book } from '@books:entities/Book';

// ---------------------------------------------------------------------------------------------- //

describe('Book listing integration', () => {
  const database: TestDatabaseInterface = new TestDatabaseFactory().testDatabase;
  let books: Book[];

  beforeAll(async () => {
    await database.deleteAllBooks();
    books = await database.seedThreeBooks();
  });

  afterAll(async () => {
    await database.deleteAllBooks();
  });

  it('should list all three books', async() => {
    const response = await request(server).get('/books');

    const { body } = response;

    console.log(body);
    expect(response.status).toEqual(200);
    expect(body).toBeInstanceOf(Array);

    expect(body[0]).toHaveProperty('id');
    expect(body[0].title).toEqual(books[0].title);

    expect(body[1]).toHaveProperty('id');
    expect(body[1].title).toEqual(books[1].title);

    expect(body[2]).toHaveProperty('id');
    expect(body[2].title).toEqual(books[2].title);
  });
});
