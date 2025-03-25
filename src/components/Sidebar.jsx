import React, { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import {
  FileText,
  Plus,
  ChevronLast,
  ChevronFirst,
  ArrowLeftRight,
  Trash2,
  Settings,
  UserRoundPen,
  Zap,
  FileSearch2,
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
  { to: "/delete", icon: <Trash2 size={20} />, text: "DELETE Queries" },
  { to: "/advanced", icon: <Zap size={20} />, text: "Advanced Queries" },
];

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className={`sidebar ${expanded ? "expanded" : "collapsed"}`}>
      {/* Sidebar Logo & Toggle */}
      <div className="sidebar-logo">
        <p className={`sidebar-title ${expanded ? "" : "hidden-title"}`}>
          SQL Runner
        </p>
        <button
          onClick={() => setExpanded((curr) => !curr)}
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
        {/* <ThemeToggle /> */}
      </div>
    </div>
  );
};

export default Sidebar;
