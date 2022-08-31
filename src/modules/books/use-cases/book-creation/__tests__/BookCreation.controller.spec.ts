import request from 'supertest';

import server from '@shared:app/App';

import { TestDatabaseFactory } from '@shared:infra/database/TestDatabaseFactory';
import { TestDatabaseInterface } from '@shared:infra/database/TestDatabase.interface';

import { InvalidBook, TestBook } from '@books:entities/TestBook';
import { createSession } from '@shared:utils/tests/createSession';

// ---------------------------------------------------------------------------------------------- //

describe('book creation controller', () => {
  const database: TestDatabaseInterface = new TestDatabaseFactory().testDatabase;

  const book = new TestBook();

  let token: string;

  // -------------------------------------------------------------------------------------------- //

  beforeAll(async () => {
    await database.seedUser();

    token = await createSession();
  });

  beforeEach(async () => {
    await database.deleteAllBooks();
  });

  afterAll(async () => {
    await database.deleteAllBooks();
  });

  // *** ---- Authentication ---------------------------------------------------------------- *** //

  it('should not let unauthorized users create books', async () => {
    const response = await request(server)
      .post('/books')
      .send(book);

    const { body } = response;
    expect(response.status).toEqual(401);
    expect(body.message).toEqual('unauthorized');
    expect(body.status).toEqual('error');
  });

  // *** ---- Success ----------------------------------------------------------------------- *** //

  it('should create a book', async () => {
    const response = await request(server)
      .post('/books')
      .send(book)
      .set({ authorization: `bearer ${token}` });

    const { body } = response;

    console.log(body);

    expect(response.status).toEqual(201);

    expect(body).toHaveProperty('title');
    expect(body.title).toEqual(book.title);
    expect(body).toHaveProperty('author');
    expect(body.author).toEqual(book.author);
    expect(body).toHaveProperty('publisher');
    expect(body.publisher).toEqual(book.publisher);
    expect(body).toHaveProperty('edition');
    expect(body.edition).toEqual(book.edition);
    expect(body).toHaveProperty('synopsis');
    expect(body.synopsis).toEqual(book.synopsis);
  });

  // -------------------------------------------------------------------------------------------- //

  it('should generate a id for the book', async () => {
    const response = await request(server)
      .post('/books')
      .send(book)
      .set({ authorization: `bearer ${token}` });

    const { body } = response;

    expect(response.status).toEqual(201);
    expect(body).toHaveProperty('id');
  });

  // *** ---- Data Validation --------------------------------------------------------------- *** //
  it('should fail if title is not provided', async () => {
    const invalidBook: InvalidBook = new TestBook();
    delete invalidBook.title;

    const response = await request(server)
      .post('/books')
      .send(invalidBook)
      .set({ authorization: `bearer ${token}` });

    const { body } = response;

    expect(response.status).toEqual(400);

    expect(body.message).toEqual('invalid data');
    expect(body.status).toEqual('error');
  });

  it('should fail if title is wrong type', async () => {
    const invalidBook: InvalidBook = new TestBook();
    invalidBook.title = false;

    const response = await request(server)
      .post('/books')
      .send(invalidBook)
      .set({ authorization: `bearer ${token}` });

    const { body } = response;

    expect(response.status).toEqual(400);

    expect(body.message).toEqual('invalid data');
    expect(body.status).toEqual('error');
  });

  // ---- Title --------------------------------------------------------------------------------- //

  it('should fail if author is not provided', async () => {
    const invalidBook: InvalidBook = new TestBook();
    delete invalidBook.author;

    const response = await request(server)
      .post('/books')
      .send(invalidBook)
      .set({ authorization: `bearer ${token}` });

    const { body } = response;

    expect(response.status).toEqual(400);

    expect(body.message).toEqual('invalid data');
    expect(body.status).toEqual('error');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should fail if author is wrong type', async () => {
    const invalidBook: InvalidBook = new TestBook();
    invalidBook.author = false;

    const response = await request(server)
      .post('/books')
      .send(invalidBook)
      .set({ authorization: `bearer ${token}` });

    const { body } = response;

    expect(response.status).toEqual(400);

    expect(body.message).toEqual('invalid data');
    expect(body.status).toEqual('error');
  });

  // ---- Publisher ----------------------------------------------------------------------------- //

  it('should fail if publisher is not provided', async () => {
    const invalidBook: InvalidBook = new TestBook();
    delete invalidBook.publisher;

    const response = await request(server)
      .post('/books')
      .send(invalidBook)
      .set({ authorization: `bearer ${token}` });

    const { body } = response;

    expect(response.status).toEqual(400);

    expect(body.message).toEqual('invalid data');
    expect(body.status).toEqual('error');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should fail if publisher is wrong type', async () => {
    const invalidBook: InvalidBook = new TestBook();
    invalidBook.publisher = false;

    const response = await request(server)
      .post('/books')
      .send(invalidBook)
      .set({ authorization: `bearer ${token}` });

    const { body } = response;

    expect(response.status).toEqual(400);

    expect(body.message).toEqual('invalid data');
    expect(body.status).toEqual('error');
  });

  // ---- Edition ------------------------------------------------------------------------------- //

  it('should fail if edition is not provided', async () => {
    const invalidBook: InvalidBook = new TestBook();
    delete invalidBook.edition;

    const response = await request(server)
      .post('/books')
      .send(invalidBook)
      .set({ authorization: `bearer ${token}` });

    const { body } = response;

    expect(response.status).toEqual(400);

    expect(body.message).toEqual('invalid data');
    expect(body.status).toEqual('error');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should fail if edition is wrong type', async () => {
    const invalidBook: InvalidBook = new TestBook();
    invalidBook.edition = false;

    const response = await request(server)
      .post('/books')
      .send(invalidBook)
      .set({ authorization: `bearer ${token}` });

    const { body } = response;

    expect(response.status).toEqual(400);

    expect(body.message).toEqual('invalid data');
    expect(body.status).toEqual('error');
  });

  // ---- Synopsis ------------------------------------------------------------------------------ //

  it('should fail if synopsis is not provided', async () => {
    const invalidBook: InvalidBook = new TestBook();
    delete invalidBook.synopsis;

    const response = await request(server)
      .post('/books')
      .send(invalidBook)
      .set({ authorization: `bearer ${token}` });

    const { body } = response;

    expect(response.status).toEqual(400);

    expect(body.message).toEqual('invalid data');
    expect(body.status).toEqual('error');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should fail if synopsis is wrong type', async () => {
    const invalidBook: InvalidBook = new TestBook();
    invalidBook.synopsis = false;

    const response = await request(server)
      .post('/books')
      .send(invalidBook)
      .set({ authorization: `bearer ${token}` });

    const { body } = response;

    expect(response.status).toEqual(400);

    expect(body.message).toEqual('invalid data');
    expect(body.status).toEqual('error');
  });
});
