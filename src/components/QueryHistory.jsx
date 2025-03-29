import React from "react";
import { useQueryHistory } from "../Context/QueryHistoryContext";
import { Play, Trash, Star, MoreVertical } from "lucide-react"; // Icons
import "../styles/historyComp.css"
import { useNavigate } from "react-router-dom";
const QueryHistory = () => {
  const { history, setHistory } = useQueryHistory();
  const navigate = useNavigate(); // Initialize navigate function

  const handleRunQuery = (query, name) => {
    navigate(`/?query=${encodeURIComponent(query)}&name=${encodeURIComponent(name)}`); // Redirect with query
  };
  
  return (
    <div className="query-history-container">
      <h2 className="query-history-title">Query History</h2>

      <div className="query-tabs">
        <button className="tab active">Recently Executed</button>
      </div>

      <div className="query-list">
        {history.length === 0 ? (
          <p className="query-empty">No queries in history yet.</p>
        ) : (
          history.map((item, index) => (
            <div key={index} className="query-card">
              <div className="query-header">
                <div className="query-icon">
                  <Play size={16} />
                </div>
                <div className="query-details">
                  <h4>{item.tabName}</h4>  {/* Tab Name */}
                  <p>{item.timestamp}</p>  {/* Execution Time */}
                </div>
                <MoreVertical className="query-menu" size={18} />
              </div>

              <pre className="query-text">{item.query}</pre> {/* Query Display */}

              <div className="query-footer">
                <span className="query-time">Last run: {item.timestamp}</span>
                <div className="query-actions">
                  <button className="icon-btn"onClick={() => handleRunQuery(item.query, item.tabName)}>
                    <Play size={16} color="blue"/>
                  </button>
                  <button className="icon-btn">
                    <Star size={16} color="#F9C23E"/>
                  </button>
                  <button
                    className="icon-btn delete-btn"
                    onClick={() =>
                      setHistory((prev) => prev.filter((_, i) => i !== index))
                    }
                  >
                    <Trash size={16} color="red"/>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default QueryHistory;
