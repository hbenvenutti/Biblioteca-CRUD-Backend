import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserService } from '@accounts:use-cases/users/CreateUser.service';

// ---------------------------------------------------------------------------------------------- //

export class CreateUserController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { name, lastName, email, password, passwordConfirmation } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      email,
      name,
      lastName,
      password,
      passwordConfirmation
    });

    return response.status(200).json(user);
  }
}
