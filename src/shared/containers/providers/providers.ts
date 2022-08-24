import { container } from 'tsyringe';

import { ValidationProviderInterface } from '@shared:containers/providers/validation/Validation.provider.interface';
import { YupValidationProvider } from '@shared:containers/providers/validation/YupValidation.provider';

// ---------------------------------------------------------------------------------------------- //

container
  .registerSingleton<ValidationProviderInterface>('ValidationProvider', YupValidationProvider );
