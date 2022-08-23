import { Request, Response } from 'express';

export class CreateUserController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { name, lastName, email, password, passwordConfirmation } = request.body;
    
    return response.status(200).json({});
  }
}
