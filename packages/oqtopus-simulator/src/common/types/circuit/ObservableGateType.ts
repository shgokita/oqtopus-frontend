import { SingleGateType } from './QuantumGateType';

/**
 * The kind of quantum gates available to compose observables. 
 */
export type ObservableGateType = Extract<
  SingleGateType,
  | typeof SingleGateType.Identity
  | typeof SingleGateType.X
  | typeof SingleGateType.Y
  | typeof SingleGateType.Z
>;
