import { CreateUserRequestDTO } from '@accounts/dtos/CreateUserRequest.dto';
import { ValidationProviderInterface } from '@shared:containers/providers/validation/Validation.provider.interface';

export class ValidationMockProvider implements ValidationProviderInterface {
  async validateUserCreationData(_: CreateUserRequestDTO): Promise<boolean> {
    return true;
  }
}
