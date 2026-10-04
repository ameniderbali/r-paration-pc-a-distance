import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, Role } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  mode: 'login' | 'register' = 'login';
  error = '';
  info = '';
  fullName = '';
  email = '';
  password = '';
  role: Role = 'CLIENT';

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {}

  toggle() {
    this.mode = this.mode === 'login' ? 'register' : 'login';
    this.error = '';
    this.info = '';
  }

  submit() {
    this.error = '';
    this.info = '';
    if (this.mode === 'login') {
      this.auth.login(this.email, this.password).subscribe({
        next: res => {
          const back = this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigateByUrl(back ?? (res.role === 'CLIENT' ? '/new-request' : '/dashboard'));
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 0) {
            this.error = 'Impossible de joindre le serveur. Vérifiez que le backend est démarré.';
          } else if (err.status === 401) {
            this.error = 'Email ou mot de passe invalide. Si vous n’avez pas encore créé de compte, inscrivez-vous d’abord.';
          } else {
            this.error = `Échec de la connexion (HTTP ${err.status}). Réessayez ou contactez le support.`;
          }
        }
      });
    } else {
      this.auth.register(this.fullName, this.email, this.password, this.role).subscribe({
        next: () => { this.info = 'Compte créé, connecte-toi'; this.mode = 'login'; },
        error: e => {
          if (e.status === 409) {
            this.error = 'Email déjà utilisé';
          } else if (e.status === 0) {
            this.error = 'Impossible de joindre le serveur. Vérifiez que le backend est démarré et que son adresse CORS autorise cette page.';
          } else if (e.status === 403) {
            this.error = "L'inscription avec ce rôle n'est pas autorisée.";
          } else {
            this.error = "Échec de l'inscription";
          }
        }
      });
    }
  }
}
