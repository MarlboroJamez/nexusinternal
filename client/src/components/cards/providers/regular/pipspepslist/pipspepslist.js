import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';
import axios from 'axios'

// Assets
import Guide from '../../../../../assets/guides/pep.pdf'
import Guide2 from '../../../../../assets/guides/watch.pdf'

// Context
import { AppState } from '../../../../../context/Context';

// Hooks
import useEncryptedCookie  from '../../../../../hooks/cookies/useCookie';

//JSON
import PermissiblePurpose from '../../../../../data/cpb/purpose.json';

// Models
import HelperModel from '../../../providers/helpers/models/helperpipspeps'
import SuccessModel from '../../../../models/global/success';
import ErrorModel from '../../../../models/global/error';
import RunningModel from '../../../../models/searches/slowsearch';

function Personlisting({selectedProject, share, notified, project}) {
    const {dispatch} = AppState();
    const [checkboxValues, setCheckboxValues] = useState([]);
     
    const [cookieValue, setCookieValue, getCookieValue] = useEncryptedCookie('ni-uid');
    const [cookieState, setCookieState] = useState(false);
    const [socketConnected, setSocketConnected] = useState(false)

    const [permissablePurpose, setPermissablePurpose] = useState("");
    const [reference, setReference] = useState("");
    const [idNumber, setIdNumber] = useState("");
    const [surname, setSurname] = useState("");
    const [firstName, setFirstName] = useState("broad");
    const [secondName, setSecondName] = useState("");
    const [dob, setDob] = useState("");
    const [usePP, setUsePP] = useState("");
    const [header, setHeader] = useState("");
    const [date, setDate] = useState("");
    const [categories, setCategories] = useState("")
    const [threshold, setThreshold] = useState(0)
    const [watchlistIds, setWatchListIds] = useState([])
    const [helperModel, setHelperModel] = useState(false)
    const [remaining , setRemaining] = useState("");
    const [successModel, setSuccessModel] = useState(false);
    const [startDate, setStartDate] = useState("2020-01-01")
    const [endDate, setEndDate] = useState("2023-01-01")

    const sdate = new Date(startDate);
    const edate = new Date(endDate);

    const sformattedDate = sdate.toISOString().slice(0, 10);
    const eformattedDate = edate.toISOString().slice(0, 10);

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    const [errorModel, setErrorModel] = useState(false);
    const [license, setLicense] = useState([]);
    const [runningModel, setRunningModel] = useState(false);

    const [view, setView] = useState("search")
    const [secondView, setSecondView] = useState("pep")
    const [access, setAccess] = useState([]);

    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    }

    useEffect(() => {
        setCookieState(true)
        getCookieValue()
        setCookieState(false)
    },[])

    useEffect(() => {
        const licenseInfo = async () => {
            if(cookieValue){
                if(cookieValue.license){
                    const {data} = await axios.post('/api/v1/client/searches/license', {
                        id:cookieValue.license[0]._id
                    }, config)
                    setLicense(data.data[0].restrictions.filter((res) => res.type === "PEP Listing"))
                }
            }
        }
        licenseInfo()
    },[cookieState, cookieValue, loading])

    
  function handlesDateChange(e) {
    setStartDate(e.target.valueAsDate);
  }    

  function handleeDateChange(e) {
    setEndDate(e.target.valueAsDate);
  }

     

    const handleSubmission = async (e) => {
        e.preventDefault();
        const lic = cookieValue.license[0].restrictions.filter((res) => res.type === "PEP Listing")
        const cost = lic[0].cost
        const currentTotal = cookieValue.license[0].totalIncome;
        
        try {
                if(reference.length === 0){
                    setError(true)
                } else {
                    if(license[0].searches > 0){
                        setLoading(true)
                    setRunningModel(true)
                    const {data} = await axios.post('/api/v1/provider/cpb/search/pepslist', {
                        uid: cookieValue._id.toString(),
                        PermissiblePurpose: "Fraud Detection and Prevention",
                        license: cookieValue.license[0],
                        userEmail: cookieValue.email.toString(),
                        header: reference,
                        Term: idNumber,
                        Refinement: surname,
                        Scope: firstName,
                        StartDate: sformattedDate,
                        ThresholdScore: threshold,
                        DateOfBirth: dob,
                        EndDate: eformattedDate,
                        Categories: checkboxValues.join(","),
                        Reference: reference,
                        WatchListIDs: [],
                        name: cookieValue.name,
                        surname: cookieValue.surname,
                        pid: cookieValue.license[0]._id,
                        share: true,
                        restrictionName: "PEP Listing",
                        restrictCost: cost.toString(),
                        currentTotal: currentTotal - cost.toString(),
                    }, config)
                    setHeader("")
                    setPermissablePurpose("")
                    setReference("")
                    setIdNumber("")
                    setSurname("")
                    setFirstName("")
                    setSecondName("")
                    setThreshold("")
                    setDob("")
                    setUsePP("")
                    setCategories("")
                    setWatchListIds("")
                    setRunningModel(false)
                    setLoading(false)
                    setSuccessModel(true);
                    dispatch({
                        type: 'INSERT_SEARCH_NOTIFICATION',
                        payload: []
                    })
                    } else {
                        setErrorModel(true)
                        setErrorMessage("You have reached your monthly limit, please engage with us to enable more units if needed.")
                    }
                }
        } catch (e) {
            setRunningModel(false)
            setLoading(false)
            setErrorModel(true)
            setErrorMessage(e.response.data.message.status_message)
        }
    }

    const handleRestrictAccess = () => {
        setErrorModel(true)
        setErrorMessage("Your access has been restricted by your admin, please contact him to enable this feature.")
    }

    const handleCheckboxChange = (event) => {
        const { value } = event.target;
        const currentIndex = checkboxValues.indexOf(value);
        const newCheckboxValues = [...checkboxValues];
    
        if (currentIndex === -1) {
          newCheckboxValues.push(value);
        } else {
          newCheckboxValues.splice(currentIndex, 1);
        }
    
        setCheckboxValues(newCheckboxValues);
    };

  return (
    <div>
        <div className="p-2 mb-10 rounded border border-neutral-200 w-full shadow-lg">
            <ul className="flex cursor-pointer">
                <li
                onClick={() => setView("search")} 
                className={view === "search" ? 
                "mr-10 transition duration-400 bg-sky-500 h-fit rounded text-white shadow p-2 w-fit font-medium"
                :"mr-10 transition duration-400 hover:bg-sky-500 h-fit rounded bg-sky-600 text-white shadow p-2 w-fit font-medium"}>
                    PEP, Sanctions and Adverse Media
                </li>
                <li
                onClick={() => setView("about")}
                className={view === "about" ? 
                "mr-10 transition duration-400 bg-sky-500 h-fit rounded text-white shadow p-2 w-fit font-medium"
                :"mr-10 transition duration-400 hover:bg-sky-500 h-fit rounded bg-sky-600 text-white shadow p-2 w-fit font-medium"}>
                    About PEP, Sanctions and Adverse Media
                </li>
            </ul>
        </div>
        {view === "about" &&
            <div>
                <ul className="flex">
                    <li 
                    onClick={() => setSecondView("pep")}
                    className={secondView === "pep" ? 'mr-10 font-medium underline cursor-pointer':'mr-10 font-medium cursor-pointer'}>
                        PEP & Adverse Media
                    </li>
                    <li 
                    onClick={() => setSecondView("watch")}
                    className={secondView === "watch" ? 'mr-10 font-medium underline cursor-pointer':'mr-10 font-medium cursor-pointer'}>
                        Watchlists
                    </li>
                </ul>

                <div className="mt-10">
                    {secondView === "watch" && (
                            <iframe
                            title="PDF Viewer"
                            src={`${Guide2}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                            className="w-full h-130"
                            frameBorder="0"
                            sandbox
                        />
                    )}

                    {secondView === "pep" && (
                            <iframe
                            title="PDF Viewer"
                            src={`${Guide}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                            className="w-full h-130"
                            frameBorder="0"
                            sandbox
                        />
                    )}
                </div>
            </div>
        }

        {view === "search" && (
            <div>
            {runningModel ? (
                <RunningModel setModal={setRunningModel}/>
            ):""}
            {helperModel ? (
                <HelperModel setModel={setHelperModel}/>
            ):''}
            {successModel ? (
                <SuccessModel message={"Your search has been successful, you can view your new search at incoming searches."} setModal={setSuccessModel}/>
            ):""}
    
            {errorModel ? (
                <ErrorModel message={errorMessage} setModal={setErrorModel}/>
            ):""}
            <div 
            className="w-fit flex">
                <h1 className="font-medium text-3xl">
                    PEP, Sanctions and Adverse Media
                </h1>
                {/* <svg 
                onClick={() => setHelperModel(true)}
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 mt-0.5 ml-3 text-sky-600 hover:text-neutral-600 cursor-pointer transition duration-400">
                    <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
                </svg> */}
            </div>
    
            <table className='w-full text-left mt-10'>
                <thead className="bg-neutral-200 text-sm">
                    <tr>
                        <th className='p-2'></th>
                        <th className='p-2'>Description of service / units</th>
                        <th className='p-2'>Price per unit</th>
                        <th className='p-2'>Units per month</th>
                        <th className='p-2'>Remaining Units</th>
                    </tr>
                </thead>
                <tbody className='text-sm'>
                    <tr>
                        <td className='p-2 border border-neutral-200'>PEP, Sanctions and Adverse Media</td>
                        <td className='p-2 border border-neutral-200'>PEP, Sanctions and Adverse Media</td>
                        <td className='p-2 border border-neutral-200 text-right'>R3.00</td>
                        <td className='p-2 border border-neutral-200 text-right'>50</td>
                        <td className='p-2 border border-neutral-200 text-right'>{license.length > 0 ? license[0].searches:""}</td>
                    </tr>
                </tbody>
            </table>
    
            <div className="flex mt-6">
                <div className="grid h-fit">
                    {/* <div className='grid mb-4 '>
                        <label className='mt-1 text-xs w-full text-right font-bold mb-0.5'>E.g. Individual - Lifestyle Audit</label>
                        <input 
                        value={header}
                        onChange={(e) => setHeader(e.target.value)}
                        placeHolder="Provide your search a title"
                        className={header.length <=0 ? "h-fit text-sm rounded border border-red-400 bg-white shadow p-2 w-80":"h-fit text-sm rounded border border-neutral-200 bg-white shadow p-2 w-80"}/>
                        {error&&header.length <= 0 ? <label className='mt-1 text-xs text-red-400'>This is a required field</label>:<label className='mt-1 text-xs'>Input a title to your search</label>}
                    </div> */}
    
                    {/* PERSONAL REFERENCE NUMBER */}
                    <div className='mb-6 grid'>
                        <label className='mt-1 text-xs w-full text-right font-bold mb-0.5'>E.g. TEL001</label>
                        <input 
                        value={reference}
                        maxlength="30"
                        onChange={(e) => setReference(e.target.value)}
                        placeHolder="Telkom/Case Reference Number"
                        className={reference.length <=0 ? "h-fit text-sm rounded border border-red-400 bg-white shadow p-2 w-80":"h-fit text-sm rounded border border-neutral-200 bg-white shadow p-2 w-80"}/>
                        {error&&reference.length <= 0 ? <label className='mt-1 text-xs text-red-400'>This is a required field</label>:<label className='mt-1 text-xs'>Add a reference or case number to your search</label>}
                    </div>
    
                    {/* ID NUMBER */}
                    <div className='mb-6 grid'>
                        <label className='mt-1 text-xs w-full text-right font-bold mb-0.5'>E.g. Julius Malema</label>
                        <input 
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value)}
                        placeHolder="Term"
                        className={idNumber.length <=0 ? "h-fit text-sm rounded border border-red-400 bg-white shadow p-2 w-80":"h-fit text-sm rounded border border-neutral-200 bg-white shadow p-2 w-80"}/>
                        {error&&idNumber.length <= 0 ? <label className='mt-1 text-xs text-red-400'>This is a required field</label>:<label className='mt-1 text-xs'>Main search term</label>}
                    </div>
    
                    {/* FIRST NAME */}
                    <div className='mb-6 grid'>
                        <label className='mt-1 text-xs w-full text-right font-bold mb-0.5'>E.g. Exact Scope</label>
                        <select 
                        onChange={(e) => setFirstName(e.target.value)}
                        className={firstName.length <=0 ? "cursor-pointer h-fit text-sm rounded border border-red-400 bg-white shadow p-2 w-80":"cursor-pointer h-fit text-sm rounded border border-neutral-200 bg-white shadow p-2 w-80"}>
                            <option value="broad">Broad Scope</option>
                            <option value="default">Default Scope</option>
                            <option value="exact">Exact Scope</option>
                        </select>
                        {error&&firstName.length <= 0 ? <label className='mt-1 text-xs text-red-400'>This is a required field</label>:<label className='mt-1 text-xs w-80'>The mode of search, can only be one of these options (broad, default, exact)</label>}
                    </div>
    
                    <div className='mb-6 grid'>
                    <label className='mt-1 text-xs w-80 mb-1'>The type of search, can be all/any of these options (Adverse Media, PEP, Watchlists)</label>
                    <label>
                        <input
                        type="checkbox"
                        name="PEP"
                        value="PEP"
                        className='mr-2'
                        checked={checkboxValues.includes("PEP")}
                        onChange={handleCheckboxChange}
                        />
                        PEP
                    </label>
                    <label>
                        <input
                        type="checkbox"
                        name="Adverse Media"
                        value="Adverse Media"
                        className='mr-2'
                        checked={checkboxValues.includes("Adverse Media")}
                        onChange={handleCheckboxChange}
                        />
                        Adverse Media
                    </label>
                    <label>
                        <input
                        type="checkbox"
                        name="Watchlists"
                        value="Watchlists"
                        className='mr-2'
                        checked={checkboxValues.includes("Watchlists")}
                        onChange={handleCheckboxChange}
                        />
                        Watchlists
                    </label>
                    </div>
    
                    {/* PERMISSIBLE PURPOSE */}
                    <div className='mb-6 grid'>
                        <select 
                        onChange={(e) => setPermissablePurpose(e.target.value)}
                        className="cursor-pointer h-fit text-sm rounded border border-neutral-200 bg-white shadow p-2 w-80">
                        {PermissiblePurpose.purpose.map((pur) => (
                            <option value={pur}>{pur}</option>
                        ))}
                        </select>
                    </div>
                </div>
                <div className="grid ml-10 h-fit">
                <div className='grid mb-6'>
                    <label className='mt-1 text-xs w-full text-right font-bold mb-0.5'>E.g. 01/01/2020</label>
                    {/* SECOND NAME */}
                    <input 
                    value={sformattedDate}
                    onChange={handlesDateChange}
                    type="date"
                    placeHolder="Start Date"
                    className={startDate.length <=0 ? "h-fit text-sm rounded border border-red-400 bg-white shadow p-2 w-80":"h-fit text-sm rounded border border-neutral-200 bg-white shadow p-2 w-80"}/>
                    {error&&startDate.length <= 0 ? <label className='mt-1 text-xs text-red-400'>This is a required field</label>:<label className='mt-1 text-xs w-80'>Optional Earliest date for a news article, format(YYYY-MM-DD)</label>}
    
                </div>
    
                <div className='mb-6 grid'>
                    <label className='mt-1 text-xs w-full text-right font-bold mb-0.5'>E.g. 01/01/2023</label>
                    {/* DOB */}
                    <input 
                    onChange={handleeDateChange}
                    type="date"
                    value={eformattedDate}
                    placeHolder="EndDate"
                    className={endDate.length <=0 ? "h-fit text-sm rounded border border-red-400 bg-white shadow p-2 w-80":"h-fit text-sm rounded border border-neutral-200 bg-white shadow p-2 w-80"}/>
                    {error&&endDate.length <= 0 ? <label className='mt-1 text-xs text-red-400'>This is a required field</label>:<label className='mt-1 text-xs w-80'>Optional Latest date for a news article, format(YYYY-MM-DD)</label>}
                </div>
    
                    <div className='grid mb-6 w-80'>
                    <label className='mt-1 text-xs w-full text-right font-bold mb-0.5'>E.g. Fraud and Corruption</label>
                    {/* SURNAME */}
                    <input 
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    placeHolder="Refinement"
                    className="h-fit text-sm rounded border border-neutral-200 bg-white shadow p-2 w-80"/>
                        <label className='mt-1 text-xs'>Optional for refining your search. You can apply another search term such us returning red flags against "fraud and corruption".</label>
    
                    </div>
    
                    <div className='grid mb-6'>
                        {/* DOB */}
                        {/* <input 
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        placeHolder="DOB"
                        className="h-fit text-sm rounded border border-neutral-200 bg-white shadow p-2 w-80"/>
                        <label className='mt-1 text-xs'>A string to be used to filter results from watchlists</label> */}
    
                    </div>
    
    
                    <div className='mb-14 grid'>
                    <label className='mt-1 text-xs w-full text-right font-bold mb-0.5'>E.g. Threshold to 100</label>

                    {/* DOB */}
                    <p className='text-sky-700 font-bold'>{threshold.length === 0 ? 0:threshold}</p>
                    <input 
                    type="range"
                    value={threshold}
                    onChange={(e) => setThreshold(e.target.value)}
                    placeHolder="Threshold Score"
                    min="0" // Add this line to set the minimum value to 0
                    max="100" // Add this line to set the maximum value to 100
                    className="cursor-pointer w-80 h-fit text-sky-500"/>
                        <label className='mt-1 text-xs w-80'>The minimum score required for an Adverse Media result to be displayed</label>
    
                    </div>
    
                    
                        <button 
                        onClick={loading ? "":handleSubmission}
                        className="transition duration-400 hover:bg-sky-400 h-fit mb-4 rounded bg-sky-500 text-white shadow p-2 w-80 font-medium">
                            {loading ? "Running...":"Search"}
                        </button>
                </div>
            </div>
        </div>
        )}
    </div>
  )
}

export default Personlisting