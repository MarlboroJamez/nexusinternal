import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Hooks
import useEncryptedCookie from '../../../hooks/cookies/useCookie';

// Views
import Searches from '../../../components/tables/teams/exhangemanagement'

function Exchangemanagement() {
  const [cookieValue, setCookieValue, getCookieValue] = useEncryptedCookie('ni-uid');
  const [cookieState, setCookieState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searches, setSearches] = useState([]);

  useEffect(() => {
    setCookieState(true)
    getCookieValue()
    setCookieState(false)
  },[])

  const config = {
    headers: {
        "Content-Type": "application/json",
    }
  }
  useEffect(() => {
    const fetchSearches = async () => {
      if(!cookieState && cookieValue){
        try {
          setLoading(true);
          await axios.post('/api/v1/client/dashboard/data', {
            uid: cookieValue._id,
            pid: cookieValue.package[0]._id,
            meta: [],
          }, config).then(res => {
            setSearches(res.data.searches);
          });
          setLoading(false);
        } catch(e) {
          console.log(e)
        }
      }
    }

    fetchSearches();
  },[cookieState, cookieValue])

  return (
    <div>
        <h1 className="text-xl font-medium text-sky-700">
            Exchange Management
        </h1>

        <div className="mt-4">
            <p className="w-120 text-sm text-neutral-600">
                Are you tired of manually distributing search reports to your team members? Well, have no fear because our exchange management feature is here! With just a few clicks, you can grant your team members access to your search reports, and we'll take care of the rest. No more tedious emails or downloads - we'll distribute the reports directly to their Microsoft Exchange 365 email. It's like having a personal report fairy, but without the wings (sorry, fairy wings not included). So sit back, relax, and let our exchange management feature do the heavy lifting for you. Your team will thank you, and you'll have more time to enjoy your favorite beverage.
            </p>
        </div>

        <div>
            <Searches data={searches}/>
        </div>
    </div>
  )
}

export default Exchangemanagement