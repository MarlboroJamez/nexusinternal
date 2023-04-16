import React from 'react'

function ActionBar({view, setView}) {
  return (
    <div>
        <ul className="flex">
            <li
            className={view === "support" ? 'cursor-pointer p-2 rounded shadow-md text-white bg-sky-600 mr-8'
            :'cursor-pointer p-2 rounded shadow-md bg-sky-500 text-white hover:bg-sky-400 mr-8'}
            onClick={() => setView("support")}>
                Support
            </li>
            <li
            className={view === "feedback" ? 'cursor-pointer p-2 rounded shadow-md text-white bg-sky-600 mr-8'
            :'cursor-pointer p-2 rounded shadow-md bg-sky-500 text-white hover:bg-sky-400 mr-8'}
            onClick={() => setView("feedback")}>
                Feedback
            </li>
        </ul>
    </div>
  )
}

export default ActionBar