import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
//Packages
import slugify from 'slugify';
import { forkJoin } from 'rxjs';
// Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
// Interfaces
import { IGenre, IGenreForm } from '@interfaces/genre.interface';
// Services
import { GenreService } from '@services/genre/genre.service';

@Component({
    selector: 'app-admin-genre-table-dialog',
    imports: [CommonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatDialogClose, ReactiveFormsModule],
    templateUrl: './admin-genre-table-dialog.component.html',
    styleUrl: './admin-genre-table-dialog.component.scss',
})
export class AdminGenreTableDialogComponent implements OnInit {

    public genre = inject(MAT_DIALOG_DATA);
    public genreForm = new FormGroup<IGenreForm>({
        name: new FormControl('', [Validators.required]),
    });

    private genreService = inject(GenreService);
    private dialogRef = inject(MatDialogRef<AdminGenreTableDialogComponent>);

    ngOnInit(): void {
        this.genreForm.setValue({
            name: this.genre?.name || '',
        });
    }

    public onSave(): void {
        let name = this.genreForm.value.name;
        let slug = slugify(name, { lower: true });

        if (this.genreForm.invalid) return;
        if (this.genre && (this.genreForm.value.name === this.genre.name)) this.closeDialog(this.genre);

        forkJoin([
            this.genreService.getGenreBySlug(slug),
            this.genreService.getGenreByName(name)
        ]).subscribe(([bySlub, byName]) => {
            if (bySlub.length || byName.length) {
                this.genreForm.controls.name.setErrors({ duplicate: true });
                return;
            }

            if (this.genre) {
                this.genreService.updateGenre(this.genre.id, { name, slug }).subscribe(genre => {
                    this.closeDialog(genre)
                });
            } else {
                this.genreService.createGenre({ name, slug }).subscribe(genre => {
                    this.closeDialog(genre)
                });
            }
        });
    }

    private closeDialog(data: IGenre | null = null): void {
        this.dialogRef.close(data);
    }
}
