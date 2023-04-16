import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Hooks
import useEncryptedCookie from '../../../hooks/cookies/useCookie';

// Models
import SupportModel from '../../models/support/support';
import ErrorModel from '../../models/global/error';

function Support() {
    const [priority, setPriority] = useState("Severity 1")
    const [message, setMessage] = useState("")
    const [cookieValue, setCookieValue, getCookieValue] = useEncryptedCookie('ni-uid');
    const [fetchingCookies, setFetchingCookies] = useState(false)
    const [supportModel, setSupportModel] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    const [errorModel, setErrorModel] = useState(false)

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
  
    useEffect(() => {
      setFetchingCookies(true)
      getCookieValue()
      setFetchingCookies(false)
    },[])

    const handleSubmission = async () => {
        try {
            const {data} = axios.post('/api/v1/client/support/ticket', {
                uid: cookieValue._id,
                email: cookieValue.email,
                priority: priority,
                message: message,
            },config)
            setPriority("Severity 1")
            setMessage("")
            setSupportModel(true)
        } catch (err) {
            setErrorModel(true)
            setErrorMessage(err.response.data.message.status_message)
        }
    }
  return (
    <div>
        {supportModel ? (
            <SupportModel setModal={setSupportModel}/>
        ):""}

        {errorModel ? (
            <ErrorModel message={errorMessage} setModal={setErrorModel}/>
        ):""}
        <div className="w-120">
            <div className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="mt-2 mr-3 w-6 h-6 text-sky-600">
                    <path fill-rule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clip-rule="evenodd" />
                    <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
                </svg>

                <h1 className="text-3xl font-medium mb-10">
                    Contact our team directly!
                </h1>
            </div>
            <p className="w-120 text-neutral-600">
            Welcome to our support page! If you're experiencing any issues with our product or service, we're here to help. To get started, simply fill out the form below with as much detail as possible about your issue. Please also indicate the priority of your request by selecting either P1, P2, or P3. Our team will review your request and get back to you as soon as possible. Thank you for choosing our product/service and we look forward to resolving any issues you may have!
            </p>

            <table className="mt-12 w-120">
                <thead className="bg-zinc-600 text-white text-left">
                    <th className="font-medium"></th>
                    <th className="font-medium p-1">Severity 1 (Critical)</th>
                    <th className="font-medium p-1">Severity 2 (Medium-low)</th>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-1 border border-neutral-200 text-sm">Response Times (90%)</td>
                        <td className="p-1 border border-neutral-200 text-sm">2 hrs</td>
                        <td className="p-1 border border-neutral-200 text-sm">4 hrs (measured in Business Hours)</td>
                    </tr>
                    <tr>
                        <td className="p-1 border border-neutral-200 text-sm">Restoration Time (90%)</td>
                        <td className="p-1 border border-neutral-200 text-sm">8 hrs</td>
                        <td className="p-1 border border-neutral-200 text-sm">24 hours</td>
                    </tr>
                    <tr>
                        <td className="p-1 border border-neutral-200 text-sm">Permanent Resolution Time (90%)</td>
                        <td className="p-1 border border-neutral-200 text-sm">1 week</td>
                        <td className="p-1 border border-neutral-200 text-sm">2 weeks</td>
                    </tr>
                </tbody>
            </table>

            <table className="mt-5 w-120">
                <thead className="bg-zinc-600 text-white text-left">
                    <th className="font-medium p-1">Support Hours</th>
                    <th className="font-medium"></th>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-1 border border-neutral-200 text-sm">Support</td>
                        <td className="p-1 border border-neutral-200 text-sm">Business Hours of 08:00 and 17:00</td>
                    </tr>
                    <tr>
                        <td className="p-1 border border-neutral-200 text-sm">Maintenance Window</td>
                        <td className="p-1 border border-neutral-200 text-sm">After hours.</td>
                    </tr>
                    <tr>
                        <td className="p-1 border border-neutral-200 text-sm">Automated System Monitoring</td>
                        <td className="p-1 border border-neutral-200 text-sm">24x7x365</td>
                    </tr>
                </tbody>
            </table>

            <table className="mt-5 w-120">
                <thead className="bg-zinc-600 text-white text-left">
                    <th className="font-medium p-1">Availability</th>
                    <th className="font-medium"></th>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-1 border border-neutral-200 text-sm">Support availability</td>
                        <td className="p-1 border border-neutral-200 text-sm">99%</td>
                    </tr>
                </tbody>
            </table>

            <table className="mt-5 w-120">
                <thead className="bg-zinc-600 text-white text-left">
                    <th className="font-medium p-1 w-40">Incident Logging</th>
                    <th className="font-medium"></th>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-1 border border-neutral-200 text-sm">Ticket Logging procedure</td>
                        <td className="p-1 border border-neutral-200 text-sm">NexusIntel™ has its own built-in issue logging system and 
must be used to escalate issues and incidents. All Incidents 
and issues will be logged and tracked on NexusIntel™
NOTE: For critical tickets logged outside of office hours, the 
escalation must be followed by a telephone call or sms to the 
support desk advising of the criticality of the incident.</td>
                    </tr>
                </tbody>
            </table>

            <div className="mt-12">
                <select 
                onChange={(e) => setPriority(e.target.value)}
                className="cursor-pointer w-72 rounded p-2 bg-neutral-300 shadow-md h-fit">
                    <option value="Severity 1">Severity 1 (Highest priority)</option>
                    <option value="Severity 2">Severity 2 (Medium- Lower priority)</option>
                </select>

                <textarea 
                value={message} 
                onChange={(e) => setMessage(e.target.value)}
                placeHolder="Tell us about your issue, we will be happy to assist!"
                className="p-2 mt-6 resize-none h-100 w-120 rounded shadow-inner border border-neutral-300"/>

                <button 
                onClick={handleSubmission}
                className="h-fit w-full rounded mt-8 shadow-lg bg-sky-500 hover:bg-sky-600 p-2 text-white hover:shadow-lg transition duration-400">
                    Submit
                </button>
            </div>
        </div>
    </div>
  )
}

export default Support