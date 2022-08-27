import { Router } from 'express';

import { accountsRouter } from '@accounts:infra/http/index.routes';

//----------------------------------------------------------------------------------------------- //

const routes = Router();

routes.use('/accounts', accountsRouter );

//----------------------------------------------------------------------------------------------- //

export { routes };
