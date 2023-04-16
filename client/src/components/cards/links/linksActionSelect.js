import React, { useState } from 'react'

function LinksActionSelect({generate, handleGenerate, handleSaveLinks}) {
    const [select, setSelect] = useState("FirstName");

  return (
    <div className="p-3 rounded shadow-md hover:shadow-lg border border-neutral-200 bg-white cursor-pointer">
        <select
        onChange={(e) => setSelect(e.target.value)} 
        className="w-72 rounded shadow-md bg-neutral-300 p-2 text-sm cursor-pointer hover:bg-neutral-200 outline-none">
            <option selected>Select a channel</option>
            <option value="FirstName">First Name</option>
            <option value="SecondName">Socond Name</option>
            <option value="ThirdName">Third Name</option>
            <option value="Surname">Surname</option>
            <option value="MaidenName">Maiden Name</option>
            <option value="IDNumber">ID Number</option>
        </select>

        <button
        onClick={() => handleGenerate(select)}
        className="transition duration-400 shadow-md rounded pl-6 pr-6 bg-zinc-600 text-white pt-2 pb-2 ml-10 text-sm hover:bg-zinc-500">
            Generate links
        </button>

        <button
        onClick={() => setSelect("sample")}
        className="transition duration-400 shadow-md rounded pl-6 pr-6 bg-zinc-600 text-white pt-2 pb-2 ml-10 text-sm hover:bg-zinc-500">
            Show with sample dataset
        </button>

        {generate ? (
            <button 
            onClick={handleSaveLinks}
            className="transition duration-400 shadow-md rounded pl-6 pr-6 bg-sky-500 text-white pt-2 pb-2 ml-10 text-sm hover:bg-sky-400">
                Save links identified
            </button>
        ):""}
    </div>
  )
}

export default LinksActionSelect