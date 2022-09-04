import { BookCreationData, BookUpdateData } from '@books:dtos/Book';
import { Book } from '@books:entities/Book';
import { BooksRepositoryInterface } from '@books:repositories-interfaces/BooksRepository.interface';

// ---------------------------------------------------------------------------------------------- //
class BooksRepositoryMock implements BooksRepositoryInterface {
  private books: Book[] = [];

  async create(data: BookCreationData): Promise<Book> {
    const { title, author, edition, publisher, synopsis } = data;
    const id = `${title}-${publisher}-${author}-${edition}`;

    const book: Book = { id, title, author, edition, publisher, synopsis };

    this.books.push(book);

    return book;
  }

  async update(data: BookUpdateData): Promise<Book> {
    const bookIndex = this.books.findIndex(book => book.id === data.id);

    this.books[bookIndex] = data;

    return this.books[bookIndex];
  }

  async list(): Promise<Book[]> {
    return this.books;
  }

  async delete(id: string): Promise<void> {
    const index = this.books.findIndex(book => book.id === id);

    this.books.splice(index, 1);

    return;
  }

  // *** ---- Find -------------------------------------------------------------------------- *** //

  async findById(id: string): Promise<Book | undefined> {
    return this.books.find(book => book.id === id);
  }

  async findByTitle(title: string): Promise<Book[]> {
    return this.books.filter(book => book.title === title);
  }

  async findByPublisher(publisher: string): Promise<Book[]> {
    return this.books.filter(book => book.publisher === publisher);
  }

  async findByAuthor(author: string): Promise<Book[]> {
    return this.books.filter(book => book.author === author);
  }
}


// ---------------------------------------------------------------------------------------------- //
export { BooksRepositoryMock };
