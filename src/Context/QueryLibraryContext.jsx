import React, { createContext, useContext, useState } from "react";

// Create Context
const QueryLibraryContext = createContext();

// Context Provider
export const QueryLibraryProvider = ({ children }) => {
  const [queries, setQueries] = useState([]);

  // Function to add a new query
  const addQuery = (query) => {
    setQueries((prev) => [...prev, query]);
  };

  // Function to remove a query
  const removeQuery = (id) => {
    setQueries((prev) => prev.filter((query) => query.id !== id));
  };

  return (
    <QueryLibraryContext.Provider value={{ queries, setQueries, addQuery, removeQuery }}>
      {children}
    </QueryLibraryContext.Provider>
  );
};

// Custom Hook
export const useQueryLibraryContext = () => {
  return useContext(QueryLibraryContext);
};
