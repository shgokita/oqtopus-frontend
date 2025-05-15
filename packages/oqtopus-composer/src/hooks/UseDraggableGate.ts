import { useRef } from 'react';
import { useDrag } from 'react-dnd';
import type { ItemTypes } from '@/constants/ItemType';
import type { CircuitGateType, ObservableGateType } from '@/types/Gate';
import type { Position } from '@/types/Position';

export type DraggableGateItem<
  Gate extends CircuitGateType | ObservableGateType,
> = {
  gate: Gate;
  type:
    | typeof ItemTypes.DRAGGABLE_CONTROL_QUBIT_GATE
    | typeof ItemTypes.DRAGGABLE_QUANTUM_GATE
    | typeof ItemTypes.DRAGGABLE_OBSERVABLE_GATE;
  position?: Position;
};

export const useDraggableGate = <
  Gate extends CircuitGateType | ObservableGateType,
>({
  gate,
  type,
}: {
  gate: DraggableGateItem<Gate>['gate'];
  type: DraggableGateItem<Gate>['type'];
}): {
  ref: React.RefObject<HTMLDivElement | null>;
  isDragging: boolean;
} => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag<
    DraggableGateItem<Gate>,
    unknown,
    { isDragging: boolean }
  >(
    () => ({
      type,
      item: { gate, type },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [gate, type]
  );
  drag(ref);
  return { ref, isDragging };
};