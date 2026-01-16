import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-current-ride',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './current-ride.html',
  styleUrls: ['./current-ride.css'],
})
export class CurrentRideComponent implements OnInit {
  ride: any = null;
  loading = true;
  errorMessage = '';
  fare: number | null = null;

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    this.loadCurrentRide();
  }

  loadCurrentRide() {
    const user = this.authService.getUser();

    if (!user || user.role !== 'driver') {
      this.errorMessage = 'Only drivers can access this page';
      this.loading = false;
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.http.get(`${environment.apiUrl}/rides/all`).subscribe({
      next: (res: any) => {
        console.log('All rides:', res);

        this.ride = Array.isArray(res)
          ? res.find(
              (r: any) => Number(r.driver_id) === Number(user.user_id) && r.status === 'ongoing'
            )
          : null;

        console.log('Matched ongoing ride:', this.ride);

        this.loading = false; // 🔥 THIS WAS MISSING
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load current ride';
        this.loading = false; // 🔥 ALSO HERE
      },
    });
  }

  startRide() {
    this.http.patch(`${environment.apiUrl}/rides/${this.ride.ride_id}/start`, {}).subscribe({
      next: () => {
        alert('Ride started');
        this.loadCurrentRide(); // 🔥 re-fetch ride from DB
      },
      error: () => alert('Failed to start ride'),
    });
  }

  completeRide() {
    if (!this.fare) {
      alert('Please enter fare');
      return;
    }

    this.http
      .patch(`${environment.apiUrl}/rides/${this.ride.ride_id}/complete`, {
        fare: this.fare,
      })
      .subscribe({
        next: () => {
          alert('Ride completed successfully!');
          this.ride.status = 'completed';

          // Optional: after 2 seconds, clear screen or redirect
          setTimeout(() => {
            this.ride = null; // no current ride anymore
          }, 2000);
        },
        error: () => alert('Failed to complete ride'),
      });
  }
}
