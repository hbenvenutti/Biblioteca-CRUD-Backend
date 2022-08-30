import { BookCreationData } from '@books:dtos/Book';

// ---------------------------------------------------------------------------------------------- //

export class TestBook implements BookCreationData {
  title = 'title';
  author = 'author';
  publisher = 'publisher';
  edition = 'edition';
  synopsis = 'synopsis';
}
