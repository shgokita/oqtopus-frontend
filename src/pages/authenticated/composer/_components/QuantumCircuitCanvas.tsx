import { useEffect, useState } from "react";
import { QuantumGate, Down, Up, GateS, ControlWireDirection } from "../gates";
import { QuantumCircuit } from "../circuit";
import { DragGateItem, dragGateItemToQuantumGate } from "../dnd";
import clsx from "clsx";
import QuantumCircuitGateCell, { ControlQubit, ControlWire, EmptyCell, Gate, } from "./QuantumCircuitGateCell";
import QuantumCircuitDropCell, { DropCellPart } from "./QuantumCircuitDropCell";

type FoldCircuitState = {
  composed: (QuantumGate | undefined)[][];
  circuit: QuantumGate[];
}


type ExtendedGate =
  | { _tag: "$controlBit", target: number; from: number, to: number }
  | { _tag: "$controlWire", target: number; from: number, to: number }
  | QuantumGate
  ;

const foldCircuit = (circuit: QuantumCircuit): ComposedProgram => {
  const state: FoldCircuitState = {
    composed: [...new Array(circuit.qubitNumber)].map(_ => []),
    circuit: circuit.steps
  }
  while (state.circuit.length > 0) {
    const [gateHead, ...circuitRest] = state.circuit;
    state.circuit = circuitRest;

    const toBeInserted = (gate: QuantumGate, i: number): ExtendedGate => {
      switch (gate._tag) {
        case "cnot":
          return (
            i == gate.target
              ? gate
              : i == gate.control
                ? {
                  _tag: "$controlBit",
                  target: i,
                  from: Math.min(gate.control, gate.target),
                  to: Math.max(gate.control, gate.target)
                }
                : {
                  _tag: "$controlWire",
                  target: i,
                  from: Math.min(gate.control, gate.target),
                  to: Math.max(gate.control, gate.target)
                }
          )
        default:
          throw new Error("Invalid gate");
      }
    }
    let insertPos = 0;
    let to = 0;
    switch (gateHead._tag) {
      case "cnot":
        const di = gateHead.control < gateHead.target ? (-1) : (+1);
        insertPos = calcMaxDepth(
          state.composed.slice(
            Math.min(gateHead.control, gateHead.target),
            Math.max(gateHead.control, gateHead.target) + 1
          )
        );
        to = gateHead.control;
        for (let i = gateHead.target; true; i = i + di) {
          state.composed[i] =
            [
              ...state.composed[i],
              ...new Array(insertPos - state.composed[i].length),
              toBeInserted(gateHead, i)
            ]
          if (i == to) break;
        }
        break;
      default:
        state.composed[gateHead.target].push(gateHead);
    }
  }
  console.log("composed:", state.composed)
  const maxDepth = calcMaxDepth (state.composed);
  const rearranged = state.composed.map(w => 
      w.length < maxDepth 
        ? [...w, ...new Array(maxDepth - w.length)] 
        : w
  );
  console.log("rearranged", rearranged)
  return rearranged;
}

// const _foldCircuit = (
//   circuit: QuantumCircuit,
// ): (undefined | QuantumGate)[][] => {
//   console.log("foldCircuit", circuit)
//   let
//     state: FoldCircuitState = {
//       composed: [...new Array(circuit.qubitNumber)].map(_ => []),
//       circuit: circuit.steps
//     };

//   while (state.circuit.length > 0) {
//     const [gate, ...circuitRest] = state.circuit;
//     const targetQubit = gate.target;
//     const wire = state.composed[targetQubit];
//     if (!wire) {
//       throw new Error("Invalid target qubit index");
//     }
//     switch (gate._tag) {
//       case "cnot":
//         if (gate.control == gate.target) {
//           state.composed[targetQubit].push(gate);
//         }
//         else {
//           state.composed = state.composed.map((w, qIndex) => {
//             console.log("Whoa", Math.min(gate.control, gate.target))
//             if (qIndex < Math.min(gate.control, gate.target)
//               || qIndex > Math.max(gate.control, gate.target)
//             ) {
//               console.log("hoge", qIndex)
//               return w;
//             }
//             else {
//               console.log([...w.slice(0, wire.length), qIndex === targetQubit ? gate : undefined]);
//               return [
//                 ...w.slice(0, wire.length),
//                 (qIndex === targetQubit ? gate : undefined),
//                 ...w.slice(wire.length)
//               ]
//             }
//           });
//         }
//         break;
//       case "ccnot":
//         return state.composed;
//       default:
//         state.composed[targetQubit].push(gate)
//     }
//     state.circuit = circuitRest;
//     console.log("state updated", state);
//   }
//   //
//   console.log("folded", state.composed);
//   // 
//   const maxDepth = calcMaxDepth(state.composed)
//   const rearranged = state.composed.map(w => w.length < maxDepth ? [...w, ...new Array(maxDepth - w.length)] : w);
//   console.log("rearranged", rearranged)
//   return rearranged; //.map(gs => [...gs, undefined]);
// }

const handleDragIn = (composed: ComposedProgram, setComposedCircuit: (composed: ComposedProgram) => void) =>
  (qubitIndex: number, timestep: number, part: DropCellPart) => {
    const computedTimestep = part == "left" ? timestep : timestep + 1;
    const gatesAtHoveredTimestep = composed.map(gs => gs[computedTimestep]);
    const gateAtHoveredCell = gatesAtHoveredTimestep[qubitIndex];

    const insertEmptyCell = (from: number, to: number) => {
      const newComposed = composed.map((gs, qIndex) => {
        return qIndex >= from && qIndex <= to
          ? [...gs.slice(0, computedTimestep), undefined, ...gs.slice(computedTimestep)]
          : gs
      })
      setComposedCircuit(newComposed);
    }

    //
    if (!gateAtHoveredCell) {
      const hoveredControl = gatesAtHoveredTimestep.find(g => {
        if (!g) return false;
        switch (g._tag) {
          case "cnot":
            return (Math.min(g.control, g.target) <= qubitIndex
              && Math.max(g.control, g.target) >= qubitIndex);
          case "ccnot":
            console.log("TODO: implement!");
            return false;
          default:
            return false;
        }
      });

      // もしドラッグインしたセルが制御ビット付きゲートの上なら、制御ビット付ゲートごとシフトする
      if (hoveredControl) {
        insertEmptyCell(0, 0);
      }
    }
    else {
      // ゲートの上だった場合
      switch (gateAtHoveredCell._tag) {
        case "cnot":
          return;
        case "ccnot":
          return;
        default:
          insertEmptyCell(qubitIndex, qubitIndex)

      }
    }
    console.log(qubitIndex, timestep, part)
  }

interface Props {
  circuit: QuantumCircuit;
  onCircuitUpdate: (newCircuit: QuantumCircuit) => void
}

type ComposedProgram = (undefined | ExtendedGate)[][];

const calcMaxDepth = (composed: ComposedProgram) => {
  return composed.reduce((prev, gs) => {
    return (gs.length > prev) ? gs.length : prev
  }, 0);
}

const reconstructCircuit = (composed: ComposedProgram, qubitNumber: number, circuitDepth: number): QuantumCircuit => {
  return {
    qubitNumber,
    steps: [...new Array(circuitDepth)].flatMap((_, timestep) =>
      composed.map(gs => gs[timestep]).filter(x => x !== undefined && x._tag !== "$controlBit" && x._tag !== "$controlWire")
    )
  };
}

type HoldingControlQubit = false | { targetQubitIndex: number; timestep: number, rest: number };

export default (props: Props) => {
  const [qubitNumber, setQubitNumber] = useState(props.circuit.qubitNumber);
  const [circuitDepth, setCircuitDepth] = useState(0);
  const [composedProgram, setComposedProgram] = useState<ComposedProgram>([]);
  const [holdingControlQuit, setHoldingControlQubit] = useState<HoldingControlQubit>(false)

  useEffect(() => {
    const composed = foldCircuit(props.circuit);
    setComposedProgram(composed);
    setQubitNumber(props.circuit.qubitNumber);
  }, [props.circuit]);

  useEffect(() => {
    const maxDepth = calcMaxDepth(composedProgram)
    setCircuitDepth(maxDepth);
  }, [composedProgram])

  const mkCellElement = (qIndex: number, gatesAtTimestep: (undefined | ExtendedGate)[]) => {
    const gate = gatesAtTimestep[qIndex];

    if (gate) {
      switch (gate._tag) {
        case "$controlBit":
          return ControlQubit(
            [
              gate.from < qIndex ? [Up] : [],
              gate.to > qIndex ? [Down] : []
            ].flat()
          );
        case "$controlWire":
          return ControlWire;
        default:
          return Gate(gate);
      }
    }
    return EmptyCell;
  };

  const handleComposedProgramUpdated = (newComposed: ComposedProgram) => {
    const newCircuitDepth = calcMaxDepth(newComposed);
    const newCircuit = reconstructCircuit(newComposed, qubitNumber.valueOf(), newCircuitDepth);
    console.log("newCircuit", newCircuit);
    props.onCircuitUpdate(newCircuit);
  }

  const handleDrop = (qubitIndex: number, timestep: number, item: DragGateItem) => {
    const hole = composedProgram[qubitIndex][timestep];
    if (hole) return;
    const newComposed = composedProgram.map((gs, qIndex) => {
      return qIndex == qubitIndex
        ? [...gs.slice(0, timestep), dragGateItemToQuantumGate(qubitIndex, item), ...gs.slice(timestep)]
        : [...gs.slice(0, timestep), undefined, ...gs.slice(timestep)]
    });
    handleComposedProgramUpdated(newComposed);
    switch (item.gateTag) {
      case "cnot":
        setHoldingControlQubit({ targetQubitIndex: qubitIndex, timestep, rest: 1 })
        return;
      case "ccnot":
        setHoldingControlQubit({ targetQubitIndex: qubitIndex, timestep, rest: 2 })
        return;
    }
  };

  const handleSetControlQubit = (qIndex: number, tIndex: number) => {
    return (controlQubitIndex: number) => {
      debugger
      if (holdingControlQuit === false) {
        throw new Error("Impossible!")
      }
      const controlledGate = composedProgram[holdingControlQuit.targetQubitIndex][holdingControlQuit.timestep];
      const updateControl = () => {
        if (!controlledGate) {
          throw new Error("Impossible!");
        }
        switch (controlledGate._tag) {
          case "cnot":
            return { ...controlledGate, control: controlQubitIndex };
          default:
            return controlledGate;
        }
      }
      setComposedProgram(composedProgram.map((w, i) => {
        return i === controlledGate?.target
          ? [...w.slice(0, tIndex), updateControl(), ...w.slice(tIndex + 1)]
          : w
      }))

      setHoldingControlQubit(holdingControlQuit.rest === 1
        ? false
        : { ...holdingControlQuit, rest: holdingControlQuit.rest - 1 }
      )
    };
  }

  const handleAddQubitButton = () => {
    // setComposedProgram(foldCircuit({ ...props.circuit, qubitNumber: qubitNumber.valueOf() + 1 }))
    props.onCircuitUpdate({ 
      ...props.circuit, 
      qubitNumber: props.circuit.qubitNumber.valueOf() + 1
    });
  }

  return (
    <div
      className={clsx([
        ["relative", "w-full", "min-h-64", "my-5"],
        ["border", "border-table-border", "rounded-sm"]
      ])}
    >
      <div
        className={clsx([
          ['flex']
        ])}
      >
        <div
          className={clsx([
            ['py-5', 'pl-2'],
          ])}
        >
          {[...new Array(qubitNumber)].map((_, qIndex) => {
            return (
              <div
                className={clsx([
                  ['h-[64px]', 'w-8'],
                  ['flex', 'justify-center', 'items-center']
                ])}
                key={qIndex}
              >
                <span>q{qIndex}</span>
              </div>
            )
          })
          }
          <div
            className={clsx([
              ['h-8', 'w-8'],
              ['flex', 'justify-center', 'items-center'],
              ['rounded-full', 'bg-neutral-content', 'text-primary-content'],
              ['hover:bg-primary'],
              ['cursor-pointer']
            ])}
            onClick={handleAddQubitButton}
          >
            <span>+</span>
          </div>
        </div>
        <div
          className={clsx([
            ['relative']
          ])}
        >
          <div
            style={{
              gridTemplateRows: `repeat(${qubitNumber}, 64px)`,
              gridTemplateColumns: `repeat(${circuitDepth}, 64px)`,
            }}
            className={clsx([
              ["absolute", "top-0", "left-0", "p-5",],
              ["grid", "grid-flow",],
              ["z-20"],
              ["transition-all", "duration-300"]
            ])}
          >
            {
              [...new Array(qubitNumber)].map((_, qIndex) =>
                [... new Array(circuitDepth)].map((_, tIndex) => {
                  // slice of quantum circuit at current timestep
                  const gatesAtTimestep = composedProgram.map(row => row[tIndex]);

                  const elm = mkCellElement(qIndex, gatesAtTimestep);

                  return (
                    <div
                      className={clsx([
                        'relative', 'w-full', 'h-full'
                      ])}
                      key={`cell-q${qIndex}-t${tIndex}`}
                    >
                      <div
                        className={clsx([
                          'absolute', 'top-0', 'left-0',
                          'w-full', 'h-full', 'z-20',
                          'flex', 'items-center', 'justify-center'
                        ])}
                      >
                        <QuantumCircuitGateCell
                          element={elm}
                          qubitIndex={qIndex}
                          timestep={tIndex}
                          onDrop={f => f}
                          key={`q${qIndex}-t${tIndex}`}
                        />
                      </div>
                      <div
                        className={clsx([
                          ['absolute', 'top-0', 'left-0'],
                          ['z-10'],
                          ['w-full', 'h-full'],
                          ['flex', 'justify-center', 'items-center']
                        ])}
                      >
                        <div
                          className={clsx([
                            ['w-full', 'h-1'],
                            ['bg-neutral-content']
                          ])}
                        />
                      </div>
                    </div>
                  )
                })
              )
            }
          </div>

          <div
            style={{
              gridTemplateRows: `repeat(${qubitNumber}, 64px)`,
              gridTemplateColumns: `repeat(${circuitDepth}, 64px)`,
            }}
            className={clsx([
              ["absolute", "top-0", "left-0", "p-5",],
              ["grid", "grid-flow-col",],
              ["z-30"]
            ])}
          >
            {circuitDepth > 0
              ? [...new Array(circuitDepth)].map((_, tIndex) =>
                [...new Array(qubitNumber)].map((_, qIndex) => {
                  return (
                    <div
                      className={clsx([
                        'relative', 'w-full', 'h-full',
                        'flex', 'justify-center', 'items-center'
                      ])}
                      key={`drop-cell-q${qIndex}-t${tIndex}`}
                    >
                      <QuantumCircuitDropCell
                        qubitIndex={qIndex}
                        timestep={tIndex}
                        part={"left"}
                        holdingControlQubit={holdingControlQuit}
                        onDragIn={handleDragIn(composedProgram, setComposedProgram)}
                        onDrop={(qubit, timestep, _, item) => handleDrop(qubit, timestep, item)}
                        onSetControlQubit={handleSetControlQubit(qIndex, tIndex)}
                      />
                      <QuantumCircuitDropCell
                        qubitIndex={qIndex}
                        timestep={tIndex}
                        part={"right"}
                        holdingControlQubit={holdingControlQuit}
                        onDragIn={handleDragIn(composedProgram, setComposedProgram)}
                        onDrop={(qubit, timestep, _, item) => handleDrop(qubit, timestep, item)}
                        onSetControlQubit={handleSetControlQubit(qIndex, tIndex)}
                      />
                    </div>
                  )
                })
              )
              : null
            }
          </div>
        </div>
      </div>
      {holdingControlQuit ? `{ timestep: ${holdingControlQuit.timestep}, rest: ${holdingControlQuit.rest}, targetQubit: ${holdingControlQuit.targetQubitIndex}}` : "false"}
    </div>
  );
}