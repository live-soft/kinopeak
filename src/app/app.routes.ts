import { Routes } from '@angular/router';
// Components
import { AdminComponent } from './pages/admin/admin.component';

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'admin',
                component: AdminComponent
            }
        ]
    }
];
