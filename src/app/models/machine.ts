export interface Machine {
  id: string;
  name: string;
  location: string;
  status: MachineStatus;
}

export enum MachineStatus {
  Operating = 'operando',
  Maintenance = 'parada para manutenção',
  Shutdown = 'desligada'
}

export interface CreateMachineDto {
  name: string;
  location: string;
  status: MachineStatus;
}