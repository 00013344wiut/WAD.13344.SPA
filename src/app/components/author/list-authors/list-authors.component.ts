import { Component } from '@angular/core';
import { AuthorDto } from 'src/app/models';
import { AuthorService } from '../author-service';

@Component({
  selector: 'app-list-authors',
  templateUrl: './list-authors.component.html',
  styleUrls: ['./list-authors.component.css']
})
export class ListAuthorsComponent {
  data!: AuthorDto[]

  constructor(private service: AuthorService){}

  ngOnInit(){
    this.fetchAuthors();
  }

  fetchAuthors(): void {
    this.service.getAllAuthors().subscribe(
      (categories) => {
        this.data = categories;
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    )
  }

  onDeleteAuthor(id: number): void {
    this.service.deleteAuthorById(id).subscribe(
      () => {
        this.fetchAuthors();
      },
      (error) => {
        console.error(`Error deleting book with ID ${id}:`, error);
      }
    );
  }
}
