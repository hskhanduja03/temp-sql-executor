import React, { useState } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import {
  File,
  Plus,
  Save,
  Play,
  Settings,
  PlusIcon,
  SaveAll,
  Expand,
  Ellipsis,
  CircleCheckBig,
  Info,
} from "lucide-react";

const QueryEditor = () => {
  const monaco = useMonaco();
  const [query, setQuery] = useState(
    `/*Example SQL Query*/
SELECT *
FROM users
WHERE user_id > 100
AND status = 'active'
ORDER BY last_login DESC
LIMIT 20;
`
  );
  const [filename, setFilename] = useState("Untitled.sql");
  const [message, setMessage] = useState(null);

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

  return (
    <>
      <div className="query-container">
        {/* Header */}
        <div className="query-header">
          <div className="query-header-left">
            <h2 className="query-title">Query Editor</h2>
          </div>
          <div className="query-header-right">
            <button className="secondary-btn">
              <PlusIcon width={"1rem"} cursor={"pointer"} />
              <span>New Query</span>
            </button>
            <button className="primary-btn">
              <SaveAll width={"1rem"} cursor={"pointer"} />
              <span>Save Query</span>
            </button>
          </div>
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
                value={filename}
                spellCheck={false}
                className="filenameInput"
                onChange={(e) => setFilename(e.target.value)}
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
              <button>
                <Expand width={"1rem"} />
              </button>
              <button>
                <Ellipsis width={"1rem"} />
              </button>
            </div>
          </div>
          <Editor
            height={"25vh"}
            defaultLanguage="sql"
            theme="vibrant-ink"
            value={query}
            onChange={(value) => setQuery(value)}
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
            <div className="tooltip-container">
              <Info size={14} className="editor-info" />
              <div className="tooltip-text">Run the query to fetch results.</div>
            </div>
            <button className="tertiary-btn">
              <Play size={15} /> Run Query
            </button>
          </div>
        </div>
      </div>

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
