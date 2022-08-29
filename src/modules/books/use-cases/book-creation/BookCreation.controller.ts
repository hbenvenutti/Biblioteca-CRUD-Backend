import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { BookCreationService } from '@books:use-cases/book-creation/BookCreation.service';

// ---------------------------------------------------------------------------------------------- //

class BookCreationController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { title, author, edition, publisher, synopsis } = request.body;

    const bookCreationService = container.resolve(BookCreationService);

    const book = await bookCreationService.execute({ title, author, edition, publisher, synopsis });

    return response.status(201).json(book);
  }
}

// ---------------------------------------------------------------------------------------------- //

export { BookCreationController };
