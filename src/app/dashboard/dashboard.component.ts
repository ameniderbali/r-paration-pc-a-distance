import { Component, OnInit } from '@angular/core';
import { RepairService, Repair } from '../services/repair.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  repairs: Repair[] = [];
  isLoading = false;
  loadError = '';

  constructor(private repairService: RepairService) {}

  ngOnInit(): void {
    this.loadRepairs();
  }

  loadRepairs(): void {
    this.isLoading = true;
    this.loadError = '';

    this.repairService.getRepairs().subscribe({
      next: (data) => {
        this.repairs = data;
        this.isLoading = false;
      },
      error: (err: unknown) => {
        console.error('Erreur GET repairs:', err);
        this.loadError = 'Impossible de charger les réparations. Vérifiez la connexion au serveur et votre session.';
        this.isLoading = false;
      }
    });
  }

  changeStatus(id?: number) {
    if (!id) return;
    this.repairService.updateStatus(id).subscribe({
      next: () => this.loadRepairs(),
      error: (err: unknown) => {
        console.error('Erreur update status:', err);
        alert('Impossible de changer le status');
      }
    });
  }

  deleteRepair(id?: number) {
    if (!id) return;
    this.repairService.deleteRepair(id).subscribe({
      next: () => this.loadRepairs(),
      error: (err: unknown) => {
        console.error('Erreur delete repair:', err);
        alert('Impossible de supprimer la réparation');
      }
    });
  }
}
