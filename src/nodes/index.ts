import type { Node, NodeTypes } from "reactflow";
import { PositionLoggerNode } from "./PositionLoggerNode";
import { TextUpdaterNode } from "./customNode";

export const initialNodes = [
  { id: "a", position: { x: 0, y: 0 }, data: { label: "wire" } },
  {
    id: "b",
    type: "textUpdater",
    position: { x: -100, y: 100 },
    data: { label: "drag me!" },
  },
  // { id: "c", position: { x: 100, y: 100 }, data: { label: "your ideas" } },
  // {
  //   id: "d",
  //   type: "output",
  //   position: { x: 0, y: 200 },
  //   data: { label: "with React Flow" },
  // },
] satisfies Node[];

export const nodeTypes = {
  "position-logger": PositionLoggerNode,
  "textUpdater": TextUpdaterNode
  // Add any of your custom nodes here!
} satisfies NodeTypes;
