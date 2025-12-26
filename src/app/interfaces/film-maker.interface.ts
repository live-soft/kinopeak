import { FormControl } from "@angular/forms"

export interface IFilmMaker {
    id?: number,
    first_name: string,
    last_name: string,
    birth_date: string,
    country: string,
    roles: Array<any>
}

export interface IFilmMakerForm {
    firstName: FormControl<string>,
    lastName: FormControl<string>,
    birthDate: FormControl<Date>,
    country: FormControl<string>,
    roles: FormControl<Array<IFilmMaker>>
}