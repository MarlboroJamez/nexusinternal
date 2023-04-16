import React, { useEffect, useRef } from 'react';

//TABLE

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

function HelperAddressListing({setModel}) {
    let domNode = useClickOutside(() => {
        setModel(false);
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
                        PEP, Sanctions & Adverse Media
                        </h1>
                    </div>

                    <div className="h-fit w-80 text-neutral-600 text-sm p-2 rounded shadow-inner border border-neutral-200 bg-neutral-100">
                        <p>
                        Our screening process involves a comprehensive review of all necessary sanction lists in compliance with the Financial Intelligence Centre Act (FICA). By cross-referencing extensive datasets and leveraging advanced matching algorithms, we can quickly identify individuals or entities that appear on these lists and take the necessary steps to mitigate the risk of fraudulent or illegal activity. This screening process is an essential component of our risk management strategy and ensures that our clients remain in compliance with all relevant regulations and laws.
                        </p>
                    </div>

                    {/* CLOSE MODAL */}
                    <button 
                    onClick={() => setModel(false)}
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

export default HelperAddressListing