import request from 'supertest';

import server from '@shared:app/App';
import { TestDatabaseFactory } from '@shared:infra/database/TestDatabaseFactory';
import { TestDatabaseInterface } from '@shared:infra/database/TestDatabase.interface';

// ---------------------------------------------------------------------------------------------- //

describe('User Creation integration test', () => {
  const database: TestDatabaseInterface = new TestDatabaseFactory().testDatabase;

  const name = 'john';
  const lastName = 'doe';
  const email = 'johndoe@example.com';
  const password = '@Password148';
  const passwordConfirmation = password;

  beforeEach(async () => {
    await database.deleteAllUsers();
  });

  afterAll(async () => {
    await database.deleteAllUsers();
  });

  // *** ---- Success Test Cases ------------------------------------------------------------ *** //
  it('should create a user in the database', async () => {
    const response = await request(server)
      .post('/accounts/users')
      .send({ name, lastName, email, password, passwordConfirmation });

    expect(response.status).toEqual(201);
  });

  // -------------------------------------------------------------------------------------------- //

  it('should generate a user\'s id', async () => {
    const response = await request(server)
      .post('/accounts/users')
      .send({ name, lastName, email, password, passwordConfirmation });

    const user = response.body;

    expect(response.status).toEqual(201);
    expect(user).toHaveProperty('id');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should return a user without its password', async () => {
    const response = await request(server)
      .post('/accounts/users')
      .send({ name, lastName, email, password, passwordConfirmation });

    const user = response.body;

    expect(response.status).toEqual(201);
    expect(user).not.toHaveProperty('password');
  });

  // *** ---- String Treatment -------------------------------------------------------------- *** //
  it('should remove useless spaces', async () => {
    const name = ' john ';
    const lastName = ' doe ';

    const response = await request(server)
      .post('/accounts/users')
      .send({ name, lastName, email, password, passwordConfirmation });

    const user = response.body;

    expect(response.status).toEqual(201);
    expect(user.name).toEqual('john');
    expect(user.lastName).toEqual('doe');
    expect(user.email).toEqual('johndoe@example.com');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should turn strings into lowercase', async () => {
    const name = 'John';
    const lastName = 'doE';
    const email = 'JOHNDOE@EXAMPLE.COM';

    const response = await request(server)
      .post('/accounts/users')
      .send({ name, lastName, email, password, passwordConfirmation });

    const user = response.body;

    expect(response.status).toEqual(201);
    expect(user.name).toEqual('john');
    expect(user.lastName).toEqual('doe');
    expect(user.email).toEqual('johndoe@example.com');
  });


  // *** ---- Error Test Cases -------------------------------------------------------------- *** //
  it('should fail if passwords don\'t match', async () => {
    const password = '@Password148';
    const passwordConfirmation = '@Password149';

    const response = await request(server)
      .post('/accounts/users')
      .send({ name, lastName, email, password, passwordConfirmation });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('passwords don\'t match');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should fail if e-mail is already used', async () => {
    await request(server)
      .post('/accounts/users')
      .send({ name, lastName, email, password, passwordConfirmation });

    const response = await request(server)
      .post('/accounts/users')
      .send({ name, lastName, email, password, passwordConfirmation });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('e-mail already in use');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // *** ---- Data Validation --------------------------------------------------------------- *** //
  it('should fail if e-mail does not have a valid format', async () => {
    const email = 'invalid-email';

    const response = await request(server)
      .post('/accounts/users')
      .send({ name, lastName, email, password, passwordConfirmation });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('invalid data');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should fail if password length is lower than 8', async () => {
    const password = '@Pass19';
    const passwordConfirmation = password;

    const response = await request(server)
      .post('/accounts/users')
      .send({ name, lastName, email, password, passwordConfirmation });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('invalid data');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should fail if password has no numbers', async () => {
    const password = '@Password';
    const passwordConfirmation = password;

    const response = await request(server)
      .post('/accounts/users')
      .send({ name, lastName, email, password, passwordConfirmation });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('invalid data');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should fail if password has no Upper letters', async () => {
    const password = '@password148';
    const passwordConfirmation = password;

    const response = await request(server)
      .post('/accounts/users')
      .send({ name, lastName, email, password, passwordConfirmation });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('invalid data');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should fail if password has sequencies bigger than 3', async () => {
    const password = '@password12348';
    const passwordConfirmation = password;

    const response = await request(server)
      .post('/accounts/users')
      .send({ name, lastName, email, password, passwordConfirmation });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('invalid data');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should fail if name is not sent', async () => {
    const response = await request(server)
      .post('/accounts/users')
      .send({ lastName, email, password, passwordConfirmation });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('invalid data');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should fail if last name is not sent', async () => {
    const response = await request(server)
      .post('/accounts/users')
      .send({ name, email, password, passwordConfirmation });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('invalid data');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should fail if email is not sent', async () => {
    const response = await request(server)
      .post('/accounts/users')
      .send({ name, lastName, password, passwordConfirmation });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('invalid data');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should fail if passwords are not sent', async () => {
    const response = await request(server)
      .post('/accounts/users')
      .send({ name, lastName, email });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('invalid data');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should fail if name has numbers', async () => {
    const name = 'john123';

    const response = await request(server)
      .post('/accounts/users')
      .send({ name, lastName, email, password, passwordConfirmation });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('invalid data');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should fail if last name has numbers', async () => {
    const lastName = 'john123';

    const response = await request(server)
      .post('/accounts/users')
      .send({ name, lastName, email, password, passwordConfirmation });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('invalid data');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should fail if name is wrong type', async () => {
    const name = true;

    const response = await request(server)
      .post('/accounts/users')
      .send({ name, lastName, email, password, passwordConfirmation });

    const { body } = response;

    expect(response.status).toEqual(500);
    expect(body).toHaveProperty('message');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should fail if last name is wrong type', async () => {
    const lastName = true;

    const response = await request(server)
      .post('/accounts/users')
      .send({ name, lastName, email, password, passwordConfirmation });

    const { body } = response;

    expect(response.status).toEqual(500);
    expect(body).toHaveProperty('message');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should fail if name length is lower than 3', async () => {
    const name = 'jo';

    const response = await request(server)
      .post('/accounts/users')
      .send({ name, lastName, email, password, passwordConfirmation });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('invalid data');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should fail if last name length is lower than 3', async () => {
    const lastName = 'do';

    const response = await request(server)
      .post('/accounts/users')
      .send({ name, lastName, email, password, passwordConfirmation });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('invalid data');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // *** ---- Hash Validation --------------------------------------------------------------- *** //
  it('should hash the password', async () => {
    const response = await request(server)
      .post('/accounts/users')
      .send({ name, lastName, email, password, passwordConfirmation });

    const user = response.body;

    const hash = await database.getUserPassword(user.id);

    expect(hash).not.toEqual(password);
  });
});
