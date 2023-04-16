import React, { useEffect, useState } from 'react'

// Hooks
import useEncryptedCookie from '../../../../../hooks/cookies/useCookie';

// Search Cards
import CommercialEnquiry from '../cipcdirectorslist/cipcdirectorslist';
import ProcurementEnquiry from '../procurementenquiry/procurementenquiry';

function Idvvalidation({selectedProject, share, notified, project}) {
    const [type, setType] = useState("")
    const [cookieValue, setCookieValue, getCookieValue] = useEncryptedCookie('ni-uid');
    const [cookieState, setCookieState] = useState(false);
    const procurement = cookieValue ? cookieValue.license[0].restrictions.filter(item => item.type === "Procurement Enquiry"):""
    const commercial = cookieValue ? cookieValue.license[0].restrictions.filter(item => item.type === "Commercial Enquiry"):""

    useEffect(() => {
      setCookieState(true)
      getCookieValue()
      setCookieState(false)
    },[])

    useEffect(() => {
      if(cookieValue){
        if(commercial[0].access === true || procurement[0].access === true){
          setType("commercial")
        } else {
          setType("")
        }
      }
    },[cookieValue, cookieState])



  return (
    <div>

        <select 
        onChange={(e) => setType(e.target.value)}
        className="mb-10 rounded shadow-md bg-neutral-300 p-1 cursor-pointer hover:bg-neutral-200 outline-none">
          {cookieValue && commercial[0].access ? (
            <option value="commercial">Commercial Enquiry</option>
          ):""}
          {cookieValue && procurement[0].access ? (
            
          <option value="procurement">Procurement Enquiry</option>
          ):""}

          {cookieValue && procurement[0].access === false && commercial[0].access === false && (
            <option value="procurement">Both search types have been restricted</option>
          )}
        </select>
        {type === "commercial" && <CommercialEnquiry selectedProject={selectedProject} share={share} project={project} notified={notified}/>}
        {type === "procurement" && <ProcurementEnquiry selectedProject={selectedProject} share={share} project={project} notified={notified}/>}
    </div>
  )
}

export default Idvvalidation