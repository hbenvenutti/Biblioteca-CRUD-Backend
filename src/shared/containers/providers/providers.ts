import { container } from 'tsyringe';

import { BcryptProvider } from '@shared:containers/providers/hash/Bcrypt.provider';
import { HashProviderInterface } from '@shared:containers/providers/hash/Hash.provider.interface';

import { JsonWebTokenProvider } from '@shared:providers/token/JsonWebTokenProvider';
import { TokenProviderInterface } from '@shared:providers/token/TokenProvider.interface';

import { ValidationProviderInterface } from '@shared:containers/providers/validation/Validation.provider.interface';
import { YupValidationProvider } from '@shared:containers/providers/validation/YupValidation.provider';

// ---------------------------------------------------------------------------------------------- //

container
  .registerSingleton<ValidationProviderInterface>('ValidationProvider', YupValidationProvider);

container
  .registerSingleton<HashProviderInterface>('HashProvider', BcryptProvider);

container
  .registerSingleton<TokenProviderInterface>('TokenProvider', JsonWebTokenProvider);
