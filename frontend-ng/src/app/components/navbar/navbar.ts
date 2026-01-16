import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {
    // Refresh navbar whenever route changes
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {});
  }

  get user() {
    return this.authService.getUser();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
