import 'reflect-metadata';

import { BooksRepositoryInterface } from '@books:repositories-interfaces/BooksRepository.interface';
import { BookCreationService } from '@books:use-cases/book-creation/BookCreation.service';
import { BooksRepositoryMock } from '@books:repositories-interfaces/BooksRepositoryMock';
import { ValidationProviderInterface } from '@shared:containers/providers/validation/Validation.provider.interface';
import { MockValidationProvider } from '@shared:containers/providers/validation/Validation.mock.provider';
import { InvalidDataError } from '@errors/InvalidData.error';

// ---------------------------------------------------------------------------------------------- //

describe('book creation service', () => {
  const title = 'test book';
  const author = 'test author';
  const publisher = 'test publisher';
  const edition = 'test edition';
  const synopsis = 'test synopsis';

  let booksRepository: BooksRepositoryInterface;
  let validationProvider: ValidationProviderInterface;
  let bookCreationService: BookCreationService;

  beforeAll(() => {
    booksRepository = new BooksRepositoryMock();
    validationProvider = new MockValidationProvider();
    bookCreationService = new BookCreationService(booksRepository, validationProvider);
  });

  // -------------------------------------------------------------------------------------------- //

  it('should create a book and generate a id', async () => {
    const user = await bookCreationService.execute({ title, author, publisher, edition, synopsis });

    expect(user).toHaveProperty('id');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should fail if data is invalid', () => {
    expect(async () => {
      await bookCreationService
        .execute({ title: 'invalid', author, publisher, edition, synopsis });
    })
      .rejects
      .toEqual(new InvalidDataError());
  });

  // -------------------------------------------------------------------------------------------- //

  it('should call the validation provider', async () => {
    const validateBookCreationData = jest.spyOn(validationProvider, 'validateBookCreationData');

    await bookCreationService.execute({ title, author, publisher, edition, synopsis });

    expect(validateBookCreationData).toHaveBeenCalled();
  });
});
