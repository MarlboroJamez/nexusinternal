import React from 'react'

// Cards
import TeamProjectSelect from '../../cards/projects/teamProjectsSelect'
import ProjectCards from '../../cards/projects/projectCard';

function TeamProject({data, cookieValue, setSelectedProject, setView}) {
  return (
    <div className="mt-6">
      <TeamProjectSelect/>

      <div className="w-full ">
        {data.length > 0 ? (
          <ProjectCards cookieValue={cookieValue} data={data} setSelectedProject={setSelectedProject} setView={setView}/>
        ):(
          <p className="text-light mt-32 text-center text-neutral-500">
             No projects have been created, get started by creating one for you or either team.
          </p>
        )}
      </div>
    </div>
  )
}

export default TeamProject