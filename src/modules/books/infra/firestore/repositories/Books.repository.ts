import { BookCreationData, BookUpdateData } from '@books:dtos/Book';
import { Book } from '@books:entities/Book';
import { BooksRepositoryInterface } from '@books:repositories-interfaces/BooksRepository.interface';

// ---------------------------------------------------------------------------------------------- //

export class BooksRepository implements BooksRepositoryInterface {
  create(data: BookCreationData): Promise<Book> {
    throw new Error('Method not implemented.');
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
