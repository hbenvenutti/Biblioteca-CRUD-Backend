import { UserCreationRequest } from '@accounts:dtos/Users.dto';

export interface ValidationProviderInterface {
  validateUserCreationData(data: UserCreationRequest): Promise<boolean>;
}
