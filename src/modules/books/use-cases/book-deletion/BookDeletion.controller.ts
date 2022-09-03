import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { BookDeletionService } from '@books:use-cases/book-deletion/BookDeletion.service';

// ---------------------------------------------------------------------------------------------- //

class BookDeletionController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    
    const bookDeletionService = container.resolve(BookDeletionService);

    await bookDeletionService.execute(id);

    return response.status(204).json();
  }
}

// ---------------------------------------------------------------------------------------------- //

export { BookDeletionController };
