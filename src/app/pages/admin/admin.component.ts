import { Component, inject, OnInit, signal } from '@angular/core';
// Material
import { MatTabsModule } from '@angular/material/tabs';
// Services
import { GenreService } from '@services/genre/genre.service';
// Interfaces
import { IGenre } from '@interfaces/genre.interface';
// Components
import { AdminGenreTableComponent } from '@components/admin/admin-genre-table/admin-genre-table.component';
import { AdminMovieTableComponent } from '@components/admin/admin-movie-table/admin-movie-table.component';
import { AdminFilmMakerTableComponent } from "@components/admin/admin-film-maker-table/admin-film-maker-table.component";

@Component({
    selector: 'app-admin',
    imports: [MatTabsModule, AdminGenreTableComponent, AdminMovieTableComponent, AdminFilmMakerTableComponent],
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
    public menuItems = signal<IGenre[]>([]);
    private genreService = inject(GenreService);

    public ngOnInit(): void {
        this.genreService.getGenres().subscribe((genres: IGenre[]) => {
            this.menuItems.set(genres);
        });
    }
}
