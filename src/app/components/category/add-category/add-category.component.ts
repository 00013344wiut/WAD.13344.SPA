import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../category-service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  categoryForm!: FormGroup;
  
    constructor(private categoryService: CategoryService, private router: Router) {}
  
    ngOnInit(): void {
      this.categoryForm = new FormGroup({
        categoryName: new FormControl('', Validators.required),
      });
    }
  
    onSubmit() {
      if (this.categoryForm.valid) {
        const CategoryData = this.categoryForm.value;
        this.categoryService.addcategory(CategoryData).subscribe(
          response => {
            // Handle success
            console.log('Book added successfully!', response);
            this.router.navigateByUrl('categories');
          },
          error => {
            // Handle error
            console.error('Error adding book:', error);
          }
        );
      }
    }
}
