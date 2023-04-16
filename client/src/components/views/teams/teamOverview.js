import React, { useEffect, useState } from 'react'
import axios from 'axios';

//Cards
import Sidebar from '../../../components/cards/dashboard/dashboardSelect';
import Graphs from '../../../components/cards/dashboard/graphView';

// Hooks
import useEncryptedCookie from '../../../hooks/cookies/useCookie';

// Views
import Searches from '../../../components/views/dashboard/searchesView';
import Projects from '../../../components/views/dashboard/projectsView';
import Teams from '../../../components/views/dashboard/teamView';
import Activity from '../../../components/views/dashboard/activityView';

function TeamOverview() {
  const [view, setView] = useState("searches");
  const [loading, setLoading] = useState(false);
  const [cookieValue, setCookieValue, getCookieValue] = useEncryptedCookie('ni-uid');
  const [cookieState, setCookieState] = useState(false);

  const [searches, setSearches] = useState([]);
  const [activity, setActivity] = useState([]);
  const [team, setTeam] = useState([]);
  const [projects, setProjects] = useState([]);

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
            pid: cookieValue.license[0]._id,
            meta: [],
          }, config).then(res => {
            setSearches(res.data.teamprojects);
            setActivity(res.data.searches)
            setProjects(res.data.teamprojects);
            setTeam(res.data.members)
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
    <div className='pl-10'>
      <h1 
      className="text-xl font-medium text-sky-700">
        Team Overview
      </h1>

      <div className="mt-10 w-full min-h-screen">
        <Graphs projects={projects} searches={searches} activity={activity}/>

        <div className="mt-10 w-full">
          <h1 
          className="text-xl font-medium">
            Overview
          </h1>

          {/* DASHBOARD SELECT */}
          <div className="mt-4 w-full pb-2 border-b border-neutral-200">
            <Sidebar view={view} setView={setView}/>
          </div>

          {/* TABLES */}
          <div className="mt-8">
            {view === "searches" && <Searches searches={searches} loading={loading}/>}
            {view === "activity" && <Activity activity={activity}/>}
            {view === "team" && <Teams team={team} loading={loading}/>}
            {view === "projects" && <Projects projects={projects}/>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamOverview