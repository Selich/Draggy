import React, { useState, useEffect } from "react";
import Draggable from "./components/Draggable"
import "./App.css";


class App extends React.PureComponent {
  state = {
      x: 100,
      y: 200,
  };

  _move = (x, y) => this.setState({x, y});

  render() {
      const {x, y} = this.state;
      return (
          <Draggable x={x} y={y} onMove={this._move}>
              Drag me
          </Draggable>
      );
  }
}
export default App