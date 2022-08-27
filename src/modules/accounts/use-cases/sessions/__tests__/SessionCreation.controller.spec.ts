import request from 'supertest';

import server from '@shared:app/App';

import { UserCreationRequest } from '@accounts:dtos/Users.dto';
import { TestDatabaseInterface } from '@shared:infra/database/TestDatabase.interface';
import { TestDatabaseFactory } from '@shared:infra/database/TestDatabaseFactory';

// ---------------------------------------------------------------------------------------------- //

describe('Session Creation Controller', () => {
  const database: TestDatabaseInterface = new TestDatabaseFactory().testDatabase;

  const name = 'john';
  const lastName = 'doe';
  const email = 'johndoe@example.com';
  const password = '@Password12';

  const user: UserCreationRequest = {
    name,
    lastName,
    email,
    password,
    passwordConfirmation:
    password
  };

  beforeAll(async () => {
    await request(server)
      .post('/accounts/users')
      .send(user);
  });

  // -------------------------------------------------------------------------------------------- //

  afterAll(async () => {
    await database.deleteAllUsers();
  });

  // *** ---- Success ----------------------------------------------------------------------- *** //

  it('should return the user\'s data', async () => {
    const response = await request(server).post('/accounts/sessions').send({ email, password });

    const { body } = response;

    expect(response.status).toEqual(201);

    expect(body).toHaveProperty('user');
    expect(body.user).toHaveProperty('id');
    expect(body.user.email).toEqual(email);
  });

  // -------------------------------------------------------------------------------------------- //

  it('should return a session token', async () => {
    const response = await request(server).post('/accounts/sessions').send({ email, password });

    const { body } = response;

    expect(response.status).toEqual(201);

    expect(body).toHaveProperty('token');
    expect(body.token).toBeTruthy();
  });

  // -------------------------------------------------------------------------------------------- //

  it('should not return the user\'s password', async () => {
    const response = await request(server).post('/accounts/sessions').send({ email, password });

    const { user } = response.body;

    expect(response.status).toEqual(201);

    expect(user).not.toHaveProperty('password');
  });


  // *** ---- Business Rules ---------------------------------------------------------------- *** //
  it('should fail if user is not found', async () => {
    const email = 'inexistent.user@example.com';

    const response = await request(server).post('/accounts/sessions').send({ email, password });

    const { body } = response;

    expect(response.status).toEqual(404);

    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('not found');

    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should fail if passwords don\'t match', async () => {
    const password = '@WrongPassword';

    const response = await request(server).post('/accounts/sessions').send({ email, password });

    const { body } = response;

    expect(response.status).toEqual(404);

    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('not found');

    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // *** ---- Data Validation --------------------------------------------------------------- *** //

  it('should fail e-mail has wrong format', async () => {
    const email = 'invalid-email';

    const response = await request(server).post('/accounts/sessions').send({ email, password });

    const { body } = response;

    expect(response.status).toEqual(400);

    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('invalid data');

    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should fail e-mail is not sent', async () => {
    const response = await request(server).post('/accounts/sessions').send({ password });

    const { body } = response;

    expect(response.status).toEqual(400);

    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('invalid data');

    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should fail password is not sent', async () => {
    const response = await request(server).post('/accounts/sessions').send({ email });

    const { body } = response;

    expect(response.status).toEqual(400);

    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('invalid data');

    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });
});
