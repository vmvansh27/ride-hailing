import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
  activeTab: 'login' | 'register' = 'login';

  loginData = {
    email: '',
    password: '',
  };

  registerData = {
    full_name: '',
    email: '',
    phone: '',
    password: '',
    role: 'rider',
    license_number: null as string | null,
  };

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.loginData).subscribe({
      next: (res) => {
        console.log('Login success:', res);

        // Save only the user object, not the whole response
        this.authService.saveUser(res.user || res);

        this.router.navigate(['/']);
      },
      error: (err) => {
        alert(err.error?.message || 'Login failed');
      },
    });
  }

  register() {
    const payload = {
      ...this.registerData,
      license_number: this.registerData.role === 'driver' ? this.registerData.license_number : null,
    };

    this.authService.register(payload).subscribe({
      next: (res) => {
        console.log('Register success:', res);
        alert('Registration successful. Please login.');
        this.switchTab('login');
      },
      error: (err) => {
        alert(err.error?.message || 'Registration failed');
      },
    });
  }

  switchTab(tab: 'login' | 'register') {
    this.activeTab = tab;
  }
}
