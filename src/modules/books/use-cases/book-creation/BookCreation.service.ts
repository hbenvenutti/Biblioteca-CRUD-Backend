import { inject, injectable } from 'tsyringe';

import { BookCreationData } from '@books:dtos/Book';
import { Book } from '@books:entities/Book';
import { BooksRepositoryInterface } from '@books:repositories-interfaces/BooksRepository.interface';
import { ValidationProviderInterface } from '@shared:containers/providers/validation/Validation.provider.interface';
import { InvalidDataError } from '@errors/InvalidData.error';

// ---------------------------------------------------------------------------------------------- //

@injectable()
class BookCreationService {
  constructor(
    @inject('BooksRepository')
    private booksRepository: BooksRepositoryInterface,

    @inject('ValidationProvider')
    private validationProvider: ValidationProviderInterface
  ) {}

  async execute(data: BookCreationData): Promise<Book> {
    const isValid = await this.validationProvider.validateBookCreationData(data);

    if(!isValid) {
      throw new InvalidDataError();
    }

    return this.booksRepository.create(data);
  }
}

// ---------------------------------------------------------------------------------------------- //

export { BookCreationService };
