import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rating.html',
  styleUrls: ['./rating.css'],
})
export class RatingComponent implements OnInit {
  rideId!: number;
  score = 5;
  comment = '';

  loading = true;
  errorMessage = '';

  givenBy!: number;
  givenTo!: number;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef, // 🔥 Add this
  ) {}

  ngOnInit() {
    console.log('Rating component loaded');

    this.rideId = Number(this.route.snapshot.paramMap.get('rideId'));
    console.log('Ride ID from route:', this.rideId);

    const user = this.authService.getUser();
    console.log('Logged in user:', user);

    if (!user) {
      this.errorMessage = 'Please login';
      this.loading = false;
      this.cdr.detectChanges(); // 🔥 Force UI repaint
      return;
    }

    this.givenBy = user.user_id;

    this.loadRide(user);
  }

  loadRide(user: any) {
    this.loading = true;
    this.errorMessage = '';

    // 🔥 FIXED: use /rides not /rides/all
    this.http.get(`${environment.apiUrl}/rides/all`).subscribe({
      next: (res: any) => {
        console.log('API response:', res);

        const ride = Array.isArray(res)
          ? res.find((r: any) => Number(r.ride_id) === this.rideId)
          : null;

        console.log('Matched ride:', ride);

        if (!ride) {
          this.errorMessage = 'Ride not found';
          this.loading = false;
          this.cdr.detectChanges(); // 🔥 Force UI repaint
          return;
        }

        if (user.role === 'rider') {
          this.givenTo = ride.driver_id;
        } else {
          this.givenTo = ride.rider_id;
        }

        console.log('Given By:', this.givenBy);
        console.log('Given To:', this.givenTo);

        this.loading = false;
        this.cdr.detectChanges(); // 🔥 Force UI repaint
      },
      error: (err) => {
        console.error('API failed:', err);
        this.errorMessage = 'Failed to load ride';
        this.loading = false;
        this.cdr.detectChanges(); // 🔥 Force UI repaint
      },
    });
  }

  submitRating() {
    const payload = {
      ride_id: this.rideId,
      given_by: this.givenBy,
      given_to: this.givenTo,
      score: this.score,
      comment: this.comment,
    };

    this.http.post(`${environment.apiUrl}/ratings`, payload).subscribe({
      next: () => {
        alert('Rating submitted successfully!');
        this.router.navigate(['/my-rides']);
      },
      error: () => {
        alert('Failed to submit rating');
      },
    });
  }
}
