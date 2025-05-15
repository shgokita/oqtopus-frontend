import type { SimulatorResult, UIState } from '@/types/Form';
import { createEmptyGateItems } from '@/utils/gateHelper';

export const UIStateForm = {
  circuitInformation: 'circuitInformation',
  observableInformation: 'observableInformation',
  selectedParametricQuantumGatePosition:
    'selectedParametricQuantumGatePosition',
} as const;

export const UI_STATE_FORM_DEFAULT_VALUES: UIState = {
  [UIStateForm.circuitInformation]: {
    gateItems: [createEmptyGateItems()],
  },
  [UIStateForm.observableInformation]: {
    coefficients: [0],
    gateItems: [createEmptyGateItems()],
  },
  [UIStateForm.selectedParametricQuantumGatePosition]: null,
};

export const SimulatorResultForm = {
  updateResult: 'updateResult',
  shotResult: 'shotResult',
  parametricExpectedValueResult: 'parametricExpectedValueResult',
} as const;

export const SIMULATOR_RESULT_DEFAULT_VALUES: SimulatorResult = {
  [SimulatorResultForm.updateResult]: {
    expectationValue: 0,
    stateVector: [],
    stateVectorAbsoluted: [],
    stateVectorArgument: [],
    probabilityVector: [],
    codes: {
      translateCodes: {
        qiskit: '',
        qulacs: '',
        pennylane: '',
      },
      observableCodes: {
        openFermion: '',
      },
      circuitCodes: {
        qasm2: '',
        qasm3: '',
      },
    },
  },
  [SimulatorResultForm.shotResult]: {
    samplingMap: [],
    samplingProbabilityMap: [],
  },
  [SimulatorResultForm.parametricExpectedValueResult]: {
    steps: 10,
    expectationValueMap: [],
  },
};
