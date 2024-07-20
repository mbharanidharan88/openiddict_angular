import { Injectable } from '@angular/core';
import { UserManager, UserManagerSettings, User } from 'oidc-client-ts';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userManager: UserManager;

  constructor() {
    const settings: UserManagerSettings = {
      authority: 'https://localhost:7151',
      client_id: 'eclatech_client_portal',
      redirect_uri: 'http://localhost:4200/callback',
      response_type: 'code',
      scope: 'openid eclatech_client_api offline_access',
      post_logout_redirect_uri: 'http://localhost:4200',
    };

    this.userManager = new UserManager(settings);

    this.userManager.events.addUserLoaded((user) => {
      console.log('User loaded', user);
    });

    this.userManager.events.addUserUnloaded(() => {
      console.log('User unloaded');
    });
  }

  login(): Promise<void> {
    return this.userManager.signinRedirect();
  }

  async completeAuthentication(): Promise<void> {
    await this.userManager.signinRedirectCallback();
  }

  logout(): Promise<void> {
    return this.userManager.signoutRedirect();
  }

  getUser(): Promise<User | null> {
    return this.userManager.getUser();
  }

  isLoggedIn(): Promise<boolean> {
    return this.getUser().then((user) => !!user && !user.expired);
  }
}
