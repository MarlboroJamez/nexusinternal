import React from 'react'

function SearchCard({search, handleSearchView}) {
   const dated = new Date(search.creation)
   const localDateStr = dated.toLocaleString()

  return (
    <div className="p-2 mb-4 w-110 h-fit rounded shadow-lg border neutral-200 bg-white">
        <div className="flex justify-between">
            <div className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="mr-2 text-sky-500 w-6 h-6">
                    <path d="M8.25 10.875a2.625 2.625 0 115.25 0 2.625 2.625 0 01-5.25 0z" />
                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.125 4.5a4.125 4.125 0 102.338 7.524l2.007 2.006a.75.75 0 101.06-1.06l-2.006-2.007a4.125 4.125 0 00-3.399-6.463z" clip-rule="evenodd" />
                </svg>
                <h1 
                onClick={() => console.log(search)}
                className="font-bold">
                    {search.header}
                </h1>
            </div>

            <svg 
            onClick={() => handleSearchView(search)}
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="cursor-pointer w-4 h-4 text-neutral-600">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
            </svg>
        </div>

        <div className="pl-8 mt-2 text-sky-800 font-medium text-xs">
            {localDateStr}
        </div>

        <div className="pl-8 text-sm">
            <ul className="mt-4">
                <li className="mb-1 font-medium">
                    Transaction ID: <mark className="bg-transparent font-light">{search.search[0].request_reference}</mark>
                </li>
                <li className="mb-1 font-medium">
                    Type: <mark className="bg-transparent font-light">{search.title}</mark>
                </li>
                <li className="mb-1 font-medium">
                    Purpose: <mark className="bg-transparent font-light">{search.purpose}</mark>
                </li>
                <li className="mb-1 font-medium">
                    Cost: <mark className="bg-transparent font-light">R{search.cost}</mark>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default SearchCard