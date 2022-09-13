import { Book } from '@books:entities/Book';

export const removeDuplicates = (array: Book[]): Book[] => {
  const json = array.map(item => JSON.stringify(item));

  const uniqueJson = new Set(json);

  const uniqueObjects = Array.from(uniqueJson).map(item => JSON.parse(item));

  return uniqueObjects;
};
