import { Book } from 'src/app/book';

const mockBook1: Book = {
  id: '1',
  title: 'Title 1',
  author: 'Author 1',
};

const mockBook2: Book = {
  id: '2',
  title: 'Title 2',
  author: 'Author 2',
};

const mockBook3: Book = {
  id: '3',
  title: 'Title 3',
  author: 'Author 3',
};

const mockBookArray: Book[] = [mockBook1, mockBook2, mockBook3];

export { mockBook1, mockBook2, mockBook3, mockBookArray };
