import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { MachineService } from '../../services/machine.service';
import { Machine, MachineStatus } from '../../models/machine';

@Component({
  selector: 'app-edit-machine',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './edit-machine.component.html',
  styleUrls: ['./edit-machine.component.scss']
})
export class EditMachineComponent implements OnInit {
  machineForm: FormGroup;
  isLoading = false;
  machineId: string = '';
  
  statusOptions = [
    { value: 'operando', label: 'Operando' },
    { value: 'ParadaManutencao', label: 'Parada para Manutenção' },
    { value: 'desligada', label: 'Desligada' }
  ];

  constructor(
    private fb: FormBuilder,
    private machineService: MachineService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.machineForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      location: ['', [Validators.required, Validators.minLength(5)]],
      status: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.machineId = this.route.snapshot.paramMap.get('id') || '';
    
    if (this.machineId) {
      this.loadMachineData();

      this.machineForm.get('name')?.disable();
    }
  }

  loadMachineData(): void {
    this.isLoading = true;
    this.machineService.getMachineById(this.machineId).subscribe({
      next: (machine) => {
        this.machineForm.patchValue({
          name: machine.name,
          location: machine.location,
          status: machine.status
        });
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading machine:', error);
        this.snackBar.open('Erro ao carregar máquina.', 'Fechar', { duration: 5000 });
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
  if (this.machineForm.valid && this.machineId) {
    this.isLoading = true;

    const telemetryData = {
      location: this.machineForm.value.location,
      status: this.machineForm.value.status
    };
    
    this.machineService.updateMachineTelemetry(this.machineId, telemetryData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.snackBar.open('Telemetria da máquina atualizada com sucesso!', 'Fechar', {
          duration: 3000,
        });
        this.router.navigate(['/machine-details', this.machineId]);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error updating machine telemetry:', error);
        this.snackBar.open('Erro ao atualizar telemetria. Tente novamente.', 'Fechar', {
          duration: 5000,
        });
      }
    });
  }
}

  get name() { return this.machineForm.get('name'); }
  get location() { return this.machineForm.get('location'); }
  get status() { return this.machineForm.get('status'); }
}