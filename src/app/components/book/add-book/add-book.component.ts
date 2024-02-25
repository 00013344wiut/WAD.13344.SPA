import { Component, OnInit } from '@angular/core';
import { BookService } from '../book-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  bookForm!: FormGroup;

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.bookForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      authorId: new FormControl(null, Validators.required),
      pagesCount: new FormControl(null, Validators.required),
      publicationDate: new FormControl(null, Validators.required),
      categoryId: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const bookData = this.bookForm.value;
      this.bookService.addBook(bookData).subscribe(
        response => {
          // Handle success
          console.log('Book added successfully!', response);
          this.router.navigateByUrl('');
        },
        error => {
          // Handle error
          console.error('Error adding book:', error);
        }
      );
    }
  }
}
