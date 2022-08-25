import { CreateUserRequestDTO } from '@accounts:dtos/CreateUserRequest.dto';

export interface ValidationProviderInterface {
  validateUserCreationData(data: CreateUserRequestDTO): Promise<boolean>;
}
