import React, { useState, useEffect } from "react";
import Draggable from "./components/Draggable";
import CommandBar from "./components/CommandBar";
import { Button } from "@material-ui/core";
import "./App.css";

function App() {
  const [hidden, setHidden] = useState(true);
  const [nodes, setNodes] = useState([]);
  const [num, setNum] = useState(0);

  useEffect(() => {
      setNum(nodes.length)
  }, [num,nodes]);

  const createNode = () => {
      setNodes(nodes.concat(<Draggable x={10} y={10}/>))
  };

  return (
    <div>
      <Button variant="contained" value="Upload" onClick={createNode}>
      {num}
      </Button>
      {
          nodes.map(node => ( node ))
      }




      <CommandBar hidden={hidden} />
    </div>
  );
}
export default App;
