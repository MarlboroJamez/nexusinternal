import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Hooks
import useEncryptedCookie from '../../../hooks/cookies/useCookie';

// Cards
import ProjectViews from '../../cards/projects/projectViews';

// Views
import MyProjects from '../../views/projects/myProjects';
import TeamProjects from '../../views/projects/teamProjects';
import NewProject from '../../views/projects/newProject';
import EditProject from '../../views/projects/editProject';

// Graphs
import MonthlySearches from '../../graphs/projects/monthlyBar'
import TypesSearches from '../../graphs/projects/typesBar';
import SearchCosts from '../../graphs/projects/searchCost';

function ProjectManagement() {
  const [cookieValue, setCookieValue, getCookieValue] = useEncryptedCookie('ni-uid');
  const [fetchingCookies, setFetchingCookies] = useState(false)
  const [selectProject, setSelectedProject] = useState();

  const [view, setView] = useState("my-projects");
  const [myProjects, setMyProjects] = useState([]);
  const [teamProjects, setTeamProjects] = useState([]);

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  useEffect(() => {
    setFetchingCookies(true)
    getCookieValue()
    setFetchingCookies(false)
  },[])
  
  useEffect(() => {
    const fetchData = async() => {
      if(cookieValue && !fetchingCookies){
        try {
          await axios.post(`/api/v1/projects/get`,{
            uid: cookieValue._id
          }, config).then(res => {
            setMyProjects(res.data.data);
          });

          await axios.post(`/api/v1/projects/team`,{
            pid: cookieValue.package[0]._id
          }, config).then(res => {
            setTeamProjects(res.data.data);
          });
        } catch (err) {
  
        }
      }
    } 
    fetchData()
  },[cookieValue, fetchingCookies])

  
  const refreshProjects = async() => {
    if(cookieValue && !fetchingCookies){
      try {
        await axios.post(`/api/v1/projects/get`,{
          uid: cookieValue._id
        }, config).then(res => {
          setMyProjects(res.data.data);
        });

        await axios.post(`/api/v1/projects/team`,{
          pid: cookieValue.package[0]._id
        }, config).then(res => {
          setTeamProjects(res.data.data);
        });
      } catch (err) {

      }
    }
  } 
  return (
    <div>
      <h1 className="text-xl font-medium text-sky-700">
        Project Management
      </h1>

      <p className="text-neutral-500 mt-2">
        Effective project management enables you to efficiently manage, create, and update both individual and collaborative projects.
      </p>

      {/* GRAPHS */}
        <div className='flex mt-10 mb-6 justify-center'>
            <div className='mr-8'>
                <SearchCosts searches={myProjects}/>
            </div>
            
            <div className='mr-8'>
                <TypesSearches searches={myProjects}/>
            </div>

            <div className='ml-8'>
              <MonthlySearches activity={myProjects}/>
            </div>
        </div>
      {/* PROJECT SELECT VIEWS */}
      <div className="w-full flex">
        <svg 
        onClick={refreshProjects}
        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mt-8 mr-6 text-sky-700 hover:text-sky-600 cursor-pointer w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>

        <ProjectViews view={view} setView={setView}/>
      </div>

      {/* VIEWS */}
      <div className="w-full mt-6 min-h-screen">
        {view === "my-projects" && <MyProjects data={myProjects} setView={setView} cookieValue={cookieValue} setSelectedProject={setSelectedProject}/>}
        {view === "team-projects" && <TeamProjects data={teamProjects} setView={setView} cookieValue={cookieValue} setSelectedProject={setSelectedProject} />}
        {view === "new-project" && <NewProject/>}
        {view === "edit-project" && <EditProject setView={setView} selectProject={selectProject}/>}
      </div>
    </div>
  )
}

export default ProjectManagement