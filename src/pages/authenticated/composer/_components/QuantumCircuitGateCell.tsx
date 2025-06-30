import { useEffect, useRef } from "react";
import { ControlWireDirection, Down, QuantumGate, Up } from "../gates";
import QuantumGateElement from "./QuantumGateElement";
import { useDrop } from "react-dnd";
import { DragGateItem, ItemTypeGate } from "../dnd";
import clsx from "clsx";

export type GateCellElement =
  | { readonly _tag: "gate", gate: QuantumGate }
  | { readonly _tag: "controlWire" }
  | { readonly _tag: "controlQubit", directions: ControlWireDirection[] }
  | { readonly _tag: "emptyCell" }
  ;

export const Gate = (gate: QuantumGate): GateCellElement => ({ _tag: "gate", gate });
export const ControlWire: GateCellElement = { _tag: "controlWire" };
export const ControlQubit = (directions: ControlWireDirection[]): GateCellElement => ({
  _tag: "controlQubit",
  directions
});
export const EmptyCell: GateCellElement = { _tag: "emptyCell" };

export interface Props {
  qubitIndex: number;
  timestep: number;
  element: GateCellElement;
  onClickControlQubit: (qubitIndex: number, timestep: number) => void;
  onDrop: (qubit: number, timestep: number, item: DragGateItem) => void;
}

export default (props: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const { element } = props;

  return (
    <div
      ref={ref}
      className={clsx([
        "w-full", "h-full", "flex", "items-center", "justify-center", "relative" 
      ])}
    >
      {(() => {
        switch (element._tag) {
          case "gate":
            return (
              <>
                <QuantumGateElement
                  gate={element.gate}
                >
                </QuantumGateElement>
              </>
            )
          case "controlQubit":
            const isConnectedDown = element.directions.includes(Down);
            const isConnectedUp = element.directions.includes(Up);
            return (
              <>
                <div
                  className="flex-col justify-center h-full"
                >
                  <div className="flex justify-center items-center h-[24px]">
                    {
                      isConnectedUp
                        ? <div className="bg-gate-controlled w-1 h-full"></div>
                        : <div className="h-full"></div>
                    }
                  </div>
                  <div
                    onClick={() => props.onClickControlQubit(
                      props.qubitIndex,
                      props.timestep,
                    )}
                    className="bg-gate-controlled w-[16px] h-[16px] rounded-full"
                  >
                  </div>
                  <div className="flex justify-center items-center h-[24px]">
                    {
                      isConnectedDown
                        ? <div className="bg-gate-controlled w-1 h-full"></div>
                        : <div className="h-full"></div>
                    }
                  </div>
                </div>
              </>
            )
          case "controlWire":
            return (
              <>
                <div
                  className="flex-col justify-center h-full"
                >
                  <div className="flex justify-center items-center h-full">
                    <div className="bg-gate-controlled w-1 h-full"></div>
                  </div>
                </div>
              </>
            )
        }
      })()
      }
    </div>
  )
}
