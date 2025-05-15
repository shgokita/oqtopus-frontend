import type {
  MultiQuantumGate,
  ParametricQuantumGate,
  QuantumGate,
} from 'oqtopus-simulator/src/common/types/circuit/QuantumGate';
import type { MultiGateType } from 'oqtopus-simulator/src/common/types/circuit/QuantumGateType';
import { nanoid } from 'nanoid';
import { DEFAULT_GATE_ITEMS_ROW_LENGTH } from '../constants/Gate';
import { ControlQubitGateType, QuantumGateTypes } from '../constants/GateType';
import type {
  BarrierGate,
  CircuitGateType,
  ControlQubitGate,
  GateItemBased,
  ObservableGateType,
  QuantumGateItem,
} from '../types/Gate';

export const isGateEmpty = (
  gate: CircuitGateType | ObservableGateType
): boolean => gate.type === 'empty';

export const isGateIdentity = (gate: ObservableGateType): boolean =>
  gate.type === 'identity';

export const isGateParametric = (
  gate: CircuitGateType
): gate is ParametricQuantumGate =>
  gate.type === 'rx' || gate.type === 'ry' || gate.type === 'rz';

export const isGateMulti = (gate: CircuitGateType): gate is MultiQuantumGate =>
  gate.type === 'cnot' || gate.type === 'ccnot';

export const isGateQubit = (gate: CircuitGateType): gate is ControlQubitGate =>
  gate.type === 'control_qubit';

export const isGateBarrier = (gate: CircuitGateType): gate is BarrierGate =>
  gate.type === 'barrierallqubit';

export const isGate = (
  gate: QuantumGateItem
): gate is GateItemBased<QuantumGate> => {
  return !isGateEmpty(gate.item) && gate.item.type !== 'control_qubit';
};

export const createQuantumGateItem = <
  T extends CircuitGateType | ObservableGateType,
>(
  item: T
): GateItemBased<T> => ({
  item,
  id: nanoid(),
});

export const createMultiGateItem = (
  type: MultiGateType,
  controllQubitIndex: MultiQuantumGate['controllQubitIndex']
): GateItemBased<MultiQuantumGate> => {
  const baseItem =
    type === 'cnot' ? QuantumGateTypes.CNOT : QuantumGateTypes.CCNOT;
  return createQuantumGateItem({ ...baseItem, controllQubitIndex });
};

export const createControlQubitGateItem = (
  connectedMultiGate: ControlQubitGate['connectedMultiGate']
): GateItemBased<ControlQubitGate> =>
  createQuantumGateItem({
    ...ControlQubitGateType.CONTROL_QUBIT,
    connectedMultiGate,
  });

export const createEmptyGateItems = (
  length = DEFAULT_GATE_ITEMS_ROW_LENGTH,
  type: typeof QuantumGateTypes.EMPTY = QuantumGateTypes.EMPTY
): GateItemBased<typeof QuantumGateTypes.EMPTY>[] =>
  new Array(length).fill('').map(() => createQuantumGateItem(type));
