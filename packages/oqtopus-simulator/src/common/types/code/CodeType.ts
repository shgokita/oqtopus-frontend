/**
 * コードの種別
 * コードは量子回路とその測定に用いるオブザーバブルを含む
 */
export const TranslateCodeType = {
  Qulacs: 'qulacs',
  Qiskit: 'qiskit',
  Pennylane: 'pennylane',
} as const;
export type TranslateCodeType =
  (typeof TranslateCodeType)[keyof typeof TranslateCodeType];

/**
 * 量子回路コードの種別
 */
export const CircuitCodeType = {
  Qasm2: 'qasm2',
  Qasm3: 'qasm3'
} as const;
export type CircuitCodeType =
  (typeof CircuitCodeType)[keyof typeof CircuitCodeType];

/**
 * オブザーバブルコードの種別
 */
export const ObservableCodeType = {
  OpenFermion: 'openFermion',
} as const;
export type ObservableCodeType =
  (typeof ObservableCodeType)[keyof typeof ObservableCodeType];
