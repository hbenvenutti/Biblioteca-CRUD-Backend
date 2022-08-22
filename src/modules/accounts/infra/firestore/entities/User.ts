import { CreateUserDTO } from '@accounts:dtos/CreateUser.dto';

// ---------------------------------------------------------------------------------------------- //

export class User {
  name: string;
  last_name: string;
  email: string;
  password: string;

  constructor(data: CreateUserDTO) {
    this.name = data.name;
    this.last_name = data.last_name;
    this.email = data.email;
    this.password = data.password;
  }
}
