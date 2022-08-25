import { Router } from 'express';
import { SessionCreationController } from '@accounts:use-cases/sessions/SessionCreation.controller';

// ---------------------------------------------------------------------------------------------- //

const sessionsRouter = Router();

const sessionCreationController = new SessionCreationController();

sessionsRouter.post('/', sessionCreationController.execute);

// ---------------------------------------------------------------------------------------------- //

export { sessionsRouter };
