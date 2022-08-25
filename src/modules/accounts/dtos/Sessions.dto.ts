import { UserResponseData } from '@accounts:dtos/Users.dto';

export interface SessionCreationRequest {
  email: string;
  password: string
}

export interface SessionsCreationResponse {
  user: UserResponseData;
  token: string;
}
