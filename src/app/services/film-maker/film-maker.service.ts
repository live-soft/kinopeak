import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Packages
import { Observable } from 'rxjs';
// Interfaces
import { IFilmMaker } from '@interfaces/film-maker.interface';

@Injectable({
    providedIn: 'root',
})
export class FilmMakerService {
    private http = inject(HttpClient);
    public getFilmMakers(): Observable<Array<IFilmMaker>> {
        return this.http.get<Array<IFilmMaker>>(`http://localhost:3000/filmmakers`);
    }

    public setFilmMaker(filmMaker: IFilmMaker): Observable<IFilmMaker> {
        return this.http.post<IFilmMaker>(`http://localhost:3000/filmmakers`, filmMaker);
    }

    public updateFilmMaker(id: number, filmMaker: IFilmMaker): Observable<IFilmMaker> {
        return this.http.put<IFilmMaker>(`http://localhost:3000/filmmakers/${id}`, filmMaker);
    }

    public deleteFilmMaker(id: number): Observable<void> {
        return this.http.delete<void>(`http://localhost:3000/filmmakers/${id}`);
    }
}
