import request from 'supertest';

import server from '@shared:app/App';
import { TestUser } from '@accounts:entities/TestUser';


// ---------------------------------------------------------------------------------------------- //

const createSession = async () => {
  const { email, password } = await TestUser.generateTestUser();


  const session = await request(server)
    .post('/accounts/sessions')
    .send({ email, password });

  const { token } = session.body;

  return token;
};

// ---------------------------------------------------------------------------------------------- //

export { createSession };
