import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, mergeMap, of, throwError } from "rxjs";
import { CategoryDto } from "src/app/models";

@Injectable({
    providedIn: 'root',
  })
  
export class CategoryService {
    constructor(private httpClient: HttpClient){}

    getAllCategories(): Observable<CategoryDto[]> {
        let url_ = 'https://localhost:7093/api/categories';
    
        let options_: any = {
            observe: 'response',
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Accept: 'text/json',
            }),
        };
    
        return this.httpClient.request('get', url_, options_).pipe(
            mergeMap((response: any): Observable<CategoryDto[]> => {
                let data: CategoryDto[] = [];
    
                if (response.body !== null) {
                    data = response.body;
                }
    
                return of(data);
            })
        );
    }

    deleteCategoryById(id: number): Observable<any> {
        const url = `https://localhost:7093/api/categories/${id}`;
    
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

    addcategory(body: CreateCategoryCommand): Observable<any> {
        const url = 'https://localhost:7093/api/categories';

        const formData = new FormData();
        formData.append('CategoryName', body.categoryName);

        let options_: any = {
            body: formData,
        };

        return this.httpClient.request('post', url, options_).pipe(
            catchError((error) => {
                return throwError(() => error.error);
            })
        );
    }

    updateCategory(id: number, body: UpdateCategoryModel): Observable<any> {
        const url = `https://localhost:7093/api/categories/${id}`

        const formData = new FormData();
        formData.append('CategoryName', body.categoryName);

        let options_: any = {
            body: formData,
        };

        return this.httpClient.request('put', url, options_).pipe(
            catchError((error) => {
                return throwError(() => error.error);
            })
        );
    }

    getOneCategory(id: number): Observable<GetCategoryResponse> {
        const url = `https://localhost:7093/api/categories/${id}`

        let options_: any = {
            observe: 'response',
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Accept: 'text/json',
            }),
        };

        return this.httpClient.request('get', url, options_).pipe(
            mergeMap((response: any): Observable<GetCategoryResponse> => {
                if (response.body !== null) {
                    let data: GetCategoryResponse = response.body;

                    return of(data);
                } else return throwError(() => new Error('data is empty!'));
            })
        );
    }
}

export interface CreateCategoryCommand {
    categoryName: string;
}

export interface GetCategoryResponse {
    categoryName: string;
}

export interface UpdateCategoryModel {
    categoryName: string;
}