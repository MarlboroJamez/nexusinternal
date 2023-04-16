import React from 'react'

function MemberCard({member}) {
  return (
    <div className="w-full flex justify-between h-fit rounded p-3 border border-neutral-200 shadow-md hover:shadow-lg transition duration-400 cursor-pointer">
        <div>
            <h1 className="text-lg font-mdium">
                {member.name}
            </h1>
            <h1 className="text-sm text-sky-700 underline">
                {member.email}
            </h1>
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-neutral-600 hover:text-neutral-700 cursor-pointer transition duration-400 w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" />
        </svg>
    </div>
  )
}

export default MemberCard