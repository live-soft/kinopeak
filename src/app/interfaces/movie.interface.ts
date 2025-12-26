import { FormControl } from "@angular/forms"

export interface IMovie {
    name: string,
    release_date: Date,
    country: string,
    director: string,
    genre: string,
    quality: string,
    age: string,
    duration: number,
    actors: Array<number>,
    title: string,
    description: string,
    url: string
}

export interface IMovieForm {
    name: FormControl<string>,
    release_date: FormControl<Date>,
    country: FormControl<string>,
    director: FormControl<string>,
    genre: FormControl<string>,
    quality: FormControl<string>,
    age: FormControl<string>,
    duration: FormControl<number>,
    actors: FormControl<Array<number>>,
    title: FormControl<string>,
    description: FormControl<string>,
    url: FormControl<string>
}
