import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Machine, CreateMachineDto, MachineStatus } from '../models/machine';

@Injectable({
  providedIn: 'root'
})
export class MachineService {
  private apiUrl = 'https://localhost:7256/api'; 

  constructor(private http: HttpClient) { }

  getMachines(): Observable<Machine[]> {
    return this.http.get<Machine[]>(`${this.apiUrl}/Machines`);
  }

  getMachineById(id: string): Observable<Machine> {
    return this.http.get<Machine>(`${this.apiUrl}/Machines/${id}`);
  }

  createMachine(machine: CreateMachineDto): Observable<Machine> {
    return this.http.post<Machine>(`${this.apiUrl}/Machines`, machine);
  }
  
  updateMachine(id: string, machine: Partial<Machine>): Observable<Machine> {
    return this.http.put<Machine>(`${this.apiUrl}/Machines/${id}`, machine);
  }

  updateMachineTelemetry(id: string, telemetry: Partial<Machine>): Observable<any> {
    return this.http.patch(`${this.apiUrl}/Machines/${id}/telemetry`, telemetry);
  }

  getMachinesByStatus(status: MachineStatus): Observable<Machine[]> {
    return this.http.get<Machine[]>(`${this.apiUrl}/Machines?status=${status}`);
  }
}