import { Router } from 'express';

import { accountsRouter } from '@accounts:infra/http/index.routes';
import { booksRouter } from '@books:infra/http/index.routes';

//----------------------------------------------------------------------------------------------- //

const routes = Router();

routes.use('/accounts', accountsRouter );
routes.use('/books', booksRouter );

//----------------------------------------------------------------------------------------------- //

export { routes };
