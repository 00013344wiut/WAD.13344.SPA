import { Component, OnInit } from '@angular/core';
import { BookDto } from 'src/app/models';
import { BookService } from '../book-service';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {
  data!: BookDto[]

  constructor(private service: BookService) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(): void {
    this.service.getAllBooks().subscribe(
      (books) => {
        this.data = books;
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  onDeleteBook(id: number): void {
    this.service.deleteBookById(id).subscribe(
      () => {
        this.fetchBooks();
      },
      (error) => {
        console.error(`Error deleting book with ID ${id}:`, error);
      }
    );
  }
}
