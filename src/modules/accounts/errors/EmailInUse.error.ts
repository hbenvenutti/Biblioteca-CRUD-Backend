import { AppError } from '@errors/App.error';

export class EmailInUseError extends AppError {
  constructor() {
    super('e-mail already in use', 400);
  }
}
