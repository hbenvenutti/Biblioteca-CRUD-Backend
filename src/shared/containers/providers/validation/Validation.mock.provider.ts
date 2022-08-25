import { UserCreationRequest } from '@accounts:dtos/Users.dto';
import { ValidationProviderInterface } from '@shared:containers/providers/validation/Validation.provider.interface';

export class MockValidationProvider implements ValidationProviderInterface {
  async validateUserCreationData(data: UserCreationRequest): Promise<boolean> {
    return data.email !== 'invalid';
  }
}
