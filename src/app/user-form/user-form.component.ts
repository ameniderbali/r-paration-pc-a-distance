import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
    private repairService: RepairService
  ) {}

  submitForm() {
      const lowerProblem = this.problem.toLowerCase();

  // ✅ Validation du nom
  if (!this.name.trim()) {
    alert('Le nom est obligatoire.');
    return;
  }

  // ✅ Validation de l'email avec regex simple
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(this.email)) {
    alert('Veuillez entrer un email valide.');
    return;
  }

  // ✅ Validation du téléphone (10 chiffres)
  const phoneRegex = /^\d{8}$/;
  if (!phoneRegex.test(this.phone)) {
    alert('Le numéro de téléphone doit contenir 8 chiffres.');
    return;
  }

  // ✅ Validation problème interne interdit
  const forbiddenProblems = ['disque dur', 'pc mort'];
  if (forbiddenProblems.some(word => lowerProblem.includes(word))) {
    alert('Problème interne : Impossible de réparer à distance.');
    return;
  }

  // ✅ Validation problème : longueur minimale et mots interdits
  if (this.problem.length < 5) {
    alert('Le problème doit contenir au moins 5 caractères.');
    return;
  }
  const forbiddenWords = ['pirate', 'virus dangereux', 'hack'];
  if (forbiddenWords.some(word => lowerProblem.includes(word))) {
    alert('Le problème contient des mots interdits.');
    return;
  }


    // Créer l'objet Repair
    const newRepair: Repair = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      problem: this.problem
    };

    // Envoyer au backend
    this.repairService.createRepair(newRepair).subscribe({
      next: (res: any) => {
        alert('Réparation créée avec succès !');

        // ✅ Stocker l'id dans localStorage
        localStorage.setItem('repairId', res.id!.toString());

        // Naviguer vers le composant RemoteAccess
        this.router.navigate(['/remote']);
      },
      error: (err) => {
        console.error(err);
        alert('Erreur lors de la création de la réparation.');
      }
    });
  }
}
