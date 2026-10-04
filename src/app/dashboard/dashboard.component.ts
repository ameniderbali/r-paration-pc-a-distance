import { Component, OnInit } from '@angular/core';
import { RepairService, Repair } from '../services/repair.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  repairs: Repair[] = [];
  

  constructor(private repairService: RepairService) {}

  ngOnInit(): void {
    this.loadRepairs();
  }

  loadRepairs() {
    this.repairService.getRepairs().subscribe({
      next: (data) => {
        console.log('Repairs loaded:', data); // debug
        this.repairs = data;
      },
      error: (err:any) => {
        console.error('Erreur GET repairs:', err);
        alert('Erreur lors du chargement des réparations');
      }
    });
  }

  changeStatus(id?: number) {
    if (!id) return;
    this.repairService.updateStatus(id).subscribe({
      next: () => this.loadRepairs(),
      error: (err:any) => {
        console.error('Erreur update status:', err);
        alert('Impossible de changer le status');
      }
    });
  }

  deleteRepair(id?: number) {
    if (!id) return;
    this.repairService.deleteRepair(id).subscribe({
      next: () => this.loadRepairs(),
      error: (err:any) => {
        console.error('Erreur delete repair:', err);
        alert('Impossible de supprimer la réparation');
      }
    });
  }
}
