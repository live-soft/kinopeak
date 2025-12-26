import { Component, OnInit, signal, inject } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
// Services
import { MovieService } from '@services/movie/movie.service';
import { CommonService } from '@services/common/common.service';
import { FilmMakerService } from '@services/film-maker/film-maker.service';
// Interfaces
import { IMovie } from '@interfaces/movie.interface';
import { ICountry } from '@interfaces/common.interface';
// Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
// Components
import { AdminMovieTableDialogComponent } from './admin-movie-table-dialog/admin-movie-table-dialog.component';
import { IFilmMaker } from '@interfaces/film-maker.interface';

@Component({
    selector: 'app-admin-movie-table',
    imports: [MatButtonModule, MatIconModule, MatTableModule, TitleCasePipe, MatButtonModule, MatTooltipModule, MatMenuModule],
    templateUrl: './admin-movie-table.component.html',
    styleUrl: './admin-movie-table.component.scss',
})
export class AdminMovieTableComponent implements OnInit {
    public movieItems = signal<IMovie[]>([]);
    public countyItems = signal<ICountry[]>([]);
    public filmMakerItems = signal<IFilmMaker[]>([]);
    public tooltip: string;
    public displayedColumns: Array<string> = [
        'name',
        'release_date',
        'country',
        'director',
        'genre',
        'quality',
        'age',
        'duration',
        'actors',
        'title',
        'description',
        'url',
        'actions'
    ];

    private dialog = inject(MatDialog);
    private movieService = inject(MovieService);
    private commonService = inject(CommonService);
    private filmMakerService = inject(FilmMakerService);

    public ngOnInit(): void {
        this.getAndSetMovies();
        this.getAndSetCountries();
        this.getAndSetFilmMakers();
    }

    public onDialog(): void {
        this.dialog.open(AdminMovieTableDialogComponent, {
            data: {
                countries: this.countyItems(),
                filmMakers: this.filmMakerItems()
            },
            width: '700px',
            minWidth: '700px'
        });
    }

    private getAndSetMovies(): void {
        this.movieService.getMovies().subscribe((movies: IMovie[]) => {
            this.movieItems.set(movies);
        })
    }

    private getAndSetCountries(): void {
        this.commonService.getCountries().subscribe((countries: ICountry[]) => {
            this.countyItems.set(countries);
        })
    }

    private getAndSetFilmMakers(): void {
        this.filmMakerService.getFilmMakers().subscribe((filmMakers: IFilmMaker[]) => {
            this.filmMakerItems.set(filmMakers);
        })
    }
}
