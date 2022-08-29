import { Router } from 'express';

import { BookCreationController } from '@books:use-cases/book-creation/BookCreation.controller';

// ---------------------------------------------------------------------------------------------- //

const booksRouter = Router();

// *** ---- Controllers --------------------------------------------------------------------- *** //
const bookCreationController = new BookCreationController();

// *** ---- Routes -------------------------------------------------------------------------- *** //
booksRouter.post('/', bookCreationController.execute );

// ---------------------------------------------------------------------------------------------- //

export { booksRouter };
