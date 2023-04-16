import React from 'react'

function ProjectSelection({view, setView}) {
  return (
    <div className="w-fit mt-8">
        <ul className="flex w-fit">
            <li 
            onClick={() => setView("searches")}
            className={view === "searches" 
            ? "transition duration-400 underline mr-10 font-medium text-neutral-600 cursor-pointer"
            :"transition duration-400 hover:underline mr-10 font-medium text-neutral-600 cursor-pointer"}>
                Searches
            </li>
            <li
            onClick={() => setView("team")} 
            className={view === "team" 
            ? "transition duration-400 underline mr-10 font-medium text-neutral-600 cursor-pointer"
            :"transition duration-400 hover:underline mr-10 font-medium text-neutral-600 cursor-pointer"}>
                Team
            </li>
            {/* <li
            onClick={() => setView("projects")} 
            className={view === "projects" 
            ? "transition duration-400 underline mr-10 font-medium text-neutral-600 cursor-pointer"
            :"transition duration-400 hover:underline mr-10 font-medium text-neutral-600 cursor-pointer"}>
                Projects
            </li> */}
        </ul>
    </div>
  )
}

export default ProjectSelection