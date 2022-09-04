import { SessionCreationRequest } from '@accounts:dtos/Sessions.dto';
import { UserCreationRequest } from '@accounts:dtos/Users.dto';
import { BookCreationData } from '@books:dtos/Book';

// ---------------------------------------------------------------------------------------------- //
export interface ValidationProviderInterface {

  // *** ---- User -------------------------------------------------------------------------- *** //
  validateUserCreationData(data: UserCreationRequest): Promise<boolean>;
  validateSessionData(data: SessionCreationRequest): Promise<boolean>;

  // *** ---- Book -------------------------------------------------------------------------- *** //
  validateBookCreationData(data: BookCreationData): Promise<boolean>;
  validateBookUpdateData(data: BookCreationData): Promise<boolean>;
}
