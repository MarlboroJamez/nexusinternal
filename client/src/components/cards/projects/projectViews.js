import React from 'react'

function ProjectSelection({view, setView}) {
  return (
    <div className="w-fit mt-8">
        <ul className="flex w-fit">
            <li 
            onClick={() => setView("my-projects")}
            className={view === "my-projects" 
            ? "transition duration-400 underline mr-10 font-medium text-neutral-700 cursor-pointer"
            :"transition duration-400 hover:underline mr-10 font-medium text-neutral-700 cursor-pointer"}>
                My Projects
            </li>
            <li 
            onClick={() => setView("team-projects")}
            className={view === "team-projects" 
            ? "transition duration-400 underline mr-10 font-medium text-neutral-700 cursor-pointer"
            :"transition duration-400 hover:underline mr-10 font-medium text-neutral-700 cursor-pointer"}>
                Team Projects
            </li>
            <li
            onClick={() => setView("new-project")} 
            className={view === "new-project" 
            ? "transition duration-400 underline mr-10 font-medium text-neutral-700 cursor-pointer"
            :"transition duration-400 hover:underline mr-10 font-medium text-neutral-700 cursor-pointer"}>
                New Project
            </li>
        </ul>
    </div>
  )
}

export default ProjectSelection