import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

// Hooks
import useEncryptedCookie  from '../../hooks/cookies/useCookie';

// Exchange Calls
import { useMsal } from '@azure/msal-react';
import { useIsAuthenticated } from '@azure/msal-react';

//Assets
import Logo from '../../assets/images/logo_login.png';

function Login({history}) {
     
    const [cookieValue, setCookieValue, getCookieValue] = useEncryptedCookie('ni-uid');
    const { instance, accounts } = useMsal();
    const isAuthenticated = useIsAuthenticated();

    const [error, setError] = useState(false);
    const [accessToken, setAccessToken] = useState("");
    const [cookieState, setCookieState] = useState(false)

    const config = {
        headers: {
            "Content-Type": "application/json"
        },
    };


  useEffect(() => {
    const currentAccount = accounts;
  
    const authCheck = async () => {
      if (isAuthenticated) {
        if(currentAccount[0].username.toLowerCase()){
          const {data} = await axios.post(
            "/api/v1/auth/login",
            {email: currentAccount[0].username.toLowerCase()},
            config
          );
          setCookieValue(data.user);
          
            
          history.push('/dashboard')
        }
      }
    }
  
    authCheck()
  }, [isAuthenticated, accessToken]);

    const handleSubmission = async (e) => {
        e.preventDefault();
        const tokenResponse = await instance.acquireTokenPopup({
          scopes: ['https://graph.microsoft.com/mail.send']
        });
        setAccessToken(tokenResponse.accessToken);
    }

  return (
    <div className='grid place-items-start h-screen'>
        <img 
            className='h-full bg-cover w-full z-1 absolute'
            src="https://res.cloudinary.com/nexus-forensic-services/image/upload/v1678906335/background_yytcsl.jpg" 
            alt=""/>

      <div className='overflow-hidden h-full w-96 bg-white border border-neutral-300 shadow-lg absolute ml-40'>
          <div className='p-2 mt-15'>
            <img 
            className='h-25 w-full mt-20'
            src={Logo} 
            alt=""/>
          </div>
          <hr className='border-3 border-sky-500 ml-5 mr-5'/>

          {/* FORM INPUT */}
          <div className='p-4 mb-4 pr-8'>
            <h1
            onClick={() => test()} 
            className="text-2xl text-center text-gray-900 pb-6">
              Hello, Welcome Back!
            </h1>
            <p className='text-sm text-center text-gray-900 -mt-5 mb-5'>Let's get you logged in!</p>

            {/* ERROR */}
            {error ? (
              <p className='m-2 p-2 w-full rounded shadow bg-red-400 font-bold text-white'>
                {error}
              </p>
            ):null}
          </div>

          <button
          onClick={handleSubmission}
          type="button" 
          className="bg-sky-700 ml-7 p-2 w-80 shadow-md text-white font-bold hover:bg-sky-500">
            LOGIN
          </button>
        </div>
    </div>
  )
}

export default Login