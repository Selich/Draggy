import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";

class RightClickMenu extends React.Component {
  state = {
    hide: true
  };
  componentDidMount() {
    document.addEventListener("contextmenu", this._handleContextMenu);
    document.addEventListener("click", this._handleClick);
    document.addEventListener("scroll", this._handleScroll);
  }
  componentWillUnmount() {
    document.removeEventListener("contextmenu", this._handleContextMenu);
    document.removeEventListener("click", this._handleClick);
    document.removeEventListener("scroll", this._handleScroll);
  }

  _handleContextMenu = (event) => {
        event.preventDefault();

        if(!this.state.hide){
            this.setState({ hide: true });
        } else{

        
        this.setState({ hide: false });
        
        const clickX = event.clientX;
        const clickY = event.clientY;
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        const rootW = this.root.offsetWidth;
        const rootH = this.root.offsetHeight;
        
        const right = (screenW - clickX) > rootW;
        const left = !right;
        const top = (screenH - clickY) > rootH;
        const bottom = !top;
        
        }
    };

  _handleClick = event => {
    const { hide } = this.state;
    const wasOutside = !(event.target.contains === this.root);

    if (wasOutside && hide) this.setState({ hide: true });
  };
  _handleScroll = () => {
    const { hide } = this.state;

    if (hide) this.setState({ hide: true });
  };

  render() {
    const { hide } = this.state;
    return (
      <div
        ref={ref => {
          this.root = ref;
        }}
        hidden={hide}
        className="contextMenu"
      >
      {this.props.children}
      </div>
    );
  }
}
export default RightClickMenu;
