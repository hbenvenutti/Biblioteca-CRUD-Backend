import { AppError } from '@errors/App.error';

export class PasswordsDontMatchError extends AppError {
  constructor() {
    super('passwords don\'t match', 400);
  }
}
