import { Router } from 'express';

import { sessionsRouter } from '@accounts:routes/sessions.routes';
import { usersRouter } from '@accounts:routes/users.routes';

//----------------------------------------------------------------------------------------------- //

const accountsRouter = Router();

accountsRouter.use('/sessions', sessionsRouter);
accountsRouter.use('/users', usersRouter);

//----------------------------------------------------------------------------------------------- //

export { accountsRouter };
