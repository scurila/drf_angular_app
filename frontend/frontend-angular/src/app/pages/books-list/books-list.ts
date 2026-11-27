import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiCall } from '../../services/api-call';
import { Book } from '../../models/book';

@Component({
  selector: 'app-books-list',
  imports: [CommonModule],
  templateUrl: './books-list.html',
  styleUrl: './books-list.css',
})
export class BooksList implements OnInit {
  
  books = signal<Book[]>([]);

  constructor(
    private apiService: ApiCall
  ) {}

  ngOnInit() {
    this.loadBooksList();
  }
  
  loadBooksList() {
    this.apiService.getBooks().subscribe(
      (books: Book[]) => {
        this.books.set(books);
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  deleteBook(bookId: number) {
    this.apiService.deleteBook(bookId).subscribe({
      next: () => {
        console.log('Book deleted successfully');
        this.books.update((books) =>
          books.filter((book) => book.id !== bookId)
        );
      },
      error: (err) => {
        console.error('Error deleting book:', err);
      }}
    );
  }
}
