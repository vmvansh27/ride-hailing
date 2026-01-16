import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './user.html'
})
export class UserComponent {
  loginMode = true; // toggle between login/register
  email = '';
  password = '';
  full_name = '';
  phone = '';
  role: 'rider' | 'driver' = 'rider';
  license_number: string | null = null;

  constructor(private http: HttpClient, private router: Router) { }

  toggleMode() {
    this.loginMode = !this.loginMode;
  }

  submit() {
    if (this.loginMode) {
      // LOGIN
      this.http.post(`${environment.apiUrl}/users/login`, {
        email: this.email,
        password: this.password
      }).subscribe((res: any) => {

        // 🔥 store ONLY the actual user
        localStorage.setItem('user', JSON.stringify(res.user));

        this.router.navigate(['/']);
      });

    } else {
      // REGISTER
      this.http.post(`${environment.apiUrl}/users/register`, {
        full_name: this.full_name,
        email: this.email,
        phone: this.phone,
        password: this.password,
        role: this.role,
        license_number: this.role === 'driver' ? this.license_number : null
      }).subscribe((res: any) => {
        alert('Registration successful! Please login.');
        this.loginMode = true;
      }, err => {
        alert('Registration failed: ' + (err.error?.message || err.statusText));
      });
    }
  }
}
