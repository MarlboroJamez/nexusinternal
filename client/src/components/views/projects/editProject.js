import React, { useEffect, useState } from 'react'
import axios from 'axios';

// Hooks
import useEncryptedCookie from '../../../hooks/cookies/useCookie';

// Cards
import MemberCard from '../../cards/projects/memberCard';
import AddMemberCard from '../../cards/projects/addedMemberCard';

function EditProject({setView, selectProject}) {
  const [cookieValue, setCookieValue, getCookieValue] = useEncryptedCookie('ni-uid');
  const [projectName, setProjectName] = useState(selectProject[0].name);
  const [priorityLevel, setPriorityLevel] = useState(selectProject[0].priorityLevel);
  const [startDate, setStartDate] = useState(selectProject[0].startDate);
  const [endDate, setEndDate] = useState(selectProject[0].endDate);
  const [description, setDescription] = useState(selectProject[0].description);
  const [members, setMembers] = useState([])
  const [share, setShare] = useState(selectProject[0].share);

  const [fetchingCookies, setFetchingCookies] = useState(false)
  const [selectedMembers, setSelectedMembers] = useState(selectProject[0].members);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState('');
  const [loading, setLoading] = useState(false);

  const config = {
    headers: {
        'Content-Type': 'application/json'
    }
  }
  
  useEffect(() => {
    setFetchingCookies(true)
    getCookieValue()
    setFetchingCookies(false)
  },[])

  useEffect(() => {
    const fetchData = async () => {
    if(cookieValue && !fetchingCookies){
      axios.post(`/api/v1/team/all`, {
          pid: cookieValue.package[0]._id
        }, config).then(res => {
          setMembers(res.data.data);
        });
      }
    }

    fetchData()
  },[cookieValue, fetchingCookies])

  const handleUpdate = async () => {
    try {
      const {data} = await axios.post('/api/v1/projects/update', {
        uid: selectProject[0]._id,
        share: share,
        name: projectName,
        uname: cookieValue.name,
        usurname: cookieValue.surname,
        description: description,
        priorityLevel: priorityLevel,
        members: selectedMembers,
        license: cookieValue.license,
        packages: cookieValue.package,
      }, config);
      setView('my-projects');
    } catch (err) {
        console.log(err.message);
    }
  }

  const handleGroup = (userToAdd) => {
    if (selectedMembers.includes(userToAdd)) {
      return 'User already added.';
    }

    setSelectedMembers([...selectedMembers, userToAdd]);
  };

  const handleSearch = async (query) => {
    setSearch(query);

    if (!query) {
        return;
    }

    try {
        setLoading(true);
        
        const {data} = await axios.post('/api/v1/team/search',{
            pid: cookieValue.package[0]._id,
            uid: cookieValue.uid,
            search: query,
        }, config);
        setLoading(false);
        setSearchResult(data.data);
    } catch(err) {
        console.log('Failed to load the search results.')
    }
  }

  const handleDelete = (delUser) => {
    setSelectedMembers(selectedMembers.filter((sel) => sel._id !== delUser._id));
  };

  console.log(selectProject)

  return (
    <div>
      <div className="flex">
          <div className="flex-5">
            {/* PROJECT NAME */}
            <div className="grid">
              <label>Project Name</label>
              <input 
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeHolder="Project Name"
              className="mt-2 h-fit mb-4 text-sm rounded border border-neutral-200 bg-white shadow p-2 w-72"/>
            </div>

            {/* PRIORITY LEVEL */}
            <div className="grid">
              <label>Priority Level</label>
              <select
              onChange={(e) => setPriorityLevel(e.target.value)} 
              className="mt-2 w-72 mb-4 mr-10 rounded shadow-md bg-neutral-300 p-2 cursor-pointer hover:bg-neutral-200 outline-none">
                <option selected>Select priority</option>
                <option value="free">Free Time</option>
                <option value="low">Low Priority</option>
                <option value="moderate">Moderate Priority</option>
                <option value="high">High Priority</option>
                <option value="urgent">Urgent Priority</option>
              </select>
            </div>

            {/* PROJECT START DATE */}
            <div className="grid">
              <label>Project Description</label>
              <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2 h-72 mb-4 text-sm rounded border border-neutral-200 bg-white shadow p-2 w-100 h-40 resize-none"/>
            </div>
          </div>

          <div className="flex-5">
            {/* MEMBER MANAGEMENT */}
            <div className="grid">
              <label>Member Management</label>

              {/* SHARE WITH MEMBERS */}
              <div className="flex mt-2 mb-2">
                <input
                value={share}
                onChange={(e) => setShare(true)}
                type="checkbox"
                className='rounded cursor-pointer h-4 w-4 mt-1 mr-3'/>
                <p>
                  Would you like to share this project to your team members?
                </p>
              </div>

              {/* SEARCH MEMBER */}
              <input 
              onChange={(e) => handleSearch(e.target.value)}
              placeHolder="Search team member"
              className="outline-none mt-2 h-fit mb-4 text-sm rounded border border-neutral-200 bg-white shadow p-2 w-72"/>
            </div>


            {/* MEMBERS SELECTION */}
            <div className="h-98 w-full rounded shadow-inner border border-neutral-200">
              <div className="h-fit w-full p-3 flex flex-wrap">
                {selectedMembers?.map((mem) => (
                  <AddMemberCard 
                  handleDelete={handleDelete}
                  dataSource={mem}
                  member={mem}/>
                ))}
              </div>
              <div className="mt-4 flex flew-wrap p-3 w-full">
                {searchResult ? (
                  <div className='w-full'>
                    {!loading ? (
                      <div className='w-full'>
                        {searchResult?.slice(0,4).map(ser => (
                          <div 
                          className='w-full'
                          onClick={() => handleGroup(ser)}>
                            <MemberCard member={ser}/>
                          </div>
                        ))}
                      </div>
                    ):(
                      <div className="w-full grid place-items-center">
                        <p>
                          Loading...
                        </p>
                      </div>
                    )}
                  </div>
                ):null}
              </div>
            </div>
          </div>
      </div>

      <button 
      onClick={handleUpdate}
      className="mt-4 w-100 rounded shadow bg-sky-500 hover:bg-sky-400 text-white p-2 font-medium">
        Update project
      </button>
    </div>
  )
}

export default EditProject