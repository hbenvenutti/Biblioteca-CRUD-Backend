import { inject, injectable } from 'tsyringe';

import { Book } from '@books:entities/Book';
import { BookUpdateData } from '@books:dtos/Book';
import { NotFoundError } from '@errors/NotFound.error';

import type { BooksRepositoryInterface } from '@books:repositories-interfaces/BooksRepository.interface';
import type { ValidationProviderInterface } from '@shared:containers/providers/validation/Validation.provider.interface';
import { InvalidDataError } from '@errors/InvalidData.error';

// ---------------------------------------------------------------------------------------------- //

@injectable()
class BookUpdateService {
  constructor(
    @inject('BooksRepository')
    private booksRepository: BooksRepositoryInterface,

    @inject('ValidationProvider')
    private validationProvider: ValidationProviderInterface
  ) {}

  async execute(data: BookUpdateData): Promise<Book> {
    const { id } = data;

    // *** ---- Data Validation ------------------------------------------------------------- *** //
    const isDataValid = await this.validationProvider.validateBookUpdateData(data);

    if (!isDataValid) {
      throw new InvalidDataError();
    }

    // *** ---- Book Validation ------------------------------------------------------------- *** //
    const book = await this.booksRepository.findById(id);

    if (!book) {
      throw new NotFoundError();
    }

    // *** ---- Book Update ----------------------------------------------------------------- *** //
    return await this.booksRepository.update(data);
  }
}

// ---------------------------------------------------------------------------------------------- //

export { BookUpdateService };

