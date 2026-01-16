import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-ride',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ride.html',
  styleUrl: './ride.css',
})
export class RideComponent {
  rideData = {
    pickup_location: '',
    drop_location: '',
  };

  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private http: HttpClient, private authService: AuthService) {}

  requestRide() {
    const user = this.authService.getUser();

    if (!user) {
      this.errorMessage = 'Please login first';
      return;
    }

    const payload = {
      rider_id: user.user_id,
      pickup_location: this.rideData.pickup_location,
      drop_location: this.rideData.drop_location,
    };

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.http.post(`${environment.apiUrl}/rides/request`, payload).subscribe({
      next: (res: any) => {
        this.successMessage = 'Ride requested successfully!';
        this.rideData = { pickup_location: '', drop_location: '' };
        this.loading = false;
        console.log('Ride created:', res);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to request ride';
        this.loading = false;
      },
    });
  }
}
