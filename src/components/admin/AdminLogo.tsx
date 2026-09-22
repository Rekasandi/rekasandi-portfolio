import React from "react";

export function AdminLogo() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        textDecoration: "none",
      }}
    >
      <span
        style={{
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          backgroundColor: "#d7ff3f",
          border: "2px solid #0a0a0a",
          display: "inline-block",
          boxShadow: "0 0 8px rgba(215,255,63,0.8)",
        }}
      />
      <span
        style={{
          fontFamily: "monospace, sans-serif",
          fontWeight: 800,
          fontSize: "1.1rem",
          letterSpacing: "0.18em",
          color: "currentColor",
          textTransform: "uppercase",
        }}
      >
        REKASANDI
      </span>
      <span
        style={{
          fontFamily: "monospace, sans-serif",
          fontSize: "0.7rem",
          letterSpacing: "0.08em",
          padding: "2px 6px",
          borderRadius: "4px",
          backgroundColor: "rgba(215,255,63,0.2)",
          color: "#10b981",
          fontWeight: 600,
        }}
      >
        CMS
      </span>
    </div>
  );
}
