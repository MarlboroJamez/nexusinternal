import React, { useEffect, useState } from 'react';

// Contexts
import { AppState } from '../../../context/Context';

function IncomingSearchSelect({handleRefresh, data, setFilteringData, nonFiltered, date, setDate}) {
  const {state, dispatch} = AppState();
  const [type, setType] = useState("");
  const [boquet, setBoquet] = useState("");
  const [project, setProject] = useState("")
  const [team, setTeam] = useState("");
  const [resetFilters, setResetFilters] = useState(false);
  const [cleanDatas, setCleanDatas] = useState(data)
  
  const handleFirstFilterChange = (e) => {
    setDate(e);
  };

  const handleSecondFilterChange = (e) => {
    setBoquet(e);
  };

  const handleThirdFilterChange = (e) => {
    setProject(e);
  };

  const handleResetFilters = () => {
    setResetFilters(true);
    setType('');
    setBoquet('');
    setDate("Asc");
    setProject('');
    setTeam('');
  };

  useEffect(() => {
    let filterDatas = data;

    if (date === "Asc") {
      filterDatas = filterDatas.sort(
        (a, b) => Date.parse(b.creation) - Date.parse(a.creation)
      );
    }

    if (date === "Dec") {
      filterDatas = filterDatas.sort(
        (a, b) => Date.parse(a.creation) - Date.parse(b.creation)
      );
    }

    if (date !== "Dec" && date !== "Asc") {
      filterDatas = filterDatas.sort(
        (a, b) => Date.parse(b.creation) - Date.parse(a.creation)
      );
    }

    if (boquet) {
      console.log(boquet);
    }

    if (project) {
      console.log(project);
    }

    if (team) {
      console.log(team);
    }

    // Reset filters
    if (resetFilters) {
      setType("");
      setBoquet("");
      setProject("");
      setDate("");
      setTeam(false);
      setResetFilters(false);
      filterDatas = nonFiltered;
    }

    // update the pagination state
    setFilteringData(filterDatas);
  }, [data, date, boquet, project, team, resetFilters, nonFiltered]);

  useEffect(() => {
    setFilteringData(data);
  }, [data]);


  return (
    <div className="w-fit mt-6 flex">
        <svg 
        onClick={handleRefresh}
        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="transition duration-400 mr-6 mt-1 text-sky-700 hover:text-sky-500 cursor-pointer w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>

        {/* SEARCH TYPES */}
        <select 
        onChange={(e) => handleFirstFilterChange(e.target.value)}
        className="mr-10 w-32 rounded shadow-md bg-neutral-300 p-1 cursor-pointer hover:bg-neutral-200 outline-none">
        <option value="Asc">
          Ascending
        </option>
        <option value="Dec">
          Descending
        </option>
      </select>
    </div>
  )
}

export default IncomingSearchSelect