import React, { useEffect, useState } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { ToastContainer, toast } from "react-toastify";

import {
  Plus,
  Play,
  PlusIcon,
  SaveAll,
  Expand,
  CircleCheckBig,
  Info,
  Clock5,
  CircleX,
  CircleCheck,
  Minimize,
  Copy,
  CopyCheck,
  Share2,
} from "lucide-react";

const QueryEditor = () => {
  const monaco = useMonaco();
  const [tabs, setTabs] = useState([
    {
      id: 1,
      filename: "Query1.sql",
      query: `/*Example SQL Query*/
SELECT *
FROM users
WHERE user_id > 100
AND status = 'active'
ORDER BY last_login DESC
LIMIT 20;
      `,
      result: null,
    },
    {
      id: 2,
      filename: "Query2.sql",
      query: `/*Example SQL Query*/
SELECT *
FROM transport
Where happy = 'active'
      `,
      result: null,
    },
  ]);
  const [activeTab, setActiveTab] = useState(1);
  const [runningQuery, setRunningQuery] = useState(false);
  const [queryExecuted, setQueryExecuted] = useState(false);
  const [message, setMessage] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [sharing, setSharing] = useState(false);

  React.useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme("vibrant-ink", {
        base: "vs", // Light mode
        inherit: true,
        rules: [
          { token: "keyword", foreground: "d91e18", fontStyle: "bold" },
          { token: "string", foreground: "007f00" },
          { token: "comment", foreground: "999999", fontStyle: "italic" },
          { token: "number", foreground: "ff9800" },
          { token: "operator", foreground: "000000" },
        ],
        colors: {
          "editor.background": "#f9f9f9",
          "editor.foreground": "#222222",
          "editor.selectionBackground": "#cceeff",
          "editor.lineHighlightBackground": "#e8f4ff",
          "editorCursor.foreground": "#d91e18",
        },
      });

      monaco.editor.setTheme("vibrant-ink");
    }
  }, [monaco]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Handle Running Query (Mock Response)
  const runQuery = () => {
    setRunningQuery(true); // Show loading animation for 1s
    setQueryExecuted(false);
    setTimeout(() => {
      // After 1s, execute query and update state
      const query = tabs.find((tab) => tab.id === activeTab)?.query;
      let mockResponse = [];

      if (activeTab === 1)
        mockResponse = { id: 1, name: "John Doe", email: "john@example.com" };
      if (activeTab === 2)
        mockResponse = {
          id: 2,
          name: "Hello Ji",
          email: "HelloJi@example.com",
        };
      if (activeTab === 3)
        mockResponse = { id: 3, name: "Harmeet", email: "harmeet@example.com" };

      setTabs((prev) =>
        prev.map((tab) =>
          tab.id === activeTab ? { ...tab, result: mockResponse } : tab
        )
      );

      setQueryExecuted(true);
      setRunningQuery(false);
    }, 1000); // Initial 1s delay before setting runningQuery
  };

  // Handle Adding New Tab
  const addNewTab = () => {
    const newTab = {
      id: tabs.length + 1,
      filename: `Query${tabs.length + 1}.sql`,
      query: "SELECT * FROM table_name;",
      result: null,
    };
    setTabs([...tabs, newTab]);
    setActiveTab(newTab.id);
  };

  const deleteTab = (id) => {
    if (tabs.length === 1) return; // Prevent deleting the last tab

    setTabs((prevTabs) => {
      const updatedTabs = prevTabs.filter((tab) => tab.id !== id);

      // Find the next active tab
      if (id === activeTab) {
        const newActiveTab =
          updatedTabs.length > 0
            ? updatedTabs[updatedTabs.length - 1].id
            : null;
        setActiveTab(newActiveTab);
      }

      return updatedTabs;
    });
  };

  // ✅ Handle Save Query - Show Success Toast
  const handleSaveQuery = () => {
    toast.success("Query saved successfully!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  const [editorHeight, setEditorHeight] = useState("25vh"); // Default height

  // Function to calculate editor height dynamically
  const calculateEditorHeight = (query) => {
    const lines = query.split("\n").length;
    const newHeight = Math.min(60, Math.max(25, lines * 2)) + "vh"; // Min: 25vh, Max: 60vh
    setEditorHeight(newHeight);
  };

  // Update height when the query changes
  useEffect(() => {
    const currentQuery = tabs.find((tab) => tab.id === activeTab)?.query || "";
    calculateEditorHeight(currentQuery);
  }, [tabs, activeTab]);

  const handleCopy = () => {
    const currentQuery = tabs.find((tab) => tab.id === activeTab)?.query;

    if (!currentQuery) {
      toast.error("Nothing to copy!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
      });
      return;
    }

    navigator.clipboard
      .writeText(currentQuery)
      .then(() => {
        toast.success("Query copied to clipboard!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: "light",
          icon: <CopyCheck size={20} color="green" />,
        });
      })
      .catch(() => {
        toast.error("Failed to copy!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: "light",
        });
      });
  };

  return (
    <>
      {sharing && (
        <>
          <div className="shareOverlay" onClick={() => setSharing(false)}></div>
          <div className="sharePopup">
            <div className="sharePopupHeader">
              <h3>Share this Query</h3>
              <button
                className="shareCloseBtn"
                onClick={() => setSharing(false)}
              >
                <CircleX />
              </button>
            </div>
            <div className="sharePopupBody">
              <input
                type="text"
                value={`https://sqlrunner.com/share/${
                  tabs.find((tab) => tab.id === activeTab)?.filename
                }`}
                readOnly
                className="sharePopupLink"
                id="shareLinkInput"
              />
              <button
                className="shareCopyBtn"
                onClick={() => {
                  const link = document.getElementById("shareLinkInput").value;
                  navigator.clipboard.writeText(link);
                  toast.success("Link copied!", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    theme: "light",
                  });
                  setTimeout(() => setSharing(false), 200);
                }}
              >
                📋 Copy
              </button>
            </div>
          </div>
        </>
      )}

      {isExpanded ? (
        <div className="expanded-editor">
          <div className="query-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`query-tab ${tab.id === activeTab ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.filename}
                <CircleX
                  size={16}
                  onClick={() => deleteTab(tab.id)}
                  className="delete-icon"
                />
              </button>
            ))}
            <button className="query- tab add-tab" onClick={addNewTab}>
              <Plus size={16} />
            </button>
          </div>

          {/* Monaco Editor */}
          <div className="query-editor-wrapper">
            <div className="query-editor-top">
              <div className="query-editor-top-left">
                <div
                  className="circle"
                  style={{ backgroundColor: "#EF4444" }}
                ></div>
                <div
                  className="circle"
                  style={{ backgroundColor: "#EAB308" }}
                ></div>
                <div
                  className="circle"
                  style={{ backgroundColor: "#22C55E" }}
                ></div>
                <input
                  type="text"
                  value={tabs.find((tab) => tab.id === activeTab)?.filename}
                  className="filenameInput"
                  onChange={(e) =>
                    setTabs((prev) =>
                      prev.map((tab) =>
                        tab.id === activeTab
                          ? { ...tab, filename: e.target.value }
                          : tab
                      )
                    )
                  }
                  spellCheck={false}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.target.blur();
                      setMessage("Updated successfully");
                      setTimeout(() => setMessage(null), 1500);
                    }
                  }}
                />
                <span className="successMessage">
                  {message && (
                    <>
                      <CircleCheckBig style={{ marginRight: "5px" }} />
                      {message}
                    </>
                  )}
                </span>{" "}
              </div>
              <div className="query-editor-top-right">
                <button onClick={handleCopy}>
                  <Copy />
                </button>
                <button onClick={toggleExpand}>
                  {isExpanded ? (
                    <Minimize size={"1rem"} />
                  ) : (
                    <Expand width={"1rem"} />
                  )}
                </button>
                <button>
                  <Share2 width={"1rem"} />
                </button>
              </div>
            </div>
            <Editor
              height={"75vh"}
              width={"80vw"}
              defaultLanguage="sql"
              theme="vibrant-ink"
              value={tabs.find((tab) => tab.id === activeTab)?.query}
              onChange={(value) =>
                setTabs((prev) =>
                  prev.map((tab) =>
                    tab.id === activeTab ? { ...tab, query: value } : tab
                  )
                )
              }
              options={{
                fontSize: 14,
                fontLigatures: true,
                automaticLayout: true,
                wordWrap: "on",
                scrollBeyondLastLine: false,
                bracketPairColorization: true,
                formatOnType: true,
                formatOnPaste: true,
                smoothScrolling: true,
                cursorStyle: "line-thin",
                lineHeight: 22,
                minimap: { enabled: false },
                renderLineHighlight: "all",
                overviewRulerBorder: false,
                guides: {
                  indentation: true,
                  bracketPairs: true,
                },
                scrollbar: {
                  verticalScrollbarSize: 3,
                  horizontalScrollbarSize: 3,
                  alwaysConsumeMouseWheel: false,
                },
                lineNumbers: "on",
                folding: true,
              }}
            />

            <div className="query-editor-bottom">
              <div className="query-editor-bottom-left">
                <div className="tooltip-container">
                  <Info size={19} className="editor-info" />
                  <div className="tooltip-text">
                    Run the query to fetch results.
                  </div>
                </div>
                {queryExecuted && (
                  <div className="query-stats">
                    <CircleCheck size={19} style={{ color: "green" }} />
                    <span>Successfully Executed</span>
                    <Clock5 size={19} style={{ color: "blue" }} />
                    <span>{`Execution time: 0.${Math.floor(
                      Math.random() * 100
                    )} s`}</span>
                  </div>
                )}
              </div>
              <button
                className="tertiary-btn"
                onClick={runQuery}
                disabled={runningQuery}
              >
                {runningQuery ? (
                  <span className="loading-spinner"></span>
                ) : (
                  <>
                    <Play size={15} /> Run Query
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="query-container">
        <ToastContainer />
        {/* Header */}
        <div className="query-header">
          <div className="query-header-left">
            <h2 className="query-title">Query Editor</h2>
          </div>
          <div className="query-header-right">
            <button className="secondary-btn" onClick={addNewTab}>
              <PlusIcon width={"1rem"} />
              <span>New Query</span>
            </button>
            <button className="primary-btn" onClick={handleSaveQuery}>
              <SaveAll width={"1rem"} />
              <span>Save Query</span>
            </button>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="query-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`query-tab ${tab.id === activeTab ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.filename}
              <CircleX
                size={16}
                onClick={() => deleteTab(tab.id)}
                className="delete-icon"
              />
            </button>
          ))}
          <button onClick={addNewTab}>
            <Plus size={16} />
          </button>
        </div>

        {/* Monaco Editor */}
        <div className="query-editor-wrapper">
          <div className="query-editor-top">
            <div className="query-editor-top-left">
              <div
                className="circle"
                style={{ backgroundColor: "#EF4444" }}
              ></div>
              <div
                className="circle"
                style={{ backgroundColor: "#EAB308" }}
              ></div>
              <div
                className="circle"
                style={{ backgroundColor: "#22C55E" }}
              ></div>
              <input
                type="text"
                value={tabs.find((tab) => tab.id === activeTab)?.filename}
                className="filenameInput"
                onChange={(e) =>
                  setTabs((prev) =>
                    prev.map((tab) =>
                      tab.id === activeTab
                        ? { ...tab, filename: e.target.value }
                        : tab
                    )
                  )
                }
                spellCheck={false}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.target.blur();
                    setMessage("Updated successfully");
                    setTimeout(() => setMessage(null), 1500);
                  }
                }}
              />
              <span className="successMessage">
                {message && (
                  <>
                    <CircleCheckBig style={{ marginRight: "5px" }} />
                    {message}
                  </>
                )}
              </span>{" "}
            </div>
            <div className="query-editor-top-right">
              <button onClick={handleCopy}>
                <Copy size={16} />
              </button>
              <button onClick={toggleExpand}>
                {isExpanded ? (
                  <Minimize size={"1rem"} />
                ) : (
                  <Expand width={"1rem"} />
                )}
              </button>
              <button onClick={() => setSharing(true)}>
                <Share2 width={"1rem"} />
              </button>
            </div>
          </div>
          <Editor
            height={editorHeight}
            defaultLanguage="sql"
            theme="vibrant-ink"
            value={tabs.find((tab) => tab.id === activeTab)?.query}
            onChange={(value) =>
              setTabs((prev) =>
                prev.map((tab) =>
                  tab.id === activeTab ? { ...tab, query: value } : tab
                )
              )
            }
            options={{
              fontSize: 14,
              fontLigatures: true,
              automaticLayout: true,
              wordWrap: "on",
              scrollBeyondLastLine: false,
              bracketPairColorization: true,
              formatOnType: true,
              formatOnPaste: true,
              smoothScrolling: true,
              cursorStyle: "line-thin",
              lineHeight: 22,
              minimap: { enabled: false },
              renderLineHighlight: "all",
              overviewRulerBorder: false,
              guides: {
                indentation: true,
                bracketPairs: true,
              },
              scrollbar: {
                verticalScrollbarSize: 3,
                horizontalScrollbarSize: 3,
                alwaysConsumeMouseWheel: false,
              },
              lineNumbers: "on",
              folding: true,
            }}
          />

          <div className="query-editor-bottom">
            <div className="query-editor-bottom-left">
              <div className="tooltip-container">
                <Info size={19} className="editor-info" />
                <div className="tooltip-text">
                  Run the query to fetch results.
                </div>
              </div>
              {queryExecuted && (
                <div className="query-stats">
                  <CircleCheck size={19} style={{ color: "green" }} />
                  <span>Successfully Executed</span>
                  <Clock5 size={19} style={{ color: "blue" }} />
                  <span>{`Execution time: 0.${Math.floor(
                    Math.random() * 100
                  )} s`}</span>
                </div>
              )}
            </div>
            <button
              className="tertiary-btn"
              onClick={runQuery}
              disabled={runningQuery}
            >
              {runningQuery ? (
                <span className="loading-spinner"></span>
              ) : (
                <>
                  <Play size={15} /> Run Query
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Query Results */}
      {tabs.find((tab) => tab.id === activeTab)?.result && (
        <div className="query-results">
          <h2>Query Result:</h2>
          <pre>
            {JSON.stringify(
              tabs.find((tab) => tab.id === activeTab)?.result,
              null,
              2
            )}
          </pre>
        </div>
      )}

      {/* Controls */}
      {/* <div className="query-controls">
        
        <div className="query-settings">
          <span className="label">Database:</span>
          <select className="dropdown">
            <option>production_db</option>
            <option>development_db</option>
          </select>
          <span className="label">Timeout:</span>
          <select className="dropdown">
            <option>10s</option>
            <option>30s</option>
          </select>
          <Settings size={20} className="settings-icon" />
        </div>
      </div> */}
    </>
  );
};

export default QueryEditor;
