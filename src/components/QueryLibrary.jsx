import React, { useState } from "react";
import { useQueryLibraryContext } from "../Context/QueryLibraryContext";
import "../styles/libraryComp.css";
import { ToastContainer, toast } from "react-toastify";
import { CopyCheck, Edit, Play, Trash2, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QueryLibrary = () => {
  const { queries, setQueries } = useQueryLibraryContext();
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedQuery, setEditedQuery] = useState("");
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const navigate = useNavigate();

  // ✅ Handle Copy
  const handleCopy = (queryText) => {
    navigator.clipboard.writeText(queryText);
    toast.success("Query copied!", { icon: <CopyCheck size={20} color="green" /> });
  };

  // ✅ Handle Delete
  const handleDelete = (id) => {
    setQueries(queries.filter((query) => query.id !== id));
    toast.success("Query deleted!", { icon: <Trash2 size={20} color="red" /> });
  };

  // ✅ Handle Edit Start
  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedQuery(queries[index].query);
    setEditedTitle(queries[index].title);
    setEditedDescription(queries[index].description);
  };

  // ✅ Handle Save Edited Query
  const handleSaveEdit = (index) => {
    const updatedQueries = [...queries];
    updatedQueries[index] = {
      ...updatedQueries[index],
      query: editedQuery,
      title: editedTitle,
      description: editedDescription,
    };
    setQueries(updatedQueries);
    setEditingIndex(null);
    toast.success("Query updated!", { icon: <Save size={20} color="green" /> });
  };

  // ✅ Handle Query Execution
  const handleRunQuery = (query, name) => {
    navigate(`/?query=${encodeURIComponent(query)}&name=${encodeURIComponent(name)}`);
  };

  return (
    <>
      <ToastContainer />
      <div className="qlib-container">
        <h2 className="qlib-title">Saved Queries</h2>

        <div className="qlib-query-grid">
          {queries.length === 0 ? (
            <p className="qlib-empty">No saved queries yet.</p>
          ) : (
            queries.map((query, index) => (
              <div key={query.id} className="qlib-query-card">
                <div className="qlib-query-header">
                  {editingIndex === index ? (
                    <input
                      type="text"
                      className="qlib-edit-title"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                    />
                  ) : (
                    <h3>{'📌' + query.title}</h3>
                  )}
                  <button className="qlib-run-btn" onClick={() => handleRunQuery(query.query, query.title)}>
                    <Play />
                  </button>
                </div>

                {editingIndex === index ? (
                  <textarea
                    className="qlib-edit-textarea"
                    value={editedQuery}
                    onChange={(e) => setEditedQuery(e.target.value)}
                  />
                ) : (
                  <pre className="qlib-query-code">{query.query}</pre>
                )}

                <div className="qlib-query-footer">
                  <span className="qlib-last-run">Last run: {query.lastRun || "N/A"}</span>
                  <div className="qlib-query-actions">
                    <button className="qlib-copy-btn" onClick={() => handleCopy(query.query)}>
                      📋 Copy
                    </button>
                    {editingIndex === index ? (
                      <button className="qlib-save-btn" onClick={() => handleSaveEdit(index)}>
                        💾 Save
                      </button>
                    ) : (
                      <button className="qlib-edit-btn" onClick={() => handleEdit(index)}>
                        ✏️ Edit
                      </button>
                    )}
                    <button className="qlib-delete-btn" onClick={() => handleDelete(query.id)}>
                      🗑 Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default QueryLibrary;
