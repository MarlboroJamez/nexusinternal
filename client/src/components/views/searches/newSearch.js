import React, { useEffect, useState } from 'react'

// Cards
import SearchSelect from '../../cards/searches/newSearchSelect';

// Modesl
import EnableSearchModel from '../../models/global/enableSearch';

//SEARCH TYPES
import PersonListing from '../../cards/providers/regular/personlisting/personlisting';
import CIPCDirectors from '../../cards/providers/regular/cipcdirectorslist/cipcdirectorslist';
import CIPCAuditList from '../../cards/providers/regular/cipcauditorlist/cipcauditorlist';
import CIPCEnterpriseList from '../../cards/providers/regular/cipcenterpriselist/cipcenterpriselist';
import PEPListing from '../../cards/providers/regular/pipspepslist/pipspepslist';
import LifestyleAuditList from '../../cards/providers/regular/lifestyleauditreport/lifestyleauditreport';
import DHAListing from '../../cards/providers/regular/dhalisting/dhalisting';
import IncomePrediction from '../../cards/providers/regular/incomeprediction/incomeprediction';
import TelephoneListing from '../../cards/providers/regular/telephonelist/telephonelist';
import RelativesListing from '../../cards/providers/regular/relativeslist/relativeslist';
import IdentityVerification from '../../cards/providers/regular/identityverification/identityverification';
import PayementProfile from '../../cards/providers/regular/personlisting/personlisting';
import JudgementListing from '../../cards/providers/regular/judgementlist/judgementlist';
import DeceasedListing from '../../cards/providers/regular/deceasedlist/deceasedlist';
import DebtReview from '../../cards/providers/regular/debtreviewlisting/debtreviewlisting';
import ProofOfAddress from '../../cards/providers/regular/personlisting/personlisting';
import DeedsRecord from '../../cards/providers/regular/deedsrecordslist/deedsrecordslist';
import EmailValidation from '../../cards/providers/regular/emaillist/emaillist'; 
import BusinessInterestInquiry from '../../cards/providers/regular/businessinterestinquiry/businessinterestinquiry';
import DynamicReport from '../../cards/providers/regular/dynamicReport/dynamicReport';
import Spiderweb from '../../cards/providers/regular/spiderweb/spiderweb';
import EnterpriseRiskReport from '../../cards/providers/regular/enterpriseriskreport/enterpriseriskreport';
import CreditEnquiry from '../../cards/providers/regular/creditenquiry/creditenquiry';
import IndividualKYC from '../../cards/providers/regular/idvkyc/idvkyc';
import TraceEnquiry from '../../cards/providers/regular/traceenquiry/traceenquiry';
import TrustEnquiry from '../../cards/providers/regular/trustenquiry/trustenquiry';
import DeedsEnquiry from '../../cards/providers/regular/deedsenquiry/deedsenquiry';
import IDVEnquiry from '../../cards/providers/regular/idvenquiry/idvenquiry';
import CompanyKYC from '../../cards/providers/regular/companykyc/companykyc';
import EagleEye from '../../cards/providers/regular/eagleeye/eagleeye';

import IDVValidation from '../../cards/providers/regular/idvvalidation/idvvalidation';
import BankVerification from '../../cards/providers/regular/bankverification/bankverification';
import BusinessInterests from '../../cards/providers/regular/businessinterests/businessinterests';

function NewSearch() {
  const [search, setSearch] = useState("")
  const [project, setProject] = useState([]);
  const [share, setShare] = useState(false)
  const [notified, setNotified] = useState(false);
  const [selected, setSelected] = useState("");
  const [selectedProject, setSelectedProject] = useState("")

  const [enabling, setEnabling] = useState(false);

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
          "PEP, Sanctions and Adverse Media": [],
          "Spiderweb Listing": []
        },
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
        New Search
      </h1>

      <div>
        <SearchSelect selectedProject={selectedProject} setSelectedProject={setSelectedProject} setSelected={setSelected} enabling={enabling} setEnabling={setEnabling} boq={boq} setSearch={setSearch} search={search}/>
      </div>

      {/* MAP SEARCH INPUTS */}
      <div className="mt-12">
        {search === "Person Listing" && <PersonListing share={share} project={project} notified={notified}/>}
        {search === "CIPC Audit List" && <CIPCAuditList share={share} project={project} notified={notified}/>}
        {search === "CIPC: Directors & Directors of other Interests" && <BusinessInterests selectedProject={selectedProject} share={share} project={project} notified={notified}/>}
        {search === "CIPC Enterprise List" && <CIPCEnterpriseList share={share} project={project} notified={notified}/>}
        {search === "Lifestyle Audits" && <LifestyleAuditList selectedProject={selectedProject} share={share} project={project} notified={notified}/>}
        {search === "Dynamic Report" && <DynamicReport selectedProject={selectedProject} share={share} project={project} notified={notified}/>}
        {search === "PEP List, Sanctions and Adverse media" && <PEPListing selectedProject={selectedProject} share={share} project={project} notified={notified}/>}
        {search === "Business Interest Inquiry" && <BusinessInterestInquiry selectedProject={selectedProject} share={share} project={project} notified={notified}/>}
        {search === "Bank Account Verification" && <BankVerification selectedProject={selectedProject} share={share} project={project} notified={notified}/> }
        {search === "Home Affairs Verification" && <IDVValidation selectedProject={selectedProject} share={share} project={project} notified={notified}/>}
        
        {/* TOKEN */}
        {search === "Spiderweb Listing" && <Spiderweb selectedProject={selectedProject} share={share} project={project} notified={notified}/>}
        {search === "Enterprise Risk Report" && <EnterpriseRiskReport selectedProject={selectedProject} share={share} project={project} notified={notified}/>}
        {search === "Credit Enquiry" && <CreditEnquiry selectedProject={selectedProject} share={share} project={project} notified={notified}/>}
        {search === "Individual KYC" && <IndividualKYC selectedProject={selectedProject} share={share} project={project} notified={notified}/>}
        {search === "Trace Enquiry" && <TraceEnquiry selectedProject={selectedProject} share={share} project={project} notified={notified}/>}
        {search === "Trust Enquiry" && <TrustEnquiry selectedProject={selectedProject} share={share} project={project} notified={notified}/>}
        {search === "Deeds Enquiry" && <DeedsEnquiry selectedProject={selectedProject} share={share} project={project} notified={notified}/>}
        {search === "IDV Enquiry" && <IDVEnquiry selectedProject={selectedProject} share={share} project={project} notified={notified}/>}
        {search === "Company KYC" && <CompanyKYC selectedProject={selectedProject} share={share} project={project} notified={notified}/>}
        {search === "Eagle Eye" && <EagleEye selectedProject={selectedProject} share={share} project={project} notified={notified}/>}
        
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

export default NewSearch