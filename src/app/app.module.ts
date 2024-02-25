import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListAuthorsComponent } from './components/author/list-authors/list-authors.component';
import { ListBooksComponent } from './components/book/list-books/list-books.component';
import { ListCategoriesComponent } from './components/category/list-categories/list-categories.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AddBookComponent } from './components/book/add-book/add-book.component';
import { ShowBookComponent } from './components/book/show-book/show-book.component';
import { AddAuthorComponent } from './components/author/add-author/add-author.component';
import { AddCategoryComponent } from './components/category/add-category/add-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookService } from './components/book/book-service';
import { UpdateBookComponent } from './components/book/update-book/update-book.component';
import { UpdateCategoryComponent } from './components/category/update-category/update-category.component';
import { UpdateAuthorComponent } from './components/author/update-author/update-author.component';
import { CategoryService } from './components/category/category-service';
import { AuthorService } from './components/author/author-service';

@NgModule({
  declarations: [
    AppComponent,
    ListAuthorsComponent,
    ListBooksComponent,
    ListCategoriesComponent,
    AddBookComponent,
    ShowBookComponent,
    AddAuthorComponent,
    AddCategoryComponent,
    UpdateBookComponent,
    UpdateCategoryComponent,
    UpdateAuthorComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
  ],
  providers: [BookService, CategoryService, AuthorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
