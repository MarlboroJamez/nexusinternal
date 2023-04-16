import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Hooks
import useEncryptedCookie from '../../../hooks/cookies/useCookie';

// Cards
import ScheduleSelection from '../../cards/searches/scheduleSearchSelect';
import ScheduledCard from '../../cards/searches/scheduleManagerCard';

function ScheduleManager() {
  const [cookieValue, setCookieValue, getCookieValue] = useEncryptedCookie('ni-uid');
  const [scheduledSearches, setScheduledSearches] = useState([]);
  const [filteringData, setFilteringData] = useState([])
  const [nonFilteringData, setNonFilteringData] = useState([])

  const [fetchingCookies, setFetchingCookies] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const paginated = scheduledSearches?.slice(firstIndex, lastIndex);
  const npages = Math.ceil(scheduledSearches.length/recordsPerPage);
  const pageNumbers = [...Array(npages + 1).keys()].slice(1);

  const config = {
      headers: {
          "Content-Type": "application/json",
      }
  }
  
  useEffect(() => {
    setFetchingCookies(true)
    getCookieValue()
    setFetchingCookies(false)
  },[])

  useEffect(() => {
    setScheduledSearches(filteringData)
  },[filteringData])


  useEffect(() => {
    const fetchScheduledSearches = async () => {
      if(cookieValue && !fetchingCookies){
        try {
          if(cookieValue._id){
            setLoading(true);
            const {data} = await axios.post('/api/v1/provider/cpb/scheduled',{
              uid: cookieValue._id
            },config)
            setNonFilteringData(data.data)
            setScheduledSearches(data.data)
            setLoading(false);
          }
        } catch (e) {
          setError(true)
          console.log(e)
        }
      }
    }
    
    fetchScheduledSearches();
  },[cookieValue, fetchingCookies])

  const handleRefresh = async () => {
    setLoading(true);
    const {data} = await axios.post('/api/v1/provider/cpb/scheduled',{
      uid: cookieValue._id
    },config)
    setScheduledSearches(data.data)
    setLoading(false);
  }

  const changeCurrentPage = (id) => {
    setCurrentPage(id)
  }

  return (
    <div>
      <h1 
      className="text-xl font-medium text-sky-700">
        Schedule Manager
      </h1>

      <div className="mt-10">
        {/* SCHEDULE SELECTION */}
        <div>
          <ScheduleSelection 
          nonFiltered={nonFilteringData}
          setFilteringData={setFilteringData}
          data={scheduledSearches} 
          handleRefresh={handleRefresh}/>
        </div>

        {/* SCHEDULED SEARCHES */}
        <div className="mt-10">
          {loading ? (
            <div className="w-full h-100 grid place-items-center">
                <p className="text-neutral-500">
                  We are busy fetching your scheduled searches....
                </p>
            </div>
          ):(
            <div>
              {scheduledSearches.length === 0 ? (
                <div className="w-full h-100 grid place-items-center">
                    <p className="text-neutral-500">
                      You have no scheduled searches.
                    </p>
                </div>
              ):(
                <div className="w-full h-110 w-120">
                  <div className="block ml-20">
                    {paginated.map((scheduled) => (
                      <ScheduledCard scheduled={scheduled}/>
                    ))}
                  </div>
                  
                  {/* PAGINATION NUMBERS */}
                  <div className="w-120 mt-10">
                    <ul className="flex pt-1 pb-1 pl-4 pr-4 border border-neutral-200 shadow-md rounded">
                      {
                        pageNumbers.map((n, i) => (
                          <li className={currentPage === n ? "h-fit w-fit text-white cursor-pointer hover:bg-sky-400 bg-sky-500 rounded pt-2 pb-2 pl-3 pr-3":"cursor-pointer pt-2 pb-2 pl-3 pr-3"} key={i}>
                            <p 
                            onClick={() => changeCurrentPage(n)}>
                            {n}
                            </p>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ScheduleManager