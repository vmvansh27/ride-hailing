import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user';
import { RideListComponent } from './components/ride-list/ride-list';
import { RideComponent } from './components/ride/ride';
import { ProfileComponent } from './components/profile/profile';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: UserComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'ride-list', component: RideListComponent },
    { path: 'ride/:id', component: RideComponent },
    { path: '**', redirectTo: 'login' }
];
