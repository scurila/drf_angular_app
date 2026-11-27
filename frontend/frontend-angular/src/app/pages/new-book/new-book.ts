import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCall } from '../../services/api-call';
import { Book } from '../../models/book';
import { CommonModule } from '@angular/common';

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
    
  ) {}

  bookForm!: FormGroup;

  goBack() {
    this.router.navigate(['/']);
  }

  ngOnInit() {
    this.createForm();
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
      const newBook: Book = this.bookForm.value;
      this.apiService.addBook(newBook).subscribe({
        next:(response) =>{
          this.bookForm.reset();
          this.router.navigate(['/']);  
        },
        error:(err) => {
          console.error('Error adding book:', err);
        },
        complete:() => {
          console.log('Book added successfully '+ newBook.title);
        }
      });
    }
  }
}
