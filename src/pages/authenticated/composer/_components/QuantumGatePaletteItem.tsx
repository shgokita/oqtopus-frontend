import { ReactNode, useEffect, useRef } from "react";
import { QuantumGate } from "../gates";
import { useDrag } from "react-dnd";
import { FromPalette, ItemTypeGate } from "../dnd";
import clsx from "clsx";

export interface Props {
  gateTag: QuantumGate["_tag"];
  children: ReactNode;
  onDragStart: () => void;
  onDragEnd: () => void;
}

export default ({ gateTag, children, onDragStart, onDragEnd }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypeGate,
    item: {
      type: ItemTypeGate,
      from: FromPalette,
      gateTag, // どの種類のゲートか
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  }), [gateTag]);

  useEffect(() => {
    if (ref.current) {
      drag(ref.current);
    }
  }, [ref, drag]);

  useEffect(() => {
    if (isDragging) {
      onDragStart();
    }
    else {
      onDragEnd();
    }
  }, [isDragging]);

  return (
    <div 
      ref={ref} 
      style={{ 
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? "grabbing" : "pointer",
    }}
    >
      {children}
    </div>
  );
}