import { Component, inject, OnInit, signal } from '@angular/core';
// Material
import { MatTabsModule } from '@angular/material/tabs';
// Services
import { GenreService } from '@services/genre/genre.service';
// Interfaces
import { IGenre } from '@interfaces/genre.interface';
// Components
import { AdminGenreTableComponent } from '@components/admin/admin-genre-table/admin-genre-table.component';

@Component({
    selector: 'app-admin',
    imports: [ MatTabsModule, AdminGenreTableComponent ],
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
