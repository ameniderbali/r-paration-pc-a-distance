import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RepairService, Repair } from '../services/repair.service';

@Component({
  selector: 'app-remote-access',
  templateUrl: './remote-access.component.html',
  styleUrls: ['./remote-access.component.css']
})
export class RemoteAccessComponent implements OnInit {

  teamviewerId = '';
  teamviewerPassword = '';
  repairIdInput = '';
  repairId = 0;

  constructor(private repairService: RepairService, private router: Router) {}

  ngOnInit(): void {
    const savedId = localStorage.getItem('repairId');
    if (savedId) {
      this.repairId = Number(savedId);
      this.repairIdInput = savedId;
    }

    console.log('Repair ID:', this.repairId || 'not set');
  }

  submitRemote() {
    const enteredId = Number(this.repairIdInput);
    this.repairId = enteredId || this.repairId;

    if (!this.repairId) {
      alert('ID de réparation manquant. Entrez un identifiant valide.');
      return;
    }

    localStorage.setItem('repairId', String(this.repairId));

    const idRegex = /^\d{6,12}$/;
    if (!this.teamviewerId || !idRegex.test(this.teamviewerId)) {
      alert('ID TeamViewer/AnyDesk invalide (6 à 12 chiffres).');
      return;
    }

    if (!this.teamviewerPassword) {
      alert('Le mot de passe est obligatoire.');
      return;
    }
    if (this.teamviewerPassword.length < 4 || this.teamviewerPassword.length > 20) {
      alert('Le mot de passe doit contenir entre 4 et 20 caractères.');
      return;
    }
    if (/\s/.test(this.teamviewerPassword)) {
      alert('Le mot de passe ne doit pas contenir d’espaces.');
      return;
    }

    const data = {
      teamviewerId: this.teamviewerId,
      teamviewerPassword: this.teamviewerPassword
    };

    this.repairService.updateRemoteAccess(this.repairId, data)
      .subscribe({
        next: (res: any) => {
          alert('Accès distant envoyé avec succès');
          console.log(res);
          localStorage.removeItem('repairId');
          this.router.navigate(['/new-request']);
        },
        error: (err: any) => {
          console.error(err);
          alert('Erreur lors de l’envoi du remote access');
        }
      });
  }
}
