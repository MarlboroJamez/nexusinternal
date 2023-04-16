import React, { useEffect, useRef } from 'react';

// Hooks
import useClickOutside from '../../../hooks/models/useOutsideClick';

// Assets
import LoadingGIF from '../../../assets/gifs/loading.gif'

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
            <div className="border-0 rounded-lg shadow-lg relative w-fit h-fit overflow-x-hidden flex flex-col bg-white outline-none focus:outline-none">
            {/*header*/}
            <div>
            </div>
            {/*body*/}
                <div className="w-96 relative h-fit grid place-items-center p-10 flex-auto">
                    <img src={LoadingGIF} alt="" className="h-32 mb-4"/>
                    <p className="-mt-4 w-full grid place-items-center text-center h-32 text-lg">
                    Please be patient, this search tends to take longer than the others
                    </p>
                </div>
            </div>
        </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export default SuccessModel