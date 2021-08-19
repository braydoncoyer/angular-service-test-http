import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { BooksService } from './books.service';
import { mockBook1, mockBook2, mockBookArray } from 'src/mocks/mockBooks';
import { HttpErrorResponse } from '@angular/common/http';
import { Book } from '../book';

describe('BooksService', () => {
  let service: BooksService;
  let httpController: HttpTestingController;

  let url = 'localhost:3000/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BooksService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getAllBooks and return an array of Books', () => {
    service.getAllBooks().subscribe((res) => {
      expect(res).toEqual(mockBookArray);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/books`,
    });

    req.flush(mockBookArray);
  });

  // it('should call the handleError function from getAllBooks if an error occurs', (done: DoneFn) => {
  //   const emesg = 'deliberate 500 error';

  //   service.getAllBooks().subscribe(
  //     (data) => fail('Should have failed with a 500'),
  //     (error: HttpErrorResponse) => {
  //       expect(error.error.message).toEqual(emesg, 'message');
  //     }
  //   );

  //   const req = httpController.expectOne(`${url}/books`);

  //   const mockError = new ErrorEvent('Network error', {
  //     message: emesg,
  //   });

  //   req.error(mockError);
  // });

  it('should call getBookById and return the appropriate Book', () => {
    const id = '1';

    service.getBookById(id).subscribe((data) => {
      expect(data).toEqual(mockBook1);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/books/${id}`,
    });

    req.flush(mockBook1);
  });

  it('should call updateBook and return the updated book from the API', () => {
    const updatedBook: Book = {
      id: '1',
      title: 'New title',
      author: 'Author 1',
    };

    service.updateBook(mockBook1).subscribe((data) => {
      expect(data).toEqual(updatedBook);
    });

    const req = httpController.expectOne({
      method: 'PUT',
      url: `${url}/books`,
    });

    req.flush(updatedBook);
  });
});
