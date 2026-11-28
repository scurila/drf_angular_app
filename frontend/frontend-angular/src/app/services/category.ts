import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Category {
  
  private apiUrl = 'http://localhost:8000/book-categories/';
  constructor (private http: HttpClient) {}

  getCategories() {
    return this.http.get<string[]>(this.apiUrl);
  }
}
