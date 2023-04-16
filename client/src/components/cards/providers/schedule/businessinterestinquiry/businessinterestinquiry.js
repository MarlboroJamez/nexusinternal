import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';
import axios from 'axios'

// Assets
import Guide from '../../../../../assets/guides/business.pdf'

// Context
import { AppState } from '../../../../../context/Context';

// Hooks
import useEncryptedCookie  from '../../../../../hooks/cookies/useCookie';

//JSON
import PermissiblePurpose from '../../../../../data/cpb/purpose.json';

// Models
import HelperModel from '../../../../cards/providers/helpers/models/helperbusinessinterestenquiry';
import SuccessModel from '../../../../models/global/success';
import ErrorModel from '../../../../models/global/error';

function Personlisting({share, notified, project}) {
    const {dispatch} = AppState();
     
    const [cookieValue, setCookieValue, getCookieValue] = useEncryptedCookie('ni-uid');
    const [cookieState, setCookieState] = useState(false);
    const [socketConnected, setSocketConnected] = useState(false)
    const [useDHAExtra, setUseDHAExtra] = useState("");
    const [useSAFPDirect, setUseSAFPDirect] = useState("");

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
    const [helperModel, setHelperModel] = useState("");
    const [remaining, setRemaining] = useState("");
    const [rawHTML, setRawHTML] = useState("");
    const [loading, setLoading] = useState(false);
    const [successModel, setSuccessModel] = useState(false)
    const [error, setError]= useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [errorModel, setErrorModel] = useState(false);
    const [license, setLicense] = useState([]);

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
                    setLicense(data.data[0].restrictions.filter((res) => res.type === "Business Interest Enquiry"))
                }
            }
        }
        licenseInfo()
    },[cookieState, cookieValue])

     

    const handleSubmission = async (e) => {
        e.preventDefault();
        const lic = cookieValue.license[0].restrictions.filter((res) => res.type === "Business Interest Enquiry")
        const cost = lic[0].cost
        const currentTotal = cookieValue.license[0].totalIncome;
        const parameters = {
            PermissiblePurpose: "Fraud Detection and Prevention",
            license: cookieValue.license[0],
            userEmail: cookieValue.email.toString(),
            header: header,
            IDNumber: idNumber,
            EnquiryReason: permissablePurpose, //input removed
            EnquiryDoneBy: `${cookieValue.name} ${cookieValue.surname}`, // input removed
            UseDHAExtra: useDHAExtra,
            UseSAFPSDirect: useSAFPDirect,
            RawHTML: rawHTML,
            SecondName: secondName,
            DOB: dob,
            UsePP: usePP,
            Reference: reference,
            name: cookieValue.name,
            surname: cookieValue.surname,
            pid: "aaaaaaaaaa",
            share: true,
            restrictionName: "Business Interest Enquiry",
            restrictCost: cost.toString(),
            currentTotal: currentTotal - cost.toString(),
        }
        try {
            if(header.length === 0 || reference.length === 0){
                    setError(true)
            } else {
                const {data} = await axios.post('/api/v1/provider/cpb/schedule/businessinterestinquiry', {
                    date: date,
                    uid: cookieValue._id,
                    parameters: parameters
                }, config)
            }
            setHeader("");
            setIdNumber("");
            setSurname("")
            setFirstName("")
            setPermissablePurpose("")
            setReference("")
            setLoading(false)
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
                Business Interest Inquiry
            </li>
            <li
            onClick={() => setView("about")}
            className={view === "about" ? 
            "mr-10 transition duration-400 bg-sky-500 h-fit rounded text-white shadow p-2 w-fit font-medium"
            :"mr-10 transition duration-400 hover:bg-sky-500 h-fit rounded bg-sky-600 text-white shadow p-2 w-fit font-medium"}>
                About Business Interest Inquiry
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
                <SuccessModel message={"Your search has been successful, you can view your new search at incoming searches."} setModal={setSuccessModel}/>
            ):""}
    
            {errorModel ? (
                <ErrorModel message={errorMessage} setModal={setErrorModel}/>
            ):""}
    
            {helperModel ? (
                <HelperModel setModel={setHelperModel}/>
            ):""}
           <div 
            className="w-fit flex">
                <h1 className="font-medium text-3xl">
                    Business Interest Inquiry
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
                        <td className='p-2 border border-neutral-200'>Conflict of Interest Checks|Employee checks </td>
                        <td className='p-2 border border-neutral-200'>Directorship check separate (business interest inquiry - if input is only ID no)</td>
                        <td className='p-2 border border-neutral-200 text-right'>R11.70</td>
                        <td className='p-2 border border-neutral-200 text-right'>600</td>
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
            
            <div className="flex mt-6">
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
                        maxlength="30"
                        onChange={(e) => setReference(e.target.value)}
                        placeHolder="Telkom/Case Reference Number"
                        className={reference.length <=0 ? "h-fit text-sm rounded border border-red-400 bg-white shadow p-2 w-80":"h-fit text-sm rounded border border-neutral-200 bg-white shadow p-2 w-80"}/>
                        {error&reference.length <= 0 ? <label className='mt-1 text-red-400 text-xs'>This is a required field</label>:<label className='mt-1 text-xs'>Add a reference or case number to your search</label>}
                    </div>
    
                    <div className='mb-6 grid'>
                        {/* ID NUMBER */}
                        <input 
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value)}
                        placeHolder="ID Number"
                        className={idNumber.length <=0 ? "h-fit text-sm rounded border border-red-400 bg-white shadow p-2 w-80":"h-fit text-sm rounded border border-neutral-200 bg-white shadow p-2 w-80"}/>
                        {error&idNumber.length <= 0 ? <label className='mt-1 text-red-400 text-xs'>This is a required field</label>:<label className='mt-1 text-xs w-80'>South African ID number (use for looking up directors based on ID number)</label>}
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
                <div className="grid ml-10 h-fit">
                    <div className='mb-6 grid'>
                        {/* SURNAME */}
                        <input 
                        value={useDHAExtra}
                        onChange={(e) => setUseDHAExtra(e.target.value)}
                        placeHolder="UseDHAExtra"
                        className="h-fit w-80 text-sm rounded border border-neutral-200 bg-white shadow p-2 w-80"/>
                        <label className='mt-1 w-80 text-xs'>Only use if you properly understand</label>
                    </div>
    
                    <div className='mb-6 grid'>
                        {/* SURNAME */}
                        <input 
                        value={useSAFPDirect}
                        onChange={(e) => setUseSAFPDirect(e.target.value)}
                        placeHolder="UseSAFPExtra"
                        className="h-fit w-80 text-sm rounded border border-neutral-200 bg-white shadow p-2 w-80"/>
                        <label className='mt-1 w-80 text-xs'>Only use if you properly understand</label>
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