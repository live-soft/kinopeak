import { Component, signal, inject, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
// Packages
import { Observable, map, startWith } from 'rxjs';
// Material
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogClose, MAT_DIALOG_DATA, MatDialogRef, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
// Services
import { FilmMakerService } from '@services/film-maker/film-maker.service';
// Interfaces
import { IFilmMaker, IFilmMakerForm } from '@interfaces/film-maker.interface';
import { ICountry } from '@interfaces/common.interface';
import { IRole } from '@interfaces/role.interface';

@Component({
    selector: 'app-admin-film-maker-table-dialog',
    imports: [
        MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule,
        MatDatepickerModule, MatSelectModule, MatAutocompleteModule, MatDialogContent,
        MatDialogActions, MatDialogClose, ReactiveFormsModule, AsyncPipe, CommonModule
    ],
    templateUrl: './admin-film-maker-table-dialog.component.html',
    styleUrl: './admin-film-maker-table-dialog.component.scss',
    providers: [provideNativeDateAdapter()],
})
export class AdminFilmMakerTableDialogComponent implements OnInit {
    public countries = signal<ICountry[]>([]);
    public roles = signal<IRole[]>([]);
    public filteredCountries!: Observable<Array<ICountry>>;
    public filteredRoles!: Observable<Array<{ id: string; career: string; roles: IRole[] }>>;
    public rolesSearchControl = new FormControl('');
    public dialogData = inject<{
        countries: ICountry[],
        roles: IRole[],
        editData: IFilmMaker | null
    }>(MAT_DIALOG_DATA);

    public filmMakerForm = new FormGroup<IFilmMakerForm>({
        firstName: new FormControl(this.dialogData.editData?.first_name, Validators.required),
        lastName: new FormControl(this.dialogData.editData?.last_name, Validators.required),
        birthDate: new FormControl(new Date(this.dialogData.editData?.birth_date), Validators.required),
        country: new FormControl(this.dialogData.editData?.country, Validators.required),
        roles: new FormControl([], Validators.required)
    });

    private dialogRef = inject(MatDialogRef<AdminFilmMakerTableDialogComponent>);
    private filmMakerService = inject(FilmMakerService);

    public ngOnInit(): void {
        this.onCountry();
        this.onRole();

        this.filmMakerForm.patchValue({
            roles: this.dialogData?.editData?.roles || []
        });
    }

    public displayCountry(country: ICountry | null): string {
        return country ? country?.name : '';
    }

    public displayRole(role: IRole | null): string {
        return role ? role?.name : '';
    }

    public onSave(): void {
        if (this.filmMakerForm.valid) {
            if (!this.dialogData.editData) {
                this.create();
            } else {
                this.update();
            }
        }
    }

    public compareRoles(a: IRole, b: IRole): boolean {
        return a && b ? a.id === b.id : a === b;
    };

    private create(): void {
        this.filmMakerService.setFilmMaker({
            first_name: this.filmMakerForm.value.firstName!,
            last_name: this.filmMakerForm.value.lastName!,
            birth_date: this.filmMakerForm.value.birthDate.toISOString().split('T')[0],
            country: this.filmMakerForm.value.country,
            roles: this.filmMakerForm.value.roles
        }).subscribe(res => {
            this.dialogRef.close(res);
        });
    }

    private update(): void {
        this.filmMakerService.updateFilmMaker(this.dialogData.editData!.id, {
            first_name: this.filmMakerForm.value.firstName!,
            last_name: this.filmMakerForm.value.lastName!,
            birth_date: this.filmMakerForm.value.birthDate.toISOString().split('T')[0],
            country: this.filmMakerForm.value.country,
            roles: this.filmMakerForm.value.roles
        }).subscribe(res => {
            this.dialogRef.close(res);
        });
    }

    private onCountry(): void {
        this.countries.set(this.dialogData.countries);

        this.filteredCountries = this.filmMakerForm.controls.country.valueChanges.pipe(
            startWith('' as any),
            map((value: string | ICountry) => {
                let searchValue: string = typeof value == 'string' ? value : value?.name || '';

                return this.countries().filter(
                    (country: ICountry) => country?.name?.toLowerCase().includes(searchValue?.toLowerCase())
                );
            }),
        );
    }

    private onRole(): void {
        this.roles.set(this.dialogData.roles || []);

        this.filteredRoles = this.rolesSearchControl.valueChanges.pipe(
            startWith(''),
            map((searchValue: string) => {
                let allRoles = this.roles();
                let filtered = allRoles.filter(
                    (role: IRole) => role?.name?.toLowerCase().includes(searchValue?.toLowerCase())
                );

                let groupIndex = 0;
                let grouped = filtered.reduce((acc, role) => {
                    let existing = acc.find(g => g.career === role.career);

                    if (existing) {
                        existing.roles.push(role);
                    } else {
                        acc.push({
                            id: `${role.career}-${groupIndex++}`,
                            career: role.career,
                            roles: [role]
                        });
                    }
                    return acc;
                }, [] as { id: string; career: string; roles: IRole[] }[]);

                return grouped;
            }),
        );
    }
}
