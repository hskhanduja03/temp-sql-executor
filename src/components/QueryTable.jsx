import React, { useState, useEffect } from "react";
import "../styles/global.css";

const QueryTable = ({ data }) => {
  const [displayedData, setDisplayedData] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    setDisplayedData(data.slice(0, page * rowsPerPage));
  }, [data, page]);

  const loadMore = () => {
    setPage(page + 1);
  };

  return (
    <div>
      <h3>Query Results</h3>
      <table className="query-table">
        <thead className="query-table__header">
          <tr>
            {data.length > 0 &&
              Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {displayedData.map((row, index) => (
            <tr key={index} className="query-table__row">
              {Object.values(row).map((value, idx) => (
                <td key={idx}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {displayedData.length < data.length && (
        <button className="query-table__button" onClick={loadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default QueryTable;
