import { FormControl } from "@angular/forms";

export interface IGenre {
    id?: string;
    name: string;
    slug: string;
}

export interface IGenreForm {
    name: FormControl<string>;
}

