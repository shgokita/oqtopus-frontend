import { ReactNode, useEffect, useRef } from "react";
import { QuantumGate } from "../gates";
import { useDrag } from "react-dnd";
import { FromPalette, ItemTypeGate } from "../dnd";

export interface Props {
  gateTag: QuantumGate["_tag"];
  children: ReactNode;
}

export default ({ gateTag, children }: Props) => {
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

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {children}
    </div>
  );
}