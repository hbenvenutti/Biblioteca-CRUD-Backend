export interface BookCreationData {
    title: string;
    author: string;
    publisher: string;
    edition: string;
    synopsis: string;
}

export interface BookUpdateData {
  id: string;
  title: string;
  author: string;
  publisher: string;
  edition: string;
  synopsis: string;
}
