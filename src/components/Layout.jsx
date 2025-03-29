import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [fade, setFade] = useState(true);
  const [currentPath, setCurrentPath] = useState(useLocation().pathname);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== currentPath) {
      setFade(false); // Start fade-out animation
      setTimeout(() => {
        setCurrentPath(location.pathname); // Update the current path after fade-out
        setFade(true); // Fade-in the new component
      }, 300); // Delay must match CSS animation duration
    }
  }, [location, currentPath]);

  return (
    <div className={`container ${collapsed ? "collapsed" : ""}`}>
      {/* Sidebar */}
      <div className="container-child-sidebar">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      {/* Main Content with Smooth Transitions */}
      <div className={`container-child ${fade ? "fade-in" : "fade-out"}`}>
        <Outlet key={currentPath} />
      </div>
    </div>
  );
};

export default Layout;
