import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService, UpdateCategoryModel } from '../category-service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent {
  categoryForm: FormGroup;
  id: number;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Initialize the form and category ID in the constructor
    this.categoryForm = new FormGroup({
      categoryName: new FormControl('', Validators.required),
    });

    // Get the category ID from the route params
    this.id = parseInt(this.route.snapshot.paramMap.get('id') || '', 10);
    this.fetchcategorys(this.id);
  }

  fetchcategorys(categoryId: number): void {
    this.categoryService.getOneCategory(categoryId).subscribe(
      (category) => {
        this.initializeForm(category);
      },
      (error) => {
        console.error('Error fetching category details:', error);
      }
    );
  }

  initializeForm(category: UpdateCategoryModel): void {
    // Patch the form values with the retrieved category data
    this.categoryForm.patchValue({
      categoryName: category.categoryName
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      const updatedcategoryData = this.categoryForm.value;
      this.categoryService.updateCategory(this.id, updatedcategoryData).subscribe(
        (response) => {
          // Handle success
          console.log('category updated successfully!', response);
          // Navigate to a different route after success (e.g., category details)
          this.router.navigateByUrl('categories');
        },
        (error) => {
          // Handle error
          console.error('Error updating category:', error);
        }
      );
    }
  }
}
