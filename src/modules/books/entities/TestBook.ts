import { BookCreationData } from '@books:dtos/Book';

// ---------------------------------------------------------------------------------------------- //

export class TestBook implements BookCreationData {
  title = 'title';
  author = 'author';
  publisher = 'publisher';
  edition = 'edition';
  synopsis = 'synopsis';
}

export interface InvalidBook {
  title?: string | boolean;
  author?: string | boolean;
  publisher?: string | boolean;
  edition?: string | boolean;
  synopsis?: string | boolean;
}
