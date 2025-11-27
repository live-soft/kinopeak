import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// Components
import { SidebarComponent } from '@components/sidebar/sidebar.component';
import { HeaderComponent } from "@components/header/header.component";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, SidebarComponent, HeaderComponent],
    templateUrl: './app.html',
    styleUrl: './app.scss'
})
export class App {
    protected readonly title = signal('todo');
}
