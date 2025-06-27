import { GateCNOT, GateH, QuantumGate } from "./gates";

export interface QuantumCircuit {
  qubitNumber: Number;
  steps: Array<QuantumGate>;
}

