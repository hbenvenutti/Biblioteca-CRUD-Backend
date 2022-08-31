import { database } from '@firestore/firestore';

import { BookCreationData, BookUpdateData } from '@books:dtos/Book';
import { Book } from '@books:entities/Book';
import { BooksRepositoryInterface } from '@books:repositories-interfaces/BooksRepository.interface';

// ---------------------------------------------------------------------------------------------- //

export class BooksRepository implements BooksRepositoryInterface {
  private books = database.collection('books');

  async create(data: BookCreationData): Promise<Book> {
    const { id } = await this.books.add(data);

    const { title, author, edition, publisher, synopsis } = data;

    const book = { id, title, author, edition, publisher, synopsis };

    return book;
  }

  update(data: BookUpdateData): Promise<Book> {
    throw new Error('Method not implemented.');
  }
  list(): Promise<Book[]> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<Book | undefined> {
    throw new Error('Method not implemented.');
  }
  findByTitle(title: string): Promise<Book[]> {
    throw new Error('Method not implemented.');
  }
  findByPublisher(publisher: string): Promise<Book[]> {
    throw new Error('Method not implemented.');
  }
}
