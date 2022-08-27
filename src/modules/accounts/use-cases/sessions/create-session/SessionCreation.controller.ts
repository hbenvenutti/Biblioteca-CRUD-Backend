import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SessionCreationService } from '@accounts:use-cases/sessions/create-session/SessionCreation.service';

// ---------------------------------------------------------------------------------------------- //

class SessionCreationController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const sessionCreationService = container.resolve(SessionCreationService);

    const session = await sessionCreationService.execute({ email, password });

    return response.status(201).json(session);
  }
}

// ---------------------------------------------------------------------------------------------- //

export { SessionCreationController };
