import { useEffect, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import { DragGateItem, ItemTypeGate } from "../dnd";
import clsx from "clsx";

export type DropCellPart = "left" | "right";

export interface Props {
  qubitIndex: number;
  timestep: number;
  part: DropCellPart;
  holdingControlQubit: false | { targetQubitIndex: number; timestep: number };
  onDragIn: (qubit: number, timestep: number, part: DropCellPart) => void
  onDrop: (qubit: number, timestep: number, part: DropCellPart, item: DragGateItem) => void;
  onSetControlQubit: (controlQubitIndex: number) => void
}

export default (props: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ canDrop, isOverCurrent }, drop] = useDrop<DragGateItem, void, { isOverCurrent: boolean, canDrop: boolean }>({
    accept: ItemTypeGate,
    drop: (item) => {
      props.onDrop(props.qubitIndex, props.timestep, props.part, item);
    },
    collect: (monitor) => ({
      isOverCurrent: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const [isOver, setIsOver] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  useEffect(() => {
    if (isOverCurrent && !isOver) {
      // dragIn started
      setIsOver(true);
      // start debounce timer
      timeoutRef.current = window.setTimeout(() => {
        props.onDragIn(props.qubitIndex, props.timestep, props.part);
        timeoutRef.current = null;
      }, 300); // ← debounce時間（ミリ秒）
    } else if (!isOverCurrent && isOver) {
      // dragOut
      setIsOver(false);
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      } else {
        console.log("dragOut after debounce from",  [props.qubitIndex, props.timestep, props.part]);
      }
    }
  }, [isOverCurrent]);


  const highlight = isOver && canDrop;

  useEffect(() => {
    if (ref.current) {
      drop(ref)
    }
  }, [drop]);

  const handleMouseEnter = () => {
    if (props.holdingControlQubit === false) return;
    props.onDragIn(props.qubitIndex, props.timestep, props.part)
  }

  const handleClick = () => {
    if (props.holdingControlQubit === false) return;
    props.onSetControlQubit(props.qubitIndex)
  }
  return (
    <div
      ref={ref}
      className={clsx([
        ["w-1/2", "h-full"],
        // ["border", props.part == "left" ? "border-status-job-failed" : "border-status-job-succeeded"]
      ])}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
    >
    </div>
  )
}
