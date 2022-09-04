import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { BookListingService } from '@books:use-cases/book-list/BookListing.service';

// ---------------------------------------------------------------------------------------------- //

const bookListingController = async (request: Request, response: Response): Promise<Response> => {
  let search = undefined;

  if (typeof request.query.search === 'string') {
    search = request.query.search;
  }

  const bookListingService = container.resolve(BookListingService);

  const books = await bookListingService.execute({ search });

  return response.status(200).json(books);
};

// ---------------------------------------------------------------------------------------------- //

export { bookListingController };
