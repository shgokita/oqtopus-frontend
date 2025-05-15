import { ObservableGateType } from './ObservableGateType';

/**
 * The type representing the strcuture of observables
 */
export type ObservableData = ObservableStep[];

/**
 * One step of observables
 */
export type ObservableStep = {
  /**
   * The list of Pauli operators
   *
   * 演算子を適用しない量子ビットの項は undefined で表現される。
   *
   * この配列の長さは、表現される量子回路に含まれる量子ビットの合計と同じか、それ以下である。
   * よって、同時に扱われる QuantumCircuitStep の長さと同じか、それ以下である。
   */
  operators: (ObservableGateType | undefined)[];

  /**
   * このステップにかかる実数の係数
   */
  coefficient: number;
};
