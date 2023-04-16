import React, { useEffect, useRef } from 'react';

// Hooks
import useClickOutside from '../../../hooks/models/useOutsideClick';

// Assets
import ErrorGIF from '../../../assets/gifs/error.gif';

function ErrorModel({setModal, message}) {
    let domNode = useClickOutside(() => {
        setModal(false);
    });

  return (
    <>
        <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
        <div className="relative w-auto my-6 mx-auto max-w-6xl">
            {/*content*/}
            <div ref={domNode} className="border-0 rounded-lg shadow-lg relative w-fit h-fit overflow-x-hidden flex flex-col bg-white outline-none focus:outline-none">
            {/*header*/}
            <div>
            </div>
            {/*body*/}
                <div className="w-96 relative h-fit grid place-items-center p-6 flex-auto">
                    <img src={ErrorGIF} alt="" className="h-32"/>
                    <p className="-mt-4 w-full grid place-items-center text-center h-32 text-lg">
                        {message}
                    </p>
                        
                    {/* CLOSE MODAL */}
                    <button
                    onClick={() => setModal(false)} 
                    className='mt-10 transition duration-300 bg-red-400 hover:bg-red-500 p-1 h-fit rounded shadow-md font-medium text-white w-full'>
                        Continue
                    </button>
                </div>
            </div>
        </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export default ErrorModel