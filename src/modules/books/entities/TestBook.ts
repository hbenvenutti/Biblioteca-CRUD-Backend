import { BookCreationData } from '@books:dtos/Book';

// ---------------------------------------------------------------------------------------------- //

export const generateOneBook = (): BookCreationData => {
  return {
    title: 'title',
    author: 'author',
    publisher: 'publisher',
    edition: 'edition',
    synopsis: 'synopsis'
  };
};

export const generateThreeBooks = (): BookCreationData[] => {
  const books: BookCreationData[] = [];
  let counter = 1;

  while (counter < 4) {
    books.push({
      title: `title${counter}`,
      author: `author${counter}`,
      publisher: `publisher${counter}`,
      edition: `edition${counter}`,
      synopsis: `synopsis${counter}`
    });

    counter++;
  }

  return books;
};

export interface InvalidBook {
  title?: string | boolean;
  author?: string | boolean;
  publisher?: string | boolean;
  edition?: string | boolean;
  synopsis?: string | boolean;
}
