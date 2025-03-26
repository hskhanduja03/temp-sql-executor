import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import QueryEditor from "./components/QueryEditor";
import QueryTable from "./components/QueryTable";
import Dashboard from "./pages/Dashboard";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          {/* <Route path="query-editor" element={<QueryEditor />} />
          <Route path="query-table" element={<QueryTable />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
