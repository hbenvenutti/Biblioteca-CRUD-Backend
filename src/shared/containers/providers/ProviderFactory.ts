import { HashProviderInterface } from '@shared:providers/hash/Hash.provider.interface';
import { BcryptProvider } from '@shared:providers/hash/Bcrypt.provider';
import { TokenProviderInterface } from '@shared:providers/token/TokenProvider.interface';
import { JsonWebTokenProvider } from '@shared:providers/token/JsonWebTokenProvider';
import { ValidationProviderInterface } from '@shared:providers/validation/Validation.provider.interface';
import { YupValidationProvider } from '@shared:providers/validation/YupValidation.provider';

// ---------------------------------------------------------------------------------------------- //

export class ProviderFactory {
  hashProvider: HashProviderInterface;
  tokenProvider: TokenProviderInterface;
  validationProvider: ValidationProviderInterface;

  constructor() {
    this.hashProvider = new BcryptProvider();
    this.tokenProvider = new JsonWebTokenProvider();
    this.validationProvider = new YupValidationProvider();
  }
}
