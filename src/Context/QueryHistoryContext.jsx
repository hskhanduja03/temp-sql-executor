import React, { createContext, useContext, useState } from "react";

const QueryHistoryContext = createContext();

export const QueryHistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([]);

  return (
    <QueryHistoryContext.Provider value={{ history, setHistory}}>
      {children}
    </QueryHistoryContext.Provider>
  );
};

export const useQueryHistory = () => useContext(QueryHistoryContext);
