import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'OpenIdDict_Angular';
  isLoggedIn = false;

  constructor(private authService: AuthService) {
    this.authService
      .isLoggedIn()
      .then((loggedIn) => (this.isLoggedIn = loggedIn));
  }

  login(): void {
    this.authService.login();
  }

  logout(): void {
    this.authService.logout();
  }
}
