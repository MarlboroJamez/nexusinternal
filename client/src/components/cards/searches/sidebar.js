import React, { useEffect, useState } from 'react'

// Contexts
import { AppState } from '../../../context/Context';

// Hooks
import useEncryptedCookie from '../../../hooks/cookies/useCookie';

// Models
import ErrorModel from '../../models/global/error';

// Assets
import SearchIMG from '../../../assets/images/search.png';
import ManagementIMG from '../../../assets/images/management.png';
import ClientIMG from '../../../assets/images/client.png';
import AlertIMG from '../../../assets/images/alert.png';

function Sidebar({view, setView}) {
    const [cookieValue, setCookieValue, getCookieValue] = useEncryptedCookie('ni-uid');
    const [cookieState, setCookieState] = useState(false);
    const {state, dispatch} = AppState();
    const [errorModel, setErrorModel] = useState(false)

    useEffect(() => {
        setCookieState(true);
        getCookieValue();
        setCookieState(false);
    }, []);

  return (
    <div>
        {errorModel ? (
            <ErrorModel setModal={setErrorModel} message={"Your access has been restricted by your admin, please contact him to enable this feature."}/>
        ):""}
        <div>
            <div 
            onClick={() => console.log(state)}
            className="flex">
                <img src={SearchIMG} alt="" className="h-5 w-5 mt-1 mr-4"/>
                <h1 className="font-bold text-neutral-700 text-xl">
                    Searches
                </h1>
            </div>

            <ul className="pl-9 mt-2">
                <li 
                onClick={() => setView("new-search")}
                className={view === "new-search" ? "w-fit h-fit mb-1.5 cursor-pointer text-sky-700 font-medium transition duration-400":"w-fit h-fit mb-1.5 text-neutral-600 cursor-pointer hover:text-black transition duration-400"}>
                    New search
                </li>
                {/* <li  
                onClick={() => setView("schedule-search")}
                className={view === "schedule-search" ? "w-fit h-fit mb-1.5 cursor-pointer text-sky-700 font-medium transition duration-400":"w-fit h-fit mb-1.5 text-neutral-600 cursor-pointer hover:text-black transition duration-400"}>
                    Schedule search
                </li> */}
                <li  
                onClick={() => setView("incoming-searches")}
                className={view === "incoming-searches" ? "flex w-fit h-fit mb-1.5 cursor-pointer text-sky-700 font-medium transition duration-400":"flex w-fit h-fit mb-1.5 text-neutral-600 cursor-pointer hover:text-black transition duration-400"}>
                        Incoming Searches {state.cpbsearches.length > 0 ? (
                        <img src={AlertIMG} alt="" className="ml-2 h-3 w-3"/>
                    ):""}
                </li>
                {/* <li  
                onClick={() => setView("audit-report")}
                className={view === "audit-report" ? "flex w-fit h-fit mb-1.5 cursor-pointer text-sky-700 font-medium transition duration-400":"flex w-fit h-fit mb-1.5 text-neutral-600 cursor-pointer hover:text-black transition duration-400"}>
                     Audit Report {state.cpbsearches.length > 0 ? (
                        <img src={AlertIMG} alt="" className="ml-2 h-3 w-3"/>
                    ):""}
                </li> */}
                {/* <li  
                onClick={() => setView("schedule-manager")}
                className={view === "schedule-manager" ? "w-fit h-fit mb-1.5 cursor-pointer text-sky-700 font-medium transition duration-400":"w-fit h-fit mb-1.5 text-neutral-600 cursor-pointer hover:text-black transition duration-400"}>
                    Schedule Manager
                </li>
                <li  
                onClick={() => setView("link-analysis")}
                className={view === "link-analysis" ? "w-fit h-fit mb-1.5 cursor-pointer text-sky-700 font-medium transition duration-400":"w-fit h-fit mb-1.5 text-neutral-600 cursor-pointer hover:text-black transition duration-400"}>
                    Link Analysis
                </li> */}
            </ul>
        </div>

        
        {/* <div className='mt-10'>
            <div className="flex">
                <img src={ManagementIMG} alt="" className="h-5 w-5 mt-1 mr-4"/>
                <h1 className="font-bold text-neutral-700 text-xl">
                    Management
                </h1>
            </div>

            <ul className="pl-9 mt-2">
                <li  
                onClick={() => setView("project-management")}
                className={view === "project-management" ? "w-fit h-fit mb-1.5 cursor-pointer text-sky-700 font-medium transition duration-400":"w-fit h-fit mb-1.5 text-neutral-600 cursor-pointer hover:text-black transition duration-400"}>
                    Project Management
                </li>
            </ul>
        </div> */}

        
        {/* <div className='mt-10'>
            <div className="flex">
                <img src={ClientIMG} alt="" className="h-5 w-5 mt-1 mr-4"/>
                <h1 className="font-bold text-neutral-700 text-xl">
                    Client
                </h1>
            </div>

            <ul className="pl-9 mt-2">
                <li  
                onClick={() => setView("boquet-overview")}
                className={view === "boquet-overview" ? "w-fit h-fit mb-1.5 cursor-pointer text-sky-700 font-medium transition duration-400":"w-fit h-fit mb-1.5 text-neutral-600 cursor-pointer hover:text-black transition duration-400"}>
                    Bouquet overview
                </li>
                <li  
                onClick={() => setView("ad-hocs")}
                className={view === "ad-hocs" ? "w-fit h-fit mb-1.5 cursor-pointer text-sky-700 font-medium transition duration-400":"w-fit h-fit mb-1.5 text-neutral-600 cursor-pointer hover:text-black transition duration-400"}>
                    Ad Hocs Overview
                </li>
            <li  
            onClick={() => setView("reporting")}
            className={view === "reporting" ? "w-fit h-fit mb-1.5 cursor-pointer text-sky-700 font-medium transition duration-400":"w-fit h-fit mb-1.5 text-neutral-600 cursor-pointer hover:text-black transition duration-400"}>
                Reporting
            </li>
            </ul>
        </div> */}
    </div>
  )
}

export default Sidebar