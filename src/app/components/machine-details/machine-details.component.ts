import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Machine, MachineStatus } from '../../models/machine';
import { MachineService } from '../../services/machine.service';

@Component({
  selector: 'app-machine-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './machine-details.component.html',
  styleUrls: ['./machine-details.component.scss']
})
export class MachineDetailsComponent implements OnInit {
  machine: Machine | null = null;
  isLoading = true;
  error: string | null = null;
  today = new Date();

  constructor(
    private route: ActivatedRoute,
    private machineService: MachineService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadMachineDetails(id);
    } else {
      this.error = 'ID da máquina não especificado';
      this.isLoading = false;
    }
  }

  loadMachineDetails(id: string): void {
    this.isLoading = true;
    this.machineService.getMachineById(id).subscribe({
      next: (machine) => {
        this.machine = machine;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading machine details:', error);
        this.error = 'Erro ao carregar detalhes da máquina';
        this.isLoading = false;
      }
    });
  }

  getStatusColor(status: MachineStatus): string {
    switch (status) {
      case MachineStatus.Operating:
        return 'primary';
      case MachineStatus.Maintenance:
        return 'accent';
      case MachineStatus.Shutdown:
        return 'warn';
      default:
        return '';
    }
  }

  getStatusText(status: MachineStatus): string {
    switch (status) {
      case MachineStatus.Operating:
        return 'Operando';
      case MachineStatus.Maintenance:
        return 'Manutenção';
      case MachineStatus.Shutdown:
        return 'Desligada';
      default:
        return status;
    }
  }
}