import { Component, OnInit, signal, inject } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
// Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
// Services
import { FilmMakerService } from '@services/film-maker/film-maker.service';
import { CommonService } from '@services/common/common.service';
// Interfaces
import { IFilmMaker } from '@interfaces/film-maker.interface';
import { ICountry } from '@interfaces/common.interface';
import { IRole } from '@interfaces/role.interface';
// Components
import { AdminFilmMakerTableDialogComponent } from './admin-film-maker-table-dialog/admin-film-maker-table-dialog.component';
// Pipes
import { FilmMakerTablePipe } from "../../../pipes/film-maker/film-maker-table-pipe";

@Component({
    selector: 'app-admin-film-maker-table',
    imports: [MatIconModule, MatTableModule, MatButtonModule, MatTooltipModule, MatMenuModule, TitleCasePipe, FilmMakerTablePipe],
    templateUrl: './admin-film-maker-table.component.html',
    styleUrl: './admin-film-maker-table.component.scss',
})
export class AdminFilmMakerTableComponent implements OnInit {
    public countyItems = signal<ICountry[]>([]);
    public filmMakerItems = signal<IFilmMaker[]>([]);
    public roleItems = signal<IRole[]>([]);
    public displayedColumns: Array<string> = [
        'first_name',
        'last_name',
        'birth_date',
        'country',
        'roles',
        'actions'
    ];

    private filmMakerService = inject(FilmMakerService);
    private commonService = inject(CommonService);
    private dialog = inject(MatDialog);

    public ngOnInit(): void {
        this.getAndSetFilmMakers();
        this.getAndSetCountries();
        this.getAndSetRoles();
    }

    public onDialog(id: number | null = null): void {
        let dialog = this.dialog.open(AdminFilmMakerTableDialogComponent, {
            data: {
                countries: this.countyItems(),
                filmMakers: this.filmMakerItems(),
                roles: this.roleItems(),
                editData: this.filmMakerItems().find((filmMaker: IFilmMaker) => filmMaker.id === id) || null
            },
        });

        dialog.afterClosed().subscribe((result: IFilmMaker) => {
            if (result) {
                if (this.filmMakerItems().find(item => item.id === result.id)) {
                    this.filmMakerItems.set(this.filmMakerItems().map(item => item.id === result.id ? result : item));
                } else {
                    this.filmMakerItems.set([...this.filmMakerItems(), result]);
                }
            }
        });
    }

    public onDelete(id: number): void {
        this.filmMakerService.deleteFilmMaker(id).subscribe(() => {
            this.getAndSetFilmMakers();
        });
    }

    private getAndSetFilmMakers(): void {
        this.filmMakerService.getFilmMakers().subscribe((filmMakers: Array<IFilmMaker>) => {
            this.filmMakerItems.set(filmMakers);
        })
    }

    private getAndSetCountries(): void {
        this.commonService.getCountries().subscribe((countries: Array<ICountry>) => {
            this.countyItems.set(countries);
        })
    }

    private getAndSetRoles(): void {
        this.commonService.getRoles().subscribe((roles: Array<IRole>) => {
            this.roleItems.set(roles);
        })
    }
}
