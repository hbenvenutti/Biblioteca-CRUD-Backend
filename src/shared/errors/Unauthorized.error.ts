import { AppError } from '@errors/App.error';
// ---------------------------------------------------------------------------------------------- //
export class UnauthorizedError extends AppError {
  constructor() {
    super('unauthorized', 401);
  }
}
