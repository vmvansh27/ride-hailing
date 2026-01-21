import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-rides',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-rides.html',
  styleUrls: ['./my-rides.css'],
})
export class MyRidesComponent implements OnInit {
  rides: any[] = [];
  payments: any[] = [];
  ratings: any[] = [];

  loading = true;
  errorMessage = '';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    const user = this.authService.getUser();

    if (!user || user.role !== 'rider') {
      this.errorMessage = 'Only riders can access this page';
      this.loading = false;
      this.cdr.detectChanges();
      return;
    }

    this.loadData(user.user_id);
  }

  loadData(userId: number) {
    this.loading = true;

    Promise.all([
      this.http.get(`${environment.apiUrl}/rides/all`).toPromise(),
      this.http.get(`${environment.apiUrl}/payments`).toPromise(),
      this.http.get(`${environment.apiUrl}/ratings`).toPromise(),
    ])
      .then(([rides, payments, ratings]: any) => {
        this.payments = payments || [];
        this.ratings = ratings || [];

        this.rides = (rides || []).filter((r: any) => Number(r.rider_id) === Number(userId));

        this.loading = false;
        this.cdr.detectChanges();
      })
      .catch(() => {
        this.errorMessage = 'Failed to load data';
        this.loading = false;
        this.cdr.detectChanges();
      });
  }

  hasPayment(rideId: number): boolean {
    return this.payments.some((p) => Number(p.ride_id) === Number(rideId));
  }

  hasRating(rideId: number): boolean {
    return this.ratings.some((r) => Number(r.ride_id) === Number(rideId));
  }

  goToPayment(rideId: number) {
    this.router.navigate(['/payment', rideId]);
  }

  goToRating(rideId: number) {
    this.router.navigate(['/rate', rideId]);
  }
}
