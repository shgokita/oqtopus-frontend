import {
  QuantumGateType,
  SingleGateType,
  ParametricSingleGateType,
  MultiGateType,
  UtilCircuitElementType,
} from './QuantumGateType';

/**
 * 量子ゲートの基底型
 */
export type QuantumGateBase = {
  /**
   * 量子ゲートの種類
   */
  type: QuantumGateType;

  /**
   * 量子ゲートが量子回路上と交絡する箇所の数
   */
  size: number;
};

/**
 * 単一量子ビットに作用するゲート型
 */
export type SingleQuantumGate = QuantumGateBase & {
  type: SingleGateType;
};

/**
 * 単一量子ビットに作用するパラメータ付きゲート型
 */
export type ParametricQuantumGate = QuantumGateBase & {
  type: ParametricSingleGateType;

  /**
   * 量子ゲートのパラメータ（回転角）
   *
   * 0~1の実数であり、この値に円周率PIをかけた値を表現する
   */
  param: number;
};

/**
 * 複数量子ビットに作用するゲート型
 */
export type MultiQuantumGate = QuantumGateBase & {
  type: MultiGateType;

  /**
   * 制御量子ビットの番号
   *
   * 同じ QuantumCircuitStep 上の、自分以外の量子ビットのindexを指定する
   *
   * このプロパティは length > 0 である
   */
  controllQubitIndex: number[];
};

/**
 * 量子ゲート以外の量子回路に乗せられる要素
 */
export type UtilCircuitElement = QuantumGateBase & {
  type: UtilCircuitElementType;
};

/**
 * 任意の量子ゲートを表す型
 */
export type QuantumGate =
  | SingleQuantumGate
  | ParametricQuantumGate
  | MultiQuantumGate
  | UtilCircuitElement;
