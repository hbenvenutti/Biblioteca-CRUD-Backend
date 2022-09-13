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
    // console.log('books: ', books);


    const { body } = response;

    expect(response.status).toEqual(200);
    expect(body).toBeInstanceOf(Array);
    expect(body.length).toEqual(3);

    expect(body[0]).toHaveProperty('id');
    expect(body[0].title).toEqual(books[2].title);

    expect(body[1]).toHaveProperty('id');
    expect(body[1].title).toEqual(books[0].title);

    expect(body[2]).toHaveProperty('id');
    expect(body[2].title).toEqual(books[1].title);
  });

  // -------------------------------------------------------------------------------------------- //
  it('should search books by title', async() => {
    const response = await request(server).get(`/books?search=${books[2].title}`);

    const { body } = response;

    expect(response.status).toEqual(200);
    expect(body).toBeInstanceOf(Array);
    expect(body.length).toEqual(1);

    expect(body[0]).toHaveProperty('id');
    expect(body[0].title).toEqual(books[2].title);
  });

  // -------------------------------------------------------------------------------------------- //
  it('should search books by publisher', async() => {
    const response = await request(server).get(`/books?search=${books[2].publisher}`);

    const { body } = response;

    expect(response.status).toEqual(200);
    expect(body).toBeInstanceOf(Array);
    expect(body.length).toEqual(1);

    expect(body[0]).toHaveProperty('id');
    expect(body[0].publisher).toEqual(books[2].publisher);
  });

  // -------------------------------------------------------------------------------------------- //
  it('should search books by author', async() => {
    const response = await request(server).get(`/books?search=${books[2].author}`);

    const { body } = response;

    expect(response.status).toEqual(200);
    expect(body).toBeInstanceOf(Array);
    expect(body.length).toEqual(1);

    expect(body[0]).toHaveProperty('id');
    expect(body[0].author).toEqual(books[2].author);
  });
});
