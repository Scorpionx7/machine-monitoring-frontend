import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
  template: `
    <div class="dashboard-container">
      <div class="dashboard-header">
        <h1 class="dashboard-title">
          <mat-icon>dashboard</mat-icon>
          Dashboard de Máquinas
        </h1>
      </div>
      
      <div class="filters-section">
        <h3>Filtrar por Status:</h3>
        <div class="filter-buttons">
          <button mat-raised-button color="primary">Todas</button>
          <button mat-stroked-button>Operando</button>
          <button mat-stroked-button>Manutenção</button>
          <button mat-stroked-button>Desligadas</button>
        </div>
      </div>

      <div class="machines-grid">
        <!-- Card de exemplo - depois substitua com dados reais -->
        <mat-card class="machine-card">
          <mat-card-header>
            <mat-card-title>Escavadeira Hidráulica</mat-card-title>
            <mat-card-subtitle>ID: EXC-001</mat-card-subtitle>
          </mat-card-header>
          
          <mat-card-content>
            <div class="machine-info">
              <div class="info-item">
                <mat-icon>location_on</mat-icon>
                <span>Área de Mineração - Setor B</span>
              </div>
              <div class="info-item">
                <mat-icon>speed</mat-icon>
                <span>Status: </span>
                <mat-chip color="primary" selected>Operando</mat-chip>
              </div>
            </div>
          </mat-card-content>
          
          <mat-card-actions>
            <button mat-button color="primary" routerLink="/machine-details/1">
              <mat-icon>visibility</mat-icon>
              Ver Detalhes
            </button>
          </mat-card-actions>
        </mat-card>

        <mat-card class="machine-card">
          <mat-card-header>
            <mat-card-title>Betoneira</mat-card-title>
            <mat-card-subtitle>ID: BET-002</mat-card-subtitle>
          </mat-card-header>
          
          <mat-card-content>
            <div class="machine-info">
              <div class="info-item">
                <mat-icon>location_on</mat-icon>
                <span>Obra Central - Andar 3</span>
              </div>
              <div class="info-item">
                <mat-icon>build</mat-icon>
                <span>Status: </span>
                <mat-chip color="accent" selected>Manutenção</mat-chip>
              </div>
            </div>
          </mat-card-content>
          
          <mat-card-actions>
            <button mat-button color="primary" routerLink="/machine-details/2">
              <mat-icon>visibility</mat-icon>
              Ver Detalhes
            </button>
          </mat-card-actions>
        </mat-card>
      </div>

      <div class="empty-state" *ngIf="false"> <!-- Alterar para *ngIf="machines.length === 0" -->
        <mat-icon class="empty-icon">construction</mat-icon>
        <h3>Nenhuma máquina encontrada</h3>
        <p>Cadastre a primeira máquina para começar o monitoramento</p>
        <button mat-raised-button color="primary" routerLink="/create-machine">
          <mat-icon>add</mat-icon>
          Cadastrar Máquina
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  ngOnInit() {
    // Aqui você vai carregar as máquinas do serviço
  }
}