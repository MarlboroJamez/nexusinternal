import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Hooks
import useEncryptedCookie from '../../../hooks/cookies/useCookie';

// Models
import FeedbackModel from '../../models/feedback/feedback';
import ErrorModel from '../../models/global/error';

function Feedback() {
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
            const {data} = axios.post('/api/v1/client/feedback', {
                uid: cookieValue._id,
                email: cookieValue.email,
                message: message,
            },config)
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
            <FeedbackModel setModal={setSupportModel}/>
        ):""}

        {errorModel ? (
            <ErrorModel message={errorMessage} setModal={setErrorModel}/>
        ):""}
        <div className="w-120">
            <div className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="mt-1 mr-3 w-6 h-6 text-sky-600">
                    <path fill-rule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clip-rule="evenodd" />
                </svg>

                <h1 className="text-3xl font-medium mb-10">
                    We would love your feedback!
                </h1>
            </div>
            <p className="w-120 text-neutral-600">
              We value your feedback! At Nexus Intelligence, we are always striving to improve our product/service and your feedback can help us achieve that goal. Whether you have a suggestion for a new feature, a bug to report, or simply want to share your thoughts on your experience with our product/service, we want to hear from you. Please use the form below to submit your feedback, and our team will review it carefully. Thank you for taking the time to provide us with your valuable insights, and helping us create a better product/service for you.
            </p>

            <div className="mt-12">
                <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeHolder="We would love your to hear your feedback!"
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

export default Feedback