import React, { useState } from 'react'
import axios from 'axios'

// Models
import CancelModel from '../../models/searches/canceledScheduledSearch';

// Assets
import ScheduleIMG from '../../../assets/images/schedule.png';
import CompletedIMG from '../../../assets/images/checked.png';
import CanceledIMG from '../../../assets/images/canceled.png';

function IncomingScheduleCard({ scheduled }) {
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const date = scheduled.date.toString()

  const config = {
    headers: {
      "Content-Type": "application/json",
    }
  }

  
  const cancelScheduledSearch = async () => {
    try {
      const {data} = await axios.post('/api/v1/provider/cpb/scheduled/cancel',{
        jobId: scheduled.jobs,
        codeStatus: scheduled.codeStatus
      },config)

      setSuccess(true)
      setModal(false)
      console.log(data)
    } catch (err) {
      console.log(err)
      setError(true)
    }
  }

  return (
    <div className="p-2 flex mb-4 w-110 h-fit rounded shadow-lg border neutral-200 bg-white">
      {/* CANCEL MODAL */}
      {modal ? (
        <CancelModel setModal={setModal} cancelScheduledSearch={cancelScheduledSearch}/>
      ):""}

      <div className="mr-4">
        {scheduled.codeStatus === 'Completed' && <img src={CompletedIMG} className="w-4 h-4 mt-1" alt="scheduled"/>}
        {scheduled.codeStatus === 'Queued' &&  <img src={ScheduleIMG} className="w-4 h-4 mt-1" alt="scheduled"/>}
        {scheduled.codeStatus === 'Canceled' &&  <img src={CanceledIMG} className="w-4 h-4 mt-1" alt="scheduled"/>}
      </div>

      <div className="w-full flex justify-between">
        <div className="grid text-sm">
          <h1 className="font-medium mr-10">
            Title: <mark className="bg-transparent font-light">{scheduled.parameters.header}</mark>
          </h1>

          
          <h1 className="font-medium">
            Type: <mark className="bg-transparent font-light">{scheduled.parameters.restrictionName}</mark>
          </h1>
          <h1 className="font-medium">
            Date: <mark className="bg-transparent font-light">{date}</mark>
          </h1>

          
          {scheduled.codeStatus === 'Completed'  ? (
            <h1 className="font-medium">
              Status: <mark className="bg-transparent font-light">Completed</mark>
            </h1>
          ):""}
          {scheduled.codeStatus === 'Queued' ? (
            <h1 className="font-medium">
              Status: <mark className="bg-transparent font-light">Queued</mark>
            </h1>
          ):""}
          {scheduled.codeStatus === 'Canceled' ? (
            <h1 className="font-medium">
              Status: <mark className="bg-transparent font-light">Canceled</mark>
            </h1>
          ):""}
        </div>

        <div>
          <svg 
          onClick={() => setModal(true)}
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="transition duration-400 cursor-pointer hover:text-red-500 w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default IncomingScheduleCard