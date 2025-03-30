import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { useQueryHistory } from "../Context/QueryHistoryContext";
import { useSearchParams } from "react-router-dom";
import { useQueryLibraryContext } from "../Context/QueryLibraryContext";
import PreviewTable from "./PreviewTable";
import { debounce } from "lodash";

const QueryEditor = () => {
  const monaco = useMonaco();
  const { addQuery } = useQueryLibraryContext();
  const [tabs, setTabs] = useState([
    {
      id: 1,
      filename: "Query1.sql",
      query: `/*Example SQL Query 1: Find active users created in March 2025*/
SELECT user_id, username, first_name, last_name, email, city, country, created_at, last_login
FROM users
WHERE status = 'active'
AND created_at >= '2025-03-01'
AND created_at < '2025-04-01'
ORDER BY created_at;
      `,
      result: null,
    },
    {
      id: 2,
      filename: "Query2.sql",
      query: `/*Example SQL Query 2: Get product names and their categories*/
SELECT p.product_name, c.category_name
FROM products p
JOIN categories c ON p.category_id = c.category_id;
      `,
      result: null,
    },
    {
      id: 3,
      filename: "Query3.sql",
      query: `/*Example SQL Query 3: Count the number of orders placed each day in March 2025*/
SELECT DATE(order_date) AS order_day, COUNT(*) AS total_orders
FROM orders
WHERE order_date >= '2025-03-01' AND order_date < '2025-04-01'
GROUP BY DATE(order_date)
ORDER BY DATE(order_date);
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

  //running a query through history
  const { history, setHistory } = useQueryHistory();
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get("query");
  const queryName = searchParams.get("name");

  //  Implement debouncing  
  const updateQuery = useCallback(
    debounce((value) => {
        setTabs((prev) =>
            prev.map((tab) =>
                tab.id === activeTab ? { ...tab, query: value } : tab
            )
        );
    }, 300), 
    [activeTab, setTabs]
);


  useEffect(() => {
    if (queryParam) {
      addNewTabHistory(queryParam, queryName)
    }
  }, [queryParam]);

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

      // Save in history
      const activeTabData = tabs.find((tab) => tab.id === activeTab);
      if (!activeTabData) return;
      const newHistoryEntry = {
        tabName: activeTabData.filename,
        query: activeTabData.query,
        timestamp: new Date().toLocaleString(),
      };

      setHistory((prev) => [...prev, newHistoryEntry]);

      let mockResponse = [];

      if (activeTab === 1)
        mockResponse =[
          {
            user_id: 105,
            username: "coderGuru",
            first_name: "Dev",
            last_name: "Sharma",
            email: "guru@example.com",
            city: "Mumbai",
            country: "India",
            created_at: "2025-03-03T11:00:00Z",
            last_login: "2025-03-29T20:15:00Z",
          },
          {
            user_id: 108,
            username: "webWiz",
            first_name: "Priya",
            last_name: "Verma",
            email: "priya@example.com",
            city: "Delhi",
            country: "India",
            created_at: "2025-03-07T09:30:00Z",
            last_login: "2025-03-28T14:00:00Z",
          },
          {
            user_id: 112,
            username: "dataNinja",
            first_name: "Rahul",
            last_name: "Kumar",
            email: "ninja@example.com",
            city: "Bangalore",
            country: "India",
            created_at: "2025-03-10T15:45:00Z",
            last_login: "2025-03-30T01:20:00Z",
          },
          {
            user_id: 115,
            username: "designQueen",
            first_name: "Sneha",
            last_name: "Patel",
            email: "sneha@example.com",
            city: "Ahmedabad",
            country: "India",
            created_at: "2025-03-14T12:00:00Z",
            last_login: "2025-03-27T18:50:00Z",
          },
          {
            user_id: 118,
            username: "techExplorer",
            first_name: "Vikram",
            last_name: "Singh",
            email: "explorer@example.com",
            city: "Chennai",
            country: "India",
            created_at: "2025-03-18T17:15:00Z",
            last_login: "2025-03-29T11:30:00Z",
          },
          {
            user_id: 121,
            username: "codeAlchemist",
            first_name: "Anjali",
            last_name: "Gupta",
            email: "anjali@example.com",
            city: "Kolkata",
            country: "India",
            created_at: "2025-03-21T08:45:00Z",
            last_login: "2025-03-26T09:00:00Z",
          },
          {
            user_id: 125,
            username: "codeMaster",
            first_name: "Rohan",
            last_name: "Joshi",
            email: "master@example.com",
            city: "Pune",
            country: "India",
            created_at: "2025-03-25T14:30:00Z",
            last_login: "2025-03-30T03:45:00Z",
          },
          {
            user_id: 128,
            username: "logicPro",
            first_name: "Deepika",
            last_name: "Yadav",
            email: "deepika@example.com",
            city: "Jaipur",
            country: "India",
            created_at: "2025-03-29T10:00:00Z",
            last_login: "2025-03-29T22:55:00Z",
          },
        ];
      if (activeTab === 2)
        mockResponse = [
          { product_name: "Laptop Pro", category_name: "Electronics" },
          { product_name: "Wireless Mouse", category_name: "Electronics" },
          { product_name: "Cotton T-Shirt", category_name: "Apparel" },
          { product_name: "Running Shoes", category_name: "Apparel" },
          { product_name: "The Great Novel", category_name: "Books" },
        ];
      if (activeTab === 3)
        mockResponse = [
          { order_day: "2025-03-03", total_orders: 5 },
          { order_day: "2025-03-03", total_orders: 8 },
          { order_day: "2025-03-10", total_orders: 12 },
          { order_day: "2025-03-10", total_orders: 7 },
          { order_day: "2025-03-17", total_orders: 9 },
          { order_day: "2025-03-24", total_orders: 15 },
          { order_day: "2025-03-31", total_orders: 6 },
        ];
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
      query: `SELECT * FROM table_name;`,
      result: null,
    };
    setTabs([...tabs, newTab]);
    setActiveTab(newTab.id);
  };

  const addNewTabHistory = (query, name) => {
    const newTab = {
      id: tabs.length + 1,
      filename: name,
      query: query,
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
    const activeTabData = tabs.find((tab) => tab.id === activeTab);
    if (!activeTabData?.query.trim()) {
        toast.error("Query cannot be empty!", { position: "top-center" });
        return;
    }

    // ✅ Use prompt() to get user input
    const name = prompt("Enter query name", activeTabData.filename);
    const description = prompt("Enter query description", "Custom saved query");

    if (!name) {
        toast.error("Query name is required!", { position: "top-center" });
        return;
    }

    const newQuery = {
        id: Date.now(),
        title: name,
        description: description || "Custom saved query",
        query: activeTabData.query,
        lastRun: new Date().toLocaleString(),
    };
    

    addQuery(newQuery); 
    
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

  const editorRef = useRef(null); // Reference for the editor

  useEffect(() => {
    // Focusing editor on mount
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, []);

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
              height={"70vh"}
              width={"80vw"}
              defaultLanguage="sql"
              theme="vibrant-ink"
              value={tabs.find((tab) => tab.id === activeTab)?.query}
              onChange={updateQuery}
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
                    <b>
                      <kbd>Ctrl</kbd> + <kbd>Enter</kbd>
                    </b>
                    &nbsp; to run the query 🚀{" "}
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
            onChange={updateQuery}
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
            onMount={(editor, monaco) => {
              editorRef.current = editor; // Save editor instance

              editor.addCommand(
                monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
                () => {
                  runQuery(); // Execute query when Ctrl + Enter is pressed
                }
              );
            }}
          />

          <div className="query-editor-bottom">
            <div className="query-editor-bottom-left">
              <div className="tooltip-container">
                <Info size={19} className="editor-info" />
                <div className="tooltip-text">
                  <b>
                    <kbd>Ctrl</kbd> + <kbd>Enter</kbd>
                  </b>
                  &nbsp; to run the query 🚀{" "}
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
          {/* <pre>
            {JSON.stringify(
              tabs.find((tab) => tab.id === activeTab)?.result,
              null,
              2
            )}
          </pre> */}
          <PreviewTable filename={false} mockData={tabs.find((tab) => tab.id === activeTab)?.result} />
          </div>
      )}
    </>
  );
};

export default QueryEditor;
