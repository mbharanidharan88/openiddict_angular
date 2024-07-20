import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'OpenIdDict_Angular';
  isLoggedIn = false;

  constructor(private authService: AuthService) {

    console.info('app comp loading...')
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

  ngOnInit() {

  }
  
}
