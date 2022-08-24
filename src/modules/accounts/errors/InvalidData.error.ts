import { AppError } from '@errors/App.error';

export class InvalidDataError extends AppError {
  constructor() {
    super('invalid data!', 40);
  }
}
