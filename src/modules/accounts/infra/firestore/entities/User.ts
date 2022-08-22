import { CreateUserDTO } from '@accounts:dtos/CreateUser.dto';
// ---------------------------------------------------------------------------------------------- //

export class User {
  id: string;
  name: string;
  last_name: string;
  email: string;
  password: string;

  constructor(data: CreateUserDTO) {
    this.id = data.id;
    this.name = data.name;
    this.last_name = data.last_name;
    this.email = data.email;
    this.password = data.password;
  }
}
