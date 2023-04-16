import React from 'react'
import { CSVLink } from 'react-csv';

// Tables
import Searches from '../../tables/teams/searches';

function MemberSearches({searches}) {
  const headers = searches.length > 0 ? Object.keys(searches[0]).filter(item => item !== "share" && item !== "__v" && item !== "_id" && item !== "pid" && item !== "uid" && item !== "remaining").map(header => header === "search" ? "Transaction ID" : header) : [];
  
  
  const data = searches.map(search => {
    const searchObj = {};
    headers.forEach(header => {
      if (header === "Transaction ID") {
        searchObj[header] = search.search[0].request_reference;
      } else {
        searchObj[header] = search[header];
      }
    });
    return searchObj;
  });

  return (
    <div>
        {/* ADD EXPORT TO EXCEL BUTTON HERE */}
        <CSVLink 
        className='p-2 rounded shadow-md hover:shadow-lg transition duration-400 bg-sky-600 hover:bg-sky-500 text-white pl-6 pr-6 w-fit h-fit'
        data={data} headers={headers} filename={'member_searches.csv'}>
          Export to CSV
        </CSVLink>
        {searches.length > 0 ? (
          <Searches data={searches}/>
        ):(
          <p className='mt-10 text-lg text-neutral-600'>
            Member has not conducted any searches yet...
          </p>
        )}
    </div>
  )
}

export default MemberSearches