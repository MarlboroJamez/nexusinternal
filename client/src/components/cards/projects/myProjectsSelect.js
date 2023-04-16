import React from 'react'

function MyProjectsSelect() {
  return (
    <div className="w-fit mt-6">
        {/* SEARCH TYPES */}
        <select className="mr-10 rounded shadow-md bg-neutral-300 p-1 cursor-pointer hover:bg-neutral-200 outline-none">
          <option>
            Sort by
          </option>
        </select>

        {/* BOQUETS */}
        <select className="mr-10 rounded shadow-md bg-neutral-300 p-1 cursor-pointer hover:bg-neutral-200 outline-none">
          <option>
            Last 7 days
          </option>
        </select>

        {/* PROJECT */}
        <select className="mr-10 rounded shadow-md bg-neutral-300 p-1 cursor-pointer hover:bg-neutral-200 outline-none">
          <option>
            Priority
          </option>
        </select>
    </div>
  )
}

export default MyProjectsSelect