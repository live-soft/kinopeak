import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
// Material
import { MatIcon } from "@angular/material/icon";
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogClose, MAT_DIALOG_DATA, MatDialogRef, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
// Interfaces
import { IMovieForm } from '@interfaces/movie.interface';
import { ICountry } from '@interfaces/common.interface';
// Packages
import { Observable, map, startWith } from 'rxjs';

@Component({
    selector: 'app-admin-movie-table-dialog',
    imports: [
        ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule,
        MatButtonModule, MatIcon, MatFormFieldModule, MatInputModule, MatIconModule,
        MatButtonModule, MatDialogActions, MatDialogContent, MatDialogClose, MatDatepickerModule,
        MatSelectModule, MatAutocompleteModule, AsyncPipe
    ],
    templateUrl: './admin-movie-table-dialog.component.html',
    styleUrl: './admin-movie-table-dialog.component.scss',
    providers: [provideNativeDateAdapter()],
})
export class AdminMovieTableDialogComponent implements OnInit {
    public movieForm = new FormGroup<IMovieForm>({
        name: new FormControl('', [Validators.required]),
        release_date: new FormControl(new Date(), [Validators.required]),
        country: new FormControl('', [Validators.required]),
        director: new FormControl('', [Validators.required]),
        genre: new FormControl('', [Validators.required]),
        quality: new FormControl('', [Validators.required]),
        age: new FormControl('', [Validators.required]),
        duration: new FormControl(0, [Validators.required]),
        actors: new FormControl([], [Validators.required]),
        title: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        url: new FormControl('', [Validators.required])
    });

    public countries = signal<ICountry[]>([]);
    public filteredCountries!: Observable<Array<ICountry>>;
    private dialogData = inject<{ countries: ICountry[] }>(MAT_DIALOG_DATA);

    public ngOnInit(): void {
        this.onCountry();
    }

    public displayCountry(country: ICountry | null): string {
        return country ? country?.name : '';
    }

    private onCountry(): void {
        this.countries.set(this.dialogData.countries);

        this.filteredCountries = this.movieForm.controls.country.valueChanges.pipe(
            startWith(''),
            map((value: string | ICountry) => {
                let searchValue: string = typeof value == 'string' ? value : value?.name || '';

                return this.countries().filter(
                    (country: ICountry) => country?.name?.toLowerCase().includes(searchValue?.toLowerCase())
                );
            }),
        );
    }
}
