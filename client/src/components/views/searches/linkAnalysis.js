import React, { useEffect, useState } from 'react'
import axios from 'axios';

// Sample data:
import {searchTestData} from '../../../data/links/links';

// Hooks
import useEncryptedCookie from '../../../hooks/cookies/useCookie';

// Graphs
import ProjectLinksGraph from '../../graphs/links/actvityBarChart';
import NodesGraph from '../../graphs/links/barProjects';
import AllLinks from '../../graphs/links/barSearches';
import ForceGraph from '../../graphs/links/forceGraph';

// Cards
import LinksActionSelect from '../../cards/links/linksActionSelect';

function LinkAnalysis() {
    const [selectedProject, setSelectedProject] = useState([])
    const [projects, setProjects] = useState([])
    const [searches, setSearches] = useState([]);
    const [cookieValue, setCookieValue, getCookieValue] = useEncryptedCookie('ni-uid');
    const [cookieState, setCookieState] = useState(false);
    const [selected, setSelected] = useState("");
    const [generate, setGenerate] = useState(false)

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
    console.log(searchTestData)
    useEffect(() => {
    const fetchSearches = async () => {
      if(!cookieState && cookieValue){
        try {
          await axios.post('/api/v1/client/dashboard/data', {
            uid: cookieValue._id,
            pid: cookieValue.package[0]._id,
            meta: [],
          }, config).then(res => {
            setSearches(res.data.searches)
          });
        } catch(e) {
          console.log(e)
        }
      }
    }

    fetchSearches();
  },[cookieState, cookieValue])

  const handleGenerate = (selected) => {
    if(selected === "sample"){
      setSelected("sample")
    }
    setSelected(selected)
    setGenerate(true)
  }
        
  return (
    <div>
        <h1 
        className="mb-6 text-xl font-medium text-sky-700">
            Link Analysis
        </h1>

        <div className="flex justify-evenly">
            <div className="mr-2 w-100">
                <ProjectLinksGraph activity={[]}/>
            </div>
            <div className="mr-2 w-fit">
                <NodesGraph projects={[]}/>
            </div>
            <div className="mr-2 w-fit">
                <AllLinks searches={[]}/>
            </div>
        </div>

        <div className='mt-10'>
            <LinksActionSelect generate={generate} handleGenerate={handleGenerate}/>
        </div>

        <div className='mt-10'>
          {searches ? (
            <ForceGraph data={searches} properties={["FirstName"]}/>
          ):""}
        </div>
    </div>
  )
}

export default LinkAnalysis