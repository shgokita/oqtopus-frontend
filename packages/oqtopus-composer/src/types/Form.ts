import type {
  ParametricExpectedValueResult,
  ShotResult,
  UpdateResult,
} from 'oqtopus-simulator/src/common/ResultParameter';
import type { Complex } from 'oqtopus-simulator/src/common/types/compute/Complex';
import type { SimulatorResultForm, UIStateForm } from '@/constants/Form';
import type { CircuitGateItems } from '@/stores/circuitGateItemsState';
import type { ObservableGateItems } from '@/stores/observableGateItemsState';
import type { Position } from './Position';

export type StateVector = Complex;

export type SimulatorResult = {
  [SimulatorResultForm.updateResult]: UpdateResult;
  [SimulatorResultForm.shotResult]: ShotResult;
  [SimulatorResultForm.parametricExpectedValueResult]: ParametricExpectedValueResult;
};

type CircuitInformation = {
  gateItems: CircuitGateItems;
};

type ObservableInformation = {
  coefficients: number[];
  gateItems: ObservableGateItems;
};

type SelectedParametricQuantumGatePosition = Position | null;

export type UIState = {
  [UIStateForm.circuitInformation]: CircuitInformation;
  [UIStateForm.observableInformation]: ObservableInformation;
  [UIStateForm.selectedParametricQuantumGatePosition]: SelectedParametricQuantumGatePosition;
};

export type UIClientUpdateData = Pick<
  UIState,
  'circuitInformation' | 'observableInformation'
>;
