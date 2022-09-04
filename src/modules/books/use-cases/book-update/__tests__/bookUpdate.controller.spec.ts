import request from 'supertest';

import server from '@shared:app/App';
import { TestDatabaseFactory } from '@shared:infra/database/TestDatabaseFactory';
import { createSession } from '@shared:utils/tests/createSession';
import { Book } from '@books:entities/Book';
import { generateOneBook, InvalidBook } from '@books:entities/TestBook';

// ---------------------------------------------------------------------------------------------- //
describe('Book update integration tests', () => {
  const database = new TestDatabaseFactory().testDatabase;

  let book: Book;
  let invalidBook: InvalidBook;

  let token: string;

  beforeAll(async () => {
    await database.deleteAllUsers();
    await database.deleteAllBooks();
    await database.seedUser();

    token = await createSession();
    book = await database.seedBook();
  });

  beforeEach(() => {
    invalidBook = generateOneBook();
    invalidBook.id = book.id;
  });

  afterAll(async () => {
    await database.deleteAllUsers();
    await database.deleteAllBooks();
  });

  // *** ---- Authentication ---------------------------------------------------------------- *** //
  it('should fail if user is not authenticated', async () => {
    book.title = 'new title';

    const response = await request(server)
      .put(`/books/${book.id}`)
      .send(book);

    const { body } = response;

    expect(response.status).toEqual(401);

    expect(body.status).toEqual('error');
    expect(body.message).toEqual('unauthorized');
  });

  // *** ---- Success ----------------------------------------------------------------------- *** //
  it('should update book title', async () => {
    book.title = 'new title';

    const response = await request(server)
      .put(`/books/${book.id}`)
      .send(book)
      .set({ authorization: `bearer ${token}` });

    const { body } = response;

    expect(response.status).toEqual(200);

    expect(body.title).toEqual(book.title);
  });

  // *** ---- Business Rules ---------------------------------------------------------------- *** //
  it('should fail if book is not found', async () => {
    invalidBook.id = undefined;

    const response = await request(server)
      .put(`/books/${invalidBook.id}`)
      .send(book)
      .set({ authorization: `bearer ${token}` });

    const { body } = response;

    expect(response.status).toEqual(404);

    expect(body.status).toEqual('error');
    expect(body.message).toEqual('not found');
  });

  // *** ---- Data Validation --------------------------------------------------------------- *** //
  it('should fail if title is not provided', async () => {
    invalidBook.title = undefined;

    const response = await request(server)
      .put(`/books/${invalidBook.id}`)
      .send(invalidBook)
      .set({ authorization: `bearer ${token}` });

    const { body } = response;

    expect(response.status).toEqual(400);

    expect(body.status).toEqual('error');
    expect(body.message).toEqual('invalid data');
  });

  // -------------------------------------------------------------------------------------------- //
  it('should fail if author is not provided', async () => {
    invalidBook.author = undefined;

    const response = await request(server)
      .put(`/books/${invalidBook.id}`)
      .send(invalidBook)
      .set({ authorization: `bearer ${token}` });

    const { body } = response;

    expect(response.status).toEqual(400);

    expect(body.status).toEqual('error');
    expect(body.message).toEqual('invalid data');
  });

  // -------------------------------------------------------------------------------------------- //
  it('should fail if publisher is not provided', async () => {
    invalidBook.publisher = undefined;

    const response = await request(server)
      .put(`/books/${invalidBook.id}`)
      .send(invalidBook)
      .set({ authorization: `bearer ${token}` });

    const { body } = response;

    expect(response.status).toEqual(400);

    expect(body.status).toEqual('error');
    expect(body.message).toEqual('invalid data');
  });

  // -------------------------------------------------------------------------------------------- //
  it('should fail if edition is not provided', async () => {
    invalidBook.edition = undefined;

    const response = await request(server)
      .put(`/books/${invalidBook.id}`)
      .send(invalidBook)
      .set({ authorization: `bearer ${token}` });

    const { body } = response;

    expect(response.status).toEqual(400);

    expect(body.status).toEqual('error');
    expect(body.message).toEqual('invalid data');
  });

  // -------------------------------------------------------------------------------------------- //
  it('should fail if synopsis is not provided', async () => {
    invalidBook.synopsis = undefined;

    const response = await request(server)
      .put(`/books/${invalidBook.id}`)
      .send(invalidBook)
      .set({ authorization: `bearer ${token}` });

    const { body } = response;

    expect(response.status).toEqual(400);

    expect(body.status).toEqual('error');
    expect(body.message).toEqual('invalid data');
  });

  // -------------------------------------------------------------------------------------------- //
  it('should fail if title is wrong type', async () => {
    invalidBook.title = true;

    const response = await request(server)
      .put(`/books/${invalidBook.id}`)
      .send(invalidBook)
      .set({ authorization: `bearer ${token}` });

    const { body } = response;

    expect(response.status).toEqual(400);

    expect(body.status).toEqual('error');
    expect(body.message).toEqual('invalid data');
  });

  // -------------------------------------------------------------------------------------------- //
  it('should fail if author is wrong type', async () => {
    invalidBook.author = true;

    const response = await request(server)
      .put(`/books/${invalidBook.id}`)
      .send(invalidBook)
      .set({ authorization: `bearer ${token}` });

    const { body } = response;

    expect(response.status).toEqual(400);

    expect(body.status).toEqual('error');
    expect(body.message).toEqual('invalid data');
  });

  // -------------------------------------------------------------------------------------------- //
  it('should fail if publisher is wrong type', async () => {
    invalidBook.publisher = true;

    const response = await request(server)
      .put(`/books/${invalidBook.id}`)
      .send(invalidBook)
      .set({ authorization: `bearer ${token}` });

    const { body } = response;

    expect(response.status).toEqual(400);

    expect(body.status).toEqual('error');
    expect(body.message).toEqual('invalid data');
  });

  // -------------------------------------------------------------------------------------------- //
  it('should fail if edition is wrong type', async () => {
    invalidBook.edition = true;

    const response = await request(server)
      .put(`/books/${invalidBook.id}`)
      .send(invalidBook)
      .set({ authorization: `bearer ${token}` });

    const { body } = response;

    expect(response.status).toEqual(400);

    expect(body.status).toEqual('error');
    expect(body.message).toEqual('invalid data');
  });

  // -------------------------------------------------------------------------------------------- //
  it('should fail if synopsis is wrong type', async () => {
    invalidBook.synopsis = true;

    const response = await request(server)
      .put(`/books/${invalidBook.id}`)
      .send(invalidBook)
      .set({ authorization: `bearer ${token}` });

    const { body } = response;

    expect(response.status).toEqual(400);

    expect(body.status).toEqual('error');
    expect(body.message).toEqual('invalid data');
  });
});
