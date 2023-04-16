import React, { useEffect, useState } from 'react'

// Hooks
import useEncryptedCookie from '../../../../../hooks/cookies/useCookie';

// Search Cards
import IDVWithPhoto from '../idvwithphoto/idvwithphoto';
import IDVWithoutPhoto from '../idvwithoutphoto/idvwithoutphoto';

function Idvvalidation({selectedProject, share, notified, project}) {
    const [type, setType] = useState("with")
    const [cookieValue, setCookieValue, getCookieValue] = useEncryptedCookie('ni-uid');
    const [cookieState, setCookieState] = useState(false);
    const idvwithphoto = cookieValue ? cookieValue.license[0].restrictions.filter(item => item.type === "IDV Listing including photo"):""
    const idvwithoutphoto = cookieValue ? cookieValue.license[0].restrictions.filter(item => item.type === "IDV Listing without photo"):""
  
    useEffect(() => {
      setCookieState(true)
      getCookieValue()
      setCookieState(false)
    },[])

    useEffect(() => {
      if(cookieValue){
        if(idvwithphoto[0].access === true || idvwithoutphoto[0].access === true){
          setType("with")
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
          {cookieValue && idvwithphoto[0].access ? (
            <option value="with">IDV with photo</option>
          ):""}
          {cookieValue && idvwithoutphoto[0].access ? (
            <option value="without">IDV without photo</option>
          ):""}
        </select>
        {type === "without" && <IDVWithoutPhoto selectedProject={selectedProject} share={share} project={project} notified={notified}/>}
        {type === "with" && <IDVWithPhoto selectedProject={selectedProject} share={share} project={project} notified={notified}/>}
    </div>
  )
}

export default Idvvalidation