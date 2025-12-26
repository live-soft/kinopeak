import { Component, OnInit, inject } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
// Packages
import { filter } from 'rxjs/operators';
// Services
import { GenreService } from '@services/genre/genre.service';
import { MenuService } from '@services/menu/menu.service';
// Interfaces
import { IGenre } from '@interfaces/genre.interface';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    imports: [RouterLink],
})
export class SidebarComponent implements OnInit {
    private router = inject(Router);
    private genreService = inject(GenreService);
    public menuService = inject(MenuService);

    public ngOnInit(): void {
        this.genreService.getGenres().subscribe((genres: IGenre[]) => {
            this.menuService.menuItems.set(genres);
        }); 

        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => {
                let li = document.querySelector(`li a[href="${event.urlAfterRedirects}"]`)?.parentElement;

                // document.querySelectorAll('li').forEach(el => el.classList.remove('bg-[#F1EEFE]', 'rounded-md', 'text-purple-900'));
                
                // if (li) {
                //     li.classList.add('bg-[#F1EEFE]', 'rounded-md', 'text-purple-900');
                // }
            });
    }
}
