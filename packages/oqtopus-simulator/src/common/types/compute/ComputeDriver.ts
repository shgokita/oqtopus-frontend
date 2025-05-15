import { ExpectationValueElement } from '../../ResultParameter';
import {
  CircuitInformation,
  GatePosition,
  ObservableInformation,
} from '../../UIClient';
import { Complex } from './Complex';

export interface GetStateVectorWithExpectationValueRequest {
  circuitInfo: CircuitInformation;
  observableInfo: ObservableInformation;
}

export interface GetStateVectorWithExpectationValueResult {
  stateVector: Complex[];
  expectationValue: number;
}

export interface GetExpectationValueMapRequest {
  circuitInfo: CircuitInformation;
  observableInfo: ObservableInformation;
  position: GatePosition;
  steps: number;
  parametricRange: number;
}

export interface GetExpectationValueMapResult {
  expectationValueMap: ExpectationValueElement[];
}

export interface RunShotTaskRequest {
  circuitInfo: CircuitInformation;
  shot: number;
}

export interface RunShotTaskResult {
  resultMap: number[];
}

/**
 * シミュレータの実体
 */
export abstract class ComputeDriver {
  abstract getStateVectorWithExpectationValue(
    request: GetStateVectorWithExpectationValueRequest
  ): GetStateVectorWithExpectationValueResult;
  abstract getExpectationValueMap(
    request: GetExpectationValueMapRequest
  ): GetExpectationValueMapResult;
  abstract runShotTask(request: RunShotTaskRequest): RunShotTaskResult;
}
