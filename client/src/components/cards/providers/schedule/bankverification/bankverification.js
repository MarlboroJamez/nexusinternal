import React, { useState } from 'react'

// Search card
import BankAccountVerification from '../bankaccountverification/bankaccountverification';
import BankAccountVerificationCompany from '../bankaccountverificationcompany/bankaccountverificationcompany';

function Bankverification({selectedProject, share, notified, project}) {
    const [type, setType] = useState("individual")
  return (
    <div>
        <select 
        onChange={(e) => setType(e.target.value)}
        className="mb-10 rounded shadow-md bg-neutral-300 p-1 cursor-pointer hover:bg-neutral-200 outline-none">
          <option>
            Select individual or entity...
          </option>
          <option value="individual">Individual</option>
          <option value="entity">Entity</option>
        </select>

        {type === "individual" && <BankAccountVerification selectedProject={selectedProject} share={share} project={project} notified={notified}/>}
        {type === "entity" && <BankAccountVerificationCompany selectedProject={selectedProject} share={share} project={project} notified={notified}/>}
    </div>
  )
}

export default Bankverification