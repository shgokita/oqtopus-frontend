import { useState } from "react"
import QuantumCircuitCanvas from "./QuantumCircuitCanvas"
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { QuantumCircuit } from "../circuit"
import { GateCNOT, GateH, GateX, GateZ, QuantumGate } from "../gates"
import clsx from "clsx"
import QuantumGatePalette from "./QuantumGatePalette";


const allGates: QuantumGate["_tag"][] =
  ["x",
    "y",
    "z",
    "h",
    "s",
    "t",
    "cnot",
    // "ccnot",
    "rx",
    "ry",
    "rz",
    "barrier"
  ]


export default () => {
  const [circuit, setCircuit] = useState<QuantumCircuit>({
    qubitNumber: 2,
    steps: [
      GateH(0),
      GateCNOT(0, 1),
      // GateX(0),
      // GateZ(1),
    ]
  });

  const [grabbingGate, setGrabbingGate] = useState<null | QuantumGate["_tag"]>(null);


  const handleCircuitUpdate = (newCircuit: QuantumCircuit) => {
    setCircuit(newCircuit);
  }

  const handleDragFromGatePalette = (gateTag: QuantumGate["_tag"]) => {
    setGrabbingGate(gateTag);
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className={clsx([
          ["w-full"]
        ])}
      >
        <div
        
        >
          <select>
            <option label="Sampling" />
            <option label="Estimation" />
          </select>
        </div>
        <hr 
          className={clsx([
            ["w-full", "my-2"],
            ["text-neutral-content"]
          ])} 
        />
        <QuantumGatePalette
          supportedGates={allGates}
          onDragStart={handleDragFromGatePalette}
          onDragEnd={() => setGrabbingGate(null)}
        />
      </div>

      <QuantumCircuitCanvas
        circuit={circuit}
        onCircuitUpdate={handleCircuitUpdate}
        draggingFromPalette={grabbingGate !== null}
      />
    </DndProvider>
  )
}