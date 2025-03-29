import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import QueryEditor from "./components/QueryEditor";
import QueryTable from "./components/QueryTable";
import Dashboard from "./pages/Dashboard";
import ThemeToggle from "./components/ThemeToggle";
import PreviewTable from "./components/PreviewTable";
import QueryHistory from "./components/QueryHistory";
import { QueryHistoryProvider } from "./Context/QueryHistoryContext";
import QueryLibrary from "./components/QueryLibrary";
import { QueryLibraryProvider } from "./Context/QueryLibraryContext";

function App() {
  return (
    <>
      <QueryHistoryProvider>
        <QueryLibraryProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route
                  index
                  element={<Dashboard Component={<QueryEditor />} />}
                />
                <Route
                  path="/preview"
                  element={<Dashboard Component={<PreviewTable />} />}
                />
                <Route
                  path="/library"
                  element={<Dashboard Component={<QueryLibrary />} />}
                />
                <Route
                  path="/settings"
                  element={"This is settings under Dev."}
                  />
                <Route
                  path="/profile"
                  element={"This is Profile under Dev."}
                />
                <Route path="/history" element={<QueryHistory />} />
              </Route>
            </Routes>
          </Router>
        </QueryLibraryProvider>
      </QueryHistoryProvider>
    </>
  );
}

export default App;
