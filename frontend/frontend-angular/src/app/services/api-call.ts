import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root',
})
export class ApiCall {
  
  private apiUrl = 'http://127.0.0.1:8000/';
  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl + 'books/');
  }

  deleteBook(bookId: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + `books/${bookId}/`);
  }

  addBook(newBook: Book): Observable<Book[]> {
    return this.http.post<Book[]>(this.apiUrl + 'books/', newBook);
  }

  getBookById(bookId: string): Observable<Book> {
    return this.http.get<Book>(this.apiUrl + `books/${bookId}/`);
  }

  updateBook(bookId: string, updatedBook: Book): Observable<Book> {
    return this.http.put<Book>(this.apiUrl + `books/${bookId}/`, updatedBook);
  }
}
