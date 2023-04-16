import React, { useContext, useEffect, useState } from 'react'
import {Link, NavLink} from 'react-router-dom'
import { useMsal } from '@azure/msal-react';

//Assets 
import Logo from '../../../assets/images/logo.png';
import TelkomLogo from '../../../assets/images/telkomlogo.png';
import Profile from '../../../assets/images/profile.png';
import useEncryptedCookie from '../../../hooks/cookies/useCookie';

function Header({history}) {
    const [inboxMessengerNotifications, setInboxMessengerNotifications] = useState(false);
    const [view, setView] = useState("new-search");
    const [cookieValue, setCookieValue, getCookieValue] = useEncryptedCookie('ni-uid');
    const [cookieState, setCookieState] = useState(false);
    const [socketConnected, setSocketConnected] = useState(false)
    const { instance } = useMsal();

    useEffect(() => {
        setCookieState(true);
        getCookieValue();
        setCookieState(false);
    }, []);

    const handleLogout = () => {
        setCookieValue(null)
        instance.logout();
    }
    

  return (
    <div className='bg-white flex justify-between pl-2 pr-2 pt-3 pb-1 h-fit w-full border-b-2 border-sky-700 shadow-lg z-50 sticky'>
        {/* LEFT */}
        <div className='flex'>
            <Link to="/dashboard">
                <img 
                src={Logo} 
                alt="" 
                className='cursor-pointer h-14'/>
            </Link>
            <Link to="/dashboard">
                <img 
                src={TelkomLogo} 
                alt="" 
                className='ml-10 mr-10 cursor-pointer h-14 -mt-0.5'/>
            </Link>
            {/* MENU */}
            <div className='ml-10'>
                <ul className='flex mt-4 text-neutral-800'>
                    <li 
                    className='mr-5 mt-1 mb-1 hover:text-sky-500 cursor-pointer'>
                        <NavLink to="/dashboard" activeClassName="pb-1 border-b-2 border-sky-500">
                            DASHBOARD
                        </NavLink>
                    </li>
                    <li className='mr-5 mt-1 mb-1 hover:text-sky-500 cursor-pointer'>
                        <NavLink to="/search" activeClassName="pb-1 border-b-2 border-sky-500">
                            SEARCH
                        </NavLink>
                    </li>
                    <li className='mr-5 mt-1 mb-1 hover:text-sky-500 cursor-pointer'>
                        <NavLink to="/team" activeClassName="pb-1 border-b-2 border-sky-500">
                            TEAM
                        </NavLink>
                    </li>
                    <li className='mr-5 mt-1 mb-1 hover:text-sky-500 cursor-pointer'>
                        <NavLink to="/support" activeClassName="pb-1 border-b-2 border-sky-500">
                            SUPPORT
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>

        {/* RIGHT */}
        <div className='flex'>
            {/* PROFILE */}
            <div className='flex mt-5'>
                <div className='mr-10 w-fit h-fit'>
                    {cookieValue ? (
                        <p className='flex text-lg'>Welcome back, <mark className='bg-transparent font-medium text-sky-700 ml-2'>{cookieValue.name} {cookieValue.surname}</mark></p>
                    ):""}
                </div>

                <div 
                onClick={handleLogout}
                className='flex w-fit h-fit mt-0.5 text-red-600 hover:text-red-800 cursor-pointer hover:underline transition duration-400'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mt-1 w-4 h-4 mr-2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                    <label className='cursor-pointer'>
                        Logout
                    </label>
                </div>
            </div>
        </div>
        </div>
  )
}

export default Header