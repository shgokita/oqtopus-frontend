import { useEffect, useState } from "react";
import { QuantumGate, Down, Up, GateS, ControlWireDirection, compareGate, GateCNOT } from "../gates";
import { QuantumCircuit } from "../circuit";
import { DragGateItem, dragGateItemToQuantumGate } from "../dnd";
import clsx from "clsx";
import QuantumCircuitGateCell, { ControlQubit, ControlWire, EmptyCell, Gate, } from "./QuantumCircuitGateCell";
import QuantumCircuitDropCell, { DropCellPart } from "./QuantumCircuitDropCell";

type FoldCircuitState = {
  composed: (QuantumGate | undefined)[][];
  circuit: ({ readonly _tag: "dummy", target: number } | QuantumGate)[];
}


type ExtendedGate =
  | { _tag: "$controlBit", target: number; from: number, to: number }
  | { _tag: "$controlWire", target: number; from: number, to: number }
  | QuantumGate
  ;

const compareExtendedGate = (lhs: ExtendedGate, rhs: ExtendedGate): boolean => {
  switch (lhs._tag) {
    case "$controlBit":
      return rhs._tag === "$controlBit" && lhs.from === rhs.from && lhs.to === rhs.to;
    case "$controlWire":
      return rhs._tag === "$controlWire" && lhs.from === rhs.from && lhs.to === rhs.to;
    default:
      if (rhs._tag == "$controlBit" || rhs._tag == "$controlWire") return false;
      return compareGate(lhs, rhs);
  }
}
const foldCircuit = (circuit: QuantumCircuit): ComposedProgram => {
  const state: FoldCircuitState = {
    composed: [...new Array(circuit.qubitNumber)].map(_ => []),
    circuit: circuit.steps
  }
  while (state.circuit.length > 0) {
    const [gateHead, ...circuitRest] = state.circuit;
    state.circuit = circuitRest;

    const toBeInserted = (gate: QuantumGate | { _tag: "dummy" }, i: number): ExtendedGate | undefined => {
      switch (gate._tag) {
        case "dummy":
          return undefined;
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
        state.composed[gateHead.target].push(gateHead._tag !== "dummy" ? gateHead : undefined);
    }
  }
  console.log("composed:", state.composed)
  const maxDepth = calcMaxDepth(state.composed);
  const rearranged = state.composed.map(w =>
    w.length < maxDepth
      ? [...w, ...new Array(maxDepth - w.length)]
      : w
  );
  console.log("rearranged", rearranged)
  return rearranged;
}


const calcMaxShiftRange = (qFrom: number, qTo: number, tFrom: number, c: ComposedProgram): [number, number] => {
  const maxDepth = calcMaxDepth(c);
  let result: [number, number] = [qFrom, qTo];
  let gatesAtTimestep: (ExtendedGate | undefined)[];
  for (let i = tFrom; i < maxDepth; i++) {
    gatesAtTimestep = c.map(w => w[i]).slice(result[0], result[1] + 1);
    result = gatesAtTimestep.reduce((prev, g) => {
      if (!g) return prev;
      switch (g._tag) {
        case "$controlBit":
        case "$controlWire":
          return [Math.min(g.from, result[0]), Math.max(g.to, result[1])];
        case "cnot":
          return [Math.min(g.control, g.target, result[0]), Math.max(g.control, g.target, result[1])];
        case "ccnot":
          return [
            Math.min(g.control1, g.control2, g.target, result[0]),
            Math.max(g.control1, g.control2, g.target, result[1])
          ];
        default:
          return prev;
      }
    }, result);
  }
  return result;
}

const insertEmptyCells = (tIndex: number, qFrom: number, qTo: number, c: ComposedProgram): ComposedProgram => {
  const inserted = c.slice(qFrom, qTo + 1).map(w => {
    return [
      ...w.slice(0, tIndex),
      undefined,
      ...w.slice(tIndex)
    ]
  })
  return [
    ...c.slice(0, qFrom),
    ...inserted,
    ...c.slice(qTo + 1)
  ];
}

const swapCell = (qIndex: number, timestep1: number, timestep2: number, c: ComposedProgram): void => {
  const tmp = c[qIndex][timestep1];
  c[qIndex][timestep1] = c[qIndex][timestep2];
  c[qIndex][timestep2] = tmp;
}

const handleControlQubitClick = (
  holdingControlQubit: HoldingControlQubit,
  composed: ComposedProgram,
) =>
  (qIndex: number, tIndex: number) => {
    if (holdingControlQubit.valueOf() !== false) {
      return;
    }
    const controlQubit = composed[qIndex][tIndex];
    if (!controlQubit) {
      throw new Error("Impossible!");
    }
    console.log("HELLO", controlQubit)
  }

const handleDragControlQubit = (
  holdingControlQubit: HoldingControlQubit,
  composed: ComposedProgram,
  setHoldingControlQubit: (h: HoldingControlQubit) => void,
  setComposedProgram: (c: ComposedProgram) => void
) =>
  (
    qubitIndex: number,
    timestep: number,
    part: "left" | "right"
  ) => {
    if (holdingControlQubit === false) {
      throw new Error("Impossible!");
    }
    const targetGate = composed[holdingControlQubit.targetQubitIndex][holdingControlQubit.timestep];
    if (!targetGate) {
      throw new Error("Impossible!");
    }
    const newComposed = (() => {
      if (
        composed
          .map(w => w[timestep])
          .filter(g => g !== undefined && false == compareExtendedGate(g, targetGate))
          .length > 0
      ) {
        /*
          | timestep | part | hcq.timestep | timestep - hcq.timestep | shift| insertPos
        --+----------+------+--------------+-------------------------+------+----------
        1 |        0 |  left|            1 |                       - | yes  | 0
        2 |        0 | right|            1 |                       - | yes  | 1
        3 |        1 |  left|            1 |                       0 | yes  | 1
        4 |        1 | right|            1 |                       0 |  no  | 2
        5 |        2 |  left|            1 |                       + |  no  | 2
        6 |        2 | right|            1 |                       + |  no  | 3
        --+----------+------+--------------+-------------------------+------+----------
        */
        const [insertPos, shouldShift] = [
          timestep + (part === "right" ? +1 : 0), 
          timestep < holdingControlQubit.timestep || (timestep == holdingControlQubit.timestep && part == "left") 
        ];
        if (shouldShift) {
          holdingControlQubit.timestep++;
        }
        timestep = insertPos;
        return composed.map(w => [
          ...w.slice(0, insertPos),
          undefined,
          ...w.slice(insertPos)
        ]);
      }
      else {
        return [...composed];
      }
    })();

    swapCell(holdingControlQubit.targetQubitIndex, holdingControlQubit.timestep, timestep, newComposed);
    const timestepBefore = holdingControlQubit.timestep;
    holdingControlQubit.timestep = timestep;
    if (newComposed.map(w => w[timestepBefore]).some(g => g !== undefined) === false) {
      newComposed.forEach(w => {
        w.splice(timestepBefore, 1);
      })
      if (timestepBefore < holdingControlQubit.timestep) {
        holdingControlQubit.timestep--;
      }
    }
    setComposedProgram(newComposed);
    setHoldingControlQubit({
      ...holdingControlQubit,
      // timestep: timestep,
    });
  }

    // アルゴリズム:
    // ホバーしているセルのタイムステップがターゲットのCNOTゲートのタイムステップと同じかどうかで分類する
    //　　- 同じ場合:
    //   ホバーしているセル〜ゲートがすべて空か？
    //     すべて空なら何もする必要はない。
    //     もし空でないセルが含まれるなら、左右いずれかに列を追加し、CNOTをそこにずらす
    // - 異なる場合:　CNOTゲートを横に動かす

    // const [from, to] = [qubitIndex, holdingControlQubit.targetQubitIndex].sort();
    // const maxDepthBefore = calcMaxDepth(composed);
    // const gatesAtControlGateTimestep = newComposed
    //   .slice(from, to + 1)
    //   .map(w => w[timestep])
    // 
    // 1. カーソルのtimestep位置に合わせてCNOTゲートを動かす。
    //    その際、カーソル〜CNOTを置く位置にゲートがあれば、セルの左右のどちらにカーソルがあたっているかにより、
    //    カーソルの左右いずれかに空白セルを挿入する。
    //    カーソルの位置が回路の端（０ or maxDepth - 1）の場合は、カーソルがtimestepと同じでも
    //    回路の幅を広げるために空白セルを挿入する。 
    // if (holdingControlQubit.timestep !== timestep
    //   || timestep === 0 
    //   || timestep === maxDepthBefore - 1     
    // ) {
    //   // カーソルの位置は空白か？
    //   if (gatesAtControlGateTimestep
    //     .some(g => g !== undefined && false === compareExtendedGate(g, targetGate))
    //   ) {
    //     // 空白でないなら、空白を挿入する
    //     // カーソルがあたっているのがセルの右半分ならhovered timestepの右側に、左半分なら左側に空白を挿入する
    //     // ただし、既に空白を挿入済み（カーソルのあたっている列の隣が空白列）なら、挿入はしない
    //     const insertPos = part === "left" ? Math.max(0, timestep - 1) : timestep + 1;
    //     if (newComposed.map(w => w[insertPos])
    //       .filter(g => g !== undefined && false == compareExtendedGate(g, targetGate)) 
    //       .length > 0
    //     || timestep === 0 
    //     || timestep === maxDepthBefore - 1
    //     ) {
    //       newComposed = insertEmptyCells(insertPos, 0, composed.length - 1, composed);
    //       timestep = insertPos;
    //     }
    //   }
    //   if (holdingControlQubit.timestep !== timestep) {
    //   newComposed[holdingControlQubit.targetQubitIndex][timestep] = targetGate;
    //   newComposed[holdingControlQubit.targetQubitIndex][holdingControlQubit.timestep] = undefined;
    //   setHoldingControlQubit({
    //     ...holdingControlQubit,
    //     timestep: timestep
    //   })
    //   setComposedProgram(newComposed);        
    //   }

    // if (timestep === holdingControlQubit.timestep) {
    //   const gatesAtHoveredTimestep = composed.slice(from, to + 1).map(w => w[timestep]);
    //   const filtered = gatesAtHoveredTimestep.filter(g => g !== undefined && false === compareExtendedGate(g, targetGate));
    //   if (filtered.length == 0) {
    //     return;
    //   }
    //   const insertPos = part === "left" ? Math.max(0, timestep - 1) : timestep + 1;
    //   const newComposed = insertEmptyCells(insertPos, 0, composed.length - 1, composed);
    //   newComposed[holdingControlQubit.targetQubitIndex][insertPos] = newComposed[holdingControlQubit.targetQubitIndex][timestep];
    //   newComposed[holdingControlQubit.targetQubitIndex][timestep] = undefined;
    //   setHoldingControlQubit({
    //     ...holdingControlQubit,
    //     timestep: insertPos === 0 ? 1 : insertPos,
    //   })
    //   setComposedProgram(newComposed);
    // } else {
    //   const gatesAtControlGateTimestep = composed
    //     .slice(from, to + 1)
    //     .map(w => w[holdingControlQubit.timestep])
    //   debugger
    //   if (false === gatesAtControlGateTimestep.some(g => g !== undefined && false === compareExtendedGate(g, targetGate))) {
    //     return;
    //   }
    //   // CNOTゲートごと動かす
    //   let newComposed;
    //   const gatesAtHoveredTimestep = composed
    //     .slice(from, to + 1)
    //     .map(w => w[timestep]);
    //   if (gatesAtHoveredTimestep.some(g => g !== undefined)) {
    //     newComposed = composed.map(w => {
    //       return [
    //         ...w.slice(0, timestep),
    //         undefined,
    //         ...w.slice(timestep)
    //       ]
    //     });
    //   }
    //   else {
    //     newComposed = [...composed];
    //   }
    //   newComposed[holdingControlQubit.targetQubitIndex][timestep] = targetGate;
    //   newComposed[holdingControlQubit.targetQubitIndex][holdingControlQubit.timestep] = undefined;
    //   setComposedProgram(newComposed);
    //   setHoldingControlQubit({
    //     ...holdingControlQubit,
    //     timestep: timestep
    //   })


    //   console.log("ちがうよ〜")
    // }

const handleDragIn = (
  composed: ComposedProgram,
  setComposedCircuit: (composed: ComposedProgram) => void,
  setShadowPos: (pos: [number, number]) => void
) =>
  (
    qubitIndex: number,
    timestep: number,
    part: DropCellPart
  ) => {
    const hoveredWire = composed[qubitIndex];
    if (!hoveredWire) {
      throw new Error("Impossible!");
    }
    const hoveredGate = hoveredWire[timestep];

    if (!hoveredGate) {
      setShadowPos([qubitIndex, timestep]);
      return;
    };
    // If the hovered cell is not empty , we insert empty cells at the 
    // left or right next to the hovered gate.
    const maxDepth = calcMaxDepth(composed);
    const tNext = timestep + (part == "left" ? (-1) : (+1));
    // if the next cell is empty, we do not have to shift the rest circuit.
    if (tNext >= 0 && tNext < maxDepth - 1 && !hoveredWire[tNext]) {
      setShadowPos([qubitIndex, tNext]);
      return;
    }
    // if the next cell is not empty, we insert empty cell and shift the circuit
    const tFrom = part == "left" ? timestep : timestep + 1
    const [qFrom, qTo] = calcMaxShiftRange(qubitIndex, qubitIndex, tFrom, composed)
    const newComposed = insertEmptyCells(tFrom, qFrom, qTo, composed);
    setComposedCircuit(newComposed);
    setShadowPos([qubitIndex, tFrom]);
  }

interface Props {
  circuit: QuantumCircuit;
  onCircuitUpdate: (newCircuit: QuantumCircuit) => void
}

type ComposedProgram = (undefined | ExtendedGate)[][];

const calcMaxDepth = (composed: ComposedProgram) => {
  return composed.reduce((prev, gs) => {
    return (gs.length >= prev) ? gs.length : prev
  }, 0);
}

const reconstructCircuit = (composed: ComposedProgram, qubitNumber: number, circuitDepth: number): QuantumCircuit => {
  const toGate = (x: ExtendedGate | undefined, qIndex: number): undefined | QuantumGate => {
    if (!x) return { _tag: "dummy", target: qIndex } as unknown as QuantumGate;
    switch (x._tag) {
      case "$controlBit":
        return undefined;
      case "$controlWire":
        return undefined;
      default:
        return x
    }
  };

  return {
    qubitNumber,
    steps: [...new Array(circuitDepth)].flatMap((_, timestep) =>
      composed.map((gs, i) => toGate(gs[timestep], i)).filter(x => x !== undefined)
    )
  };
}

type HoldingControlQubit = false | { targetQubitIndex: number; timestep: number, rest: number };

export default (props: Props) => {
  const [qubitNumber, setQubitNumber] = useState(props.circuit.qubitNumber);
  const [circuitDepth, setCircuitDepth] = useState(0);
  const [composedProgram, setComposedProgram] = useState<ComposedProgram>([]);
  const [holdingControlQuit, setHoldingControlQubit] = useState<HoldingControlQubit>(false)
  const [shadowPos, setShadowPos] = useState<[number, number]>([0, 0]);

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
    const newComposed = [...composedProgram];
    newComposed[qubitIndex][timestep] = dragGateItemToQuantumGate(qubitIndex, item);
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

  const handleSetControlQubit = (
    composed: ComposedProgram,
    setComposedProgram: (c: ComposedProgram) => void,
    holdingControlQubit: HoldingControlQubit,
    setHoldingControlQubit: (h: HoldingControlQubit) => void
  ) => (cqIndex: number, cqTimestep: number) => {
    if (holdingControlQubit === false) {
      throw new Error("Impossible!");
    }
    const controlledGate = composed[holdingControlQubit.targetQubitIndex][holdingControlQubit.timestep];
    if (!controlledGate) {
      throw new Error("Impossible!")
    }
    const [from, to] = [cqIndex, holdingControlQubit.targetQubitIndex].sort();

    const newItem = (i: number): ExtendedGate => {
      if (i === cqIndex) return { _tag: "$controlBit", from, to, target: cqIndex };
      if (i === holdingControlQubit.targetQubitIndex) {
        switch (controlledGate._tag) {
          case "cnot":
            controlledGate.control = cqIndex;
            return controlledGate;
          case "ccnot":
            const controlkey = holdingControlQubit.rest === 2
              ? "control2"
              : "control1"
              ;
            controlledGate[controlkey] = cqIndex;
            return controlledGate;
          default:
            throw new Error("Impossible!");
        }
      }
      return { _tag: "$controlWire", from, to, target: i };
    }

    const newComposed = composed.map((w, i) => {
      return (i < from || i > to)
        ? w
        // ){...w, [cqTimestep]: newItem(i) }
        : [...w.slice(0, cqTimestep), newItem(i), ...w.slice(cqTimestep + 1)]
    });
    handleComposedProgramUpdated(newComposed);
    const controlQubitRest = holdingControlQubit.rest;
    if (controlQubitRest == 1) {
      setHoldingControlQubit(false);
    }
    else {
      setHoldingControlQubit({
        ...holdingControlQubit,
        rest: controlQubitRest - 1
      })
    }
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
                          onClickControlQubit={handleControlQubitClick(holdingControlQuit, composedProgram)}
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
                        onDragIn={handleDragIn(composedProgram, setComposedProgram, setShadowPos)}
                        onDrop={(qubit, timestep, _, item) => handleDrop(qubit, timestep, item)}
                        onDragControlQubit={handleDragControlQubit(
                          holdingControlQuit,
                          composedProgram,
                          setHoldingControlQubit,
                          setComposedProgram
                        )}
                        onSetControlQubit={handleSetControlQubit(
                          composedProgram,
                          setComposedProgram,
                          holdingControlQuit,
                          setHoldingControlQubit
                        )}
                      />
                      <QuantumCircuitDropCell
                        qubitIndex={qIndex}
                        timestep={tIndex}
                        part={"right"}
                        holdingControlQubit={holdingControlQuit}
                        onDragIn={handleDragIn(composedProgram, setComposedProgram, setShadowPos)}
                        onDrop={(qubit, timestep, _, item) => handleDrop(qubit, timestep, item)}
                        onDragControlQubit={handleDragControlQubit(
                          holdingControlQuit,
                          composedProgram,
                          setHoldingControlQubit,
                          setComposedProgram
                        )}
                        onSetControlQubit={handleSetControlQubit(
                          composedProgram,
                          setComposedProgram,
                          holdingControlQuit,
                          setHoldingControlQubit
                        )}
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