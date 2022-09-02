import { inject, injectable } from 'tsyringe';

import { Book } from '@books:entities/Book';

import type { BooksRepositoryInterface } from '@books:repositories-interfaces/BooksRepository.interface';

// ---------------------------------------------------------------------------------------------- //

@injectable()
class BookListingService {
  constructor(
    @inject('BooksRepository')
    private booksRepository: BooksRepositoryInterface
  ) {}

  async execute(): Promise<Book[]> {
    return await this.booksRepository.list();
  }
}

export { BookListingService };
