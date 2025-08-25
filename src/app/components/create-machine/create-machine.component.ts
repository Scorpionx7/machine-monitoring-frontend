import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-create-machine',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule
  ],
  template: `
    <div class="create-machine-container">
      <div class="header">
        <h1>
          <mat-icon>add_circle</mat-icon>
          Cadastrar Nova Máquina
        </h1>
        <button mat-stroked-button routerLink="/dashboard">
          <mat-icon>arrow_back</mat-icon>
          Voltar para Dashboard
        </button>
      </div>

      <mat-card class="form-card">
        <mat-card-content>
          <form class="machine-form">
            <div class="form-row">
              <mat-form-field appearance="outline" class="form-field">
                <mat-label>Nome da Máquina</mat-label>
                <input matInput placeholder="Ex: Escavadeira Hidráulica">
                <mat-icon matSuffix>badge</mat-icon>
              </mat-form-field>

              <mat-form-field appearance="outline" class="form-field">
                <mat-label>Localização</mat-label>
                <input matInput placeholder="Ex: Área de Mineração - Setor B">
                <mat-icon matSuffix>location_on</mat-icon>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline" class="form-field">
                <mat-label>Status</mat-label>
                <mat-select>
                  <mat-option value="operando">Operando</mat-option>
                  <mat-option value="manutencao">Parada para Manutenção</mat-option>
                  <mat-option value="desligada">Desligada</mat-option>
                </mat-select>
                <mat-icon matSuffix>speed</mat-icon>
              </mat-form-field>
            </div>
          </form>
        </mat-card-content>

        <mat-card-actions>
          <button mat-button routerLink="/dashboard">Cancelar</button>
          <button mat-raised-button color="primary">
            <mat-icon>save</mat-icon>
            Cadastrar Máquina
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styleUrls: ['./create-machine.component.scss']
})
export class CreateMachineComponent {}