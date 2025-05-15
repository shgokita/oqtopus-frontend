import type { MultiGateType } from 'oqtopus-simulator/src/common/types/circuit/QuantumGateType';
import type {
  ObservableGateTypes,
  QuantumGateTypes,
  UtilCircuitElementTypes,
} from '@/constants/GateType';
import type { Position } from '@/types/Position';

export type ControlQubitGate = {
  type: 'control_qubit';
  size: number;
  connectedMultiGate: {
    type: MultiGateType;
    position: Position;
  };
};

export type BarrierGate = (typeof UtilCircuitElementTypes)['BarrierAllQubit'];

export type CircuitGateType = QuantumGateItem['item'];
export type ObservableGateType = ObservableGateItem['item'];

export type GateItemBased<T extends CircuitGateType | ObservableGateType> = {
  id: string;
  item: T;
};

export type QuantumGateItem = GateItemBased<
  (typeof QuantumGateTypes)[keyof typeof QuantumGateTypes]
>;

export type ObservableGateItem = GateItemBased<
  (typeof ObservableGateTypes)[keyof typeof ObservableGateTypes]
>;
