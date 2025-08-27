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

console.log('Valores do Enum MachineStatus:', {
  Operating: MachineStatus.Operating,
  Maintenance: MachineStatus.Maintenance,
  Shutdown: MachineStatus.Shutdown
});