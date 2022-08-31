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
/**
 * Class to standardize user data along tests and seeds
 */
export class TestUser {
  static async generateTestUser(): Promise<TestUserData> {
    const hashProvider: HashProviderInterface = new ProviderFactory().hashProvider;

    const name = 'john';
    const email = 'johndoe@example.com';
    const lastName = 'doe';
    const password = '@Password248';
    const passwordConfirmation = password;
    const passwordHash = await hashProvider.hash(password);

    return {
      name,
      lastName,
      email,
      password,
      passwordConfirmation,
      passwordHash
    };
  }
}

export interface InvalidUser {
  name?: string | boolean;
  lastName?: string | boolean;
  email?: string | boolean;
  password?: string | boolean;
  passwordConfirmation?: string | boolean
}
