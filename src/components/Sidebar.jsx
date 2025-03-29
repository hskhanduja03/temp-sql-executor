import React, { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import {
  FileText,
  Plus,
  ChevronLast,
  ChevronFirst,
  ArrowLeftRight,
  Settings,
  UserRoundPen,
  Zap,
  FileSearch2,
  Eye,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const bottomLinks = [
  { to: "/settings", icon: <Settings size={20} />, text: "Settings" },
  { to: "/profile", icon: <UserRoundPen size={20} />, text: "Profile" },
];
const links = [
  { to: "/", icon: <FileText size={20} />, text: "All Queries" },
  { to: "/select", icon: <FileSearch2 size={20} />, text: "SELECT Queries" },
  { to: "/insert", icon: <Plus size={20} />, text: "INSERT Queries" },
  { to: "/update", icon: <ArrowLeftRight size={20} />, text: "UPDATE Queries" },
  { to: "/preview", icon: <Eye size={20} />, text: "Preview File" },
  { to: "/advanced", icon: <Zap size={20} />, text: "Advanced Queries" },
];

const Sidebar = ({ collapsed, setCollapsed }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className={`sidebar ${expanded ? "expanded" : "collapsed"}`}>
      {/* Sidebar Logo & Toggle */}
      <div className="sidebar-logo">
        <p className={`sidebar-title ${expanded ? "" : "hidden-title"}`}>
          SQL Runner
        </p>
        <button
          onClick={() => {
            setExpanded((curr) => !curr);
            setCollapsed(!collapsed);
          }}
          className="collapseBtn"
        >
          {expanded ? <ChevronFirst /> : <ChevronLast />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-nav">
        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.to}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            {link.icon}
            <span className="sidebar-text">{link.text}</span>
          </NavLink>
        ))}
        <p
          href="#"
          className={`button-anon-pen ${expanded ? "expanded" : "collapsed"}`}
        >
          {expanded ? <span>AI Insights ✨</span> : <span>✨</span>}
        </p>
      </nav>
      {/* Bottom Links */}
      <div className="theme-toggle">
        {bottomLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.to}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            {link.icon}
            <span className="sidebar-text">{link.text}</span>
          </NavLink>
        ))}
        {/* <button className="tempbutton">Get Started</button> */}

        {/* <ThemeToggle /> */}
      </div>
    </div>
  );
};

export default Sidebar;
