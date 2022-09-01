import 'reflect-metadata';

import { BookDeletionService } from '@books:use-cases/book-deletion/BookDeletion.service';
import { BooksRepositoryInterface } from '@books:repositories-interfaces/BooksRepository.interface';
import { BooksRepositoryMock } from '@books:repositories-interfaces/BooksRepositoryMock';
import { TestBook } from '@books:entities/TestBook';

// ---------------------------------------------------------------------------------------------- //
describe('book deletion service', () => {
  const data = new TestBook();
  let booksRepository: BooksRepositoryInterface;
  let bookDeletionService: BookDeletionService;

  beforeEach(() => {
    booksRepository = new BooksRepositoryMock();

    bookDeletionService = new BookDeletionService(booksRepository);
  });

  it('should delete a book from database', async() => {
    const book = await booksRepository.create(data);

    await bookDeletionService.execute(book.id);

    const bookStillExists = await booksRepository.findById(book.id);

    expect(bookStillExists).toBeFalsy();
  });
});
