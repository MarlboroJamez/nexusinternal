import React from 'react'

function AddedMemberCard({member, handleDelete, dataSource}) {
  return (
    <div className="m-1 p-1 flex justify-between border border-sky-700 shadow text-neutral-700">
        <p className="mr-6">
            {member.name} {member.surname}
        </p>

        <svg 
        onClick={() => handleDelete(dataSource)}
        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="transition duration-400 cursor-pointer hover:text-sky-800 text-sky-700 w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    </div>
  )
}

export default AddedMemberCard