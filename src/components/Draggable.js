import React, { useState, useEffect } from "react";
import RightClickMenu from "./RightClickMenu"
import "./Draggable.css"

const throttle = (f) => {
  let token = null, lastArgs = null;
  const invoke = () => {
      f(...lastArgs);
      token = null;
  };
  const result = (...args) => {
      lastArgs = args;
      if (!token) {
          token = requestAnimationFrame(invoke);
      }
  };
  result.cancel = () => token && cancelAnimationFrame(token);
  return result;
};

class Draggable extends React.PureComponent {

     state = {
        x: this.props.x,
        y: this.props.y,
        menuHidden: true
     }
  _relX = 0;
  _relY = 0;
  _ref = React.createRef();
  _move = (x, y) => this.setState({x, y});

  _onMouseDown = (event) => {
      if (event.button !== 0) {
          return;
      }
      const {scrollLeft, scrollTop, clientLeft, clientTop} = document.body;
      const {left, top} = this._ref.current.getBoundingClientRect();
      this._relX = event.pageX - (left + scrollLeft - clientLeft);
      this._relY = event.pageY - (top + scrollTop - clientTop);
      document.addEventListener('mousemove', this._onMouseMove);
      document.addEventListener('mouseup', this._onMouseUp);
      event.preventDefault();
  };

  _onMouseUp = (event) => {
      document.removeEventListener('mousemove', this._onMouseMove);
      document.removeEventListener('mouseup', this._onMouseUp);
      event.preventDefault();
  };

  _onMouseMove = (event) => {
      console.log("eventx:");
      console.log(event.pageX)
      console.log("eventy:");
      console.log(event.pageY)
      console.log("relx:");
      console.log(this._relX)
      console.log("rely:");
      console.log(this._relY)
      this._move(
          event.pageX - this._relX,
          event.pageY - this._relY,
        //   event.pageX + this._relX,
        //   event.pageY + this._relY,
      );
      event.preventDefault();
  };

  _update = throttle(() => {
      const {x, y} = this.state;
      this._ref.current.style.transform = `translate(${x}px, ${y}px)`;
  });

  componentDidMount() {
      this._ref.current.addEventListener('mousedown', this._onMouseDown);
      this._update();
  }

  componentDidUpdate() {
      this._update();
  }

  componentWillUnmount() {
      this._ref.current.removeEventListener('mousedown', this._onMouseDown);
      this._update.cancel();
  }

  render() {
      return (
          <div className="draggable" ref={this._ref}>
              <RightClickMenu hidden={this.state.menuShow}>
              <p>{this._relX}</p>
              <p>{this._relY}</p>
              </RightClickMenu>
              {this.props.children}
          </div>
      );
  }

}
export default Draggable;