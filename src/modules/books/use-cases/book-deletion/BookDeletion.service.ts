import { inject, injectable } from 'tsyringe';

import type { BooksRepositoryInterface } from '@books:repositories-interfaces/BooksRepository.interface';

// ---------------------------------------------------------------------------------------------- //

@injectable()
class BookDeletionService {
  constructor(
    @inject('BooksRepository')
    private booksRepository: BooksRepositoryInterface
  ) {}

  async execute(id: string): Promise<void> {
    await this.booksRepository.delete(id);

    return;
  }
}

// ---------------------------------------------------------------------------------------------- //

export { BookDeletionService };
