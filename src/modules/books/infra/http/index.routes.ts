import { Router } from 'express';

import { authentication } from '@middlewares/authentication';
import { BookCreationController } from '@books:use-cases/book-creation/BookCreation.controller';
import { BookDeletionController } from '@books:use-cases/book-deletion/BookDeletion.controller';

// ---------------------------------------------------------------------------------------------- //

const booksRouter = Router();

// *** ---- Controllers --------------------------------------------------------------------- *** //
const bookCreationController = new BookCreationController();
const bookDeletionController = new BookDeletionController();

// *** ---- Routes -------------------------------------------------------------------------- *** //

// *** ---- Authorized ---------------------------------------------------------------------- *** //
booksRouter.use(authentication);
booksRouter.post('/', bookCreationController.execute );
booksRouter.delete('/:id', bookDeletionController.execute);

// ---------------------------------------------------------------------------------------------- //

export { booksRouter };
