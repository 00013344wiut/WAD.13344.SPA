import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListBooksComponent } from './components/book/list-books/list-books.component';
import { AddBookComponent } from './components/book/add-book/add-book.component';
import { ListCategoriesComponent } from './components/category/list-categories/list-categories.component';
import { ShowBookComponent } from './components/book/show-book/show-book.component';
import { UpdateBookComponent } from './components/book/update-book/update-book.component';
import { AddCategoryComponent } from './components/category/add-category/add-category.component';
import { UpdateCategoryComponent } from './components/category/update-category/update-category.component';
import { AddAuthorComponent } from './components/author/add-author/add-author.component';
import { UpdateAuthorComponent } from './components/author/update-author/update-author.component';
import { ListAuthorsComponent } from './components/author/list-authors/list-authors.component';

const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: 'books', component: ListBooksComponent },
  { path: 'categories', component: ListCategoriesComponent },
  { path: 'authors', component: ListAuthorsComponent },
  { path: 'books/add-book', component: AddBookComponent },
  { path: 'show-book/:id', component: ShowBookComponent },
  { path: 'update-book/:id', component: UpdateBookComponent },
  { path: 'categories/add-category', component: AddCategoryComponent},
  { path: 'update-category/:id', component: UpdateCategoryComponent},
  { path: 'authors/add-author', component: AddAuthorComponent},
  { path: 'update-author/:id', component: UpdateAuthorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
