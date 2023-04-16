import React, { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';

// Assets
import LoaderGIF from '../../../assets/gifs/loading.gif';

// Hooks
import useEncryptedCookie from '../../../hooks/cookies/useCookie';

// Models
import ViewSearch from '../../models/searches/viewtableSearch';
import ErrorModel from '../../models/global/error';

function Table({ data, loading }) {
  const [cookieValue, setCookieValue, getCookieValue] = useEncryptedCookie('ni-uid');
  const [cookieState, setCookieState] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortColumn, setSortColumn] = useState(null);
  const [viewSearchModel, setViewSearchModel] = useState(null);
  const [selectedViewSearchModel, setSelectedViewSearchModel] = useState([]);
  const [errorModel, setErrorModel] = useState(false)

  useEffect(() => {
      setCookieState(true);
      getCookieValue();
      setCookieState(false);
  }, []);

  const exportHeaders = data.length > 0 ? Object.keys(data[0]).filter(item => item !== "share" && item !== "__v" && item !== "_id"&& item !== "search" && item !== "uid" && item !== "remaining").map(header => header === "pid" ? "Transaction ID" : header) : [];

  const headers = data.length > 0 ? Object.keys(data[0]).filter(item => item !== "share" && item !== "__v" && item !== "_id" && item !== "uid" && item !== "remaining").map(header => header === "pid" ? "Transaction ID" : header): [];

  // Logic to get the current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const remainingRows = itemsPerPage - currentItems.length;
  if (remainingRows > 0 && currentPage === Math.ceil(data.length / itemsPerPage)) {
    const blankRows = Array(remainingRows).fill({});
    currentItems = [...currentItems, ...blankRows];
  }

  // Logic to render page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  function sortData(column) {
    if (column === sortColumn) {
      // If we're already sorting by this column, reverse the sort order
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Otherwise, start sorting by this column in ascending order
      setSortColumn(column);
      setSortOrder('asc');
    }
    
    // Check if the current page has any data after sorting
    const sortedData = [...data].sort((a, b) => {
      let columnA = a[sortColumn];
      let columnB = b[sortColumn];
      if (typeof columnA === 'string') {
        columnA = columnA.toLowerCase();
        columnB = columnB.toLowerCase();
      }
      if (sortOrder === 'asc') {
        return columnA > columnB ? 1 : -1;
      } else {
        return columnA < columnB ? 1 : -1;
      }
    });
    const currentPageData = sortedData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    if (currentPageData.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const handleViewSearch = (search) => {
    setViewSearchModel(true)
    setSelectedViewSearchModel(search)
  }

  const renderRows = () => {
    // Sort the data if a column header has been clicked
    let sortedData = [...data];
    if (sortColumn) {
      sortedData.sort((a, b) => {
        let columnA = a[sortColumn];
        let columnB = b[sortColumn];
        if (typeof columnA === 'string') {
          columnA = columnA.toLowerCase();
          columnB = columnB.toLowerCase();
        }
        if (sortOrder === 'asc') {
          return columnA > columnB ? 1 : -1;
        } else {
          return columnA < columnB ? 1 : -1;
        }
      });
    }
  
    // Get the current items to display
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    let currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  
    // Handle empty rows
    const remainingRows = itemsPerPage - currentItems.length;
    if (remainingRows > 0 && currentPage === Math.ceil(data.length / itemsPerPage)) {
      const blankRows = Array(remainingRows).fill({});
      currentItems = [...currentItems, ...blankRows];
    }

      
  
    return currentItems.map((item) => {
      if (Object.keys(item).length === 0) {
        return (
          <tr key={`empty-row-${Math.random()}`} className="h-fit border border-neutral-200 p-2 text-xs">
            {headers.map((header) => (
              <td key={`empty-cell-${header}`} className="h-fit text-xs p-2 border border-neutral-200"></td>
            ))}
          </tr>
        );
      }
  
      return (
        <tr key={item.Id} className="h-fit border border-neutral-200 p-2 text-xs">
          {headers.map((header) => {
            let cellValue = item[header];
            let cellClass = "h-fit text-xs p-2 border border-neutral-200";
  
            if (header === "cost") {
              const costClass = "w-fit h-fit bg-neutral-400 text-white shadow font-bold text-center h-fit pt-0.5 pb-0.5 pl-1 pr-1 rounded";
              cellValue = item[header] ? `R${item[header]}` : "-";
              cellClass = item[header] ? costClass : cellClass;
            } else if (header === "Transaction ID"){
              cellValue = item.search[0].request_reference;
            } else if (header === "creation") {
              const dateOptions = {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: false,
              };
              cellValue = item[header] ? new Date(item[header]).toLocaleString("en-US", dateOptions) : "-";
            } else if (header === "search") {
              cellValue = (
                <button 
                  className='rounded border border-sky-500 shadow-md pt-1 pb-1 pl-2 pr-2 w-full text-xs'
                  onClick={() => handleViewSearch(item)}>
                  View Search
                </button>
              );
            }
  
            return (
              <td key={`${item.Id}-${header}`} className={cellClass}>
                {cellValue}
              </td>
            );
          })}
        </tr>
      );
    });
  };
  

  
  const exportdata = data.map(search => {
    const searchObj = {};
    exportHeaders.forEach(header => {
      if (header === "Transaction ID") {
        searchObj[header] = search.search[0].request_reference;
      } else {
        searchObj[header] = search[header];
      }
    });
    return searchObj;
  });

  return (
    <>
      {loading ? (
        <div className="w-full h-110 grid place-items-center">
        <div className='grid place-items-center w-fit h-fit'>
          <img src={LoaderGIF} alt="" className='h-32'/>
          <p className="mt-4 text-neutral-500">
            We are busy fetching your searches...
          </p>
        </div>
      </div>
      ):(
        <div className="w-full">
        {/* MODELS */}
        {viewSearchModel ? (
          <ViewSearch data={selectedViewSearchModel} setModal={setViewSearchModel}/>
        ):""}
  
        {errorModel ? (
          <ErrorModel setModal={setErrorModel} message={"Your access has been restricted by your admin, please contact him to enable this feature."}/>
        ):""}
  
        
          {/* ADD EXPORT TO EXCEL BUTTON HERE */}
          {cookieValue && cookieValue.isExport ? (
            <button className="mt-10 mb-4 p-2 rounded shadow-md hover:shadow-lg transition duration-400 bg-sky-600 hover:bg-sky-500 text-white pl-6 pr-6 w-fit h-fit">
              <CSVLink 
              data={exportdata} headers={exportHeaders} filename={'member_searches.csv'}>
                Export to CSV
              </CSVLink>
            </button>
          ):(
            <button 
            onClick={() => setErrorModel(true)}
            className="mt-10 mb-4 p-2 rounded shadow-md hover:shadow-lg transition duration-400 bg-sky-600 hover:bg-sky-500 text-white pl-6 pr-6 w-fit h-fit">
              Export to CSV
            </button>
          )}
        {data.length > 0 ? (
          <>
            <table style={{ pageBreakInside: 'avoid' }} className="w-full">
              <thead>
                <tr
                  style={{ pageBreakInside: 'avoid' }}
                  className="text-xs text-left uppercase pl-4 pr-4 bg-zinc-700 text-white p-2"
                >
                  {headers.map(header => (
                    <th className="font-medium p-2" key={header}>
                      <button className="flex items-center" onClick={() => sortData(header)}>
                        {header}
                        {sortColumn === header && (
                          sortOrder === 'asc' ? ' ▲' : ' ▼'
                        )}
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className='h-fit'>{renderRows()}</tbody>
            </table>
            <div className="flex justify-center mt-4">
              <ul className="flex">
                {pageNumbers.map(number => (
                  <li key={number}>
                    <button
                      className={`px-4 py-2 rounded-lg border ${
                        currentPage === number ? 'bg-sky-500 text-white' : ''
                      }`}
                      onClick={() => setCurrentPage(number)}
                    >
                      {number}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div>No results found</div>
        )}
      </div>
      )}
    </>
  );
}

export default Table;
