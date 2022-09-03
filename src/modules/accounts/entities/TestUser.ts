import { HashProviderInterface } from '@shared:containers/providers/hash/Hash.provider.interface';
import { ProviderFactory } from '@shared:containers/providers/ProviderFactory';

// ---------------------------------------------------------------------------------------------- //

export interface TestUserData {
  name: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  passwordHash: string;
}

// ---------------------------------------------------------------------------------------------- //

export interface InvalidUser {
  name?: string | boolean;
  lastName?: string | boolean;
  email?: string | boolean;
  password?: string | boolean;
  passwordConfirmation?: string | boolean
}

// ---------------------------------------------------------------------------------------------- //

/**
 * Function that returns a user for test.
 */
export const generateTestUser = async (): Promise<TestUserData> => {
  const hashProvider: HashProviderInterface = new ProviderFactory().hashProvider;
  const password = '@Password248';
  const user = {
    password,
    name: 'john',
    email: 'johndoe@example.com',
    lastName: 'doe',
    passwordConfirmation: password,
    passwordHash: await hashProvider.hash(password)

  };

  return user;
};


