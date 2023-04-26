import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';
import axios from 'axios'

// Assets
import Guide from '../../../../../assets/guides/avs.pdf'

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
import HelperModel from '../../helpers/models/cipcbankaccountverification';
import RunningModel from '../../../../models/searches/slowsearch';

function CIPDirectorListing({selectedProject, share, notified, project}) {
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
    const [accountNumber, setAccoountNumber] = useState("");
    const [branchCode, setBranchCode] = useState("");
    const [accountType, setAccountType] = useState("");
    const [identificationType, setIdentificationType] = useState("")
    const [bank, setBank] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("");
    const [initials, setInitials] = useState("");
    const [firstName, setFirstName] = useState("")
    const [surname, setSurname] = useState("")
    const [hasConsent, setHasConsent] = useState("")

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("");
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
        if(cookieValue){
            if(cookieValue.license){
                setRemaining(cookieValue.license[0].restrictions.filter(item => item.type === "Bank Account Verification"))
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
                    setLicense(data.data[0].restrictions.filter((res) => res.type === "Bank Account Verification"))
                    setAccess(cookieValue.license[0].restrictions.filter(item => item.type === "Bank Account Verification"))
                }
            }
        }
        licenseInfo()
    },[cookieState, cookieValue, loading])


    const handleSubmission = async (e) => {
        e.preventDefault();
        const lic = cookieValue.license[0].restrictions.filter((res) => res.type === "Bank Account Verification")
        const cost = lic[0].cost
        const currentTotal = cookieValue.license[0].totalIncome;
        
        try {
                if(reference.length === 0 ){
                        setError(true)
                } else {
                    if (license[0].searches > 0){
                        setLoading(true)
                    setRunningModel(true)
                    const {data} = await axios.post('/api/v1/provider/cpb/search/bankaccountverification', {
                        uid: cookieValue._id,
                        license: cookieValue.license[0],
                        header: reference,
                        userEmail: cookieValue.email.toString(),
                        restrictionName: "Bank Account Verification",
                        restrictCost: cost.toString(),
                        currentTotal: currentTotal - cost.toString(),
                        notifyMe: notified,
                        pid: cookieValue.license[0]._id,
                        share: share,
                        name: cookieValue.name,
                        surname: cookieValue.surname,
                        PermissiblePurpose: "Fraud Detection and Prevention",
                        IDNumber: idNumber.replace(/[\/\s]/g, ''),
                        RegistrationNumber: registrationNumber,
                        Reference: reference,
                        AccountNumber: accountNumber,
                        AccountType: accountType,
                        BranchCode: branchCode,
                        IdentificationType: identificationType,
                        Bank: bank,
                        Email: email,
                        PhoneNumber: phoneNumber,
                        Initials: initials,
                        FirstName: firstName,
                        Surname: surname,
                        HasConsent: true
                    }, config)
                    setHeader("");
                    setReference("");
                    setIdNumber("");
                    setAccoountNumber("");
                    setBranchCode("");
                    setAccountType("");
                    setIdentificationType("");
                    setPermissablePurpose("");
                    setBank("");
                    setEmail("");
                    setPhoneNumber("");
                    setInitials("");
                    setFirstName("");
                    setSurname("");
                    setHasConsent(false)
                    setRunningModel(false)
                    setLoading(false)
                    dispatch({
                        type: 'INSERT_SEARCH_NOTIFICATION',
                        payload: []
                    })
                    setSuccessModel(true)
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
                Entity Bank Account Verification
            </li>
            <li
            onClick={() => setView("about")}
            className={view === "about" ? 
            "mr-10 transition duration-400 bg-sky-500 h-fit rounded text-white shadow p-2 w-fit font-medium"
            :"mr-10 transition duration-400 hover:bg-sky-500 h-fit rounded bg-sky-600 text-white shadow p-2 w-fit font-medium"}>
                About Bank Account Verification
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
    
            {runningSearch ? (
                <ActionModel message={"Your search is running..."}/>
            ):""}
    
            {helperModel ? (
                <HelperModel setModel={setHelperModel}/>
            ):""}
            
            <div 
            className="w-fit flex">
                <h1 className="font-medium text-3xl">
                    Entity Bank Account Verification
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
                        <td className='p-2 border border-neutral-200'>Employee Checks & Detailed CIPC checks</td>
                        <td className='p-2 border border-neutral-200'>Bank Account Verification</td>
                        <td className='p-2 border border-neutral-200 text-right'>R4.00</td>
                        <td className='p-2 border border-neutral-200 text-right'>200</td>
                        <td className='p-2 border border-neutral-200 text-right'>{license.length > 0 ? license[0].searches:""}</td>
                    </tr>
                </tbody>
            </table>
    
    
            <div className="flex mt-12 w-full">
                <div className="grid h-fit">
                    {/* <div className='grid mb-6 '>
                        <label className='mt-1 text-xs w-full text-right font-bold mb-0.5'>E.g. Entity - Bank Verification</label>
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
                        <label className='mt-1 text-xs w-full text-right font-bold mb-0.5'>E.g.  200503394107 (2005/033941/07)</label>
    
                        {/* ID NUMBER */}
                        <input 
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value)}
                        placeHolder="Company Registration Number"
                        className={idNumber.length <=0 ? "h-fit text-sm rounded border border-red-400 bg-white shadow p-2 w-80":"h-fit text-sm rounded border border-neutral-200 bg-white shadow p-2 w-80"}/>
                        {error&idNumber.length <= 0 ? <label className='mt-1 text-red-400 text-xs'>This is a required field</label>:<label className='mt-1 text-xs w-80'>Company Registration Number (No spaces or forward slashes)</label>}
                    </div>
    
                    <div className='mb-6 grid'>
                        <label className='mt-1 text-xs w-full text-right font-bold mb-0.5'>E.g. 51066352840</label>
                        {/* ACCOUNT NUMBER */}
                        <input 
                        value={accountNumber}
                        onChange={(e) => setAccoountNumber(e.target.value)}
                        placeHolder="Account Number"
                        className={accountNumber.length <=0 ? "h-fit text-sm rounded border border-red-400 bg-white shadow p-2 w-80":"h-fit text-sm rounded border border-neutral-200 bg-white shadow p-2 w-80"}/>
                        {error&accountNumber.length <= 0 ? <label className='mt-1 text-red-400 text-xs'>This is a required field</label>:<label className='mt-1 text-xs w-80'>Account number</label>}
                    </div>
    
                    <div className='mb-6 grid'>
                        <label className='mt-1 text-xs w-full text-right font-bold mb-0.5'>E.g. 30568</label>
                        {/* BRANCH CODE */}
                        <input 
                        value={branchCode}
                        onChange={(e) => setBranchCode(e.target.value)}
                        placeHolder="Branch Code"
                        className="h-fit text-sm rounded border border-neutral-200 bg-white shadow p-2 w-80"/>
                        {error&branchCode.length <= 0 ? <label className='mt-1 text-red-400 text-xs'>This is a required field</label>:<label className='mt-1 text-xs w-80'>Branch Code</label>}
                    </div>
    
                    <div className='mb-6 grid'>
                        <label className='mt-1 text-xs w-full text-right font-bold mb-0.5'>E.g. Current</label>
                        {/* ACCOUNT TYPE */}
                        <select 
                        onChange={(e) => setAccountType(e.target.value)}
                        className={accountType.length <=0 ? "cursor-pointer h-fit text-sm rounded border border-red-400 bg-white shadow p-2 w-80":"cursor-pointer h-fit text-sm rounded border border-neutral-200 bg-white shadow p-2 w-80"}>
                            <option>Select Account Type...</option>
                            <option value="NotKnown">NotKnown</option>
                            <option value="Current">Current</option>
                            <option value="Savings">Savings</option>
                            <option value="Transmission">Transmission</option>
                            <option value="Bond">Bond</option>
                            <option value="SubscriptionShare">SubscriptionShare</option>
                        </select>
                        {error&accountType.length <= 0 ? <label className='mt-1 w=80 text-red-400 text-xs'>This is a required field</label>:<label className='w-80 mt-1 text-xs w-80'>NotKnown, Current, Savings, Transmission, Bond, SubscriptionShare</label>}   
                    </div>
    
                    <div className='mb-6 grid'>
                        <label className='mt-1 text-xs w-full text-right font-bold mb-0.5'>E.g. SABR: South African Business Registration</label>
                        {/* IDENTIFICATION TYPE */}
                        <select 
                        onChange={(e) => setIdentificationType(e.target.value)}
                        className={identificationType.length <=0 ? "cursor-pointer h-fit text-sm rounded border border-red-400 bg-white shadow p-2 w-80":"cursor-pointer h-fit text-sm rounded border border-neutral-200 bg-white shadow p-2 w-80"}>
                            <option>Select Identification Type...</option>
                            <option value="SABR">SABR: South African Business Registration</option>
                            <option value="TN">TN: Trust Number</option>
                        </select>
                        {error&identificationType.length <= 0 ? <label className='mt-1 w=80 text-red-400 text-xs'>This is a required field</label>:<label className='w-80 mt-1 text-xs w-80'>Select identification type</label>}   
                    </div>
                </div>
                <div className="grid ml-12 h-fit">
                <div className='mb-6 grid'>
                    <label className='mt-1 text-xs w-full text-right font-bold mb-0.5'>E.g. FNB</label>
                    {/* BANK */}
                    <select 
                    onChange={(e) => setBank(e.target.value)}
                    className={bank.length <=0 ? "cursor-pointer h-fit text-sm rounded border border-red-400 bg-white shadow p-2 w-80":"cursor-pointer h-fit text-sm rounded border border-neutral-200 bg-white shadow p-2 w-80"}>
                        <option>Select Bank...</option>
                        <option value="Absa">Absa</option>
                        <option value="AfricanBank">African</option>
                        <option value="Capitec">Capitec</option>
                        <option value="Firstrand">Firstrand</option>
                        <option value="FNB">FNB</option>
                        <option value="Grindrod">Grindrod</option>
                        <option value="Investec">Investec</option>
                        <option value="Nedbank">Nedbank</option>
                        <option value="Randmerchant">Randmerchant</option>
                        <option value="RMB">RMB</option>
                        <option value="Sasfin">Sasfin</option>
                        <option value="Tyme">Tyme</option>
                        <option value="StandardBank">StandardBank</option>
                        <option value="Discovery">Discovery</option>
                    </select>
                    {error&bank.length <= 0 ? <label className='mt-1 w=80 text-red-400 text-xs'>This is a required field</label>:<label className='w-80 mt-1 text-xs w-80'>Select type of bank</label>}   
                </div>
    
                <div className='mb-6 grid'>
                    <label className='mt-1 text-xs w-full text-right font-bold mb-0.5'>E.g. Nexus Forensic Services</label>
                    {/* SURNAME */}
                    <input 
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    placeHolder="Company Name"
                    className={surname.length <=0 ? "h-fit text-sm rounded border border-red-400 bg-white shadow p-2 w-80":"h-fit text-sm rounded border border-neutral-200 bg-white shadow p-2 w-80"}/>
                    {error&surname.length <= 0 ? <label className='mt-1 text-red-400 text-xs'>This is a required field</label>:<label className='mt-1 text-xs'>Company Name defaults to</label>}
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

export default CIPDirectorListing