import React, { useEffect, useState } from 'react'

// Hooks
import useEncryptedCookie from '../../../hooks/cookies/useCookie';

// Cards
import AboutReport from '../.../../../cards/report/aboutReport';

function AuditReport() {
    const [cookieValue, setCookieValue, getCookieValue] = useEncryptedCookie('ni-uid');
    const [cookieState, setCookieState] = useState(false);

    useEffect(() => {
      setCookieState(true)
      getCookieValue()
      setCookieState(false)
    },[])

    console.log(cookieValue)
  return (
    <div className="w-128">
        <h1 className="flex text-2xl font-medium w-full p-2 h-fit bg-white border border-sky-700 rounded shadow-lg text-center">
            Audit Report {cookieValue && (<p className='ml-2'>- <mark className="bg-transparent text-sky-900">{cookieValue.license[0].name}</mark></p>)}
        </h1>
        
        {/* AUDIT REPORT DETAILS */}
        <div>
            <AboutReport cookie={cookieValue}/>
        </div>
    </div>
  )
}

export default AuditReport