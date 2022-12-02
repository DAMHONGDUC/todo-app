import React from "react";
import Body from "./Body";

export default function Main() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <label
          style={{
            marginLeft: 120,
            fontSize: 30,
            fontWeight: "bold",
            color: "#f00",
          }}
        >
          TODO LIST
        </label>
        <Body></Body>
      </div>
    </div>
  );
}
