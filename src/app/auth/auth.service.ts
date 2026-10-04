import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

export type Role = 'CLIENT' | 'TECHNICIAN' | 'ADMIN';

export interface AuthResponse {
  token: string;
  email: string;
  fullName: string;
  role: Role;
}

const KEY = 'auth_session';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'http://localhost:8080/auth';
  private session: AuthResponse | null = this.load();

  constructor(private http: HttpClient, private router: Router) {}

  get user() { return this.session; }
  get token() { return this.session?.token ?? null; }
  get role() { return this.session?.role ?? null; }
  get isLoggedIn() { return this.session !== null; }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>(`${this.api}/login`, { email, password })
      .pipe(tap(res => this.save(res)));
  }

  register(fullName: string, email: string, password: string, role: Role) {
    return this.http.post(`${this.api}/register`,
      { fullName, email, password, role }, { responseType: 'text' });
  }

  hasRole(...roles: Role[]): boolean {
    return this.role !== null && roles.includes(this.role);
  }

  logout() {
    localStorage.removeItem(KEY);
    this.session = null;
    this.router.navigate(['/login']);
  }

  private save(res: AuthResponse) {
    localStorage.setItem(KEY, JSON.stringify(res));
    this.session = res;
  }

  private load(): AuthResponse | null {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }
}