import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomecommonService {
  isLoggedIn = signal(false);
  userEmail = signal<string | null>(null);
  private url = 'http://localhost:3000/app/';

  constructor(private http: HttpClient, private router: Router) {
    this.checkLoginOnStartup();
  }

  login(email: string, password: string) {
    return this.http.post<any>(this.url + 'login', { email, password }).pipe(
      tap((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
        }
        this.isLoggedIn.set(true);
        this.userEmail.set(res.user?.email || email);
      })
    );
  }

  signup(email: string, password: string) {
    return this.http.post<any>(this.url + 'signup', { email, password, methodName: 'auth-signUp' }).pipe(
      tap((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
        }
        this.isLoggedIn.set(true);
        this.userEmail.set(res.user?.email || email);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn.set(false);
    this.userEmail.set(null);
    this.router.navigate(['/']);
  }

  getToken(): string | null {
    return localStorage.getItem('token'); // ✅ Fixed typo
  }

  private checkLoginOnStartup() {
    const token = this.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.userEmail.set(payload.email || null);
        this.isLoggedIn.set(true);
      } catch {
        // Invalid token
        this.logout();
      }
    }
  }
}