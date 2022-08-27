import { SessionCreationRequest } from '@accounts:dtos/Sessions.dto';
import { UserCreationRequest } from '@accounts:dtos/Users.dto';

export interface ValidationProviderInterface {
  validateUserCreationData(data: UserCreationRequest): Promise<boolean>;
  validateSessionData(data: SessionCreationRequest): Promise<boolean>;
}
