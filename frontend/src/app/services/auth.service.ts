import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = signal(false);
  private isAdminUser = signal(false);

  login(email: string, password: string): boolean {
    if (email === 'admin@noxa.com' && password === 'admin123') {
      this.isAuthenticated.set(true);
      this.isAdminUser.set(true);
      return true;
    }
    
    if (email && password) {
      this.isAuthenticated.set(true);
      this.isAdminUser.set(false);
      return true;
    }
    
    return false;
  }

  adminLogin(email: string, password: string): boolean {
    return this.login(email, password);
  }

  logout() {
    this.isAuthenticated.set(false);
    this.isAdminUser.set(false);
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated();
  }

  isAdmin(): boolean {
    return this.isAdminUser();
  }

  getToken(): string | null {
    return this.isAuthenticated() ? 'mock-jwt-token' : null;
  }
}