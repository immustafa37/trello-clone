import React from "react";

const SearchBar = ({ search, setSearch }) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;