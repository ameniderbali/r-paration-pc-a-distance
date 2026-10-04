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
  repairId!: number;

  constructor(private repairService: RepairService, private router: Router) {}

  ngOnInit(): void {
    const id = localStorage.getItem('repairId');
    this.repairId = id ? +id : 0;

    if (!this.repairId) {
      alert('Aucune réparation sélectionnée !');
      this.router.navigate(['/']); // retourne à la page principale si pas d'id
      return;
    }

    console.log('Repair ID:', this.repairId);
  }

  submitRemote() {
    if (!this.repairId) {
      alert('ID de réparation manquant !');
      return;
    }
    // ✅ Validation ID TeamViewer/AnyDesk
  const idRegex = /^\d{6,12}$/; // uniquement chiffres, 6 à 12 caractères
  if (!this.teamviewerId || !idRegex.test(this.teamviewerId)) {
    alert('ID TeamViewer/AnyDesk invalide (6 à 12 chiffres).');
    return;
  }

  // ✅ Validation mot de passe
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

    // ✅ Ici : subscribe avec 2 arguments au lieu d'objet
    this.repairService.updateRemoteAccess(this.repairId, data)
      .subscribe(
        (res: any) => {   // utiliser 'any' pour éviter le problème de typage
          alert('Accès distant envoyé avec succès');
          console.log(res);
          localStorage.removeItem('repairId');
          this.router.navigate(['/']); // retour à la page principale si besoin
        },
        (err: any) => {
          console.error(err);
          alert('Erreur lors de l’envoi du remote access');
        }
      );
  }
  
}
