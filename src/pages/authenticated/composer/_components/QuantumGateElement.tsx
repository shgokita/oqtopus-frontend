import clsx, { ClassValue } from "clsx";
import { ControlWireDirection, Down, QuantumGate, Up, labelOfGate } from "../gates";

interface Props {
  gate: QuantumGate;
}

interface ControlledGateProps {
  label: string;
  wireDirections: ControlWireDirection[];
}

const ControlledGate = (props: ControlledGateProps) => {
  return (
    <div
      className={clsx([
        ['relative', 'w-full', 'h-full']
      ])}
    >
      <div
        className={clsx([
          ['absolute', 'top-0', 'left-0', 'z-20'],
          ["w-full", "h-full", "rounded-full"],
          ["flex", "items-center", "justify-center"],
          ["bg-gate-controlled", "text-center", "align-middle"]
        ])}
      >
        <span
          className={clsx([
            ["text-primary-content", "font-bold"],
            ["text-2xl"]
          ])}
        >
          +
        </span>
      </div>
      {props.wireDirections.includes(Up)
        ? (
          <div
            className={clsx([
              ['absolute', 'top-[-12px]', 'left-0', 'z-10'],
              ["w-full", "h-[12px]"],
              ["flex", "items-center", "justify-center"],
            ])}
          >
            <div
              className={clsx([
                ["bg-gate-controlled", "font-bold"],
                ["text-2xl"],
                ['h-full', 'w-1']
              ])}
            />
          </div>
        )
        : <></>
      }
      {props.wireDirections.includes(Down)
        ? (
          <div
            className={clsx([
              ['absolute', 'bottom-[-12px]', 'left-0', 'z-10'],
              ["w-full", "h-[12px]"],
              ["flex", "items-center", "justify-center"],
            ])}
          >
            <div
              className={clsx([
                ["bg-gate-controlled", "font-bold"],
                ["text-2xl"],
                ['h-full', 'w-1']
              ])}
            />
          </div>
        )
        : <></>
      }
    </div>
  )
}

export default function QuantumGateElement({ gate }: Props) {
  return (
    <div
      className={clsx([
        ["w-10", "h-10"],
        ["text-primary-content"],
        ["transition-all", "duration-300"]
      ])}
    >
      {
        (() => {
          switch (gate._tag) {
            case "x":
            case "y":
            case "z":
            case "h":
            case "s":
            case "t":
              return (
                <div
                  className={clsx([
                    ["w-full", "h-full", "rounded",],
                    ["flex", "items-center", "justify-center"],
                    ["bg-gate-atomic", "text-center", "align-middle"]
                  ])}
                >
                  <span
                    className={clsx([
                      ["text-primary-content", "font-bold"],
                      ["text-xl"]
                    ])}
                  >
                    {labelOfGate(gate)}
                  </span>
                </div>
              )
            // parameterized gates
            case "rx":
            case "ry":
            case "rz":
              return (
                <div
                  className={clsx([
                    ["w-full", "h-full", "rounded",],
                    ["flex", "flex", "items-center", "justify-center"],
                    ["bg-gate-parametrized"],
                  ])}
                >
                  <span
                    className={clsx([
                      ["text-primary-content", "font-bold"],
                      ["text-xs"]
                    ])}
                  >
                    {labelOfGate(gate)}
                  </span>
                  <span
                    className={clsx([
                      ["text-primary-content"],
                      ["text-xs"]
                    ])}
                  >
                    (θ)
                  </span>
                </div>
              )


            case "cnot":
              return (
                <ControlledGate
                  wireDirections={
                    gate.control == gate.target
                      ? []
                      : (gate.control < gate.target ? [Up] : [Down])
                  }
                  label="+"
                />
              );
            case "ccnot":
              return (
                <ControlledGate
                  wireDirections={[
                    Math.min(gate.control1, gate.control2) < gate.target ? [Up] : [],
                    Math.max(gate.control1, gate.control2) > gate.target ? [Down] : []
                  ].flat()}
                  label="+"
                />
              );
          }

        })()
      }
    </div>
  )
}