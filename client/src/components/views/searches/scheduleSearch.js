import React, { useEffect, useState } from 'react'

// Cards
import SearchSelect from '../../cards/searches/newSearchSelect';

// Models
import EnableSearchModel from '../../models/global/enableSearch';

//SEARCH TYPES
import PersonListing from '../../cards/providers/schedule/personlisting/personlisting';
import CIPCDirectors from '../../cards/providers/schedule/cipcdirectorslist/cipcdirectorslist';
import CIPCAuditList from '../../cards/providers/schedule/cipcauditorlist/cipcauditorlist';
import CIPCEnterpriseList from '../../cards/providers/schedule/cipcenterpriselist/cipcenterpriselist';
import PEPListing from '../../cards/providers/schedule/pipspepslist/pipspepslist';
import LifestyleAuditList from '../../cards/providers/schedule/lifestyleauditreport/lifestyleauditreport';
import DHAListing from '../../cards/providers/schedule/dhalisting/dhalisting';
import IncomePrediction from '../../cards/providers/schedule/incomeprediction/incomeprediction';
import TelephoneListing from '../../cards/providers/schedule/telephonelist/telephonelist';
import RelativesListing from '../../cards/providers/schedule/relativeslist/relativeslist';
import IdentityVerification from '../../cards/providers/schedule/identityverification/identityverification';
import PayementProfile from '../../cards/providers/schedule/personlisting/personlisting';
import JudgementListing from '../../cards/providers/schedule/judgementlist/judgementlist';
import DeceasedListing from '../../cards/providers/schedule/deceasedlist/deceasedlist';
import DebtReview from '../../cards/providers/schedule/debtreviewlisting/debtreviewlisting';
import ProofOfAddress from '../../cards/providers/schedule/personlisting/personlisting';
import DeedsRecord from '../../cards/providers/schedule/deedsrecordslist/deedsrecordslist';
import EmailValidation from '../../cards/providers/schedule/emaillist/emaillist'; 
import BusinessInterestInquiry from '../../cards/providers/schedule/businessinterestinquiry/businessinterestinquiry';
import IDVWithPhoto from '../../cards/providers/schedule/idvwithphoto/idvwithphoto';
import IDVWithoutPhoto from '../../cards/providers/schedule/idvwithoutphoto/idvwithoutphoto';
import BankAccountVerification from '../../cards/providers/schedule/bankaccountverification/bankaccountverification';

import BankVerification from '../../cards/providers/schedule/bankverification/bankverification';
import IDVValidation from '../../cards/providers/schedule/idvvalidation/idvvalidation';

function ScheduleSearch() {
  const [search, setSearch] = useState("")
  const [project, setProject] = useState([]);
  const [share, setShare] = useState(false)
  const [notified, setNotified] = useState(false);
  const [selected, setSelected] = useState("");
  const [enabling, setEnabling] = useState(false);

  const [patienceModel, setPatienceModel] = useState(false)

  const boq = {
    "bronze":{
      "Bronze Boquet":{
        "searches": {
          "CIPC: Directors & Directors of other Interests":[],
          "Bank Account Verification": [],
          "Home Affairs Verification": [],
          "Employee Screens: Bank Account Verification": [],
          "Lifestyle Audit Report": [],
          "Directorship: Busines Interest Inquiry": [],
          "PEP, Sanctions and Adverse Media": []
        },
        "Ad Hoc":[],
        "Searches on Individuals":[],
        "Searches on Legal Entities":[],
      }
    }
  }

  return (
    <div>
      {enabling ? (
        <EnableSearchModel setModal={setEnabling}/>
      ):""}
      <h1 
      className="text-xl font-medium text-sky-700">
        Schedule Search
      </h1>

      <div>
        <SearchSelect setSelected={setSelected} enabling={enabling} setEnabling={setEnabling}   boq={boq} setSearch={setSearch} search={search}/>
      </div>

      {/* MAP SEARCH INPUTS */}
      <div className="mt-12">
        {search === "Person Listing" && <PersonListing share={share} project={project} notified={notified}/>}
        {search === "CIPC Audit List" && <CIPCAuditList share={share} project={project} notified={notified}/>}
        {search === "CIPC: Directors & Directors of other Interests   | R29.90" && <CIPCDirectors share={share} project={project} notified={notified}/>}
        {search === "CIPC Enterprise List" && <CIPCEnterpriseList share={share} project={project} notified={notified}/>}
        {search === "Lifestyle Audits (directorship check included)   | R29.9" && <LifestyleAuditList share={share} project={project} notified={notified}/>}
        {search === "PEP List, Sanctions and Adverse media    | R3.90" && <PEPListing share={share} project={project} notified={notified}/>}
        {search === "Directorship: Business Interest Inquiry  | R11.70" && <BusinessInterestInquiry share={share} project={project} notified={notified}/>}
        {search === "Bank Account Verification    | R4.88" && <BankVerification share={share} project={project} notified={notified}/> }
        {search === "Home Affairs Verification" && <IDVValidation share={share} project={project} notified={notified}/>}
        {search === "DHA Listing" && <DHAListing share={share} project={project} notified={notified}/>}
        {search === "Income Predictions" && <CIPCAuditList share={share} project={project} notified={notified}/>}
        {search === "Telephone Record Listing" && <TelephoneListing share={share} project={project} notified={notified}/>}
        {search === "Relatives Record Listing" && <RelativesListing share={share} project={project} notified={notified}/>}
        {search === "Identity Verification" && <IdentityVerification share={share} project={project} notified={notified}/>}
        {search === "Spouse ID Validation" && <CIPCAuditList share={share} project={project} notified={notified}/>}
        {search === "Payment Profile Listing" && <PayementProfile share={share} project={project} notified={notified}/>}
        {search === "Judgement Listing" && <JudgementListing share={share} project={project} notified={notified}/>}
        {search === "Income Predictions" && <IncomePrediction share={share} project={project} notified={notified}/>}
        {search === "Deceased Listing" && <DeceasedListing share={share} project={project} notified={notified}/>}
        {search === "Debt Review Listing" && <DebtReview share={share} project={project} notified={notified}/>}
        {search === "Proof of Address" && <ProofOfAddress share={share} project={project} notified={notified}/>}
        {search === "Deeds Record Listing" && <DeedsRecord share={share} project={project} notified={notified}/>}
        {search === "Email Address Validation" && <EmailValidation share={share} project={project} notified={notified}/>}
      </div>
    </div>
  )
}

export default ScheduleSearch