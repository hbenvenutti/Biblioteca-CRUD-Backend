export interface UserCreationData {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserCreationRequest {
  name: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface UserResponseData {
  id: string;
  name: string;
  lastName: string;
  email: string;
}
