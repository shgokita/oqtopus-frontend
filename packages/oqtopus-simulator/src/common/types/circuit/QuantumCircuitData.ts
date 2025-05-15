import { QuantumGate } from './QuantumGate';

/**
 * 量子回路に配置された量子ゲートの構造を表す型
 */
export type QuantumCircuitData = QuantumCircuitStep[];

/**
 * 量子回路に配置された量子ゲートの1ステップを表す型
 *
 * 量子ゲートが配置されていない箇所は undefined で表現される
 * この配列の長さは、表現される量子回路に含まれる量子ビットの合計と同じか、それ以下である
 */
export type QuantumCircuitStep = (QuantumGate | undefined)[];
