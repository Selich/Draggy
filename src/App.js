import React, { useState, useEffect } from "react";
import Draggable from "./components/Draggable";
import CommandBar from "./components/CommandBar";
import { Button } from "@material-ui/core";
import "./App.css";

function App() {
  const [hidden, setHidden] = useState(true);
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    setNodes(nodes);
  }, [nodes]);

  const createNode = () => {
    let arr = nodes
    nodes.push({
        x: 0,
        y: 0,
        data: "Data"
    })
    setNodes(arr)
  };

  return (
    <div>
      <Button value="Upload" onClick={createNode}>
        Button
      </Button>
        <Draggable x={33} y={88}>Test</Draggable>
      {
        nodes.map(node => (
        <Draggable x={node.x} y={node.y}>D</Draggable>
        ))

      }

      <CommandBar hidden={hidden} />
    </div>
  );
}
export default App;
