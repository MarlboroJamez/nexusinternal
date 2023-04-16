import React, { useState } from 'react'

// Models
import EditMemeberPermission from '../../models/teams/editMemeberPermission';

function MemberCard({data, members, setSelectedMember, memberPermissions, selectedMember, setMemberPermissions}) {
    const [editPermissionModal, setEditPermissionModal] = useState(false);

    const handleEditMemberPermission = (id) => {
        if(selectedMember.length > 1){
            setSelectedMember(id)
            setMemberPermissions(true)
        } else {
            setSelectedMember(id)
            setMemberPermissions(true)
        }
    }

  return (
    <div className="p-3 flex w-full mb-4 rounded shadow-mg cursor-pointer hover:shadow-lg bg-white border border-neutral-200 h-fit">
        {editPermissionModal ? (
            <EditMemeberPermission members={members} data={data} setModal={setEditPermissionModal} selectedMember={selectedMember}/>
        ):""}
        
        <div className="grid h-fit flex-5">
            <div className="w-full h-fit">
                <div className="flex justify-between">
                    <h1 className="font-medium">
                        {data.name} {data.surname}
                    </h1>
                </div>
                <p className="text-sm underline text-sky-700">
                    {data.email}
                </p>

                {data.isTeamAdmin ? (
                    <p className='flex pt-1 pb-1 pl-2 pr-2 rounded text-xs text-white bg-red-800 shadow-md w-fit h-fit mt-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-1">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                        </svg>

                        Admin
                    </p>
                ):(
                    <p className='flex pt-1 pb-1 pl-2 pr-2 rounded text-xs text-white bg-zinc-700 shadow-md w-fit h-fit mt-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-1">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                        </svg>

                        Member
                    </p>
                )}
            </div>

            <button 
            onClick={() => handleEditMemberPermission(data._id)}
            className="mt-12 bg-sky-800 text-white rounded shadow text-sm">
                Edit Permissions
            </button>
        </div>

    </div>
  )
}

export default MemberCard