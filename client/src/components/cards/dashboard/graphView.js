import React from 'react';

// Graphs
import SearchesOverview from '../../graphs/dashboard/barSearches';
import ProjectOverview from '../../graphs/dashboard/barProjects';
import ActivityOverview from '../../graphs/dashboard/actvityBarChart';

function GraphView({searches, projects, activity}) {
  return (
    <div className="w-full flex justify-evnely">
        <div className="mr-6 flex-5">
            <SearchesOverview searches={searches}/>
        </div>
        {/* <div className="mr-6 flex-3">
            <ProjectOverview projects={projects}/>
        </div> */}
        <div className="mr-6 flex-5">
            <ActivityOverview activity={searches}/>
        </div>
    </div>
  )
}

export default GraphView