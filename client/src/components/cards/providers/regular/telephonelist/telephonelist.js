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
    const [addName, setAddNames] = useState("");

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
                Telephone Records Listing
            </h1>
        </div>

        <div className="flex mt-6">
            <div className="grid h-fit">
                <div className='grid mb-4 '>
                    {/* SEARCH TITLE */}
                    <input 
                    value={header}
                    onChange={(e) => setHeader(e.target.value)}
                    placeHolder="Provide your search a title"
                    className="h-fit text-sm rounded border border-neutral-200 bg-white shadow p-2 w-72"/>
                    <label className='mt-1 text-xs'>Input a title to your search</label>
                </div>

                {/* PERSONAL REFERENCE NUMBER */}
                <div className='mb-4 grid'>
                    <input 
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    placeHolder="Personal Reference Number"
                    className="h-fit text-sm rounded border border-neutral-200 bg-white shadow p-2 w-72"/>
                    <label className='mt-1 text-xs'>Add a reference or case number to your search</label>
                </div>

                <div className='mb-4 grid'>
                {/* PERMISSIBLE PURPOSE */}
                <select 
                    onChange={(e) => setPermissablePurpose(e.target.value)}
                    className="w-72 rounded shadow-md bg-neutral-300 p-2 text-sm cursor-pointer hover:bg-neutral-200 outline-none">
                    {PermissiblePurpose.purpose.map((pur) => (
                        <option value={pur}>{pur}</option>
                    ))}
                    </select>
                    <label className='mt-1 text-xs'>What is the reason to your search?</label>
                </div>
            </div>
            <div className="grid ml-10 h-fit">
                <div className="mb-4 grid">
                    {/* ID NUMBER */}
                    <input 
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    placeHolder="ID Number"
                    className="h-fit text-sm rounded border border-neutral-200 bg-white shadow p-2 w-72"/>
                    <label className='mt-1 text-xs'>Please provide a valid ID Number</label>
                </div>

                <div className='mb-4 grid'>
                <select
                onChange={(e) => setAddNames(e.target.value)} 
                className='w-72 rounded shadow-md bg-neutral-300 p-2 text-sm cursor-pointer hover:bg-neutral-200 outline-none'>
                    <option selected>Return name and surname?</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
                </div>

                <div className='mb-4 grid'>
                <select
                onChange={(e) => setAddNames(e.target.value)} 
                className='w-72 rounded shadow-md bg-neutral-300 p-2 text-sm cursor-pointer hover:bg-neutral-200 outline-none'>
                    <option selected>Return name and surname for busniess telephone?</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
                </div>

                <div className='mb-4 grid'>
                <select
                onChange={(e) => setAddNames(e.target.value)} 
                className='w-72 rounded shadow-md bg-neutral-300 p-2 text-sm cursor-pointer hover:bg-neutral-200 outline-none'>
                    <option selected>Return number of people who used the telephone number.?</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
                </div>
                
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