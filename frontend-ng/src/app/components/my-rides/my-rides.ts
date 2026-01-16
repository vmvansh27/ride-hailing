import { Component, OnInit } from '@angular/core';
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
  loading = true;
  errorMessage = '';

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const user = this.authService.getUser();
    console.log('Logged in user:', user);

    if (!user || user.role !== 'rider') {
      this.errorMessage = 'Only riders can access this page';
      this.loading = false;
      return;
    }

    this.loading = true;

    this.http.get(`${environment.apiUrl}/rides/all`).subscribe({
      next: (res: any) => {
        console.log('All rides from API:', res);

        this.rides = Array.isArray(res)
          ? res.filter((r) => Number(r.rider_id) === Number(user.user_id))
          : [];

        console.log('Filtered rider rides:', this.rides);

        this.loading = false; // VERY IMPORTANT
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load rides';
        this.loading = false;
      },
    });
  }

  goToPayment(rideId: number) {
    this.router.navigate(['/payment', rideId]);
  }
}
