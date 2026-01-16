import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule
  ],
  templateUrl: './navbar.html'
})
export class NavbarComponent implements OnInit {

  user: any = null;
  isLoggedIn = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadUser();

    // 🔁 Update navbar on route change (login/logout)
    this.router.events.subscribe(() => {
      this.loadUser();
    });
  }

  loadUser() {
    const stored = localStorage.getItem('user');

    if (!stored || stored === 'undefined' || stored === 'null') {
      this.user = null;
      return;
    }

    try {
      this.user = JSON.parse(stored);
    } catch (e) {
      console.error('Invalid user in localStorage', stored);
      localStorage.removeItem('user');
      this.user = null;
    }
  }


  logout() {
    localStorage.removeItem('user');
    this.user = null;
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
