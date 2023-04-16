import React, { useEffect, useState } from 'react'

function IncomingSearchSelect({handleRefresh, data, setFilteringData, nonFiltered}) {
  const [upcoming, setUpcoming] = useState("upcoming");
  const [date, setDate] = useState("newest");
  const [status, setStatus] = useState("status");
  const [resetFilters, setResetFilters] = useState(false);
  const [cleanData, setCleanData] = useState(data)

  
  useEffect(() => {
    // Call the filter function whenever any filter changes
    FilterData();
  }, [upcoming, date, status]);

  const handleFirstFilterChange = (e) => {
    setUpcoming(e)
  }

  const handleSecondFilterChange = (e) => {
    setDate(e)
  }

  const handleThirdFilterChange = (e) => {
    setStatus(e)
  }

  const handleResetFilters = () => {
    setUpcoming('upcoming');
    setDate('newest');
    setStatus('status');
    setResetFilters(true);
  };

  const FilterData = () => {
    let filterData = cleanData;
  
    if (upcoming === "past") {
      filterData = filterData.filter((item) => item.codeStatus !== "Completed");
    }
  
    if (status === "completed") {
      filterData = filterData.filter((item) => item.codeStatus === "Completed");
    }
  
    if (status === "queued") {
      filterData = filterData.filter((item) => item.codeStatus === "Queued");
    }
  
    if (status === "canceled") {
      filterData = filterData.filter((item) => item.codeStatus === "Canceled");
    }
  
    if (date === "oldest") {
      filterData = filterData.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    }
  
    if (date === "newest") {
      filterData = filterData.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
    }
  
    // Reset filters
    if (resetFilters) {
      setUpcoming("");
      setDate("");
      setStatus("");
      setResetFilters(false);
      setCleanData(nonFiltered);
    }
  
    // update the pagination state
    setFilteringData(filterData);
  };
  

  return (
    <div className="w-fit mt-6 flex">
        <svg 
        onClick={handleRefresh}
        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="transition duration-400 mr-6 mt-1 text-sky-700 hover:text-sky-500 cursor-pointer w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>

        {/* BOQUETS */}
        <select 
        onChange={(e) => handleFirstFilterChange(e.target.value)}
        className="mr-10 rounded shadow-md bg-neutral-300 p-1 cursor-pointer hover:bg-neutral-200 outline-none">
          <option
          value="upcoming">
            Upcoming searches
          </option>
          <option
          value="past">
            Past searches
          </option>
        </select>

        {/* PROJECT */}
        <select
        onChange={(e) => handleSecondFilterChange(e.target.value)} 
        className="mr-10 rounded shadow-md bg-neutral-300 p-1 cursor-pointer hover:bg-neutral-200 outline-none">
          <option>
            Date
          </option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>

        {/* SHARE WITH TEAM */}
        <select
        onChange={(e) => handleThirdFilterChange(e.target.value)} 
        className="mr-10 rounded shadow-md bg-neutral-300 p-1 cursor-pointer hover:bg-neutral-200 outline-none">
          <option selected>
            Status
          </option>
          <option value="completed">
            Completed
          </option>
          <option value="queued">
            Queued
          </option>
          <option value="canceled">
            Canceled
          </option>
        </select>

        <button 
        onClick={handleResetFilters}
        className="transition duration-400 mr-10 rounded shadow-md bg-neutral-500 text-white pl-4 pr-4 p-1 cursor-pointer hover:bg-neutral-400 outline-none">
          Reset Filter
        </button>
    </div>
  )
}

export default IncomingSearchSelect