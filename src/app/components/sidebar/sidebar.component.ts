import { Component, OnInit, inject } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
// Packages
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    imports: [RouterLink],
})
export class SidebarComponent implements OnInit {
    public menuItems = [
        { name: 'Biographies', path: '/biographies' },
        { name: 'Militants', path: '/militants' },
        { name: 'Westerns', path: '/westerns' },
        { name: 'Military', path: '/military' },
        { name: 'Detectives', path: '/detectives' },
        { name: "Children's", path: '/childrens' },
        { name: 'Documentary', path: '/documentary' },
        { name: 'Dramas', path: '/dramas' },
        { name: 'Historical', path: '/historical' },
        { name: 'Comedies', path: '/comedies' },
        { name: 'Crime', path: '/crime' },
        { name: 'Melodramas', path: '/melodramas' },
        { name: 'Musicals', path: '/musicals' },
        { name: 'Adventures', path: '/adventures' },
        { name: 'Family', path: '/family' },
        { name: 'Sports', path: '/sports' },
        { name: 'Thrillers', path: '/thrillers' },
        { name: 'Horrors', path: '/horrors' },
        { name: 'Science fiction', path: '/science-fiction' },
        { name: 'Fantasy', path: '/fantasy' },

    ];

    private router = inject(Router);

    public ngOnInit(): void {
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe((event: any) => {
                let li = document.querySelector(`li a[href="${event.urlAfterRedirects}"]`)?.parentElement;

                document.querySelectorAll('li').forEach(el => el.classList.remove('bg-[#F1EEFE]', 'rounded-md', 'text-purple-900'));
                
                if (li) {
                    li.classList.add('bg-[#F1EEFE]', 'rounded-md', 'text-purple-900');
                }
            });
    }
}
