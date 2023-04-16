import React, { useEffect, useState } from 'react';

// Hooks
import useEncryptedCookie from '../../../../hooks/cookies/useCookie';

// Models
import ErrorModel from '../../../models/global/error';

function Personlist({data}) {
  const [cookieValue, setCookieValue, getCookieValue] = useEncryptedCookie('ni-uid');
  const [cookieState, setCookieState] = useState(false);
  const [errorModel, setErrorModel] = useState(false)

  useEffect(() => {
      setCookieState(true);
      getCookieValue();
      setCookieState(false);
  }, []);

  const downloadPDF = () => {
    const url = `data:application/pdf;base64,${data[0].search[0].EncodedPDF}`;
    const link = document.createElement('a');
    link.href = url;
    link.download = 'file.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className='w-full h-full'>
      {errorModel ? (
        <ErrorModel setModal={setErrorModel} message={"Your access has been restricted by your admin, please contact him to enable this feature."}/>
      ):""}

        <div id="pdf-div" className='w-full p-6'>
          <div className='mb-6'>
            <button
            className="transition duration-400 p-2 w-72 rounded shadow-md hover:shadow-lg bg-zinc-600 hover:bg-zinc-500 text-white font-medium" 
            onClick={cookieValue && cookieValue.isActivity ? downloadPDF:() => setErrorModel(true)}>
              Download Report
            </button>
          </div>
          <div>
            {cookieValue && cookieValue.isActivity ? (
              <iframe
              title="PDF Viewer"
              src={`data:application/pdf;base64,${data[0].search[0].EncodedPDF}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
              className="w-full h-130"
              frameBorder="0"
              sandbox
            />
            ):(
              <div className='w-full h-120 grid place-items-center'>
                <p className="font-medium text-red-800 text-center">
                  Your admin has restricted your access from viewing this search result (pdf report).
                </p>
              </div>
            )}
          </div>
        </div>
    </div>
  );
}

export default Personlist;
