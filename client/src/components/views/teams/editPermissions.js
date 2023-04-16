import React, { useState } from 'react'
import axios from 'axios';

// Models
import SuccesModel from '../../models/global/success';

function EditPermissions({member}) {
  const [isTeamAdmin, setIsTeamAdmin] = useState(member[0].isTeamAdmin);
  const [isExport, setIsExport] = useState(member[0].isExport);
  const [isRegular, setIsRegular] = useState(member[0].isRegular)
  const [isDirectory, setIsDirectory] = useState(member[0].isDirectory);
  const [accessibility, setAccessibility] = useState(member[0].accessibility)
  const [isActivity, setIsActivity] = useState(member[0].isActivity)
  const [successModel, setSuccessModel] = useState(false);
  const [accessStatus, setAccessStatus] = useState({});

  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: 'numeric', 
    minute: 'numeric', 
    second: 'numeric',
    timeZone: 'Africa/Johannesburg'
  };
  const date = new Date(member[0].creation).toLocaleString('en-US', options);

  const config = {
      headers: {
        "Content-Type": "application/json"
      }
  }

  const handlePermissionUpdate = async (e) => {
    e.preventDefault()
      try {
          await axios.post('/api/v1/team/permissions',{
              uid: member[0]._id,
              isTeamAdmin: isTeamAdmin,
              isExport: isExport,
              isRegular: isRegular,
              isDirectory: isDirectory,
              accessibility: accessibility,
              isActivity: isActivity,
              accessStatus: accessStatus
          },config)
          setSuccessModel(true)
      } catch (error) {
          console.log(error)
      }
  }

  const handleChange = (event, res) => {
    const { checked } = event.target;
    setAccessStatus((prevState) => ({
      ...prevState,
      [res.type]: checked,
    }));
  };     

  // FETCH LICENSE INFORMATION TO GET UPDATED SEARCH AMOUNTS
  return (
    <div>
      {successModel ? (
        <SuccesModel setModal={setSuccessModel} message={"Member permissions have been successfully updated, and the changes will take effect upon the user's next login."}/>
      ):""}
      {/* MEMBER INFORMATION */}
      <div className="mt-4 p-3 border border-neutral-200 shadow-md rounded">
        <ul>
          <li className="font-medium text-neutral-700 mb-1">
              Member ID: <mark className="ml-2 bg-transparent font-normal text-neutral-700">{member[0]._id}</mark>
          </li>
          <li className="font-medium text-neutral-700 mb-6 border-b border-neutral-200 pb-2">
              Registration Date: <mark className="ml-2 bg-transparent font-normal text-neutral-700">{date}</mark>
          </li>
          <li className="font-medium text-sky-900 mb-1">
              Name: <mark className="ml-2 bg-transparent font-normal text-neutral-700">{member[0].name}</mark>
          </li>
          <li className="font-medium text-sky-900 mb-1">
              Surname: <mark className="ml-2 bg-transparent font-normal text-neutral-700">{member[0].surname}</mark>
          </li>
          <li className="font-medium text-sky-900 mb-1">
              Email: <mark className="ml-2 bg-transparent font-normal text-neutral-700">{member[0].email}</mark>
          </li>
        </ul>
      </div>

      <div className="mt-10 mb-20">
       <div className="flex pb-2 border-b border-neutral-200 w-full justify-between">
        <h1 
          className="text-2xl font-medium">
            Edit member permissions
        </h1>

        <button 
        onClick={(e) => handlePermissionUpdate(e)}
        className='h-fit w-fit bg-sky-600 hover:bg-sky-500 pl-20 pr-20 pt-2 pb-2 rounded shadow-md hover:shadow-lg transition duration-400 font-medium text-white'>
          Update
        </button>
       </div>

        <div className='mt-6'>
          <div  className='transition duration-400 mt-6 w-100 rounded shadow-inner border-neutral-200 border p-2 cursor-pointer hover:bg-neutral-50 hover:border-neutral-300'>
            <label className='font-medium text-sky-900 text-lg'>
              Role
            </label>
            <p className='text-neutral-600'>Assign this member a admin role to this group</p>
            <div className='flex mt-2'>
              <input 
              checked={isTeamAdmin}
              onChange={() => setIsTeamAdmin(prev => !prev)}
              className='mr-2 cursor-pointer'
              type="checkbox"/>
              <label className='uppercase ml-2'>{JSON.stringify(isTeamAdmin)}</label>
            </div>
          </div>

          {/* <div  className='transition duration-400 mt-6 w-100 rounded shadow-inner border-neutral-200 border p-2 cursor-pointer hover:bg-neutral-50 hover:border-neutral-300'>
            <label className='font-medium text-sky-900 text-lg'>
              Restrict All Seaches
            </label>
            <p className='text-neutral-600'>Allow member access to conducting searches</p>
            <div className='flex mt-2'>
              <input 
              checked={isRegular}
              onChange={() => setIsRegular(prev => !prev)}
              className='mr-2 cursor-pointer'
              type="checkbox"/>
              <label className='uppercase ml-2'>{JSON.stringify(isRegular)}</label>
            </div>
          </div> */}

          {/* EXPORTING */}
          <div className='transition duration-400 mt-6 w-100 rounded shadow-inner border-neutral-200 border p-2 cursor-pointer hover:bg-neutral-50 hover:border-neutral-300'>
            <label className='font-medium text-sky-900 text-lg'>
              Exports
            </label>
            <p className='text-neutral-600'>Allow member access to exporting features</p>
            <div className='flex mt-2'>
              <input 
              checked={isExport}
              onChange={() => setIsExport(prev => !prev)}
              className='mr-2 cursor-pointer'
              type="checkbox"/>
              <label className='uppercase ml-2'>{JSON.stringify(isExport)}</label>
            </div>
          </div>

          {/* EXPORTING */}
          <div className='transition duration-400 mt-6 w-100 rounded shadow-inner border-neutral-200 border p-2 cursor-pointer hover:bg-neutral-50 hover:border-neutral-300'>
            <label className='font-medium text-sky-900 text-lg'>
              Viewing & Downloading
            </label>
            <p className='text-neutral-600'>Allow member access to view and download results from searches (pdf report)</p>
            <div className='flex mt-2'>
              <input 
              checked={isActivity}
              onChange={() => setIsActivity(prev => !prev)}
              className='mr-2 cursor-pointer'
              type="checkbox"/>
              <label className='uppercase ml-2'>{JSON.stringify(isActivity)}</label>
            </div>
          </div>

          {/* ACCESS TO SEARCHES */}
          <div className='transition duration-400 mt-6'>
            <label 
            onClick={() => console.log(JSON.stringify(accessStatus))}
            className='font-medium text-lg'>
              Access to Searches
            </label>
            <p className='text-neutral-600'>Allow member access to exporting features</p>
            
           <div className='flex flex-wrap justify-center mt-6 w-full rounded shadow-inner border-neutral-200 border p-2 cursor-pointer bg-neutral-50 hover:border-neutral-300'>
            {member[0].license[0].restrictions.map((res) => (
                <div className='mt-2 p-2 border border-neutral-200 shadow w-100 m-2 bg-white'>
                  <div className='flex'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mt-0.5 text-sky-700 w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                    <h3 className='ml-2 text-lg font-bold'>
                      {res.type}
                    </h3>
                  </div>

                  <ul className='mt-3 font-medium text-sky-900 text-sm'>
                    <li>
                      Monthly Unit: <mark className='bg-transparent font-light text-neutral-700'>{res.searches}</mark>
                    </li>
                    <li>
                      Cost: <mark className='bg-transparent font-light text-neutral-700'>R{res.cost} per unit</mark>
                    </li>
                  </ul>

                  <div className='mt-4 w-fit grid'>
                    <label className='font-medium'>Enable access to this search</label>
                    <div className='flex mt-2'>
                    <input 
                      checked={accessStatus[res.type] !== undefined ? accessStatus[res.type] : res.access}
                      onChange={(event) => handleChange(event, res)}
                      className='mr-2 cursor-pointer'
                      type="checkbox"/>


                      <label className='uppercase ml-2'>{JSON.stringify(accessStatus[res.type] !== undefined ? accessStatus[res.type] : res.access)}</label>
                    </div>
                  </div>
                </div>
              ))}
           </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditPermissions