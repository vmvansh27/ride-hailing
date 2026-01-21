// import { Routes } from '@angular/router';
// import { UserComponent } from './components/user/user';
// import { RideListComponent } from './components/ride-list/ride-list';
// import { RideComponent } from './components/ride/ride';
// import { ProfileComponent } from './components/profile/profile';

// export const routes: Routes = [
//     { path: '', redirectTo: 'login', pathMatch: 'full' },
//     { path: 'login', component: UserComponent },
//     { path: 'profile', component: ProfileComponent },
//     { path: 'ride-list', component: RideListComponent },
//     { path: 'ride/:id', component: RideComponent },
//     { path: '**', redirectTo: 'login' }
// ];

import { Routes } from '@angular/router';

import { Home } from './components/home/home';
import { Auth } from './components/auth/auth';
import { ProfileComponent } from './components/profile/profile';
import { RideComponent } from './components/ride/ride';
import { RideListComponent } from './components/ride-list/ride-list';
import { CurrentRideComponent } from './components/current-ride/current-ride';
import { MyRidesComponent } from './components/my-rides/my-rides';
import { PaymentComponent } from './components/payment/payment';
import { RatingComponent } from './components/rating/rating';
export const routes: Routes = [
  { path: '', component: Home },
  { path: 'auth', component: Auth }, // login + register
  { path: 'profile', component: ProfileComponent },

  // Rider
  { path: 'ride/request', component: RideComponent },

  // Driver
  { path: 'ride/list', component: RideListComponent },

  { path: 'ride/current', component: CurrentRideComponent },

  { path: 'my-rides', component: MyRidesComponent },

  { path: 'payment/:rideId', component: PaymentComponent },

  { path: 'rate/:rideId', component: RatingComponent },
];
