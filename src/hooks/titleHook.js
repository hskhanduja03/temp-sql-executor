import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useTitle = () => {
  const location = useLocation();

  useEffect(() => {
    let title = "SQL Runner"; 
    switch (location.pathname) {
      case "/":
        title = "SQL Runner - Home";
        break;
      case "/preview":
        title = "SQL Runner - File Preview";
        break;
      case "/history":
        title = "SQL Runner - Query History";
        break;
      case "/library":
        title = "SQL Runner - Query Library";
        break;
      case "/settings":
        title = "SQL Runner - Settings";
        break;
      default:
        title = "SQL Runner";
    }

    document.title = title;
  }, [location.pathname]);
};

export default useTitle;
