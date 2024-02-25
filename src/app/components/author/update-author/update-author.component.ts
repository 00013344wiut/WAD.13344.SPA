import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthorService, UpdateAuthorModel } from '../author-service';

@Component({
  selector: 'app-update-author',
  templateUrl: './update-author.component.html',
  styleUrls: ['./update-author.component.css']
})
export class UpdateAuthorComponent {
  authorForm: FormGroup;
  id: number;

  constructor(
    private authorService: AuthorService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Initialize the form and Author ID in the constructor
    this.authorForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
    });

    // Get the Author ID from the route params
    this.id = parseInt(this.route.snapshot.paramMap.get('id') || '', 10);
    this.fetchAuthors(this.id);
  }

  fetchAuthors(AuthorId: number): void {
    this.authorService.getOneAuthor(AuthorId).subscribe(
      (Author) => {
        this.initializeForm(Author);
      },
      (error) => {
        console.error('Error fetching Author details:', error);
      }
    );
  }

  initializeForm(author: UpdateAuthorModel): void {
    // Patch the form values with the retrieved Author data
    this.authorForm.patchValue({
      firstName: author.firstName,
      lastName: author.lastName
    });
  }

  onSubmit() {
    if (this.authorForm.valid) {
      const updatedAuthorData = this.authorForm.value;
      this.authorService.updateAuthor(this.id, updatedAuthorData).subscribe(
        (response) => {
          // Handle success
          console.log('Author updated successfully!', response);
          // Navigate to a different route after success (e.g., Author details)
          this.router.navigateByUrl('authors');
        },
        (error) => {
          // Handle error
          console.error('Error updating Author:', error);
        }
      );
    }
  }
}
