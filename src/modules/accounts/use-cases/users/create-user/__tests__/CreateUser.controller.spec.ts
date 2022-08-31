import request from 'supertest';

import server from '@shared:app/App';
import { TestDatabaseFactory } from '@shared:infra/database/TestDatabaseFactory';
import { TestDatabaseInterface } from '@shared:infra/database/TestDatabase.interface';
import { TestUserData, InvalidUser, generateTestUser } from '@accounts:entities/TestUser';

// ---------------------------------------------------------------------------------------------- //

describe('User Creation integration test', () => {
  const database: TestDatabaseInterface = new TestDatabaseFactory().testDatabase;

  let user: TestUserData;
  let invalidUser: InvalidUser;

  beforeAll(async() => {
    user = await generateTestUser();
  });

  beforeEach(async () => {
    await database.deleteAllUsers();

    invalidUser = await generateTestUser();
  });

  afterAll(async () => {
    await database.deleteAllUsers();
  });

  // *** ---- Success Test Cases ------------------------------------------------------------ *** //
  it('should create a user in the database', async () => {
    const response = await request(server)
      .post('/accounts/users')
      .send(user);

    expect(response.status).toEqual(201);
  });

  // -------------------------------------------------------------------------------------------- //

  it('should generate a user\'s id', async () => {
    const response = await request(server)
      .post('/accounts/users')
      .send(user);

    const { body } = response;

    expect(response.status).toEqual(201);
    expect(body).toHaveProperty('id');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should return a user without its password', async () => {
    const response = await request(server)
      .post('/accounts/users')
      .send(user);

    const { body } = response;

    expect(response.status).toEqual(201);
    expect(body).not.toHaveProperty('password');
  });

  // *** ---- String Treatment -------------------------------------------------------------- *** //
  // ? ---- e-mail with spaces fails inside validation tests ---------------------------------- ? //
  it('should remove useless spaces from name', async () => {
    invalidUser.name = ' john ';

    const response = await request(server)
      .post('/accounts/users')
      .send(invalidUser);

    const { body } = response;

    expect(response.status).toEqual(201);
    expect(body.name).toEqual('john');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should remove useless spaces from last name', async () => {
    invalidUser.lastName = ' doe ';

    const response = await request(server)
      .post('/accounts/users')
      .send(invalidUser);

    const { body } = response;

    expect(response.status).toEqual(201);
    expect(body.lastName).toEqual('doe');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should turn e-mail into lowercase', async () => {
    invalidUser.email = 'JOHNDOE@EXAMPLE.COM';

    const response = await request(server)
      .post('/accounts/users')
      .send(invalidUser);

    const { body } = response;

    expect(response.status).toEqual(201);
    expect(body.email).toEqual('johndoe@example.com');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should turn name into lowercase', async () => {
    invalidUser.name = 'John';

    const response = await request(server)
      .post('/accounts/users')
      .send(invalidUser);

    const { body } = response;

    expect(response.status).toEqual(201);
    expect(body.name).toEqual('john');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should turn last name into lowercase', async () => {
    invalidUser.lastName = 'doE';

    const response = await request(server)
      .post('/accounts/users')
      .send(invalidUser);

    const { body } = response;

    expect(response.status).toEqual(201);
    expect(body.lastName).toEqual('doe');
  });


  // *** ---- Business Rules ---------------------------------------------------------------- *** //
  it('should fail if passwords don\'t match', async () => {
    invalidUser.password = '@Password148';
    invalidUser.passwordConfirmation = '@Password149';

    const response = await request(server)
      .post('/accounts/users')
      .send(invalidUser);

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
      .send(user);

    const response = await request(server)
      .post('/accounts/users')
      .send(user);

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('e-mail already in use');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // *** ---- E-mail Format  ---------------------------------------------------------------- *** //
  it('should fail if e-mail does not have a valid format', async () => {
    invalidUser.email = 'invalid-email';

    const response = await request(server)
      .post('/accounts/users')
      .send(invalidUser);

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('invalid data');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // *** ---- Password Format --------------------------------------------------------------- *** //

  it('should fail if password length is lower than 8', async () => {
    const password = '@Pass19';

    invalidUser.password = password;
    invalidUser.passwordConfirmation = password;

    const response = await request(server)
      .post('/accounts/users')
      .send(invalidUser);

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

    invalidUser.password = password;
    invalidUser.passwordConfirmation = password;

    const response = await request(server)
      .post('/accounts/users')
      .send(invalidUser);

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

    invalidUser.password = password;
    invalidUser.passwordConfirmation = password;

    const response = await request(server)
      .post('/accounts/users')
      .send(invalidUser);

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

    invalidUser.password = password;
    invalidUser.passwordConfirmation = password;

    const response = await request(server)
      .post('/accounts/users')
      .send(invalidUser);

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('invalid data');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // *** ---- Required Properties Sent ------------------------------------------------------ *** //

  it('should fail if name is not sent', async () => {
    delete invalidUser.name;

    const response = await request(server)
      .post('/accounts/users')
      .send(invalidUser);

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('invalid data');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should fail if last name is not sent', async () => {
    delete invalidUser.lastName;

    const response = await request(server)
      .post('/accounts/users')
      .send(invalidUser);

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('invalid data');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should fail if email is not sent', async () => {
    delete invalidUser.email;

    const response = await request(server)
      .post('/accounts/users')
      .send(invalidUser);

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('invalid data');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should fail if passwords are not sent', async () => {
    delete invalidUser.password;
    delete invalidUser.passwordConfirmation;

    const response = await request(server)
      .post('/accounts/users')
      .send(invalidUser);

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('invalid data');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // *** ---- Numbers in names -------------------------------------------------------------- *** //

  it('should fail if name has numbers', async () => {
    invalidUser.name = 'john123';

    const response = await request(server)
      .post('/accounts/users')
      .send(invalidUser);

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('invalid data');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should fail if last name has numbers', async () => {
    invalidUser.lastName = 'john123';

    const response = await request(server)
      .post('/accounts/users')
      .send(invalidUser);

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('invalid data');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // *** ---- Properties types -------------------------------------------------------------- *** //

  it('should fail if name is wrong type', async () => {
    invalidUser.name = true;

    const response = await request(server)
      .post('/accounts/users')
      .send(invalidUser);

    const { body } = response;

    expect(response.status).toEqual(400);
    
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('invalid data');

    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should fail if last name is wrong type', async () => {
    invalidUser.lastName = true;

    const response = await request(server)
      .post('/accounts/users')
      .send(invalidUser);

    const { body } = response;

    expect(response.status).toEqual(400);

    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('invalid data');

    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // *** ---- Names Length ------------------------------------------------------------------ *** //

  it('should fail if name length is lower than 3', async () => {
    invalidUser.name = 'jo';

    const response = await request(server)
      .post('/accounts/users')
      .send(invalidUser);

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('invalid data');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should fail if last name length is lower than 3', async () => {
    invalidUser.lastName = 'do';

    const response = await request(server)
      .post('/accounts/users')
      .send(invalidUser);

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
      .send(user);

    const { body } = response;

    const hash = await database.getUserPassword(body.id);

    expect(hash).not.toEqual(body.password);
  });
});
