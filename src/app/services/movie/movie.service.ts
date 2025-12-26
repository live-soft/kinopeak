import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
// Packages
import { Observable } from 'rxjs';
// Interfaces
import { IMovie } from '@interfaces/movie.interface';

@Injectable({
    providedIn: 'root',
})
export class MovieService {
    public qualities = ['144p', '240p', '360p', '480p', '720p', '1080p HD', '1440p HD', '2160p 4K', '4320p 8K'];
    private http = inject(HttpClient);

    public getMovies(): Observable<Array<IMovie>> {
        return this.http.get<Array<IMovie>>('http://localhost:3000/movies');
    }
}
