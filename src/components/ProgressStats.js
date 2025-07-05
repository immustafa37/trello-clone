import React from "react";

const ProgressStats = ({ columns }) => {
  const total = Object.values(columns).reduce(
    (sum, col) => sum + col.length,
    0
  );

  return (
    <div style={{ display: "flex", gap: "20px", marginBottom: "10px" }}>
      <span>📋 Total Tasks: {total}</span>
      <span>🕐 ToDo: {columns.todo.length}</span>
      <span>⏳ Doing: {columns.doing.length}</span>
      <span>✅ Done: {columns.done.length}</span>
    </div>
  );
};

export default ProgressStats;