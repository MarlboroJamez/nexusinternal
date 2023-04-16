import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';
import axios from 'axios'

// Assets
import Guide from '../../../../../assets/guides/spiderweb.pdf'

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
import RunningModel from '../../../../models/searches/slowsearch';

function Spiderweb({selectedProject, share, notified, project}) {
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
    const [runningModel, setRunningModel] = useState(false);

    const [view, setView] = useState("search")
    const [access, setAccess] = useState([]);

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
                    setLicense(data.data[0].restrictions.filter((res) => res.type === "Spiderwebrelationship Listing"))
                    setAccess(cookieValue.license[0].restrictions.filter(item => item.type === "Business Interest Enquiry"))
                }
            }
        }
        licenseInfo()
    },[cookieState, cookieValue, loading])

     
    const handleSubmission = async (e) => {
        e.preventDefault();
        const lic = cookieValue.license[0].restrictions.filter((res) => res.type === "Business Interest Enquiry")
        const cost = lic[0].cost
        const currentTotal = cookieValue.license[0].totalIncome;
        
        try {
                if(reference.length === 0){
                        setError(true)
                } else {
                    if(license[0].searches > 0){
                        setLoading(true)
                    setRunningModel(true)
                    const {data} = await axios.post('/api/v1/provider/cpb/search/spiderweb', {
                        uid: cookieValue._id.toString(),
                        PermissiblePurpose: "Fraud Detection and Prevention",
                        license: cookieValue.license[0],
                        userEmail: cookieValue.email.toString(),
                        header: reference,
                        PrimaryIDNumber: idNumber,
                        EnquiryReason: permissablePurpose, //input removed
                        EnquiryDoneBy: `${cookieValue.name} ${cookieValue.surname}`, // input removed
                        SecondaryIDNumber: useDHAExtra,
                        UseSAFPSDirect: useSAFPDirect,
                        RawHTML: rawHTML,
                        SecondName: secondName,
                        DOB: dob,
                        UsePP: usePP,
                        Reference: reference,
                        name: cookieValue.name,
                        surname: cookieValue.surname,
                        pid: cookieValue.license[0]._id,
                        share: true,
                        restrictionName: "Spiderwebrelationship Listing",
                        restrictCost: cost.toString(),
                        currentTotal: currentTotal - cost.toString(),
                    }, config)
                    setHeader("");
                    setIdNumber("");
                    setSurname("")
                    setFirstName("")
                    setPermissablePurpose("")
                    setReference("")
                    setRunningModel(false)
                    setLoading(false)
                    setSuccessModel(true)
                    dispatch({
                        type: 'INSERT_SEARCH_NOTIFICATION',
                        payload: []
                    })
                    } else {
                        setErrorModel(true)
                        setErrorMessage("You have reached your monthly limit, please engage with us to enable more units if needed.")
                    }
                }
        } catch (e) {
            setRunningModel(false)
            setLoading(false)
            setErrorModel(true)
            setErrorMessage(e.response.data.message.status_message)
        }
    }

    const handleRestrictAccess = () => {
        setErrorModel(true)
        setErrorMessage("Your access has been restricted by your admin, please contact him to enable this feature.")
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
                    Credit Enquiry
                </li>
                <li
                onClick={() => setView("about")}
                className={view === "about" ? 
                "mr-10 transition duration-400 bg-sky-500 h-fit rounded text-white shadow p-2 w-fit font-medium"
                :"mr-10 transition duration-400 hover:bg-sky-500 h-fit rounded bg-sky-600 text-white shadow p-2 w-fit font-medium"}>
                    About Credit Enquiry
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
            {runningModel ? (
                <RunningModel setModal={setRunningModel}/>
            ):""}
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
                    Credit Enquiry
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
                        <td className='p-2 border border-neutral-200'>Spiderweb</td>
                        <td className='p-2 border border-neutral-200'>Provides linked data between one to many ID numbers across all available datasets.</td>
                        <td className='p-2 border border-neutral-200 text-right'>R17.55</td>
                        <td className='p-2 border border-neutral-200 text-right'>600</td>
                        <td className='p-2 border border-neutral-200 text-right'>{license.length > 0 ? license[0].searches:""}</td>
                    </tr>
                </tbody>
            </table>
    
            <div className="flex mt-6">
                <div className="grid h-fit">
                    {/* <div className='grid mb-6 '>
                        <label className='mt-1 text-xs w-full text-right font-bold mb-0.5'>E.g. Individual - Business Interest Inquiry</label>
                        <input 
                        value={header}
                        onChange={(e) => setHeader(e.target.value)}
                        placeHolder="Provide your search a title"
                        className={header.length <=0 ? "h-fit text-sm rounded border border-red-400 bg-white shadow p-2 w-80":"h-fit text-sm rounded border border-neutral-200 bg-white shadow p-2 w-80"}/>
                        {error&header.length <= 0 ? <label className='mt-1 text-red-400 text-xs'>This is a required field</label>:<label className='mt-1 text-xs'>Input a title to your search</label>}
                    </div> */}
    
                    {/* PERSONAL REFERENCE NUMBER */}
                    <div className='mb-6 grid'>
                        <label className='mt-1 text-xs w-full text-right font-bold mb-0.5'>E.g. TEL001</label>
                        <input 
                        value={reference}
                        maxlength="30"
                        onChange={(e) => setReference(e.target.value)}
                        placeHolder="Telkom/Case Reference Number"
                        className={reference.length <=0 ? "h-fit text-sm rounded border border-red-400 bg-white shadow p-2 w-80":"h-fit text-sm rounded border border-neutral-200 bg-white shadow p-2 w-80"}/>
                        {error&reference.length <= 0 ? <label className='mt-1 text-red-400 text-xs'>This is a required field</label>:<label className='mt-1 text-xs'>Add a reference or case number to your search</label>}
                    </div>
    
                    <div className='mb-6 grid'>
                        <label className='mt-1 text-xs w-full text-right font-bold mb-0.5'>E.g. 9712162384098</label>
                        {/* ID NUMBER */}
                        <input 
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value)}
                        placeHolder="Primary ID Number"
                        className={idNumber.length <=0 ? "h-fit text-sm rounded border border-red-400 bg-white shadow p-2 w-80":"h-fit text-sm rounded border border-neutral-200 bg-white shadow p-2 w-80"}/>
                        {error&idNumber.length <= 0 ? <label className='mt-1 text-red-400 text-xs'>This is a required field</label>:<label className='mt-1 text-xs w-80'>South African ID number</label>}
                    </div>
    
                    {/* PERMISSIBLE PURPOSE */}
                    <div className='mb-6 grid'>
                        <select 
                        onChange={(e) => setPermissablePurpose(e.target.value)}
                        className="cursor-pointer h-fit text-sm rounded border border-neutral-200 bg-white shadow p-2 w-80">
                        {PermissiblePurpose.purpose.map((pur) => (
                            <option value={pur}>{pur}</option>
                        ))}
                        </select>
                        <label className='mt-1 text-xs'>Permissible purpose for this enquiry</label>
                    </div>
                </div>
                <div className="grid ml-10 h-fit">
                    <div className='mb-6 grid'>
                        <label className='mt-1 text-xs w-full text-right font-bold mb-0.5'>E.g. 9712162384098</label>
                        {/* ID NUMBER */}
                        <input 
                        value={useDHAExtra}
                        onChange={(e) => setUseDHAExtra(e.target.value)}
                        placeHolder="Secondary ID Number"
                        className={useDHAExtra.length <=0 ? "h-fit text-sm rounded border border-red-400 bg-white shadow p-2 w-80":"h-fit text-sm rounded border border-neutral-200 bg-white shadow p-2 w-80"}/>
                        {error&useDHAExtra.length <= 0 ? <label className='mt-1 text-red-400 text-xs'>This is a required field</label>:<label className='mt-1 text-xs w-80'>South African ID number</label>}
                    </div>
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

export default Spiderweb