import {
  CircuitCodeType,
  ObservableCodeType,
  TranslateCodeType,
} from './types/code/CodeType';
import { Complex } from './types/compute/Complex';

/**
 * シミュレーションの更新結果を返す型
 */
export interface UpdateResult {
  /**
   * 全ての回路ステップが終了した段階の状態ベクトル
   *
   * 複素確率振幅の分布(probability distribution)であり、配列で表現される。
   * 配列長は系の量子ビット数の二乗である。
   *
   * NOTE: 測定結果の利用を伴うフィードバックが含まれる量子回路を想定しない仕様である。
   * そのような回路構造は想定せず、表現・実装を保証しない
   */
  stateVector: Complex[];

  /**
   * 量子回路を評価した段階の状態ベクトルの、複素数要素について絶対値を取った配列
   *
   * 配列長は系の量子ビット数の二乗である。
   *
   * NOTE: UIClient外に量子ビットの実体を露出しないため、
   * 測定結果の利用を伴うフィードバックが含まれる量子回路を想定しない仕様である。
   * そのような回路構造は想定せず、表現・実装を保証しない
   */
  stateVectorAbsoluted: number[];

  /**
   * 量子回路を評価した段階の状態ベクトルの、複素数要素について偏角を取った配列
   *
   * 偏角はPIに対する係数を返す。配列の各要素のレンジは閉区間[0, 2]の実数である
   */
  stateVectorArgument: number[];

  /**
   * 量子回路を評価した段階の状態ベクトルの、複素数要素について絶対値の二乗を取った配列
   */
  probabilityVector: number[];

  /**
   * 与えられた量子回路のオブザーバブルを評価した期待値
   */
  expectationValue: number;

  /**
   * ソースコード
   */
  codes: {
    /**
     * フロントで表示するための量子回路とオブザーバブルのコード
     */
    translateCodes: TranslateCodes;

    /**
     * ダウンロード向けの量子回路コード
     */
    circuitCodes: CircuitCodes;

    /**
     * ダウンロード向けのオブザーバブルコード
     */
    observableCodes: ObservableCodes;
  };
}

/**
 * 指定されたパラメータ付き量子ゲートの期待値分布を返す型
 */
export interface ParametricExpectedValueResult {
  /**
   * 期待値分布の刻み数
   *
   * 100の場合、0~2PIを100パターンに分割して分布を得る。
   * リクエスト時の ParametricExpectedValueRequest#steps と同じ値である。
   */
  steps: number;

  /**
   * 期待値の分布
   *
   * この配列の length は steps に等しい
   */
  expectationValueMap: ExpectationValueElement[];
}

/**
 * パラメータを変化させたときの期待値分布の要素型
 */
export interface ExpectationValueElement {
  /**
   * 期待値の導出パラメータ
   */
  param: number;

  /**
   * そのパラメータにおける期待値
   */
  expectationValue: number;
}

/**
 * サンプリングの実行結果を返す型
 */
export interface ShotResult {
  /**
   * サンプリング実行結果
   *
   * 長さはタスク実行時に受け取っていたUIInformation#shotに等しい。
   * 各値は整数であり、そのサンプリング結果が何番目の基底に収束したかを表す。
   * 基底の並び順は複素確率分布のベクトル要素順序と同じである。
   *
   */
  samplingMap: number[];

  /**
   * samplingMapを基底ごとに数えた値をshot数で割り、サンプリング全体に対する個々の基底への収束比率を出したもの
   *
   * 配列長は系の量子ビット数の二乗である。
   */
  samplingProbabilityMap: number[];
}

/**
 * コード出力
 */
export type TranslateCodes = {
  [key in TranslateCodeType]: string;
};

export type CircuitCodes = {
  [key in CircuitCodeType]: string;
};

export type ObservableCodes = {
  [key in ObservableCodeType]: string;
};
