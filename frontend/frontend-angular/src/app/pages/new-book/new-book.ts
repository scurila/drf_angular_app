import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCall } from '../../services/api-call';
import { Book } from '../../models/book';
import { CommonModule } from '@angular/common';
import { Category } from '../../services/category';

@Component({
  selector: 'app-new-book',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-book.html',
  styleUrl: './new-book.css',
})
export class NewBook implements OnInit {
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiCall,
    private categoryService: Category,
    private route: ActivatedRoute
  ) {}

  bookForm!: FormGroup; 
  categories!: string[];
  isUpdateMode: boolean = false;
  bookId: string | null = null;

  goBack() {
    this.router.navigate(['/']);
  }

  ngOnInit() {
    this.createForm();
    this.loadCategories();
    this.bookId = this.route.snapshot.paramMap.get('id');

    if(this.bookId) {
      this.isUpdateMode = true;
      this.loadBookDetails(this.bookId);
    }
  }

  createForm() {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      category: ['', Validators.required]
    })
  }  

  onSubmit() {
    if (this.bookForm.valid) {
      
      const bookData: Book = this.bookForm.value;
      if(this.isUpdateMode) {
        this.apiService.updateBook(this.bookId!, bookData).subscribe({
          next: (response) => {
            this.bookForm.reset();
            this.router.navigate(['/']);
          },
          error: (err) => {
            console.error('Error updating book:', err);
          },
          complete: () => {
            console.log('Book updated successfully ' + bookData.title);
          }
        });
        return;
      } else {
        this.apiService.addBook(bookData).subscribe({
          next:(response) =>{
            this.bookForm.reset();
            this.router.navigate(['/']);  
          },
          error:(err) => {
            console.error('Error adding book:', err);
          },
          complete:() => {
            console.log('Book added successfully '+ bookData.title);
          }
        });
      }

      
      
    }
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((categories: string[]) => {
      this.categories = categories;
      console.log('Categories loaded:', this.categories);
    })
  }

  loadBookDetails(bookId: string) {
  this.apiService.getBookById(bookId).subscribe({
    next: (book: Book) => {
      this.bookForm.patchValue(book);
      },
    error: (err) => {
      console.error('Error fetching book details:', err);
    }
   })
  }
}
