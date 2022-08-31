import { inject, injectable } from 'tsyringe';

import { BookCreationData } from '@books:dtos/Book';
import { Book } from '@books:entities/Book';
import { BooksRepositoryInterface } from '@books:repositories-interfaces/BooksRepository.interface';
import { ValidationProviderInterface } from '@shared:containers/providers/validation/Validation.provider.interface';
import { InvalidDataError } from '@errors/InvalidData.error';
import { prepareStringToDatabase } from '@shared:utils/prepareStringToDatabase';

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

    data.title = prepareStringToDatabase(data.title);
    data.author = prepareStringToDatabase(data.author);
    data.publisher = prepareStringToDatabase(data.publisher);
    data.edition = prepareStringToDatabase(data.edition);

    return this.booksRepository.create(data);
  }
}

// ---------------------------------------------------------------------------------------------- //

export { BookCreationService };
