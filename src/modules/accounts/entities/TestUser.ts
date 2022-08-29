import { UserCreationRequest } from '@accounts:dtos/Users.dto';
import { HashProviderInterface } from '@shared:containers/providers/hash/Hash.provider.interface';
import { ProviderFactory } from '@shared:containers/providers/ProviderFactory';

// ---------------------------------------------------------------------------------------------- //

/**
 * Class to standardize user data along tests and seeds
 */
export class TestUser implements UserCreationRequest {
  private hashProvider: HashProviderInterface = new ProviderFactory().hashProvider;

  name = 'john';
  lastName = 'doe';
  email = 'johndoe@example.com';
  password = '@Password248';
  passwordConfirmation = this.password;
  passwordHash = this.hashProvider.hash(this.password);
}
