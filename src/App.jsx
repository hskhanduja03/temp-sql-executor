import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import QueryEditor from "./components/QueryEditor";
import QueryTable from "./components/QueryTable";
import Dashboard from "./pages/Dashboard";
import ThemeToggle from "./components/ThemeToggle";
import PreviewTable from "./components/PreviewTable";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard Component={<QueryEditor/>} />} />
          <Route path="/preview" element={<Dashboard Component={<PreviewTable/>}/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
