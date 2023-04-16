import React, { useEffect, useState } from 'react'

// Hooks
import useEncryptedCookie from '../../../hooks/cookies/useCookie';

// Assets
import SearchIMG from '../../../assets/images/exchange.png';

function Sidebar({view, setView}) {
    const [cookieValue, setCookieValue, getCookieValue] = useEncryptedCookie('ni-uid');
    const [cookieState, setCookieState] = useState(false);

    useEffect(() => {
        setCookieState(true);
        getCookieValue();
        setCookieState(false);
      }, []);
  return (
    <div>
        <div>
            <div>
                <div 
                className="flex">
                    <img src={SearchIMG} alt="" className="h-5 w-5 mt-1 mr-4"/>
                    <h1 className="font-bold text-neutral-700 text-xl">
                        Team Management
                    </h1>
                </div>

                <ul className="pl-9 mt-2">
                    <li 
                    onClick={() => setView("team-overview")}
                    className={view === "team-overview" ? "w-fit h-fit mb-1.5 cursor-pointer text-sky-700 font-medium transition duration-400":"w-fit h-fit mb-1.5 text-neutral-600 cursor-pointer hover:text-black transition duration-400"}>
                        Team Overview
                    </li>
                    {/* <li  
                    onClick={() => setView("team-messenger")}
                    className={view === "team-messenger" ? "w-fit h-fit mb-1.5 cursor-pointer text-sky-700 font-medium transition duration-400":"w-fit h-fit mb-1.5 text-neutral-600 cursor-pointer hover:text-black transition duration-400"}>
                        Team Messenger
                    </li> */}
                    {cookieValue && cookieValue.isTeamAdmin ? (
                        <li  
                        onClick={() => setView("member-management")}
                        className={view === "member-management" ? "w-fit h-fit mb-1.5 cursor-pointer text-sky-700 font-medium transition duration-400":"w-fit h-fit mb-1.5 text-neutral-600 cursor-pointer hover:text-black transition duration-400"}>
                            Member Management
                        </li>
                    ):""}
                    {cookieValue && cookieValue.isTeamAdmin ? (
                        <li  
                        onClick={() => setView("report-overview")}
                        className={view === "report-overview" ? "w-fit h-fit mb-1.5 cursor-pointer text-sky-700 font-medium transition duration-400":"w-fit h-fit mb-1.5 text-neutral-600 cursor-pointer hover:text-black transition duration-400"}>
                            Report Overview
                        </li>
                    ):""}
                </ul>
            </div>
            {/* <div className="mt-10">
                <div 
                className="flex">
                    <img src={SearchIMG} alt="" className="h-5 w-5 mt-1 mr-4"/>
                    <h1 className="font-bold text-neutral-700 text-xl">
                        Exchange Management
                    </h1>
                </div>

                <ul className="pl-9 mt-2">
                    <li 
                    onClick={() => setView("exchange-management")}
                    className={view === "exchange-management" ? "w-fit h-fit mb-1.5 cursor-pointer text-sky-700 font-medium transition duration-400":"w-fit h-fit mb-1.5 text-neutral-600 cursor-pointer hover:text-black transition duration-400"}>
                        Exchange Management
                    </li>
                </ul>
            </div> */}
        </div>
    </div>
  )
}

export default Sidebar