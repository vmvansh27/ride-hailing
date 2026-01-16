import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-ride',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './ride.html'
})
export class RideComponent implements OnInit {

  ride: any = null;
  rideId!: number;
  loading = true;
  errorMessage: string | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.rideId = Number(this.route.snapshot.params['id']);
    this.fetchRide();
  }

  fetchRide() {
    this.loading = true;
    this.errorMessage = null;

    this.http.get(`${environment.apiUrl}/rides`).subscribe({
      next: (res: any) => {
        this.ride = res.find((r: any) => r.ride_id === this.rideId);
        if (!this.ride) {
          this.errorMessage = 'Ride not found';
        }
        this.loading = false;
        console.log('Ride details:', this.ride);
      },
      error: (err) => {
        console.error('Failed to fetch rides', err);
        this.errorMessage = 'Failed to load ride';
        this.loading = false;
      }
    });
  }

  acceptRide() {
    const driver_id = 3; // hardcoded for demo
    this.http.patch(`${environment.apiUrl}/rides/${this.rideId}/accept`, { driver_id })
      .subscribe({
        next: (res: any) => {
          alert(`Ride #${this.rideId} accepted!`);
          this.fetchRide(); // reload ride status
        },
        error: (err) => {
          console.error('Failed to accept ride', err);
          alert('Failed to accept ride');
        }
      });
  }
}
