import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';
import axios from 'axios'

// Context
import { AppState } from '../../../../../context/Context';

// Hooks
import useEncryptedCookie  from '../../../../../hooks/cookies/useCookie';

//JSON
import PermissiblePurpose from '../../../../../data/cpb/purpose.json';

function Personlisting() {
    const {dispatch} = AppState();
     
    const [cookieValue, setCookieValue, getCookieValue] = useEncryptedCookie('ni-uid');
    const [cookieState, setCookieState] = useState(false);
    const [socketConnected, setSocketConnected] = useState(false)

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
        } catch (e) {
            console.log(e)
        }
    }

    
     


  return (
    <div>
        <div 
        className="w-fit flex">
            <h1 className="font-medium">
                Person Listing
            </h1>
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