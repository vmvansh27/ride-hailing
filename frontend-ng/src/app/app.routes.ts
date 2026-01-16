import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user';
import { RideComponent } from './components/ride/ride';
import { RideListComponent } from './components/ride-list/ride-list';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: UserComponent },
    { path: 'ride-list', component: RideListComponent },
    { path: 'ride/:id', component: RideComponent },
    { path: '**', redirectTo: 'login' } // catch-all
];
