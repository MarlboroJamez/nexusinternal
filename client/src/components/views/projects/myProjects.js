import React from 'react';


// Cards
import MyProjectsSelect from '../../cards/projects/myProjectsSelect';
import ProjectCards from '../../cards/projects/projectCard';

function MyProjects({data, cookieValue, setSelectedProject, setView}) {
  return (
    <div className='pt-6 border-t border-neutral-200'>
      <MyProjectsSelect/>

      <div className="w-full mt-8">
        {data.length > 0 ? (
          <div>
            {data.map((dat) => (
              <ProjectCards cookieValue={cookieValue} data={dat} setSelectedProject={setSelectedProject} setView={setView}/>
            ))}
          </div>
        ):(
          <p className="text-light mt-32 text-center text-neutral-500">
             No projects have been created, get started by creating one for you or either team.
          </p>
        )}
      </div>
    </div>
  )
}

export default MyProjects