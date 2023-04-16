import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Hooks
import useEncryptedCookie  from '../../../../../hooks/cookies/useCookie';

//JSON
import PermissiblePurpose from '../../../../../data/cpb/purpose.json';

function Personlisting({share, notified, project}) {
    const [cookieValue, setCookieValue, getCookieValue] = useEncryptedCookie('ni-uid');

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

    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    }

    useEffect(() => {
        getCookieValue()
    },[])

    const handleSubmission = async (e) => {
        e.preventDefault();
        const lic = cookieValue.license[0].restrictions.filter((res) => res.type === "Person Listing")
        const cost = lic[0].cost
        const currentTotal = cookieValue.license[0].totalIncome;
        
        const parameters = {
            uid: cookieValue._id.toString(),
            license: cookieValue.license[0],
            header: header,
            userEmail: cookieValue.email,
            restrictionName: "CIPC Audit Listing",
            restrictCost: cost.toString(),
            currentTotal: currentTotal - cost.toString(),
            notifyMe: notified,
            pid: "aaaaaaaaaaaaa",
            share: share,
            name: cookieValue.name,
            surname: cookieValue.surname,
            PermissiblePurpose: permissablePurpose,
            RegistrationNumber: registrationNumber,
            Reference: reference,
        }
        try {
            const {data} = axios.post('/api/v1/provider/cpb/schedule/cipcauditorslist',{
                date: date,
                uid: cookieValue._id,
                parameters: parameters
            },config)
            console.log(data)
        } catch (e) {
            console.log(e)
        }
    }


  return (
    <div>
        <div 
        className="w-fit flex">
            <h1 className="font-medium">
                CIPC Audit Listing
            </h1>
        </div>

        <div className="mt-6">
            <input 
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="datetime-local" 
            className="p-2 rounded border border-neutral-200 shadow rounded text-sm"/>
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
                {/* COMPANY REGISTRATION NUMBER */}
                <input 
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                placeHolder="Company Registration Number"
                className="h-fit mb-4 text-sm rounded border border-neutral-200 bg-white shadow p-2 w-72"/>
                
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