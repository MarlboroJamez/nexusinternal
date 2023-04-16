import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';
import axios from 'axios'

// Context
import { AppState } from '../../../../../context/Context';

// Hooks
import useEncryptedCookie  from '../../../../../hooks/cookies/useCookie';

//JSON
import PermissiblePurpose from '../../../../../data/cpb/purpose.json';

// Models
import SuccessModel from '../../../../models/global/success';
import ErrorModel from '../../../../models/global/error';
import ActionModel from '../../../../models/global/actions';
import HelperModel from '../../../../cards/providers/helpers/models/helperhomeaffairsverification';

function CIPDirectorListing({setType, share, notified, project}) {
    const {dispatch} = AppState();
    const [cookieValue, setCookieValue, getCookieValue] = useEncryptedCookie('ni-uid');
    const [cookieState, setCookieState] = useState(false);
    const [remaining, setRemaining] = useState("");

    const [helperModel, setHelperModel] = useState(false);
    const [successModel, setSuccessModel] = useState(false)
    const [error, setError] = useState("");
    const [errorModel, setErrorModel] = useState(false)
    const [runningSearch, setRunningSearch] = useState(false);

    const [registrationNumber, setRegistrationNumber] = useState("");
    const [permissablePurpose, setPermissablePurpose] = useState("");
    const [reference, setReference] = useState("");
    const [header, setHeader] = useState("");
    const [idNumber, setIdNumber] = useState("");


    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    }

    useEffect(() => {
        setCookieState(true)
        getCookieValue()
        setCookieState(false)
    },[])

    useEffect(() => {
        if(cookieValue){
            if(cookieValue.license){
                setRemaining(cookieValue.license[0].restrictions.filter(item => item.type === "CIPC Directors List"))
            }
        }
    },[cookieState, cookieValue])


    const handleSubmission = async (e) => {
        e.preventDefault();
        const lic = cookieValue.license[0].restrictions.filter((res) => res.type === "Person Listing")
        const cost = lic[0].cost
        const currentTotal = cookieValue.license[0].totalIncome;
        
        try {
            const {data} = await axios.post('/api/v1/provider/cpb/search/homeaffairsverification', {
                uid: cookieValue._id,
                license: cookieValue.license[0],
                header: header,
                userEmail: cookieValue.email,
                restrictionName: "Home Affairs Verification",
                restrictCost: cost.toString(),
                currentTotal: currentTotal - cost.toString(),
                notifyMe: notified,
                pid: "aaaaaaaaaa",
                share: share,
                name: cookieValue.name,
                surname: cookieValue.surname,
                PermissiblePurpose: permissablePurpose,
                IDNumber: idNumber,
                RegistrationNumber: registrationNumber,
                Reference: reference,
            }, config)
            dispatch({
                type: 'INSERT_SEARCH_NOTIFICATION',
                payload: []
            })
            setRunningSearch(false)
            setSuccessModel(true)
        } catch (e) {
            console.log(e)
        }

    }

  return (
    
    <div>
        {successModel ? (
            <SuccessModel message={"Your search has been successful, you can view your new search at incoming searches."} setModal={setSuccessModel}/>
        ):""}

        {errorModel ? (
            <ErrorModel message={error} setModal={setErrorModel}/>
        ):""}

        {runningSearch ? (
            <ActionModel message={"Your search is running..."}/>
        ):""}

        {helperModel ? (
            <HelperModel setModel={setHelperModel}/>
        ):""}
        
        <div 
        className="w-fit flex">
            <h1 className="font-medium">
                Home Affairs Verification
            </h1>
            <svg 
            onClick={() => setHelperModel(true)}
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 mt-0.5 ml-3 text-sky-600 hover:text-neutral-600 cursor-pointer transition duration-400">
                <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
            </svg>
        </div>

        <table className='w-full text-left mt-10'>
            <thead className="bg-neutral-200 text-sm">
                <tr>
                    <th className='p-2'></th>
                    <th className='p-2'>Description of service / units</th>
                    <th className='p-2'>Price per unit</th>
                    <th className='p-2'>Units per month</th>
                    <th className='p-2'>Remaining Units</th>
                </tr>
            </thead>
            <tbody className='text-sm'>
                <tr>
                    <td className='p-2 border border-neutral-200'>Employee Checks</td>
                    <td className='p-2 border border-neutral-200'>Home Affairs Verification (with photo Unit cost R520)(without photo Unit cost R325)</td>
                    <td className='p-2 border border-neutral-200 text-right'>R5.20</td>
                    <td className='p-2 border border-neutral-200 text-right'>100</td>
                    <td className='p-2 border border-neutral-200 text-right'>{remaining.length > 0 ? remaining[0].searches:""}</td>
                </tr>
            </tbody>
        </table>


        <div className="flex mt-12 w-full">
            <div className="grid h-fit">
                <div className='grid mb-6 '>
                    {/* SEARCH TITLE */}
                    <input 
                    value={header}
                    onChange={(e) => setHeader(e.target.value)}
                    placeHolder="Provide your search a title"
                    className="h-fit text-sm rounded border border-neutral-200 bg-white shadow p-2 w-80"/>
                    <label className='mt-1 text-xs'>Input a title to your search</label>
                </div>

                {/* PERSONAL REFERENCE NUMBER */}
                <div className='mb-6 grid'>
                    <input 
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    placeHolder="Personal Reference Number"
                    className="h-fit text-sm rounded border border-neutral-200 bg-white shadow p-2 w-80"/>
                    <label className='mt-1 text-xs'>Add a reference or case number to your search</label>
                </div>

                {/* PERMISSIBLE PURPOSE */}
                <div className='mb-6 grid'>
                    <select 
                    onChange={(e) => setPermissablePurpose(e.target.value)}
                    className="w-80 rounded shadow-md bg-neutral-300 p-2 text-sm cursor-pointer hover:bg-neutral-200 outline-none">
                    {PermissiblePurpose.purpose.map((pur) => (
                        <option value={pur}>{pur}</option>
                    ))}
                    </select>
                    <label className='mt-1 text-xs'>Permissible purpose for this enquiry</label>
                </div>
            </div>
            <div className="grid ml-12 h-fit">

            <div className='mb-6 grid'>
            {/* ID NUMBER */}
            <input 
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                placeHolder="ID Number"
                className="h-fit text-sm rounded border border-neutral-200 bg-white shadow p-2 w-80"/>
                <label className='w-80 mt-1 text-xs'>South African ID number (use for looking up directors based on ID number)</label>
            </div>
                {/* SEARCH SUBMISSION */}
                <button 
                onClick={handleSubmission}
                className="transition duration-400 hover:bg-sky-400 h-fit mb-4 rounded bg-sky-500 text-white shadow p-2 w-80 font-medium">
                    Search
                </button>
            </div>
        </div>
    </div>
  )
}

export default CIPDirectorListing