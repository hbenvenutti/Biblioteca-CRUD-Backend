import { AppError } from '@errors/App.error';

export class PasswordsDontMatchError extends AppError {
  constructor() {
    super('Passwords don\'t match', 400);
  }
}
