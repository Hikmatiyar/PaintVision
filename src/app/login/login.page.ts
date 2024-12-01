import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    if (this.email && this.password) {
      // Placeholder for real authentication logic
      console.log(`Logged in with email: ${this.email}`);
      this.router.navigate(['/tabs']); // Navigate to main app after login
    } else {
      alert('Please fill in all fields.');
    }
  }
}
