import React, { useState } from 'react'
import axios from 'axios'

// Models
import SuccessModel from '../../models/global/success';

function ProjectCard({data, cookieValue, setSelectedProject, setView}) {
    const [successModel, setSuccessModel] = useState(false);
    const date = new Date(data.creation.toString())
    const options = { 
        timeZone: "Africa/Johannesburg",
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short'
      };
    const longDateString = date.toLocaleDateString("en-US", options);

    const Config = {
        headers: {
          'Content-Type':'application/json'
        }
    }

    const SelectedProject = () => {
        setView("edit-project");
        setSelectedProject([data]);
      }

    const handleDelete = async () => {
        try {
          await axios.post('/api/v1/projects/delete',{
            pid: data._id
          },Config);
          setSuccessModel(true)
        } catch (err) {
          console.log(err);
        }
    }
  return (
    <div className="p-3 mb-6 h-fit mt-6 w-full rounded border border-neutral-200 rounded shadow-md cursor-pointer hover:shadow-lg">
        {successModel ? (
            <SuccessModel setModal={setSuccessModel} message={"This project has been successfully deleted!"}/>
        ):""}
        <div className="flex justify-between">
            <h1 className="font-medium mb-1 text-xl">
                {data.name}
            </h1>

            <div className="flex">
                <svg 
                onClick={handleDelete}
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-3 cursor-pointer hover:text-red-500 transition durations-500 w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>

                <svg 
                onClick={SelectedProject}
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="cursor-pointer transition durations-500 w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ml-3 cursor-pointer hover:text-red-500 transition durations-500 w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
                </svg>
            </div>
        </div>

        <div>
            <ul className="text-sm text-sky-700 font-bold">
                Priotity: <mar className="ml-2 text-black bg-transparent font-medium">{data.priorityLevel}</mar>
            </ul>
            <ul className="text-sm text-sky-700 font-bold">
                Author: <mar className="ml-2 text-black bg-transparent font-medium">{data.uname} {data.usurname}</mar>
            </ul>
            <ul className="text-sm text-sky-700 font-bold">
                Searches done: <mar className="ml-2 text-black bg-transparent font-medium">{data.searches.length}</mar>
            </ul>
            <ul className="text-sm text-sky-700 font-bold">
                Creation date: <mar className="ml-2 text-black bg-transparent font-medium">{longDateString}</mar>
            </ul>
        </div>

        <div className="pt-2 mt-6 border-t border-neutral-200">
            <label className="font-bold text-sm">
                Project description:
            </label>
            <p className="text-base">
                {data.description}
            </p>
        </div>
    </div>
  )
}

export default ProjectCard