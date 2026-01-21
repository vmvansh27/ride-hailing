import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ride-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ride-list.html',
  styleUrl: './ride-list.css',
})
export class RideListComponent implements OnInit {
  rides: any[] = [];
  loading = true;
  errorMessage = '';
  driver_id!: number;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef, // 🔥 Add this
  ) {}

  ngOnInit() {
    const user = this.authService.getUser();
    if (!user || user.role !== 'driver') {
      this.errorMessage = 'Only drivers can access this page';
      this.loading = false;
      this.cdr.detectChanges(); // 🔥 Force UI update
      return;
    }

    this.driver_id = user.user_id;
    this.loadRides();
  }

  loadRides() {
    this.loading = true;
    this.errorMessage = '';

    this.http.get(`${environment.apiUrl}/rides`).subscribe({
      next: (res: any) => {
        console.log('All rides from API:', res);

        this.rides = Array.isArray(res) ? res.filter((r: any) => r.status === 'requested') : [];

        console.log('Filtered requested rides:', this.rides);

        this.loading = false;
        this.cdr.detectChanges(); // 🔥 Force UI repaint
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load rides';
        this.loading = false;
        this.cdr.detectChanges(); // 🔥 Force UI repaint
      },
    });
  }

  acceptRide(ride_id: number) {
    this.http
      .patch(`${environment.apiUrl}/rides/${ride_id}/accept`, {
        driver_id: this.driver_id,
      })
      .subscribe({
        next: () => {
          alert(`Ride ${ride_id} accepted`);
          // Navigate to Current Ride screen
          this.router.navigate(['/ride/current']);
        },
        error: () => {
          alert('Failed to accept ride');
        },
      });
  }
}
