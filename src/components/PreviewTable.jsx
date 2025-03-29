import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import ordersCSV from "../data/customers.csv"; // Default CSV file for initial data loading
import { saveAs } from "file-saver"; // Utility for exporting data as files
import { Download } from "lucide-react"; // Icon component for download buttons

export default function PreviewTable() {
  const [data, setData] = useState([]); // Stores complete CSV data
  const [filteredData, setFilteredData] = useState([]); // Stores filtered results based on search
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "none",
  }); // Handles sorting configurations
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [pageIndex, setPageIndex] = useState(0); // Current page index for pagination
  const [selectedFile, setSelectedFile] = useState("Orders.csv"); // Stores name of uploaded file
  const pageSize = 5; // Number of records per page

  useEffect(() => {
    fetch(ordersCSV)
      .then((res) => res.text())
      .then((text) => parseCSV(text)); // Load and parse CSV on component mount
  }, []);

  // Parses CSV data into JSON format
  const parseCSV = (csvText) => {
    Papa.parse(csvText, {
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        setData(result.data);
        setFilteredData(result.data);
        setPageIndex(0); // Reset pagination after new data load
      },
    });
  };

  // Handles sorting logic for table columns
  const handleSort = (key) => {
    setSortConfig((prev) => {
      let newDirection = "asc";
      if (prev.key === key) {
        if (prev.direction === "asc") newDirection = "desc";
        else if (prev.direction === "desc") newDirection = "none";
      }
      return { key, direction: newDirection };
    });
  };

  // Sorts data based on selected column and direction
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key || sortConfig.direction === "none") return 0;
    return sortConfig.direction === "asc"
      ? a[sortConfig.key] > b[sortConfig.key]
        ? 1
        : -1
      : a[sortConfig.key] < b[sortConfig.key]
      ? 1
      : -1;
  });

  useEffect(() => {
    // Filters data based on search query
    const filtered = data.filter((row) =>
      Object.values(row).some((val) =>
        val?.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredData(filtered);
    setPageIndex(0); // Reset pagination when filtering
  }, [searchQuery, data]);

  // Handles file upload and parses new CSV file
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file.name);
      const reader = new FileReader();
      reader.onload = (e) => parseCSV(e.target.result);
      reader.readAsText(file);
    }
  };

  // Gets paginated data for current page
  const paginatedData = sortedData.slice(
    pageIndex * pageSize,
    (pageIndex + 1) * pageSize
  );

  // Exports filtered data as CSV file
  const exportCSV = () => {
    const csv = Papa.unparse(filteredData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "filtered_data.csv");
  };

  // Exports filtered data as JSON file
  const exportJSON = () => {
    const json = JSON.stringify(filteredData, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    saveAs(blob, "filtered_data.json");
  };

  const totalPages = Math.ceil(filteredData.length / pageSize); // Total number of pages

  // Generates pagination numbers dynamically
  const getPaginationNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 2; 

    if (totalPages <= 7) {
      return [...Array(totalPages).keys()].map((i) => i + 1);
    }

    pageNumbers.push(1, 2);

    if (pageIndex > 3) {
      pageNumbers.push("...");
    }

    const start = Math.max(3, pageIndex);
    const end = Math.min(totalPages - 2, pageIndex + maxVisiblePages);

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    if (pageIndex < totalPages - 4) {
      pageNumbers.push("...");
    }

    pageNumbers.push(totalPages - 1, totalPages);

    return pageNumbers;
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 className="query-title">File Preview</h2>
        <div className="file-upload-container">
          <label className="custom-file-upload">
            <input
              type="file"
              className="file-input"
              accept=".csv"
              onChange={handleFileUpload}
            />
            📂 Upload
          </label>
        </div>
      </div>
      <div className="table-container">
        <div className="table-header-section">
          <input
            type="text"
            className="search-input"
            placeholder={`Search ${selectedFile.replace(/\.[^/.]+$/, "")}`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {selectedFile && (
            <b>
              File : <i>{selectedFile}</i>
            </b>
          )}
          <div className="header-actions-right">
            <button className="export-btn" onClick={exportCSV}>
              <Download size={18} />
              Export CSV
            </button>
            <button className="export-btn" onClick={exportJSON}>
              <Download size={18} />
              Export JSON
            </button>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="custom-table">
            <thead>
              <tr>
                {data.length > 0 &&
                  Object.keys(data[0]).map((key) => (
                    <th
                      key={key}
                      className="table-header"
                      onClick={() => handleSort(key)}
                    >
                      <div className="table-header-content">
                        <span>{key.toUpperCase()}</span>
                        {sortConfig.key === key &&
                          (sortConfig.direction === "asc"
                            ? "🔼"
                            : sortConfig.direction === "desc"
                            ? "🔽"
                            : "")}
                      </div>
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, rowIndex) => (
                <tr key={rowIndex} className="table-row">
                  {Object.values(row).map((val, colIndex) => (
                    <td key={colIndex} className="table-cell">
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
