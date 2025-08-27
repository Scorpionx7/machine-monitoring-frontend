import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Machine, MachineStatus } from '../../models/machine';
import { MachineService } from '../../services/machine.service';

@Component({
  selector: 'app-dashboard',
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
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  machines: Machine[] = [];
  filteredMachines: Machine[] = [];
  selectedStatus: MachineStatus | 'all' = 'all';
  isLoading = true;
  statusEnum = MachineStatus;

  constructor(private machineService: MachineService) {}

  ngOnInit() {
    this.loadMachines();
  }

  loadMachines(): void {
    this.isLoading = true;
    this.machineService.getMachines().subscribe({
      next: (machines) => {
        this.machines = machines;
        this.filteredMachines = machines;
        this.isLoading = false;

      
      console.log('=== STATUS DAS MÁQUINAS ===');
      machines.forEach((machine, index) => {
        console.log(`Máquina ${index + 1}: ${machine.name} - Status: "${machine.status}"`);
      });
    },
    error: (error) => {
      console.error('Error loading machines:', error);
      this.isLoading = false;
    }
  });
}

  filterByStatus(status: MachineStatus | 'all'): void {
  console.log('Filtrando por status:', status);
  this.selectedStatus = status;
  
  if (status === 'all') {
    this.filteredMachines = this.machines;
  } else {
    this.filteredMachines = this.machines.filter(machine => {
     
      const machineStatusNormalized = machine.status.trim().toLowerCase();
      const filterStatusNormalized = status.trim().toLowerCase();
      
      console.log('Comparando:', `"${machineStatusNormalized}"`, 'com', `"${filterStatusNormalized}"`);
      
      return machineStatusNormalized === filterStatusNormalized;
    });
  }
  
  console.log('Máquinas filtradas:', this.filteredMachines.length);
  console.log('Máquinas:', this.filteredMachines);
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