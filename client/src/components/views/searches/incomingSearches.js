import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Assets
import LoaderGIF from '../../../assets/gifs/loading.gif';

// Hooks
import useEncryptedCookie from '../../../hooks/cookies/useCookie';
import { AppState } from '../../../context/Context';

// Cards
import SearchCard from '../../cards/searches/searchCard';
import IncomingSelection from '../../cards/searches/incomingSearchSelect';

// Filters
import FilterBuilder from '../../filters/searchbuilder';

// Table
import PersonListing from '../../tables/provider/cpb/personlist';
import CIPCAudit from '../../tables/provider/cpb/cipcauditlist';
import CIPCEnterprise from '../../tables/provider/cpb/cipcenterprise';
import CIPCDirectors from '../../tables/provider/cpb/cipcdirectorlist';
import PEPListing from '../../tables/provider/cpb/pepslist';
import LifeStyleAuditReport from '../../tables/provider/cpb/lifestyleauditreport';
import HomeAffairsVerification from '../../tables/provider/cpb/homeaffairs';
import BusinessInterestInquiry from '../../tables/provider/cpb/businessinterestinquiry';
import IDVWithPhoto from '../../tables/provider/cpb/idvwithphoto';
import IDVWithoutPhoto from '../../tables/provider/cpb/idvwithoutphoto';
import SearchesView from '../../tables/dashboard/searches';
import BankAccountVerifications from '../../tables/provider/cpb/bankaccountverification';
import ProcurementEnquiry from '../../tables/provider/cpb/procurementenquiry';
import DynamicReport from '../../tables/provider/cpb/dynamicreport';
import Spiderweb from '../../tables/provider/cpb/spiderweb';

function IncomingSearches() {
  const {dispatch} = AppState();
  const [cookieValue, setCookieValue, getCookieValue] = useEncryptedCookie('ni-uid');
  const [searches, setSearches] = useState([]);
  const [filteringData, setFilteringData] = useState([])
  const [nonFilteringData, setNonFilteringData] = useState([])

  const [fetchingCookies, setFetchingCookies] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const sortedSearches = searches.sort((a, b) => {
    const today = new Date();
    const tzOffset = 2 * 60 * 60 * 1000; // Johannesburg, South Africa timezone offset from UTC in milliseconds
    const todayInJohannesburg = new Date(today.getTime() + tzOffset);
    const diffA = Math.abs(todayInJohannesburg - new Date(a.creation));
    const diffB = Math.abs(todayInJohannesburg - new Date(b.creation));
    return diffA - diffB; // Reversed the order of the comparison here
  });
  
  const paginated = sortedSearches.slice(firstIndex, lastIndex);
  const npages = Math.ceil(searches.length/recordsPerPage);
  const pageNumbers = [...Array(npages + 1).keys()].slice(1);
  const [searchView, setSearchView] = useState(false)
  const [selectedSearch, setSelectedSearch] = useState([]);
  const [filtered, setFiltered] = useState(searches.length > 0 ? searches:[])
  const [searchTerm, setSearchTerm] = useState("");
  const [layoutView, setLayoutView] = useState("cards")

  const [date, setDate] = useState("");

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  useEffect(() => {
    setFetchingCookies(true)
    getCookieValue()
    setFetchingCookies(false)
  },[])

  useEffect(() => {
    dispatch({
        type: 'REMOVE_SEARCH_NOTIFICATION',
    })
  },[])


  useEffect(() => {
    const fetchScheduledSearches = async () => {
      if(cookieValue && !fetchingCookies){
        try {
          if(cookieValue._id){
            setLoading(true);
            const {data} = await axios.post('/api/v1/provider/cpb/searches/all',{
              uid: cookieValue._id
            },config)
            setNonFilteringData(data.data)
            setSearches(data.data)
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
    const {data} = await axios.post('/api/v1/provider/cpb/searches/all',{
      uid: cookieValue._id
    },config)
    setSearches(data.data)
    setLoading(false);
  }

  const changeCurrentPage = (id) => {
    setCurrentPage(id)
  }

  const handleSearchView = (search) => {
    setSearchView(true)
    setSelectedSearch(search)
  }

  const closeSearchView = () => {
    setSearchView(false)
    setSelectedSearch([])
  }
console.log(paginated)
  return (
    <div>
      <h1
      onClick={() => console.log(searches)}
      className="text-xl font-medium text-sky-700">
        Incoming Searches
      </h1>

      <div>
        <div>
          <ul className="flex mt-4">
            <li 
            onClick={() => setLayoutView("cards")}
            className={layoutView === "cards" ? 
            "text-sky-700 rounded border pl-2 pr-2 h-fit mr-6 border-sky-600 cursor-pointer transition duration-400 shadow-md"
            :"rounded border border-sky-700 shadow pl-2 pr-2 h-fit mr-6 hover:border-sky-600 cursor-pointer transition duration-400 hover:shadow-md"}>
              Cards view
            </li>
            <li 
            onClick={() => setLayoutView("table")}
            className={layoutView === "table" ? 
            "text-sky-700 rounded border pl-2 pr-2 h-fit mr-6 border-sky-600 cursor-pointer transition duration-400 shadow-md"
            :"rounded border border-sky-700 shadow pl-2 pr-2 h-fit mr-6 hover:border-sky-600 cursor-pointer transition duration-400 hover:shadow-md"}>
              Table view
            </li>
          </ul>
        </div>

        {layoutView === "table" && (
          <SearchesView data={searches} loading={loading}/>
        )}

        {layoutView === "cards" && (
          <div>
          {searchView ? (
          <div className="mt-2">
              <label 
              onClick={closeSearchView}
              className="text-sky-700 cursor-pointer underline hover:text-sky-600 mb-10 w-full text-right">
                Go back
              </label>
  
              <div className="mt-4">
                {selectedSearch.title === "Person Listing" ? (
                  <PersonListing data={[selectedSearch]}/>
                ):""}
  
                {selectedSearch.title === 'CIPC Audit Listing' ? (
                  <CIPCAudit data={[selectedSearch]}/>
                ):""}
  
                {selectedSearch.title === 'CIPC Enterprise Listing' ? (
                  <CIPCEnterprise data={[selectedSearch]}/>
                ):""}
  
                {selectedSearch.title === 'Commercial Enquiry' ? (
                  <CIPCDirectors data={[selectedSearch]}/>
                ):""}
  
                {selectedSearch.title === 'Procurement Enquiry' ? (
                  <ProcurementEnquiry data={[selectedSearch]}/>
                ):""}
  
                {selectedSearch.title === 'PEP Listing' ? (
                  <PEPListing data={[selectedSearch]}/>
                ):""}
  
                {selectedSearch.title === 'Lifestyle Audit Report' ? (
                  <LifeStyleAuditReport data={[selectedSearch]}/>
                ):""}
  
                {selectedSearch.title === 'Dynamic Report' ? (
                  <DynamicReport data={[selectedSearch]}/>
                ):""}
  
                {selectedSearch.title === 'Home Affairs Verification' ? (
                  <HomeAffairsVerification data={[selectedSearch]}/>
                ):""}
  
                {selectedSearch.title === "Business Interest Enquiry" ? (
                  <BusinessInterestInquiry data={[selectedSearch]}/>
                ):""}
  
                {selectedSearch.title === "IDV Listing including photo" ? (
                  <IDVWithPhoto data={[selectedSearch]}/>
                ):""}
  
                {selectedSearch.title === "IDV Listing without photo" ? (
                  <IDVWithoutPhoto data={[selectedSearch]}/>
                ):""}
  
                {selectedSearch.title === "Bank Account Verification" ? (
                  <BankAccountVerifications data={[selectedSearch]}/>
                ):""}
  
                {selectedSearch.title === "Spiderwebrelationship Listing" ? (
                  <Spiderweb data={[selectedSearch]}/>
                ):""}
              </div>
          </div>
        ):(
          <div className="mt-10 mb-20">
          {/* INCOMING SELECT */}
          <div className="mb-10">
            <input 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            className="rounded shadow-inner p-2 border border-neutral-300 w-120 bg-neutral-100 rounded outline-sky-700"
            placeHolder="Search"/>
          </div>

          {!loading ? (
            <div>
              {searches.length === 0 && (
                <div className="w-full h-100 grid place-items-center">
                  <p className="text-neutral-500">
                    No searches have been performed yet. Please run your first search so that it can be reflected here.
                  </p>
                </div>
              )}

              {searches.length > 0 && (
            <div className="w-full h-130 w-120">
              <div className='block ml-20 h-130'>
                {paginated
                  .filter((item) =>
                    (item.header && item.header.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase()))
                  )
                  .map((search) => (
                    <SearchCard search={search} handleSearchView={handleSearchView}/>
                  ))
                }
              </div>
  
              {/* PAGINATION NUMBERS */}
              <div className="w-120 mt-10">
              <ul className="flex pt-1 pb-1 pl-4 pr-4 border border-neutral-200 shadow-md rounded">
                {
                  pageNumbers.map((n, i) => (
                    <li 
                      onClick={() => changeCurrentPage(n)}
                      className={currentPage === n ? "h-fit w-fit text-white cursor-pointer hover:bg-sky-400 bg-sky-500 rounded pt-2 pb-2 pl-3 pr-3":"cursor-pointer pt-2 pb-2 pl-3 pr-3 rounded hover:bg-neutral-200"} key={i}>
                      <p>{n}</p>
                    </li>
                  ))
                }
              </ul>
              </div>
            </div>

              )}
            </div>
          ):(
            <div className="w-full h-110 grid place-items-center">
              <div className='grid place-items-center w-fit h-fit'>
                <img src={LoaderGIF} alt="" className='h-32'/>
                <p className="mt-4 text-neutral-500">
                  We are busy fetching your searches...
                </p>
              </div>
            </div>
          )}
        </div>
        )}
          </div>
        )}
      </div>
    </div>
  )
}

export default IncomingSearches