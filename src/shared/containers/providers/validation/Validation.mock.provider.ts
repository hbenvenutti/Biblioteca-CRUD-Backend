import { SessionCreationRequest } from '@accounts:dtos/Sessions.dto';
import { UserCreationRequest } from '@accounts:dtos/Users.dto';
import { BookCreationData } from '@books:dtos/Book';
import { ValidationProviderInterface } from '@shared:containers/providers/validation/Validation.provider.interface';

// ---------------------------------------------------------------------------------------------- //

export class MockValidationProvider implements ValidationProviderInterface {
  async validateSessionData(data: SessionCreationRequest): Promise<boolean> {
    return data.email !== 'invalid';
  }

  async validateUserCreationData(data: UserCreationRequest): Promise<boolean> {
    return data.email !== 'invalid';
  }

  async validateBookCreationData(data: BookCreationData): Promise<boolean> {
    return data.title !== 'invalid';
  }

  async validateBookUpdateData(data: BookCreationData): Promise<boolean> {
    return data.title !== 'invalid';
  }
}
