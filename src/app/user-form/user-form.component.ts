import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { RepairService, Repair } from '../services/repair.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  name = '';
  email = '';
  phone = '';
  problem = '';

  constructor(
    private router: Router,
    private repairService: RepairService,
    auth: AuthService
  ) {
    this.name = auth.user?.fullName ?? '';
    this.email = auth.user?.email ?? '';
  }

  submitForm() {
    const lowerProblem = this.problem.toLowerCase();

    if (!this.name.trim()) {
      alert('Le nom est obligatoire.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      alert('Veuillez entrer un email valide.');
      return;
    }

    // 8 digits
    const phoneRegex = /^\d{8}$/;
    if (!phoneRegex.test(this.phone)) {
      alert('Le numéro de téléphone doit contenir 8 chiffres.');
      return;
    }

    const forbiddenProblems = ['disque dur', 'pc mort'];
    if (forbiddenProblems.some(word => lowerProblem.includes(word))) {
      alert('Problème interne : Impossible de réparer à distance.');
      return;
    }

    if (this.problem.length < 5) {
      alert('Le problème doit contenir au moins 5 caractères.');
      return;
    }

    const forbiddenWords = ['pirate', 'virus dangereux', 'hack'];
    if (forbiddenWords.some(word => lowerProblem.includes(word))) {
      alert('Le problème contient des mots interdits.');
      return;
    }

    const newRepair: Repair = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      problem: this.problem
    };

    this.repairService.createRepair(newRepair).subscribe({
      next: (res: Repair) => {
        if (res.id == null) {
          alert('La réparation a été créée, mais aucun identifiant n’a été retourné.');
          return;
        }

        alert('Réparation créée avec succès !');
        localStorage.setItem('repairId', String(res.id));
        this.router.navigate(['/remote']);
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        if (err.status === 401) {
          alert('Votre session a expiré. Reconnectez-vous avec un compte client.');
        } else if (err.status === 403) {
          alert('La création de demandes est réservée aux comptes Client ou Admin. Connectez-vous avec un compte client.');
        } else if (err.status === 0) {
          alert('Impossible de joindre le serveur. Vérifiez que le backend est démarré.');
        } else {
          alert(`Erreur lors de la création de la réparation (HTTP ${err.status}).`);
        }
      }
    });
  }
}