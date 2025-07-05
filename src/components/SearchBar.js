import React from "react";

const SearchBar = ({ search, setSearch }) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <label htmlFor="taskSearch" style={{ display: "none" }}>
        Search Tasks
      </label>
      <input
        id="taskSearch"
        type="text"
        placeholder="🔍 Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search tasks"
      />
    </div>
  );
};

export default SearchBar;