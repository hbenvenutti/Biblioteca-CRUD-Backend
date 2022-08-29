import { inject, injectable } from 'tsyringe';

import { BookCreationData } from '@books:dtos/Book';
import { Book } from '@books:entities/Book';
import { BooksRepositoryInterface } from '@books:repositories-interfaces/BooksRepository.interface';

// ---------------------------------------------------------------------------------------------- //

@injectable()
class BookCreationService {
  constructor(
    @inject('BooksRepository')
    private booksRepository: BooksRepositoryInterface
  ) {}

  async execute(data: BookCreationData): Promise<Book> {
    return this.booksRepository.create(data);
  }
}

// ---------------------------------------------------------------------------------------------- //

export { BookCreationService };
