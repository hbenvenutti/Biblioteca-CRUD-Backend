import { Router } from 'express';

import { BookCreationController } from '@books:use-cases/book-creation/BookCreation.controller';
import { authentication } from '@middlewares/authentication';

// ---------------------------------------------------------------------------------------------- //

const booksRouter = Router();

// *** ---- Controllers --------------------------------------------------------------------- *** //
const bookCreationController = new BookCreationController();

// *** ---- Routes -------------------------------------------------------------------------- *** //

// *** ---- Authorized ---------------------------------------------------------------------- *** //
booksRouter.use(authentication);
booksRouter.post('/', bookCreationController.execute );

// ---------------------------------------------------------------------------------------------- //

export { booksRouter };
