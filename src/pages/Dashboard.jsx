import React, { useState } from "react";
import QueryEditor from "../components/QueryEditor";
import PreviewTable from "../components/PreviewTable";

const Dashboard = ({Component}) => {

  return (
    <div className="dashboard">
      {Component}
    </div>
  );
};

export default Dashboard;
