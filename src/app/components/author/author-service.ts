import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, mergeMap, of, throwError } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { AuthorDto } from "src/app/models";

@Injectable({
    providedIn: 'root', // or provide the service in a specific module if needed
  })
  
export class AuthorService {
    constructor(private httpClient: HttpClient){}

    getAllAuthors(): Observable<AuthorDto[]> {
        let url_ = 'http://localhost:5152/api/authors';
    
        let options_: any = {
            observe: 'response',
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Accept: 'text/json',
            }),
        };
    
        return this.httpClient.request('get', url_, options_).pipe(
            mergeMap((response: any): Observable<AuthorDto[]> => {
                let data: AuthorDto[] = [];
    
                if (response.body !== null) {
                    data = response.body;
                }
    
                return of(data);
            })
        );
    }
    
    deleteAuthorById(id: number): Observable<any> {
        const url = `http://localhost:5152/api/authors/${id}`;
    
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

    addAuthor(body: CreateAuthorCommand): Observable<any> {
        const url = 'http://localhost:5152/api/authors';

        const formData = new FormData();
        formData.append('FirstName', body.firstName);
        formData.append('LastName', body.lastName);

        let options_: any = {
            body: formData,
        };

        return this.httpClient.request('post', url, options_).pipe(
            catchError((error) => {
                return throwError(() => error.error);
            })
        );
    }

    updateAuthor(id: number, body: UpdateAuthorModel): Observable<any> {
        const url = `http://localhost:5152/api/authors/${id}`

        const formData = new FormData();
        formData.append('FirstName', body.firstName);
        formData.append('LastName', body.lastName);

        let options_: any = {
            body: formData,
        };

        return this.httpClient.request('put', url, options_).pipe(
            catchError((error) => {
                return throwError(() => error.error);
            })
        );
    }

    getOneAuthor(id: number): Observable<GetAuthorResponse> {
        const url = `http://localhost:5152/api/authors/${id}`

        let options_: any = {
            observe: 'response',
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Accept: 'text/json',
            }),
        };

        return this.httpClient.request('get', url, options_).pipe(
            mergeMap((response: any): Observable<GetAuthorResponse> => {
                if (response.body !== null) {
                    let data: GetAuthorResponse = response.body;

                    return of(data);
                } else return throwError(() => new Error('data is empty!'));
            })
        );
    }
}


export interface CreateAuthorCommand {
    firstName: string;
    lastName: string;
}

export interface GetAuthorResponse {
    firstName: string;
    lastName: string;
}

export interface UpdateAuthorModel {
    firstName: string;
    lastName: string;
}