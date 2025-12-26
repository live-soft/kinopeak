import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
// Packages
import { Observable } from 'rxjs';
// Interfaces
import { IGenre } from '@interfaces/genre.interface';

@Injectable({
    providedIn: 'root',
})
export class GenreService {
    private http = inject(HttpClient);

    public getGenres(): Observable<Array<IGenre>> {
        return this.http.get<Array<IGenre>>('http://localhost:3000/genres');
    }

    public createGenre(genre: IGenre): Observable<IGenre> {
        return this.http.post<IGenre>('http://localhost:3000/genres', genre);
    }

    public updateGenre(id: string, genre: IGenre): Observable<IGenre> {
        return this.http.put<IGenre>(`http://localhost:3000/genres/${id}`, genre);
    }

    public deleteGenre(id: string): Observable<void> {
        return this.http.delete<void>(`http://localhost:3000/genres/${id}`);
    }

    public getGenreBySlug(slug: string): Observable<Array<IGenre>> {
        return this.http.get<Array<IGenre>>(`http://localhost:3000/genres?slug=${slug}`);
    }

    public getGenreByName(name: string): Observable<Array<IGenre>> {
        return this.http.get<Array<IGenre>>(`http://localhost:3000/genres?name=${name}`);
    }
}
