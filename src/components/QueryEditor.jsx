import React, { useState } from "react";

const QueryEditor = ({ runQuery }) => {
  const [query, setQuery] = useState("");

  return (
    <div className="query-editor">
      <h3>Query Editor</h3>
      <textarea
        className="query-box"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Write your SQL query here..."
      />
      <button onClick={() => runQuery(query)}>Run Query</button>
    </div>
  );
};

export default QueryEditor;
