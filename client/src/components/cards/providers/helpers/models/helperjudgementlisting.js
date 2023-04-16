import React, { useEffect, useRef } from 'react';

//Assets 
import SearchGIF from '../../../assets/gifs/search.gif';

//TABLE
import HelperTable from '../table/helpers/judgementlisting';

//OUTSIDE MODAL CLICK
let useClickOutside = (handler) => {
    let ref = useRef()
  
    useEffect(() => {
        let handle = (event) => {
            if(!ref.current.contains(event.target)){
                handler()       
            }
        }
  
        document.addEventListener("mousedown", handle)
  
        return () => {
            document.removeEventListener("mousedown", handle)
        }
    }, [])
    return ref
}

function Helperjudgementlisting({setSuccessModal}) {
    let domNode = useClickOutside(() => {
        setSuccessModal(false);
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
                <div className="w-fit relative h-fit grid place-items-center p-6 flex-auto">
                    
                    <div className="w-full text-left">
                        <h1 className="font-bold text-xl mb-10 text-sky-700">
                            Judgement Listing
                        </h1>
                    </div>

                    <div className="h-100 overflow-y-scroll">
                        <HelperTable/>
                    </div>

                    {/* CLOSE MODAL */}
                    <button 
                    onClick={() => setSuccessModal(false)}
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

export default Helperjudgementlisting