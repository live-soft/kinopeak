import { Injectable, signal } from '@angular/core';
import { IGenre } from '@interfaces/genre.interface';

@Injectable({
    providedIn: 'root',
})
export class MenuService {
    public menuItems = signal<IGenre[]>([]);
}
