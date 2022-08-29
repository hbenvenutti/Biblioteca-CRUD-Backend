import { BookCreationData, BookUpdateData } from '@books:dtos/Book';
import { Book } from '@books:entities/Book';

// ---------------------------------------------------------------------------------------------- //

export interface BooksRepositoryInterface {
  create(data: BookCreationData): Promise<Book>;
  update(data: BookUpdateData): Promise<Book>;
  list(): Promise<Book[]>;
  delete(id: string): Promise<void>;

  // *** ---- Find -------------------------------------------------------------------------- *** //
  findById(id: string): Promise<Book | undefined>;
  findByTitle(title: string): Promise<Book[]>;
  findByPublisher(publisher: string): Promise<Book[]>;
}

// ---------------------------------------------------------------------------------------------- //
