import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user/user';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './user.html'
})
export class UserComponent {
  email = '';
  password = '';

  constructor(private userService: UserService) { }

  login() {
    this.userService.login({ email: this.email, password: this.password })
      .subscribe((res: any) => {
        console.log(res);
        alert('Login successful');
      });
  }
}
