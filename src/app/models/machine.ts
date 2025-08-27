export interface Machine {
  id: string;
  name: string;
  location: string;
  status: MachineStatus;
}

export enum MachineStatus {
  Operating = 'operando',
  Maintenance = 'ParadaManutencao',
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