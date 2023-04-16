import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

// Hooks
import useClickOutside from '../../../hooks/models/useOutsideClick';
import useEncryptedCookie from '../../../hooks/cookies/useCookie';

function EditMemeberPermission({setModal, data, selectedMember, members}) {
    const [member, setMember] = useState()
    const [cookieValue, setCookieValue, getCookieValue] = useEncryptedCookie('ni-uid');
    const [cookieState, setCookieState] = useState(false);

    const [isTeamAdmin, setIsTeamAdmin] = useState(member?.isTeamAdmin);
    const [isExport, setIsExport] = useState(member?.isExport);
    const [isRegular, setIsRegular] = useState(member?.isRegular)
    const [isReporting, setIsReporting] = useState(member?.isReporting);
    const [isDirectory, setIsDirectory] = useState(member?.isDirectory);
    const [isAnalysis, setIsAnalysis] = useState(member?.isAnalysis);
    const [isScheduled, setIsScheduled] = useState(member?.isScheduled);
    const [isActivity, setIsActivity] = useState(member?.isActivity);

    useEffect(() => {
        setMember(members.find(item => item._id === selectedMember));
    },[])

    
    useEffect(() => {
        setCookieState(true)
        getCookieValue()
        setCookieState(false)
    },[]);

    let domNode = useClickOutside(() => {
        setModal(false);
    });

    const config = {
        headers: {
          "Content-Type": "application/json"
        }
    }

    const handlePermissionUpdate = async (e) => {
        try {
            await axios.post('/api/v1/team/permissions',{
                uid: member[0]._id,
                isTeamAdmin: isTeamAdmin,
                isExport: isExport,
                isRegular: isRegular,
                isReporting: isReporting,
                isDirectory: isDirectory,
                isAnalysis: isAnalysis,
                isScheduled: isScheduled,
                isActivity: isActivity,
                isAdmin: cookieValue.isTeamAdmin
            },config)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <>
        <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
        <div className="relative w-auto my-6 mx-auto max-w-6xl">
            {/*content*/}
            <div ref={domNode} className="border-0 rounded-lg shadow-lg relative w-fit h-fit overflow-x-hidden flex flex-col bg-white outline-none focus:outline-none">
            {/*header*/}
            <div>
            </div>
            {/*body*/}
                <div className="w-110 relative h-fit grid place-items-center p-6 flex-auto">
                    <p className="w-full text-sky-700 font-medium text-left text-lg">
                        Edit member permission
                    </p>

                    <div className="border-t mt-2 border-neutral-200 pt-2">
                        <div className="flex w-fit h-fit pb-3 border-b border-neutral-100">
                            <div className="mr-4 mt-4 flex">
                                <label>Assign the following team member as</label> 
                                <label className="ml-1 font-bold text-sky-600">Admin</label>
                            </div>
                            <select 
                            onChange={(e) => setIsTeamAdmin(e.target.value)}
                            value={isTeamAdmin}
                            className="font-bold text-sm rounded w-fit h-fit mt-3.5 cursor-pointer">
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>

                        <div className="text-zinc-600 flex w-fit text-sm h-fit">
                            <div className="mr-4 mt-4 flex">
                                <label>Allow the following team member to</label> 
                                <label className="ml-1 font-bold text-sky-600">Export Content</label>
                            </div>
                            <select 
                            onChange={(e) => setIsExport(e.target.value)}
                            value={isExport} 
                            className="font-bold text-sm rounded w-fit h-fit mt-3 cursor-pointer">
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>
            
                        <div className="text-zinc-600 flex w-fit text-sm  h-fit mt-2">
                            <div className="mr-4 mt-4 flex">
                                <label>Allow the following team member to access</label> 
                                <label className="ml-1 font-bold text-sky-600">Reporting Features</label>
                            </div>
                            <select 
                            onChange={(e) => setIsReporting(e.target.value)}
                            value={isReporting} 
                            className="font-bold text-sm rounded w-fit h-fit mt-3 cursor-pointer">
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>
            
                        <div className="text-zinc-600 flex text-sm w-fit h-fit mt-2">
                            <div className="mr-4 mt-4 flex">
                                <label>Allow the following team member to access</label> 
                                <label className="ml-1 font-bold text-sky-600">Directory Feature</label>
                            </div>
                            <select 
                            onChange={(e) => setIsDirectory(e.target.value)}
                            value={isDirectory} 
                            className="font-bold text-sm rounded w-fit h-fit mt-3 cursor-pointer">
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>
            
                        <div className="text-zinc-600 flex text-sm  w-fit h-fit mt-2">
                            <div className="mr-4 mt-4 flex">
                                <label>Allow the following team member to access</label> 
                                <label className="ml-1 font-bold text-sky-600">Link Analysis</label>
                            </div>
                            <select 
                            onChange={(e) => setIsAnalysis(e.target.value)}
                            value={isAnalysis} 
                            className="font-bold text-sm rounded w-fit h-fit mt-3 cursor-pointer">
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>

                        <div className="text-zinc-600 flex text-sm w-fit h-fit mt-2">
                            <div className="mr-4 mt-4 flex">
                                <label>Allow team member to view other</label> 
                                <label className="ml-1 font-bold text-sky-600">Member Activity</label>
                            </div>
                            <select 
                            onChange={(e) => setIsActivity(e.target.value)}
                            value={isActivity} 
                            className="font-bold text-sm rounded w-fit h-fit mt-3 cursor-pointer">
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>

                        <div className="text-zinc-600 flex text-sm w-fit h-fit mt-2">
                            <div className="mr-4 mt-4 flex">
                                <label>Enable team member to place</label> 
                                <label className="ml-1 font-bold text-sky-600">Scheduled Searches</label>
                            </div>
                            <select 
                            onChange={(e) => setIsScheduled(e.target.value)}
                            value={isScheduled} 
                            className="font-bold text-sm rounded w-fit h-fit mt-3 cursor-pointer">
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>

                        <div className="text-zinc-600 flex text-sm w-fit h-fit mt-2">
                            <div className="mr-4 mt-4 flex">
                                <label>Enable team member to place</label> 
                                <label className="ml-1 font-bold text-sky-600">Regular Searches</label>
                            </div>
                            <select 
                            onChange={(e) => setIsRegular(e.target.value)}
                            value={isRegular} 
                            className="font-bold text-sm rounded w-fit h-fit mt-3 cursor-pointer">
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>
                    </div>
                        
                    {/* CLOSE MODAL */}
                    <div className="flex w-full">
                        <button
                        onClick={() => setModal(false)} 
                        className='mr-6 mt-10 transition duration-300 bg-red-500 hover:bg-red-400 p-1 h-fit rounded shadow-md font-medium text-white w-full'>
                            Discard
                        </button>
                        <button
                        onClick={handlePermissionUpdate} 
                        className='mt-10 transition duration-300 bg-sky-600 hover:bg-sky-500 p-1 h-fit rounded shadow-md font-medium text-white w-full'>
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export default EditMemeberPermission