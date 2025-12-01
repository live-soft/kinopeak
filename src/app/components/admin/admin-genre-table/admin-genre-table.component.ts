import { Component, inject, OnInit, signal } from '@angular/core';
// Material
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
// Interfaces
import { IGenre } from '@interfaces/genre.interface';
// Services
import { GenreService } from '@services/genre/genre.service';
import { MenuService } from '@services/menu/menu.service';

// Components
import { AdminGenreTableDialogComponent } from './admin-genre-table-dialog/admin-genre-table-dialog.component';

@Component({
    selector: 'app-admin-genre-table',
    imports: [MatTableModule, MatIconModule, MatDividerModule, MatButtonModule],
    templateUrl: './admin-genre-table.component.html',
    styleUrl: './admin-genre-table.component.scss',
})
export class AdminGenreTableComponent implements OnInit {
    public genres = signal<IGenre[]>([]);
    public displayedColumns: Array<string> = ['id', 'name', 'slug', 'actions'];
    public menuService = inject(MenuService);
    private genreService = inject(GenreService);
    private dialog = inject(MatDialog);

    public ngOnInit(): void {
        this.genreService.getGenres().subscribe((genres: IGenre[]) => {
            this.menuService.menuItems.set(genres);
        });
    }

    public openDialog(id: any = null): void {
        let selectedGenre = this.menuService.menuItems().find(genre => genre.id === id);

        let dialogRef = this.dialog.open(AdminGenreTableDialogComponent, {
            data: selectedGenre,
            width: '400px'
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (!result) return;

            if (selectedGenre) {
                this.menuService.menuItems.set(
                    this.menuService.menuItems().map(g => g.id === result.id ? result : g)
                );
            } else {
                this.menuService.menuItems.set([...this.menuService.menuItems(), result]);
            }
        });
    }

    public deleteGenre(id: string): void {
        this.genreService.deleteGenre(id).subscribe(() => {
            this.menuService.menuItems.set(
                this.menuService.menuItems().filter(g => g.id !== id)
            );
        });
    }
}
