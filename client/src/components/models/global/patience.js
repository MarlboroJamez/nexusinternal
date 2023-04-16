import React, { useEffect, useRef } from 'react';

// Hooks
import useClickOutside from '../../../hooks/models/useOutsideClick';


function SuccessModel({setModal, message}) {
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
                    <p className="mt-4 w-full grid place-items-center text-center h-32 text-lg">
                    Please be patient when conducting secheduled searches on this site while I work to improve user experience; this notice will only be displayed temporarily.
                    </p>
                        
                    {/* CLOSE MODAL */}
                    <button
                    onClick={() => setModal(false)} 
                    className='mt-10 transition duration-300 bg-sky-600 hover:bg-sky-500 p-1 h-fit rounded shadow-md font-medium text-white w-full'>
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

export default SuccessModel