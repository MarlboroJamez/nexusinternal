import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Graphs
import SearchesGraph from '../../graphs/teams/barSearches';
import AcitivityGraph from '../../graphs/teams/actvityBarChart';

// Views
import EditPermissions from '../../views/teams/editPermissions';
import MemberSearches from '../../views/teams/memberSearches';

function MemberPermissions({selectedMember,setSelectedMember, setMemberPermissions }) {
    const [loading, setLoading] = useState(false);
    const [member, setMember] = useState([]);
    const [searches, setSearches] = useState([]);
    const [view, setView] = useState("permissions");

    const config = {
        headers: {
          "Content-Type": "application/json"
        }
    }

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                setLoading(true)
                const {data} = await axios.post('/api/v1/team/member/info', {
                    uid: selectedMember
                }, config);
                setMember(data.member)
                setSearches(data.searches)
                setLoading(false)
            } catch (e) {
                console.log(e)
            }
        } 

        fetchInfo()
    },[selectedMember])

    const closeWindow = () => {
        setSelectedMember("");
        setMemberPermissions(false)
    }
  
    return (
        <div>
            {!loading && member.length > 0? (
            <div className="h-fit w-full">
                <div className="flex justify-between">
                    <div className="w-fit grid">
                        <h1 className="text-2xl font-medium">
                            {member[0].name} {member[0].surname}
                        </h1>
                        <p className='text-sky-700 underline text-lg font-medium'>
                            {member[0].email}
                        </p>
                    </div>

                    <h1 
                    onClick={closeWindow}
                    className="pl-10 text-base text-sky-700 underline cursor-pointer hover:text-sky-900">
                        Close window
                    </h1>
                </div>

                {/* GRAPHS */}
                <div className="mt-10 rounded border border-neutral-200 p-3 shadow-inner bg-neutral-50 flex">
                    <div className='flex-5 mr-4'>
                        <SearchesGraph searches={searches}/>
                    </div>
                    <div className="flex-5">
                        <AcitivityGraph activity={searches}/>
                    </div>
                </div>

                {/* VIEW OPTIONS */}
                <div className="w-full mt-10 pb-6 border-b border-neutral-200">
                    <ul className="w-full flex">
                        <li 
                        onClick={() => setView("permissions")}
                        className={view === "permissions" ? 
                        "p-2 text-white bg-zinc-500 shadow-md hover:shadow-lg rounded font-medium mr-6 cursor-pointer text-neutral-700 transition duration-400"
                        :"p-2 text-white bg-zinc-700 hover:bg-zinc-600 shadow-md hover:shadow-lg rounded font-medium mr-6 cursor-pointer text-neutral-700 transition duration-400"}>
                            Edit Permissions
                        </li>
                        <li
                        onClick={() => setView("searches")} 
                        className={view === "searches" ? 
                        "p-2 text-white bg-zinc-500 shadow-md hover:shadow-lg rounded font-medium mr-6 cursor-pointer text-neutral-700 transition duration-400"
                        :"p-2 text-white bg-zinc-700 hover:bg-zinc-600 shadow-md hover:shadow-lg rounded font-medium mr-6 cursor-pointer text-neutral-700 transition duration-400"}>
                            Export/View Searches
                        </li>
                    </ul>
                </div>

                {/* VIEWS */}
                <div className='mt-8'>
                    {view === "permissions" && <EditPermissions member={member}/>}
                    {view === "searches" && <MemberSearches searches={searches}/>}
                </div>
            </div>
            ):(
                <div className='w-full h-130 grid place-items-center rounded shadow-inner border-neutral-200 border bg-neutral-50'>
                    <p className='text-lg text-neutral-700 p-3 rounded shadow-lg border border-neutral-200 bg-white'>
                        Fetching team member information...
                    </p>
                </div>
            )}
        </div>
  )
}

export default MemberPermissions