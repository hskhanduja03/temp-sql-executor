import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import QueryEditor from "./components/QueryEditor";
import QueryTable from "./components/QueryTable";
import Dashboard from "./pages/Dashboard";
import ThemeToggle from "./components/ThemeToggle";
import PreviewTable from "./components/PreviewTable";
import QueryHistory from "./components/QueryHistory";
import { QueryHistoryProvider } from "./Context/QueryHistoryContext";

function App() {
  return (
    <>
      <QueryHistoryProvider>
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
                path="/history"
                element={<QueryHistory />}
              />
            </Route>
          </Routes>
        </Router>
      </QueryHistoryProvider>
    </>
  );
}

export default App;
