import 'reflect-metadata';

import { BooksRepositoryInterface } from '@books:repositories-interfaces/BooksRepository.interface';
import { BookCreationService } from '@books:use-cases/book-creation/BookCreation.service';
import { BooksRepositoryMock } from '@books:repositories-interfaces/BooksRepositoryMock';
import { ValidationProviderInterface } from '@shared:containers/providers/validation/Validation.provider.interface';
import { MockValidationProvider } from '@shared:containers/providers/validation/Validation.mock.provider';
import { InvalidDataError } from '@errors/InvalidData.error';
import { generateOneBook } from '@books:entities/TestBook';
import { BookCreationData } from '@books:dtos/Book';

// ---------------------------------------------------------------------------------------------- //

describe('book creation service', () => {
  let bookData: BookCreationData;

  let booksRepository: BooksRepositoryInterface;
  let validationProvider: ValidationProviderInterface;
  let bookCreationService: BookCreationService;

  beforeAll(() => {
    booksRepository = new BooksRepositoryMock();
    validationProvider = new MockValidationProvider();
    bookCreationService = new BookCreationService(booksRepository, validationProvider);
  });

  beforeEach(async () => {
    bookData = generateOneBook();
  });

  // -------------------------------------------------------------------------------------------- //

  it('should create a book and generate a id', async () => {
    const book = await bookCreationService.execute(bookData);

    expect(book).toHaveProperty('id');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should fail if data is invalid', () => {
    bookData.title = 'invalid';

    expect(async () => {
      await bookCreationService
        .execute(bookData);
    })
      .rejects
      .toEqual(new InvalidDataError());
  });

  // -------------------------------------------------------------------------------------------- //

  it('should call the validation provider', async () => {
    const validateBookCreationData = jest.spyOn(validationProvider, 'validateBookCreationData');

    await bookCreationService.execute(bookData);

    expect(validateBookCreationData).toHaveBeenCalled();
  });

  // -------------------------------------------------------------------------------------------- //

  it('should turn title into lowercase', async () => {
    bookData.title = 'TITLE';

    const book = await bookCreationService.execute(bookData);

    expect(book.title).toEqual('title');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should turn author into lowercase', async () => {
    bookData.author = 'AUTHOR';

    const book = await bookCreationService.execute(bookData);

    expect(book.author).toEqual('author');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should turn publisher into lowercase', async () => {
    bookData.publisher = 'PUBLISHER';

    const book = await bookCreationService.execute(bookData);

    expect(book.publisher).toEqual('publisher');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should turn edition into lowercase', async () => {
    bookData.edition = 'EDITION';

    const book = await bookCreationService.execute(bookData);

    expect(book.edition).toEqual('edition');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should remove useless spaces from title', async () => {
    bookData.title = ' title ';

    const book = await bookCreationService.execute(bookData);

    expect(book.title).toEqual('title');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should remove useless spaces from author', async () => {
    bookData.author = ' author ';

    const book = await bookCreationService.execute(bookData);

    expect(book.author).toEqual('author');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should remove useless spaces from publisher', async () => {
    bookData.publisher = ' publisher ';

    const book = await bookCreationService.execute(bookData);

    expect(book.publisher).toEqual('publisher');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should remove useless spaces from edition', async () => {
    bookData.edition = ' edition ';

    const book = await bookCreationService.execute(bookData);

    expect(book.edition).toEqual('edition');
  });
});
