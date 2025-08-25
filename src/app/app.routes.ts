import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateMachineComponent } from './components/create-machine/create-machine.component';
import { MachineDetailsComponent } from './components/machine-details/machine-details.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'create-machine', component: CreateMachineComponent },
  { path: 'machine-details/:id', component: MachineDetailsComponent },
  { path: '**', redirectTo: '/dashboard' }
];