import React from 'react'

// Table
import Table from '../../tables/dashboard/searches'

// Assets
import LoadingGIF from '../../../assets/gifs/loading.gif';

function SearchesView({searches, loading}) {
  return (
    <div className="mb-20">
      {loading ? (
        <div className='w-full h-110 grid place-items-center'>
            <div className='w-fit grid place-items-center'>
                <img src={LoadingGIF} alt="" className='h-32'/>
                <p className='text-neutral-600 text-lg mt-6'>Please be patient while we are generating your report...</p>
            </div>
        </div>
      ):(
        <Table data={searches}/>
      )}
    </div>
  )
}

export default SearchesView