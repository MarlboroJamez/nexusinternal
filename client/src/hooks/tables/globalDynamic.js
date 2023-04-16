import { useState, useEffect } from 'react';

export function useDynamicTable(data) {
  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Generate headers from the first object in the data array
    const headers = Object.keys(data[0])
    setHeaders(headers);

    // Generate rows from the data array
    const rows = data.map(item => {
      const row = {};
      headers.forEach(header => {
        row[header] = item[header];
      });
      return row;
    });
    setRows(rows);
  }, [data]);

  return { headers, rows };
}
