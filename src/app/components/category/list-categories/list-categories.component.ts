import { Component, OnInit } from '@angular/core';
import { CategoryDto } from 'src/app/models';
import { CategoryService } from '../category-service';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit{
  data!: CategoryDto[]

  constructor(private service: CategoryService){}

  ngOnInit(){
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.service.getAllCategories().subscribe(
      (categories) => {
        this.data = categories;
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    )
  }

  onDeleteCategory(id: number): void {
    this.service.deleteCategoryById(id).subscribe(
      () => {
        this.fetchCategories();
      },
      (error) => {
        console.error(`Error deleting book with ID ${id}:`, error);
      }
    );
  }
}
