import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { BookUpdateService } from '@books:use-cases/book-update/BookUpdate.service';

// ---------------------------------------------------------------------------------------------- //

const bookUpdateController = async (request: Request, response: Response): Promise<Response> => {
  const { id } = request.params;
  const { title, author, publisher, edition, synopsis } = request.body;

  const bookUpdateService = container.resolve(BookUpdateService);

  const book = await bookUpdateService.execute({ id, title, author, publisher, edition, synopsis });

  return response.status(200).json(book);
};

// ---------------------------------------------------------------------------------------------- //

export { bookUpdateController };
