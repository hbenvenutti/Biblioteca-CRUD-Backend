import 'reflect-metadata';

import { BooksRepositoryInterface } from '@books:repositories-interfaces/BooksRepository.interface';
import { BookUpdateService } from '../BookUpdate.service';
import { ValidationProviderInterface } from '@shared:containers/providers/validation/Validation.provider.interface';
import { MockValidationProvider } from '@shared:containers/providers/validation/Validation.mock.provider';
import { BooksRepositoryMock } from '@books:repositories-interfaces/BooksRepositoryMock';
import { generateOneBook, TestBook } from '@books:entities/TestBook';
import { InvalidDataError } from '@errors/InvalidData.error';

// ---------------------------------------------------------------------------------------------- //

describe('Book Update Service', () => {
  const validationProvider: ValidationProviderInterface = new MockValidationProvider();
  const bookData = generateOneBook();

  let book: TestBook;
  let booksRepository: BooksRepositoryInterface;
  let bookUpdateService: BookUpdateService;

  beforeEach(async () => {
    booksRepository = new BooksRepositoryMock();
    book = await booksRepository.create(bookData);

    bookUpdateService = new BookUpdateService(booksRepository, validationProvider);
  });

  // *** ---- Success ----------------------------------------------------------------------- *** //
  it('should update book title', async() => {
    book.title = 'new title';

    const updatedBook = await bookUpdateService.execute(book);

    expect(updatedBook.title).toEqual(book.title);
  });

  // -------------------------------------------------------------------------------------------- //
  it('should update book author', async() => {
    book.author = 'new author';

    const updatedBook = await bookUpdateService.execute(book);

    expect(updatedBook.author).toEqual(book.author);
  });

  // -------------------------------------------------------------------------------------------- //
  it('should update book publisher', async() => {
    book.publisher = 'new publisher';

    const updatedBook = await bookUpdateService.execute(book);

    expect(updatedBook.publisher).toEqual(book.publisher);
  });

  // -------------------------------------------------------------------------------------------- //
  it('should update book edition', async() => {
    book.edition = 'new edition';

    const updatedBook = await bookUpdateService.execute(book);

    expect(updatedBook.edition).toEqual(book.edition);
  });

  // -------------------------------------------------------------------------------------------- //
  it('should update book synopsis', async() => {
    book.synopsis = 'new synopsis';

    const updatedBook = await bookUpdateService.execute(book);

    expect(updatedBook.synopsis).toEqual(book.synopsis);
  });

  // *** ---- Fail -------------------------------------------------------------------------- *** //
  it('should fail if data is invalid', async() => {
    book.title = 'invalid';

    expect(async () => {
      await bookUpdateService.execute(book);
    })
      .rejects
      .toEqual(new InvalidDataError());
  });

  // *** ---- Provider ---------------------------------------------------------------------- *** //
  it('should call validation provider', async () => {
    const validateBookUpdateData = jest.spyOn(validationProvider, 'validateBookUpdateData');

    await bookUpdateService.execute(book);

    expect(validateBookUpdateData).toHaveBeenCalled();
  });
});
