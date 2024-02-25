export interface BookDto {
    id: number;
    title: string;
    description: string;
    author: AuthorDto | null;
    pagesCount: number;
    publicationDate: number;
    category: CategoryDto | null;
}

export interface AuthorDto {
    id: number;
    firstName: string;
    lastName: string;
    booksCount: number;
}

export interface CategoryDto {
    id: number;
    categoryName: string;
}