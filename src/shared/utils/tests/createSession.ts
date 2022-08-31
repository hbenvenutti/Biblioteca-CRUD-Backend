import request from 'supertest';

import server from '@shared:app/App';
import { generateTestUser } from '@accounts:entities/TestUser';


// ---------------------------------------------------------------------------------------------- //

const createSession = async (): Promise<string> => {
  const { email, password } = await generateTestUser();

  const session = await request(server)
    .post('/accounts/sessions')
    .send({ email, password });

  const { token } = session.body;

  return token;
};

// ---------------------------------------------------------------------------------------------- //

export { createSession };
