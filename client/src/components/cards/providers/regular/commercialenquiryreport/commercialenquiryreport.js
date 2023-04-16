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
import HelperModel from '../../../../cards/providers/helpers/models/cipcdirectorlisting';

function CIPDirectorListing({selectedProject, share, notified, project}) {
    const {dispatch} = AppState();
    const [cookieValue, setCookieValue, getCookieValue] = useEncryptedCookie('ni-uid');
    const [cookieState, setCookieState] = useState(false);
    const [remaining, setRemaining] = useState("");

    const [helperModel, setHelperModel] = useState(false);
    const [successModel, setSuccessModel] = useState(false)
    const [error, setError] = useState(false);
    const [errorModel, setErrorModel] = useState(false)
    const [runningSearch, setRunningSearch] = useState(false);

    const [registrationNumber, setRegistrationNumber] = useState("");
    const [permissablePurpose, setPermissablePurpose] = useState("");
    const [reference, setReference] = useState("");
    const [header, setHeader] = useState("");
    const [idNumber, setIdNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    const [license, setLicense] = useState([]);
    const [inputCompany, setInputCompany] = useState("")


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

    useEffect(() => {
        const licenseInfo = async () => {
            if(cookieValue){
                if(cookieValue.license){
                    const {data} = await axios.post('/api/v1/client/searches/license', {
                        id:cookieValue.license[0]._id
                    }, config)
                    setLicense(data.data[0].restrictions.filter((res) => res.type === "CIPC Directors List"))
                }
            }
        }
        licenseInfo()
    },[cookieState, cookieValue])

    const handleSubmission = async (e) => {
        e.preventDefault();
        const lic = cookieValue.license[0].restrictions.filter((res) => res.type === "CIPC Directors List")
        const cost = lic[0].cost
        const currentTotal = cookieValue.license[0].totalIncome;
        
        try {
            if(selectedProject.length !== 0){
                if(reference.length === 0 || idNumber.length === 0 || header.length === 0){
                    setError(true)
                } else {
                    setLoading(true)
                    const {data} = await axios.post('/api/v1/provider/cpb/search/cipcdirectorslist', {
                        uid: cookieValue._id,
                        license: cookieValue.license[0],
                        header: header,
                        userEmail: cookieValue.email.toString(),
                        restrictionName: "COmmer",
                        restrictCost: cost.toString(),
                        currentTotal: currentTotal - cost.toString(),
                        notifyMe: notified,
                        pid: selectedProject.toString(),
                        share: share,
                        name: cookieValue.name,
                        surname: cookieValue.surname,
                        PermissiblePurpose: permissablePurpose,
                        InputCompany: inputCompany,
                        EnquiryReason: permissablePurpose,
                        EnquiryDoneBy: `${cookieValue.name} ${cookieValue.surname}`,
                        IDNumber: idNumber,
                        RegistrationNumber: registrationNumber,
                        Reference: reference,
                    }, config)
                    dispatch({
                        type: 'INSERT_SEARCH_NOTIFICATION',
                        payload: []
                    })
                    setIdNumber("");
                    setReference("");
                    setRegistrationNumber("");
                    setHeader("");
                    setLoading(false)
                    setSuccessModel(true)
                }
            } else {
                setErrorModel(true)
                setErrorMessage("Please select a project you would like to associate your search to. If you do not have a project created, please visit the Project Management.")
            }
        } catch (e) {
            setLoading(false)
            setErrorModel(true)
            setErrorMessage(e.response.data.message.status_message)
        }

    }
  return (
    
    <div>
        {successModel ? (
            <SuccessModel message={"Your search has been successful, you can view your new search at incoming searches."} setModal={setSuccessModel}/>
        ):""}

        {errorModel ? (
            <ErrorModel message={errorMessage} setModal={setErrorModel}/>
        ):""}

        {runningSearch ? (
            <ActionModel message={"Your search is running..."}/>
        ):""}

        {helperModel ? (
            <HelperModel setModel={setHelperModel}/>
        ):""}
        
        <div 
        className="w-fit flex">
            <h1 
            onClick={() => console.log(selectedProject)}
            className="font-medium">
                Commercial Enquiry Report
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
                    <td className='p-2 border border-neutral-200'>Detailed CIPC Checks</td>
                    <td className='p-2 border border-neutral-200'>Commercial Enquiry</td>
                    <td className='p-2 border border-neutral-200 text-right'>R29.90</td>
                    <td className='p-2 border border-neutral-200 text-right'>100</td>
                    <td className='p-2 border border-neutral-200 text-right'>{license.length > 0 ? license[0].searches:""}</td>
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
                    className={header.length <=0 ? "h-fit text-sm rounded border border-red-400 bg-white shadow p-2 w-80":"h-fit text-sm rounded border border-neutral-200 bg-white shadow p-2 w-80"}/>
                    {error&header.length <= 0 ? <label className='mt-1 text-red-400 text-xs'>This is a required field</label>:<label className='mt-1 text-xs'>Input a title to your search</label>}
                </div>

                {/* PERSONAL REFERENCE NUMBER */}
                <div className='mb-6 grid'>
                    <input 
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    placeHolder="Telkom/Case Reference Number"
                    className={reference.length <=0 ? "h-fit text-sm rounded border border-red-400 bg-white shadow p-2 w-80":"h-fit text-sm rounded border border-neutral-200 bg-white shadow p-2 w-80"}/>
                    {error&reference.length <= 0 ? <label className='mt-1 text-red-400 text-xs'>This is a required field</label>:<label className='mt-1 text-xs'>Add a reference or case number to your search</label>}
                </div>

                {/* PERSONAL REFERENCE NUMBER */}
                <div className='mb-6 grid'>
                    <input 
                    value={inputCompany}
                    onChange={(e) => setInputCompany(e.target.value)}
                    placeHolder="Company Name"
                    className={reference.length <=0 ? "h-fit text-sm rounded border border-red-400 bg-white shadow p-2 w-80":"h-fit text-sm rounded border border-neutral-200 bg-white shadow p-2 w-80"}/>
                </div>

                {/* PERMISSIBLE PURPOSE */}
                <div className='mb-6 grid'>
                    <select 
                    onChange={(e) => setPermissablePurpose(e.target.value)}
                    className={permissablePurpose.length <=0 ? "h-fit text-sm rounded border border-red-400 bg-white shadow p-2 w-80":"h-fit text-sm rounded border border-neutral-200 bg-white shadow p-2 w-80"}>
                    {PermissiblePurpose.purpose.map((pur) => (
                        <option value={pur}>{pur}</option>
                    ))}
                    </select>
                    {error&permissablePurpose.length <= 0 ? <label className='mt-1 text-red-400 text-xs'>This is a required field</label>:<label className='mt-1 text-xs'>Permissible purpose for this enquiry</label>}
                </div>
            </div>
            <div className="grid ml-12 h-fit">

            <div className='mb-6 grid'>
                {/* COMPANY REGISTRATION NUMBER */}
                <input 
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                placeHolder="Company Registration Number"
                className="h-fit text-sm rounded border border-neutral-200 bg-white shadow p-2 w-80"/>
            </div>
                {/* SEARCH SUBMISSION */}
                <button 
                onClick={loading ? "":handleSubmission}
                className="transition duration-400 hover:bg-sky-400 h-fit mb-4 rounded bg-sky-500 text-white shadow p-2 w-80 font-medium">
                    {loading ? "Running...":"Search"}
                </button>
            </div>
        </div>
    </div>
  )
}

export default CIPDirectorListing