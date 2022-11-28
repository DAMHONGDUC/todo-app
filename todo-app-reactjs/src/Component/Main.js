import React, { Component } from "react";
import Body from "./Body";

export default class Main extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          <label style={{ fontSize: 30, fontWeight: "bold" }}>TODO LIST</label>
          <Body></Body>
        </div>
      </div>
    );
  }
}
