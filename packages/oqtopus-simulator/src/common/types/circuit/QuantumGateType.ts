/**
 * The type of one-qubit quantum gates
 */
export const SingleGateType = {
  Identity: 'identity',
  X: 'x',
  Y: 'y',
  Z: 'z',
  H: 'h',
  T: 't',
  S: 's',
} as const;
export type SingleGateType =
  (typeof SingleGateType)[keyof typeof SingleGateType];

/**
 * The type of parametric one-qubit quantum gates
 */
export const ParametricSingleGateType = {
  RX: 'rx',
  RY: 'ry',
  RZ: 'rz',
} as const;
export type ParametricSingleGateType =
  (typeof ParametricSingleGateType)[keyof typeof ParametricSingleGateType];

/**
 * The type of multi-qubits quantum gates
 */
export const MultiGateType = {
  CNOT: 'cnot',
  CCNOT: 'ccnot',
} as const;
export type MultiGateType = (typeof MultiGateType)[keyof typeof MultiGateType];

/**
 * The miscellaneous costituents of quantum circuits. 
 */
export const UtilCircuitElementType = {
  BarrierAllQubit: 'barrierallqubit'
} as const;
export type UtilCircuitElementType = typeof UtilCircuitElementType[keyof typeof UtilCircuitElementType];

/**
 * The type of quantum gates
 */
export const QuantumGateType = {
  ...SingleGateType,
  ...ParametricSingleGateType,
  ...MultiGateType,
  ...UtilCircuitElementType
};
export type QuantumGateType =
  | SingleGateType
  | ParametricSingleGateType
  | MultiGateType
  | UtilCircuitElementType;
