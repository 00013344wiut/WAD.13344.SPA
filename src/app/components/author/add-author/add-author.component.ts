import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorService } from '../author-service';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent implements OnInit {
  authorForm!: FormGroup;
  
    constructor(private authorService: AuthorService, private router: Router) {}
  
    ngOnInit(): void {
      this.authorForm = new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
      });
    }
  
    onSubmit() {
      if (this.authorForm.valid) {
        const authorData = this.authorForm.value;
        this.authorService.addAuthor(authorData).subscribe(
          response => {
            // Handle success
            console.log('Book added successfully!', response);
            this.router.navigateByUrl('authors');
          },
          error => {
            // Handle error
            console.error('Error adding book:', error);
          }
        );
      }
    }
}
