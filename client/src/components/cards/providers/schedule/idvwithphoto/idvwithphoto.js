import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Assets
import Guide from '../../../../../assets/guides/idv.pdf'

// Hooks
import useEncryptedCookie  from '../../../../../hooks/cookies/useCookie';
import { AppState } from '../../../../../context/Context';

//JSON
import PermissiblePurpose from '../../../../../data/cpb/purpose.json';

// Models
import SuccessModel from '../../../../models/global/success';
import ErrorModel from '../../../../models/global/error';
import ActionModel from '../../../../models/global/actions';
import HelperModel from '../../../../cards/providers/helpers/models/helperidvwithphoto';


function Personlisting({share, notified, project}) {
    const [cookieValue, setCookieValue, getCookieValue] = useEncryptedCookie('ni-uid');
    const {dispatch} = AppState();

    const [permissablePurpose, setPermissablePurpose] = useState("");
    const [reference, setReference] = useState("");
    const [idNumber, setIdNumber] = useState("");
    const [surname, setSurname] = useState("");
    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [dob, setDob] = useState("");
    const [usePP, setUsePP] = useState(false);
    const [header, setHeader] = useState("");
    const [date, setDate] = useState("");
    const [registrationNumber, setRegistrationNumber] = useState("");
    const [remaining, setRemaining] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    const [error, setError] = useState(false);
    const [successModel, setSuccessModel] = useState(false)
    const [errorModel, setErrorModel] = useState(false)
    const [runningSearch, setRunningSearch] = useState(false);
    const [helperModel, setHelperModel] = useState(false);
    const [license, setLicense] = useState([]);
    const [cookieState, setCookieState] = useState(false);

    const [view, setView] = useState("search")

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
        const licenseInfo = async () => {
            if(cookieValue){
                if(cookieValue.license){
                    const {data} = await axios.post('/api/v1/client/searches/license', {
                        id:cookieValue.license[0]._id
                    }, config)
                    setLicense(data.data[0].restrictions.filter((res) => res.type === "IDV Listing including photo"))
                }
            }
        }
        licenseInfo()
    },[cookieState, cookieValue])

    const handleSubmission = async (e) => {
        e.preventDefault();
        const lic = cookieValue.license[0].restrictions.filter((res) => res.type === "IDV Listing including photo")
        const cost = lic[0].cost
        const currentTotal = cookieValue.license[0].totalIncome;
        
        const parameters = {
            license: cookieValue.license[0],
            header: header,
            userEmail: cookieValue.email.toString(),
            restrictionName: "IDV Listing including photo",
            restrictCost: cost.toString(),
            currentTotal: currentTotal - cost.toString(),
            notifyMe: notified,
            pid: "aaaaaaaaaaaaaa",
            share: share,
            name: cookieValue.name,
            surname: cookieValue.surname,
            PermissiblePurpose: "Fraud Detection and Prevention",
            IDNumber: idNumber,
            Reference: reference,
        }
        try {
            if(header.length === 0 || reference.length === 0 || idNumber.length === 0){
                setError(true)
            } else {
                setLoading(true)
                const {data} = axios.post('/api/v1/provider/cpb/schedule/idv/withphoto',{
                    date: date,
                    uid: cookieValue._id,
                    parameters: parameters
                },config)
                setIdNumber("");
                setReference("");
                setRegistrationNumber("");
                setHeader("");
                setLoading(false)
                setSuccessModel(true)
            }
        } catch (e) {
            setLoading(false)
            setErrorModel(true)
            setErrorMessage(e.response.data.message.status_message)
        }
    }
  return (
    <div>
    <div className="p-2 mb-10 rounded border border-neutral-200 w-full shadow-lg">
        <ul className="flex cursor-pointer">
            <li
            onClick={() => setView("search")} 
            className={view === "search" ? 
            "mr-10 transition duration-400 bg-sky-500 h-fit rounded text-white shadow p-2 w-fit font-medium"
            :"mr-10 transition duration-400 hover:bg-sky-500 h-fit rounded bg-sky-600 text-white shadow p-2 w-fit font-medium"}>
                IDV validation including a photo
            </li>
            <li
            onClick={() => setView("about")}
            className={view === "about" ? 
            "mr-10 transition duration-400 bg-sky-500 h-fit rounded text-white shadow p-2 w-fit font-medium"
            :"mr-10 transition duration-400 hover:bg-sky-500 h-fit rounded bg-sky-600 text-white shadow p-2 w-fit font-medium"}>
                About IDV
            </li>
        </ul>
    </div>
    {view === "about" &&
        <div>
            <iframe
                title="PDF Viewer"
                src={`${Guide}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                className="w-full h-130"
                frameBorder="0"
                sandbox
            />
        </div>
    }
        {view === "search" && (
            <div>
            {successModel ? (
                <SuccessModel message={"Your search has been scheduled successfully, view your sheduled search at Schedule Manager"} setModal={setSuccessModel}/>
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
                <h1 className="font-medium text-3xl">
                    IDV validation including a photo
                </h1>
                {/* <svg 
                onClick={() => setHelperModel(true)}
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 mt-0.5 ml-3 text-sky-600 hover:text-neutral-600 cursor-pointer transition duration-400">
                    <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
                </svg> */}
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
                        <td className='p-2 border border-neutral-200'>Base DHA data including Photo</td>
                        <td className='p-2 border border-neutral-200 text-right'>R5.20</td>
                        <td className='p-2 border border-neutral-200 text-right'>50</td>
                        <td className='p-2 border border-neutral-200 text-right'>{license.length > 0 ? license[0].searches:""}</td>
                    </tr>
                </tbody>
            </table>
    
            <div className="grid mt-6 w-80">
                <input 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                type="datetime-local"
                className={date.length <=0 ? "h-fit text-sm rounded border border-red-400 bg-white shadow p-2 w-80":"h-fit text-sm rounded border border-neutral-200 bg-white shadow p-2 w-80"}/>
                {error&date.length <= 0 ? <label className='mt-1 text-red-400 text-xs'>This is a required field</label>:<label className='mt-1 text-xs'>Choose a date and time to schedule your search</label>}
            </div>
    
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
    
                    {/* PERMISSIBLE PURPOSE */}
                    <div className='mb-6 grid'>
                        <select 
                        onChange={(e) => setPermissablePurpose(e.target.value)}
                        className="h-fit text-sm rounded border border-neutral-200 bg-white shadow p-2 w-80">
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
                        className={idNumber.length <=0 ? "h-fit text-sm rounded border border-red-400 bg-white shadow p-2 w-80":"h-fit text-sm rounded border border-neutral-200 bg-white shadow p-2 w-80"}/>
                        {error&idNumber.length <= 0 ? <label className='mt-1 text-red-400 text-xs'>This is a required field</label>:<label className='mt-1 text-xs w-80'>South African ID number (use for looking up directors based on ID number)</label>}
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
        )}
    </div>
  )
}

export default Personlisting