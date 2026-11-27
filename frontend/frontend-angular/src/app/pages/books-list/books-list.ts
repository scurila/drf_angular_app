import { Component, OnInit } from '@angular/core';
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
  
  books: Book[] = [];

  constructor(
    private apiService: ApiCall
  ) {}

  ngOnInit() {
    this.loadBooksList();
  }
  
  loadBooksList() {
    this.apiService.getBooks().subscribe(
      (books: Book[]) => {
        this.books = books;
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }
}
