import { Router } from 'express';

import { CreateUserController } from '@accounts:use-cases/users/CreateUser.controller';

// ---------------------------------------------------------------------------------------------- //

const usersRouter = Router();

const createUserController = new CreateUserController();

usersRouter.post('/', createUserController.execute);

// ---------------------------------------------------------------------------------------------- //

export { usersRouter };
