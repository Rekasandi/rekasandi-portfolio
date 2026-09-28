import React from "react";

export function AdminIcon() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "28px",
        height: "28px",
        borderRadius: "50%",
        backgroundColor: "#0a0a0a",
        position: "relative",
      }}
    >
      <span
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor: "#B91C1C",
          boxShadow: "0 0 6px rgba(185,28,28,0.9)",
        }}
      />
    </div>
  );
}
