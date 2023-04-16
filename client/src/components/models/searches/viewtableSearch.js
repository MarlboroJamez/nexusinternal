import React, { useEffect, useRef } from 'react';

// Hooks
import useClickOutside from '../../../hooks/models/useOutsideClick';

// Tables
import CIPCDirectorListing from '../../tables/provider/cpb/cipcdirectorlist';
import IDVWithPhoto from '../../tables/provider/cpb/idvwithphoto';
import IDVWithoutPhoto from '../../tables/provider/cpb/idvwithoutphoto';
import BusinessInterestEnquiry from '../../tables/provider/cpb/businessinterestinquiry';
import LifestyleAudit from '../../tables/provider/cpb/lifestyleauditreport';
import PEPListing from '../../tables/provider/cpb/pepslist';
import BankAccountVerification from '../../tables/provider/cpb/bankaccountverification';
import ProcurementEnquiry from '../../tables/provider/cpb/procurementenquiry';
import DyanamicReport from '../../tables/provider/cpb/dynamicreport';
import Spiderweb from '../../tables/provider/cpb/spiderweb';
import EnterpriseReport from '../../tables/provider/cpb/enterpriseriskreport';
import CreditEnquiry from '../../tables/provider/cpb/creditenquiry';
import IDVKyc from '../../tables/provider/cpb/individualkyc';
import TraceEnquiry from '../../tables/provider/cpb/traceenquiry';
import TrustEnquiry from '../../tables/provider/cpb/trustenquiry';
import DeedsEnquiry from '../../tables/provider/cpb/deedsenquiry';
import IDVEnquiry from '../../tables/provider/cpb/idvenquiry';
import CompanyKYC from '../../tables/provider/cpb/companykyc';
import EagleEye from '../../tables/provider/cpb/eagleye';

function CanceledScheduledSearch({setModal, data}) {
    let domNode = useClickOutside(() => {
        setModal(false);
    });

    console.log(data)

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
                <div className="w-fit h-120 overflow-y-scroll relative grid place-items-center p-6 flex-auto">
                    <div className="h-fit w-130 p-6">
                        {data.title === "Commercial Enquiry" && <CIPCDirectorListing data={[data]}/>}
                        {data.title === "IDV Listing including photo" && <IDVWithPhoto data={[data]}/>}
                        {data.title === "IDV Listing without photo" && <IDVWithoutPhoto data={[data]}/>}
                        {data.title === "Business Interest Enquiry" && <BusinessInterestEnquiry data={[data]}/>}
                        {data.title === "PEP Listing" && <PEPListing data={[data]}/>}
                        {data.title === "Lifestyle Audit Report" && <LifestyleAudit data={[data]}/>}
                        {data.title === "Bank Account Verification" && <BankAccountVerification data={[data]}/>}
                        {data.title === "Dynamic Report" && <DyanamicReport data={[data]}/>}
                        {data.title === "Procurement Enquiry" && <ProcurementEnquiry data={[data]}/>}
                        {data.title === "Spiderweb Listing" && <Spiderweb data={[data]}/>}
                        {data.title === "Enterprise Risk Report" && <EnterpriseReport data={[data]}/>}
                        {data.title === "Credit Enquiry" && <CreditEnquiry data={[data]}/>}
                        {data.title === "Individual KYC" && <IDVKyc data={[data]}/>}
                        {data.title === "Trace Enquiry" && <TraceEnquiry data={[data]}/>}
                        {data.title === "Trust Enquiry" && <TrustEnquiry data={[data]}/>}
                        {data.title === "Deeds Enquiry" && <DeedsEnquiry data={[data]}/>}
                        {data.title === "IDV Enquiry" && <IDVEnquiry data={[data]}/>}
                        {data.title === "Company KYC" && <CompanyKYC data={[data]}/>}
                        {data.title === "Eagle Eye" && <EagleEye data={[data]}/>}
                    </div>
                </div>

                <div className="flex w-full">
                    {/* CANCEL SCHEDULED SEARCH */}
                    <button 
                    onClick={() => setModal(false)}
                    className='mr-6 mt-10 transition duration-300 bg-blue-900 hover:bg-sky-800 p-1 h-fit rounded shadow-md font-medium text-white w-full'>
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

export default CanceledScheduledSearch