import 'reflect-metadata';

import { generateThreeBooks } from '@books:entities/TestBook';
import { BooksRepositoryInterface } from '@books:repositories-interfaces/BooksRepository.interface';
import { BooksRepositoryMock } from '@books:repositories-interfaces/BooksRepositoryMock';
import { BookListingService } from '@books:use-cases/book-list/BookListing.service';

// ---------------------------------------------------------------------------------------------- //

describe('Book listing service', () => {
  const books = generateThreeBooks();

  let booksRepository: BooksRepositoryInterface;
  let bookListingService: BookListingService;

  beforeEach(async () => {
    booksRepository = new BooksRepositoryMock();
    bookListingService = new BookListingService(booksRepository);


    books.map(book => booksRepository.create(book));
  });

  it('should list all books', async () => {
    const books = await bookListingService.execute({});

    const [ book1, book2, book3 ] = books;

    expect(books).toBeInstanceOf(Array);
    expect(books.length).toEqual(3);

    expect(book1).toHaveProperty('id');
    expect(book1.title).toEqual(books[0].title);

    expect(book2).toHaveProperty('id');
    expect(book2.title).toEqual(books[1].title);

    expect(book3).toHaveProperty('id');
    expect(book3.title).toEqual(books[2].title);
  });

  // *** ---- Search ------------------------------------------------------------------------ *** //
  it('should search by title', async () => {
    const result = await bookListingService.execute({ search: books[1].title });

    expect(result.length).toEqual(1);
    expect(result[0].title).toEqual(books[1].title);
    expect(result[0]).toHaveProperty('id');
  });

  // -------------------------------------------------------------------------------------------- //
  it('should search by publisher', async () => {
    const result = await bookListingService.execute({ search: books[2].publisher });

    expect(result.length).toEqual(1);
    expect(result[0].publisher).toEqual(books[2].publisher);
    expect(result[0]).toHaveProperty('id');
  });

  // -------------------------------------------------------------------------------------------- //
  it('should search by author', async () => {
    const result = await bookListingService.execute({ search: books[2].author });

    expect(result.length).toEqual(1);
    expect(result[0].author).toEqual(books[2].author);
    expect(result[0]).toHaveProperty('id');
  });
});
