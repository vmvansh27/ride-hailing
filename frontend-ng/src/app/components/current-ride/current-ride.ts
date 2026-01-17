import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.loadCurrentRide();
  }

  loadCurrentRide() {
    const user = this.authService.getUser();
    console.log('Logged in user:', user);

    if (!user || user.role !== 'driver') {
      this.errorMessage = 'Only drivers can access this page';
      this.loading = false;
      this.cdr.detectChanges();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.http.get(`${environment.apiUrl}/rides/all`).subscribe({
      next: (res: any) => {
        console.log('All rides:', res);

        this.ride = Array.isArray(res)
          ? res.find(
              (r: any) => Number(r.driver_id) === Number(user.user_id) && r.status === 'ongoing',
            )
          : null;

        console.log('Matched ongoing ride:', this.ride);

        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load current ride';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  startRide() {
    if (!this.ride) return;

    this.http.patch(`${environment.apiUrl}/rides/${this.ride.ride_id}/start`, {}).subscribe({
      next: () => {
        alert('Ride started');
        this.loadCurrentRide();
      },
      error: () => alert('Failed to start ride'),
    });
  }

  completeRide() {
    if (!this.fare || !this.ride) {
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
          this.ride = null;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: () => alert('Failed to complete ride'),
      });
  }
}
