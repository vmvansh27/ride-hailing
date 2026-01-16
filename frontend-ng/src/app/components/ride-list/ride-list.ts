// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { environment } from '../../../environments/environment';
// import { MatCardModule } from '@angular/material/card';
// import { MatButtonModule } from '@angular/material/button';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-ride-list',
//   standalone: true,
//   imports: [
//     CommonModule,
//     MatCardModule,
//     MatButtonModule,
//     RouterModule
//   ],
//   templateUrl: './ride-list.html',
//   styleUrls: ['./ride-list.css'] // optional, for styling cards
// })
// export class RideListComponent implements OnInit {

//   rides: any[] = [];
//   driver_id = 3;

//   constructor(private http: HttpClient) { }

//   ngOnInit() {
//     this.loadRides();
//   }

//   loadRides() {
//     this.http.get(`${environment.apiUrl}/rides`).subscribe((res: any) => {
//       this.rides = res.filter((ride: any) => ride.status === 'requested');
//       console.log('Requested rides:', this.rides);
//     }, err => {
//       console.error('Error fetching rides:', err);
//     });
//   }

//   acceptRide(ride_id: number) {
//     this.http.patch(`${environment.apiUrl}/rides/${ride_id}/accept`, { driver_id: this.driver_id })
//       .subscribe((res: any) => {
//         console.log('Ride accepted:', res);
//         alert(`Ride ${ride_id} accepted!`);
//         this.loadRides(); // refresh list
//       }, err => {
//         console.error('Error accepting ride', err);
//         alert('Failed to accept ride');
//       });
//   }
// }


import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-ride-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './ride-list.html'
})
export class RideListComponent {
  driver_id = 3;

  // Observable of rides
  rides$!: Observable<any[]>;

  constructor(private http: HttpClient) {
    this.loadRides();
  }

  loadRides() {
    this.rides$ = this.http.get(`${environment.apiUrl}/rides`).pipe(
      map((res: any) => res.filter((ride: any) => ride.status === 'requested'))
    );
  }

  acceptRide(ride_id: number) {
    this.http.patch(`${environment.apiUrl}/rides/${ride_id}/accept`, { driver_id: this.driver_id })
      .subscribe({
        next: (res: any) => {
          alert(`Ride ${ride_id} accepted!`);
          this.loadRides(); // Refresh rides after accepting
        },
        error: err => {
          console.error('Error accepting ride', err);
          alert('Failed to accept ride');
        }
      });
  }
}
