import { CreateUserRequestDTO } from '@accounts/dtos/CreateUserRequest.dto';
import { ValidationProviderInterface } from '@shared:containers/providers/validation/Validation.provider.interface';

export class MockValidationProvider implements ValidationProviderInterface {
  async validateUserCreationData(data: CreateUserRequestDTO): Promise<boolean> {
    return data.email !== 'invalid';
  }
}
