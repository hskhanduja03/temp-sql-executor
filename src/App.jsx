import React from "react";
import Dashboard from "./pages/Dashboard";
import "./styles/global.css";
import "./styles/theme.css";
import { BrowserRouter as Router } from "react-router-dom";
const App = () => {
  return (
    <Router>
      <Dashboard />
    </Router>
  );
};

export default App;
