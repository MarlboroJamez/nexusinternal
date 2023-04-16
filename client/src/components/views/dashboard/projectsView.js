import React from 'react'

// Tables 
import Table from '../../tables/dashboard/projects'

function ProjectsView({projects}) {
  return (
    <div>
      <Table data={projects}/>
    </div>
  )
}

export default ProjectsView