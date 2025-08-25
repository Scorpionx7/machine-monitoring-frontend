import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <mat-toolbar color="primary" class="toolbar">
      <mat-toolbar-row>
        <span class="toolbar-title">
          <mat-icon class="toolbar-icon">construction</mat-icon>
          Machine Monitoring
        </span>
        
        <nav class="nav-links">
          <a mat-button routerLink="/dashboard" routerLinkActive="active-link">
            <mat-icon>dashboard</mat-icon>
            Dashboard
          </a>
          <a mat-button routerLink="/create-machine" routerLinkActive="active-link">
            <mat-icon>add_circle</mat-icon>
            Nova Máquina
          </a>
        </nav>
      </mat-toolbar-row>
    </mat-toolbar>

    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Machine Monitoring';
}