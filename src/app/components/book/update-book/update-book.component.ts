import { Component, OnInit } from '@angular/core';
import { BookService, UpdateBookModel } from '../book-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent {
  bookForm: FormGroup;
  id: number;

  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Initialize the form and book ID in the constructor
    this.bookForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      authorId: new FormControl(null, Validators.required),
      pagesCount: new FormControl(null, Validators.required),
      publicationDate: new FormControl(null, Validators.required),
      categoryId: new FormControl(null, Validators.required),
    });

    // Get the book ID from the route params
    this.id = parseInt(this.route.snapshot.paramMap.get('id') || '', 10);
    this.fetchBooks(this.id);
  }

  fetchBooks(bookId: number): void {
    this.bookService.getOneBook(bookId).subscribe(
      (book) => {
        this.initializeForm(book);
      },
      (error) => {
        console.error('Error fetching book details:', error);
      }
    );
  }

  initializeForm(book: UpdateBookModel): void {
    // Patch the form values with the retrieved book data
    this.bookForm.patchValue({
      title: book.title,
      description: book.description,
      authorId: book.authorId,
      pagesCount: book.pagesCount,
      publicationDate: book.publicationDate,
      categoryId: book.categoryId,
    });
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const updatedBookData = this.bookForm.value;
      this.bookService.updateBook(this.id, updatedBookData).subscribe(
        (response) => {
          // Handle success
          console.log('Book updated successfully!', response);
          // Navigate to a different route after success (e.g., book details)
          this.router.navigateByUrl(`/show-book/${this.id}`);
        },
        (error) => {
          // Handle error
          console.error('Error updating book:', error);
        }
      );
    }
  }
}
