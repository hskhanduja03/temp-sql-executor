import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`container ${collapsed ? "collapsed" : ""}`}>
      {/* Sidebar */}
      <div className="container-child-sidebar">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      {/* Main Content */}
      <div className="container-child">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
