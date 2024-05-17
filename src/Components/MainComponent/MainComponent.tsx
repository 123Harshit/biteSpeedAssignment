import type { OnConnect } from "reactflow";
import "./MainComponent.css";
import {
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
} from "reactflow";

import "reactflow/dist/style.css";
import { TextUpdaterNode } from "../../nodes/customNode";
import SettingsPanel from "../SettingsPanel/SettingsPanel";
import NodePanel from "../NodePanel/NodePanel";

export default function MainComponent() {
  // we define the nodeTypes outside of the component to prevent re-renderings
  // you could also use useMemo inside the component
  const nodeTypes = useMemo(() => ({ textUpdater: TextUpdaterNode }), []);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodeSelected, setNodeSelected] = useState(false);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [editNodeVal, setEditNodeVal] = useState<String>("");
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<String>("");

  useEffect(() => {
    if (localStorage.getItem("nodes")) {
      setNodes(JSON.parse(localStorage.getItem("nodes") || ""));
      setEdges(JSON.parse(localStorage.getItem("edges") || ""));
    }
  }, []);

  const onConnect: OnConnect = useCallback(
    (connection) => {
      setEdges((edges) => {
        let sourceEdgeExist = edges.find((edge)=> edge.source === connection.source);
        if(sourceEdgeExist!==undefined){
            setErrorMessage("Cannot have multiple edges from a single source")
            setError(true)
            setTimeout(()=>{
                setError(false)
                setErrorMessage("")
            },3000)
        }
        return sourceEdgeExist!==undefined ? edges: addEdge(connection, edges);
      });
    },
    [setEdges]
  );

  const onNodeAdd = useCallback(
    () =>
      setNodes((prevNodes) => {
        let mn = [...prevNodes];
        const newNodeVal =
          "node-" + String(Math.floor(Math.random() * 100)) + Date.now();
        mn.push({
          id: newNodeVal,
          type: "textUpdater",
          position: { x: 0, y: 0 },
          data: { value: newNodeVal },
        });
        return mn;
      }),
    [setNodes]
  );

  const nodeClicked = (
    _: MouseEvent,
    n: any
  ) => {
    setSelectedNode(n);
    setNodeSelected(true);
  };

  const onNodeEdit = (val: String) => {
    setEditNodeVal(val);
  };

  const checkIfFlowIsGood = () => {
    if (nodes.length === 0) {
      return false;
    }
    let allTargets: any = [];
    edges.map((edge) => allTargets.push(edge.target));
    let count = 0;
    console.log(allTargets);

    for (let i = 0; i < nodes.length; i++) {
      if (allTargets.indexOf(nodes[i].id) == -1) {
        count = count + 1;
      }
      if (count > 1) {
        break;
      }
    }
    if (count > 1) {
      return false;
    }
    return true;
  };

  const saveChanges = () => {
    if (nodeSelected && selectedNode) {
      if (checkIfFlowIsGood()) {
        setNodes(
          nodes.map((node) => {
            if (node.id === selectedNode?.id) {
              node.data.value = editNodeVal;
            }
            return node;
          })
        );
        localStorage.setItem("nodes", JSON.stringify(nodes));
        localStorage.setItem("edges", JSON.stringify(edges));
        setSelectedNode(null);
        setNodeSelected(false);
        setEditNodeVal("");
      } else {
        setErrorMessage("Cannot Save")
        setError(true)
        setTimeout(()=>{
            setError(false)
            setErrorMessage("")
        },3000)
      }
    } else {
      if (checkIfFlowIsGood()) {
        localStorage.setItem("nodes", JSON.stringify(nodes));
        localStorage.setItem("edges", JSON.stringify(edges));
      } else {
        setErrorMessage("Cannot Save")
        setError(true);
        setTimeout(()=>{
            setError(false)
            setErrorMessage("")
        },3000)
      }
    }
  };

  const clearFlow = () => {
    localStorage.clear();
    setNodes([]);
    setEdges([]);
  };

  const settingsPanelBackClicked = () => {
    setSelectedNode(null);
    setNodeSelected(false);
    setEditNodeVal("");
  };

  return (
    <div className="container">
      <header className="main-header">
        {error && <div className="error-container">
            <span>{errorMessage}</span>
        </div>}
        <button className="save-button" onClick={() => saveChanges()}>
          Save Changes
        </button>
      </header>

      <div className="main-content">
        <div className="react-flow-container">
          <ReactFlow
            nodes={nodes}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            edges={edges}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={(_, n) => nodeClicked(_, n)}
            fitView
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={onNodeAdd}
          >
            <Background />
            <MiniMap />
            <Controls />
          </ReactFlow>
        </div>
        <div className="right-panel">
          {nodeSelected ? (
            <SettingsPanel
              node={selectedNode}
              updateVal={onNodeEdit}
              backClicked={settingsPanelBackClicked}
            />
          ) : (
            <NodePanel clearFlow={clearFlow} />
          )}
        </div>
      </div>
    </div>
  );
}
