import React, { useState } from 'react'

// Search Cards
import IDVWithPhoto from '../idvwithphoto/idvwithphoto';
import IDVWithoutPhoto from '../idvwithoutphoto/idvwithoutphoto';

function Idvvalidation({selectedProject, share, notified, project}) {
    const [type, setType] = useState("with")
  return (
    <div>

        <select 
        onChange={(e) => setType(e.target.value)}
        className="mb-10 rounded shadow-md bg-neutral-300 p-1 cursor-pointer hover:bg-neutral-200 outline-none">
          <option>
            Select with or without photo...
          </option>
          <option value="with">IDV with photo</option>
          <option value="without">IDV without photo</option>
        </select>
        {type === "without" && <IDVWithoutPhoto selectedProject={selectedProject} share={share} project={project} notified={notified}/>}
        {type === "with" && <IDVWithPhoto selectedProject={selectedProject} share={share} project={project} notified={notified}/>}
    </div>
  )
}

export default Idvvalidation