import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { MachineService } from '../../services/machine.service';
import { MachineStatus } from '../../models/machine';

@Component({
  selector: 'app-create-machine',
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
  templateUrl: './create-machine.component.html',
  styleUrls: ['./create-machine.component.scss']
})
export class CreateMachineComponent {
  machineForm: FormGroup;
  isLoading = false;
  
  
  statusOptions = [
    { value: 'operando', label: 'Operando' },
    { value: 'ParadaManutencao', label: 'Parada para Manutenção' },
    { value: 'desligada', label: 'Desligada' }
  ];

  constructor(
    private fb: FormBuilder,
    private machineService: MachineService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.machineForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      location: ['', [Validators.required, Validators.minLength(5)]],
      status: ['desligada', Validators.required] 
    });
  }

  onSubmit(): void {
    if (this.machineForm.valid) {
      this.isLoading = true;
      console.log('Dados do formulário:', this.machineForm.value);
      
      this.machineService.createMachine(this.machineForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.snackBar.open('Máquina cadastrada com sucesso!', 'Fechar', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Error creating machine:', error);
          this.snackBar.open('Erro ao cadastrar máquina. Tente novamente.', 'Fechar', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      });
    } else {
      Object.keys(this.machineForm.controls).forEach(key => {
        this.machineForm.get(key)?.markAsTouched();
      });
    }
  }

  get name() { return this.machineForm.get('name'); }
  get location() { return this.machineForm.get('location'); }
  get status() { return this.machineForm.get('status'); }
}