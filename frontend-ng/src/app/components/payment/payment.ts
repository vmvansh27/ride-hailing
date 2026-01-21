import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.html',
  styleUrls: ['./payment.css'],
})
export class PaymentComponent implements OnInit {
  rideId!: number;
  amount!: number;
  method = 'cash';

  loading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef, // 🔥 Add this
  ) {}

  ngOnInit() {
    this.rideId = Number(this.route.snapshot.paramMap.get('rideId'));
    console.log('Payment page for ride:', this.rideId);

    this.loadRide();
  }

  loadRide() {
    this.loading = true;
    this.errorMessage = '';

    // 🔥 FIXED: use /rides not /rides/all
    this.http.get(`${environment.apiUrl}/rides/all`).subscribe({
      next: (res: any) => {
        console.log('All rides:', res);

        const ride = Array.isArray(res)
          ? res.find((r: any) => Number(r.ride_id) === Number(this.rideId))
          : null;

        console.log('Matched ride:', ride);

        if (!ride) {
          this.errorMessage = 'Ride not found';
          this.loading = false;
          this.cdr.detectChanges(); // 🔥 Force UI repaint
          return;
        }

        this.amount = ride.fare;
        this.loading = false;
        this.cdr.detectChanges(); // 🔥 Force UI repaint
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load ride details';
        this.loading = false;
        this.cdr.detectChanges(); // 🔥 Force UI repaint
      },
    });
  }

  makePayment() {
    const payload = {
      ride_id: this.rideId,
      amount: this.amount,
      method: this.method,
    };

    console.log('Sending payment:', payload);

    this.http.post(`${environment.apiUrl}/payments`, payload).subscribe({
      next: () => {
        alert('Payment successful!');
        this.router.navigate(['/rate', this.rideId]);
      },
      error: () => {
        alert('Payment failed');
      },
    });
  }
}
