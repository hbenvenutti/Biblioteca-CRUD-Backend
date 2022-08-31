import { AppError } from '@errors/App.error';

export class NotFoundError extends AppError {
  constructor() {
    super('not found', 404);
  }
}
