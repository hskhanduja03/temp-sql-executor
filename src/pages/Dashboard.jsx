import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const [queryFile, setQueryFile] = useState("/orders.csv");

  return (
    <div className="container">
      <Sidebar />
    </div>
  );
};

export default Dashboard;
