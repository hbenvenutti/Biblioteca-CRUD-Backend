import { inject, injectable } from 'tsyringe';

import { Book } from '@books:entities/Book';

import type { BooksRepositoryInterface } from '@books:repositories-interfaces/BooksRepository.interface';
import { removeDuplicates } from '@shared:utils/removeDuplicates';

// ---------------------------------------------------------------------------------------------- //

interface query {
  search?: string
}

@injectable()
class BookListingService {
  constructor(
    @inject('BooksRepository')
    private booksRepository: BooksRepositoryInterface
  ) {}

  async execute({ search }: query): Promise<Book[]> {
    if (search) {
      const titleSearch = await this.booksRepository.findByTitle(search);
      const authorSearch = await this.booksRepository.findByAuthor(search);
      const publisherSearch = await this.booksRepository.findByPublisher(search);

      const searchResults = [ ...titleSearch, ...authorSearch, ...publisherSearch ];

      return removeDuplicates(searchResults);
    }

    else {
      return await this.booksRepository.list();
    }
  }
}

export { BookListingService };
