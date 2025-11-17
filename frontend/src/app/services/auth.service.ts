import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { ApiService } from './api.service';
import { LoginRequest, RegisterRequest, JwtResponse, User } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private api: ApiService) {
    this.loadUserFromToken();
  }

  register(data: RegisterRequest): Observable<User> {
    return this.api.post<User>('/auth/register', data);
  }

  login(data: LoginRequest): Observable<JwtResponse> {
    return this.api.post<JwtResponse>('/auth/login', data).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        this.loadUserFromToken();
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return user?.role === 'ADMIN';
  }

  private loadUserFromToken(): void {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.currentUserSubject.next({
          id: payload.userId,
          email: payload.sub,
          fullName: payload.fullName || '',
          phone: payload.phone || '',
          role: payload.role
        });
      } catch (error) {
        console.error('Error parsing token:', error);
        this.logout();
      }
    }
  }
}
