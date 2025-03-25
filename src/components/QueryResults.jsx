import React, { useState, useEffect } from "react";
import Papa from "papaparse";

const QueryResults = ({ file }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    Papa.parse(file, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (result) => setData(result.data),
    });
  }, [file]);

  const paginatedData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div className="results">
      <h3>Query Results</h3>
      <table>
        <thead>
          <tr>
            {data.length > 0 && Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((cell, i) => (
                <td key={i}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>Prev</button>
      <button onClick={() => setCurrentPage((prev) => prev + 1)}>Next</button>
    </div>
  );
};

export default QueryResults;
