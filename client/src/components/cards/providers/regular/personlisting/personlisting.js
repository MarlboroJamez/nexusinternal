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
import HelperModel from '../../helpers/models/helperpersonListing';
import SuccessModel from '../../../../models/global/success';
import ErrorModel from '../../../../models/global/error';
import ActionModel from '../../../../models/global/actions';

function Personlisting() {
    const {dispatch} = AppState();
     
    const [cookieValue, setCookieValue, getCookieValue] = useEncryptedCookie('ni-uid');
    const [cookieState, setCookieState] = useState(false);
    const [socketConnected, setSocketConnected] = useState(false)

    const [helperModel, setHelperModel] = useState(false);
    const [successModel, setSuccessModel] = useState(false)
    const [error, setError] = useState("");
    const [errorModel, setErrorModel] = useState(false)
    const [runningSearch, setRunningSearch] = useState(false);

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

     

    const handleSubmission = async (e) => {
        e.preventDefault();
        const lic = cookieValue.license[0].restrictions.filter((res) => res.type === "Person Listing")
        const cost = lic[0].cost
        const currentTotal = cookieValue.license[0].totalIncome;
        
        try {
            setRunningSearch(true)
            const {data} = await axios.post('/api/v1/provider/cpb/search/peoplelist', {
                uid: cookieValue._id.toString(),
                PermissiblePurpose: permissablePurpose.toString(),
                license: cookieValue.license[0],
                userEmail: cookieValue.email,
                header: header,
                IDNumber: idNumber,
                Surname: surname,
                FirstName: firstName,
                SecondName: secondName,
                DOB: dob,
                UsePP: usePP,
                Reference: reference,
                name: cookieValue.name,
                surname: cookieValue.surname,
                pid: "asdaaaaaaa",
                share: true,
                restrictionName: "Person Listing",
                restrictCost: cost.toString(),
                currentTotal: currentTotal - cost.toString(),
            }, config)
             
            dispatch({
                type: 'INSERT_SEARCH_NOTIFICATION',
                payload: []
            })
            setRunningSearch(false)
            setSuccessModel(true)
        } catch (e) {
            setError(e.response.data.message)
            setErrorModel(true)
        }
    }



  return (
    <div>
        {/* MODELS */}
        {helperModel ? (
            <HelperModel setSuccessModal={setHelperModel}/>
        ):""}

        {successModel ? (
            <SuccessModel message={"Your search has been successful, you can view your new search at incoming searches."} setModal={setSuccessModel}/>
        ):""}

        {errorModel ? (
            <ErrorModel message={error} setModal={setErrorModel}/>
        ):""}

        {runningSearch ? (
            <ActionModel message={"Your search is running..."}/>
        ):""}
        <div 
        className="w-fit flex">
            <h1 className="font-medium">
                Person Listing
            </h1>
            <svg 
            onClick={() => setHelperModel(true)}
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 mt-0.5 ml-3 text-neutral-500 hover:text-neutral-600 cursor-pointer transition duration-400">
                <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
            </svg>

        </div>

        <div className="flex mt-6">
            <div className="grid h-fit">
                {/* SEARCH TITLE */}
                <input 
                value={header}
                onChange={(e) => setHeader(e.target.value)}
                placeHolder="Provide your search a title"
                className="h-fit mb-4 text-sm rounded border border-neutral-200 bg-white shadow p-2 w-72"/>

                {/* PERSONAL REFERENCE NUMBER */}
                <input 
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeHolder="Personal Reference Number"
                className="h-fit mb-4 text-sm rounded border border-neutral-200 bg-white shadow p-2 w-72"/>

                {/* ID NUMBER */}
                <input 
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                placeHolder="ID Number"
                className="h-fit mb-4 text-sm rounded border border-neutral-200 bg-white shadow p-2 w-72"/>

                {/* FIRST NAME */}
                <input 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeHolder="First Name (Optional)"
                className="h-fit mb-4 text-sm rounded border border-neutral-200 bg-white shadow p-2 w-72"/>

                {/* PERMISSIBLE PURPOSE */}
                <select 
                onChange={(e) => setPermissablePurpose(e.target.value)}
                className="w-72 rounded shadow-md bg-neutral-300 p-2 text-sm cursor-pointer hover:bg-neutral-200 outline-none">
                {PermissiblePurpose.purpose.map((pur) => (
                    <option value={pur}>{pur}</option>
                ))}
                </select>
            </div>
            <div className="grid ml-10 h-fit">
                {/* SECOND NAME */}
                <input 
                value={secondName}
                onChange={(e) => setSecondName(e.target.value)}
                placeHolder="Second Name (Optional)"
                className="h-fit mb-4 text-sm rounded border border-neutral-200 bg-white shadow p-2 w-72"/>

                {/* SURNAME */}
                <input 
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                placeHolder="Surname (Optional)"
                className="h-fit mb-4 text-sm rounded border border-neutral-200 bg-white shadow p-2 w-72"/>

                {/* DOB */}
                <input 
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                placeHolder="DOB (Optional)"
                className="h-fit mb-4 text-sm rounded border border-neutral-200 bg-white shadow p-2 w-72"/>

                {/* PAYMENT PROFILE */}
                <select 
                onChange={(e) => setUsePP(e.target.value)}
                className="w-72 mb-4 rounded shadow-md bg-neutral-300 p-2 text-sm cursor-pointer hover:bg-neutral-200 outline-none">
                    <option selected>Use payment profile data</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
                
                {/* SEARCH SUBMISSION */}
                <button 
                onClick={handleSubmission}
                className="transition duration-400 hover:bg-sky-400 h-fit mb-4 rounded bg-sky-500 text-white shadow p-2 w-72 font-medium">
                    Search
                </button>
            </div>
        </div>
    </div>
  )
}

export default Personlisting