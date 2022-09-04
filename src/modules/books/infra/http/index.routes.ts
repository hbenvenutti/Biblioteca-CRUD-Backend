import { Router } from 'express';

import { authentication } from '@middlewares/authentication';
import { BookCreationController } from '@books:use-cases/book-creation/BookCreation.controller';
import { BookDeletionController } from '@books:use-cases/book-deletion/BookDeletion.controller';
import { bookListingController } from '@books:use-cases/book-list/bookListing.controller';
import { bookUpdateController } from '@books:use-cases/book-update/bookUpdate.controller';

// ---------------------------------------------------------------------------------------------- //

const booksRouter = Router();

// *** ---- Controllers --------------------------------------------------------------------- *** //
const bookCreationController = new BookCreationController();
const bookDeletionController = new BookDeletionController();

// *** ---- Routes -------------------------------------------------------------------------- *** //
booksRouter.get('/', bookListingController);

// *** ---- Authorized Routes --------------------------------------------------------------- *** //
booksRouter.use(authentication);

booksRouter.post('/', bookCreationController.execute );
booksRouter.delete('/:id', bookDeletionController.execute);
booksRouter.put('/:id', bookUpdateController);

// ---------------------------------------------------------------------------------------------- //

export { booksRouter };
