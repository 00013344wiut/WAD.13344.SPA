import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, mergeMap, of, throwError } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { BookDto } from "src/app/models";

@Injectable({
    providedIn: 'root', // or provide the service in a specific module if needed
  })
  
export class BookService {
    constructor(private httpClient: HttpClient){}

    getAllBooks(): Observable<BookDto[]> {
        let url_ = 'http://localhost:5152/api/books';
    
        let options_: any = {
            observe: 'response',
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Accept: 'text/json',
            }),
        };
    
        return this.httpClient.request('get', url_, options_).pipe(
            mergeMap((response: any): Observable<BookDto[]> => {
                let data: BookDto[] = [];
    
                if (response.body !== null) {
                    data = response.body;
                }
    
                return of(data);
            })
        );
    }
    
    deleteBookById(id: number): Observable<any> {
        const url = `http://localhost:5152/api/books/${id}`;
    
        let options: any = {
          body: [url],
          observe: 'response',
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
              Accept: 'text/json',
          }),
        };
    
        return this.httpClient.delete<any>(url, options);
    }

    addBook(body: CreateBookCommand): Observable<any> {
        const url = 'http://localhost:5152/api/books';

        const formData = new FormData();
        formData.append('Title', body.title);
        formData.append('Description', body.description);
        formData.append('AuthorId', body.authorId.toString());
        formData.append('PagesCount', body.pagesCount.toString());
        formData.append('PublicationDate', new Date(body.publicationDate!).toISOString());
        formData.append('CategoryId', body.categoryId.toString());

        let options_: any = {
            body: formData,
        };

        return this.httpClient.request('post', url, options_).pipe(
            catchError((error) => {
                return throwError(() => error.error);
            })
        );
    }

    updateBook(id: number, body: UpdateBookModel): Observable<any> {
        const url = `http://localhost:5152/api/books/${id}`

        const formData = new FormData();
        formData.append('Title', body.title);
        formData.append('Description', body.description);
        formData.append('AuthorId', body.authorId.toString());
        formData.append('PagesCount', body.pagesCount.toString());
        formData.append('PublicationDate', new Date(body.publicationDate!).toISOString());
        formData.append('CategoryId', body.categoryId.toString());

        let options_: any = {
            body: formData,
        };

        return this.httpClient.request('put', url, options_).pipe(
            catchError((error) => {
                return throwError(() => error.error);
            })
        );
    }

    getOneBook(id: number): Observable<GetBookResponse> {
        const url = `http://localhost:5152/api/books/${id}`

        let options_: any = {
            observe: 'response',
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Accept: 'text/json',
            }),
        };

        return this.httpClient.request('get', url, options_).pipe(
            mergeMap((response: any): Observable<GetBookResponse> => {
                if (response.body !== null) {
                    let data: GetBookResponse = response.body;

                    return of(data);
                } else return throwError(() => new Error('data is empty!'));
            })
        );
    }
}


export interface CreateBookCommand {
    title: string;
    description: string;
    authorId: number;
    pagesCount: number;
    publicationDate: Date;
    categoryId: number;
}

export interface GetBookResponse {
    id: number;
    title: string;
    description: string;
    authorId: number;
    pagesCount: number;
    publicationDate: Date;
    categoryId: number;
}

export interface UpdateBookModel {
    title: string;
    description: string;
    authorId: number;
    pagesCount: number;
    publicationDate: Date;
    categoryId: number;
}