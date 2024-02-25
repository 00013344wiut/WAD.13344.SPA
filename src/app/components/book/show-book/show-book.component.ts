import { Component } from '@angular/core';
import { BookService, GetBookResponse } from '../book-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-book',
  templateUrl: './show-book.component.html',
  styleUrls: ['./show-book.component.css']
})
export class ShowBookComponent {
  data!: GetBookResponse

  constructor(private service: BookService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    const bookId = parseInt(this.route.snapshot.paramMap.get('id') || '', 10);
    this.fetchBooks(bookId);
  }

  fetchBooks(bookId: number | null): void {
    if (bookId) {
      this.service.getOneBook(bookId).subscribe(
        (book) => {
          this.data = book;
        },
        (error) => {
          console.error('Error fetching book details:', error);
        }
      );
    }
  }
}
