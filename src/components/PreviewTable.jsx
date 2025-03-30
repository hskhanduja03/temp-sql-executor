import React, { useEffect, useState, memo, useMemo } from "react";
import Papa from "papaparse";
import ordersCSV from "../data/orders.csv"; // Default CSV
import { saveAs } from "file-saver"; // For exporting JSON
import { Download } from "lucide-react";

const PreviewTable = memo(({ mockData, filename }) => {
  const [data, setData] = useState(mockData || []);
  const [filteredData, setFilteredData] = useState(mockData || []);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "none" });
  const [searchQuery, setSearchQuery] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [selectedFile, setSelectedFile] = useState(mockData ? "Mock Data" : "Orders.csv");
  const pageSize = 5;

  useEffect(() => {
    if (!mockData) {
      fetch(ordersCSV)
        .then((res) => res.text())
        .then((text) => parseCSV(text));
    } else {
      setData(mockData);
      setFilteredData(mockData);
      setPageIndex(0);
    }
  }, [mockData]);

  const parseCSV = (csvText) => {
    Papa.parse(csvText, {
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        setData(result.data);
        setFilteredData(result.data);
        setPageIndex(0);
      },
    });
  };

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

  const sortedData = useMemo(() => {
    if (!sortConfig.key || sortConfig.direction === "none") {
      return [...filteredData];
    }
    return [...filteredData].sort((a, b) => {
      const valueA = a[sortConfig.key];
      const valueB = b[sortConfig.key];

      if (valueA === null || valueA === undefined) return sortConfig.direction === "asc" ? 1 : -1;
      if (valueB === null || valueB === undefined) return sortConfig.direction === "asc" ? -1 : 1;

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortConfig.direction === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      return sortConfig.direction === "asc"
        ? valueA > valueB ? 1 : -1
        : valueA < valueB ? 1 : -1;
    });
  }, [filteredData, sortConfig]);

  useEffect(() => {
    const filtered = data.filter((row) =>
      Object.values(row).some((val) =>
        val?.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredData(filtered);
    setPageIndex(0);
  }, [searchQuery, data]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file.name);
      const reader = new FileReader();
      reader.onload = (e) => parseCSV(e.target.result);
      reader.readAsText(file);
    }
  };

  const paginatedData = useMemo(() => {
    return sortedData.slice(
      pageIndex * pageSize,
      (pageIndex + 1) * pageSize
    );
  }, [sortedData, pageIndex, pageSize]);

  const exportCSV = () => {
    const csv = Papa.unparse(filteredData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "filtered_data.csv");
  };

  const exportJSON = () => {
    const json = JSON.stringify(filteredData, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    saveAs(blob, "filtered_data.json");
  };

  const totalPages = useMemo(() => Math.ceil(filteredData.length / pageSize), [filteredData, pageSize]);

  const getPaginationNumbers = useMemo(() => {
    return () => {
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
  }, [totalPages, pageIndex]);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {filename === undefined ? (<h2 className="query-title">File Preview</h2>) : ""}
        {!mockData && (
          <div className="file-upload-container">
            <label className="custom-file-upload">
              <input
                type="file"
                className="file-input"
                accept=".csv"
                onChange={handleFileUpload}
              />
              <Download size={18} /> Upload
            </label>
          </div>
        )}
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
          {selectedFile && filename && (
            <b>
              File : <i>{selectedFile}</i>
            </b>
          )}
          <div className="header-actions-right">
            <button className="export-btn" onClick={exportCSV} disabled={!filteredData.length}>
              <Download size={18} />
              Export CSV
            </button>
            <button className="export-btn" onClick={exportJSON} disabled={!filteredData.length}>
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

        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
            disabled={pageIndex === 0}
          >
            Prev
          </button>

          {getPaginationNumbers().map((num, index) =>
            num === "..." ? (
              <span key={index} className="pagination-dots">
                ...
              </span>
            ) : (
              <button
                key={index}
                className={`pagination-btn ${
                  pageIndex === num - 1 ? "active" : ""
                }`}
                onClick={() => setPageIndex(num - 1)}
              >
                {num}
              </button>
            )
          )}

          <button
            className="pagination-btn"
            onClick={() =>
              setPageIndex((prev) => Math.min(prev + 1, totalPages - 1))
            }
            disabled={pageIndex === totalPages - 1}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
});

export default PreviewTable;