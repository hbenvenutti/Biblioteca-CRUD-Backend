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

  async delete(id: string): Promise<void> {
    await this.books.doc(id).delete();

    return;
  }

  async findById(id: string): Promise<Book | undefined> {
    const doc = await this.books.doc(id).get();

    return doc.exists
      ? doc.data() as Book
      : undefined;
  }

  findByTitle(title: string): Promise<Book[]> {
    throw new Error('Method not implemented.');
  }

  findByPublisher(publisher: string): Promise<Book[]> {
    throw new Error('Method not implemented.');
  }
}
