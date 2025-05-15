import type {
  MultiQuantumGate,
  ParametricQuantumGate,
  SingleQuantumGate,
  UtilCircuitElement,
} from 'oqtopus-simulator/src/common/types/circuit/QuantumGate';
import type {
  MultiGateType,
  ParametricSingleGateType,
  SingleGateType,
  UtilCircuitElementType,
} from 'oqtopus-simulator/src/common/types/circuit/QuantumGateType';
import type { ControlQubitGate } from '../types/Gate';

export const GateTypeMap = {
  x: 'X',
  y: 'Y',
  z: 'Z',
  h: 'H',
  t: 'T',
  s: 'S',
  rx: 'RX',
  ry: 'RY',
  rz: 'RZ',
  cnot: 'CNOT',
  ccnot: 'CCNOT',
  empty: 'EMPTY',
  identity: 'Identity',
} as const;

export const EmptyGateType = {
  EMPTY: {
    type: 'empty',
    size: 1,
  },
} as const;

export const ControlQubitGateType: {
  CONTROL_QUBIT: ControlQubitGate;
} = {
  CONTROL_QUBIT: {
    type: 'control_qubit',
    connectedMultiGate: {
      type: 'cnot',
      position: [0, 0],
    },
    size: 1,
  },
};

export const ObservableSingleGateTypes = {
  Identity: {
    type: 'identity',
    size: 1,
  },
  X: {
    type: 'x',
    size: 1,
  },
  Y: {
    type: 'y',
    size: 1,
  },
  Z: {
    type: 'z',
    size: 1,
  },
} as const;

export const SingleGateTypes: Record<
  keyof typeof SingleGateType,
  SingleQuantumGate
> = {
  ...ObservableSingleGateTypes,
  H: {
    type: 'h',
    size: 1,
  },
  T: {
    type: 't',
    size: 1,
  },
  S: {
    type: 's',
    size: 1,
  },
};

export const ParametricSingleGateTypes: Record<
  keyof typeof ParametricSingleGateType,
  ParametricQuantumGate
> = {
  RX: {
    type: 'rx',
    param: 0,
    size: 1,
  },
  RY: {
    type: 'ry',
    param: 0,
    size: 1,
  },
  RZ: {
    type: 'rz',
    param: 0,
    size: 1,
  },
};

export const MultiGateTypes: Record<
  keyof typeof MultiGateType,
  MultiQuantumGate
> = {
  CNOT: {
    type: 'cnot',
    controllQubitIndex: [0],
    size: 2,
  },
  CCNOT: {
    type: 'ccnot',
    controllQubitIndex: [0],
    size: 3,
  },
};

export const UtilCircuitElementTypes: Record<
  keyof typeof UtilCircuitElementType,
  UtilCircuitElement
> = {
  BarrierAllQubit: {
    type: 'barrierallqubit',
    size: 1,
  },
};

export const ObservableGateTypes = {
  ...EmptyGateType,
  ...ObservableSingleGateTypes,
};

export const QuantumGateTypes = {
  ...EmptyGateType,
  ...ControlQubitGateType,
  ...SingleGateTypes,
  ...ParametricSingleGateTypes,
  ...MultiGateTypes,
  ...UtilCircuitElementTypes,
};
