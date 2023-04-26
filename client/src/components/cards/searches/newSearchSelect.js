import React, { useEffect, useState } from 'react'
import axios from 'axios';

// Hooks
import useEncryptedCookie from '../../../hooks/cookies/useCookie';

function NewSearchSelect({selectedProject, setSelectedProject, setSelected, boq, search, setSearch, setEnabling, enabling}) {
  const [boquet, setBoquet] = useState("bronze");
  const [types, setType] = useState("")
  const [cookieValue, setCookieValue, getCookieValue] = useEncryptedCookie('ni-uid');
  const [cookieState, setCookieState] = useState(false);
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)
  const typesSelect = [
    "CIPC: Directors & Directors of other Interests",
    "Bank Account Verification",
    "Home Affairs Verification",
    "Lifestyle Audits",
    "Dynamic Report",
    "Business Interest Inquiry",
    "PEP List, Sanctions and Adverse media",
    "Spiderweb Listing",
    // "Enterprise Risk Report",
    // "Credit Enquiry",
    // "Individual KYC",
    // "Trace Enquiry",
    // "Trust Enquiry",
    // "Deeds Enquiry",
    // "IDV Enquiry",
    // "Company KYC",
    // "Eagle Eye"
  ];

  const config = {
    headers: {
        "Content-Type": "application/json",
    }
  }

  useEffect(() => {
    setCookieState(true)
    getCookieValue()
    setCookieState(false)
  },[])

  useEffect(() => {
    const fetchSearches = async () => {
      if(!cookieState && cookieValue){
        setLoading(true);
        await axios.post(`/api/v1/projects/get`,{
          uid: cookieValue._id
        }, config).then(res => {
          setProjects(res.data.data);
        });
        setLoading(false);
      }
    }

    fetchSearches();

  },[cookieState, cookieValue])

  useEffect(() => {
      if(boquet === "bronze"){
        if(cookieValue){
          let pip = cookieValue.license[0].restrictions.filter(item => item.type === "PEP Listing")
          let business = cookieValue.license[0].restrictions.filter(item => item.type === "Business Interest Enquiry")
          let dynamic = cookieValue.license[0].restrictions.filter(item => item.type === "Dynamic Report")
          let lifestyle = cookieValue.license[0].restrictions.filter(item => item.type === "Lifestyle Audit Report")
          let bank = cookieValue.license[0].restrictions.filter(item => item.type === "Bank Account Verification")
          let commercial = cookieValue.license[0].restrictions.filter(item => item.type === "Commercial Enquiry")
          let procurement = cookieValue.license[0].restrictions.filter(item => item.type === "Procurement Enquiry")
          let idvwithphoto = cookieValue.license[0].restrictions.filter(item => item.type === "IDV Listing including photo")
          let idvwithoutphoto = cookieValue.license[0].restrictions.filter(item => item.type === "IDV Listing without photo")
        
          let filteredTypes = typesSelect.filter(item => {
            if(pip[0].access === false && item.includes("PEP List")) {
              return false;
            }
            if(business[0].access === false && item.includes("Directorship: Business")) {
              return false;
            }
            if(commercial[0].access === false && procurement[0].access === false && item.includes("CIPC: Directors &")) {
              return false;
            }
            if(idvwithphoto[0].access === false && idvwithoutphoto[0].access === false && item.includes("Home Affairs")) {
              return false;
            }
            if(dynamic[0].access === false && item.includes("Dynamic Report")) {
              return false;
            }
            if(lifestyle[0].access === false && item.includes("Lifestyle")){
              return false
            }
            if(bank[0].access === false && item.includes("Bank Account")){
              return false
            }
            return true;
          });
        
          setType(filteredTypes);
        }
      }

      if(boquet === "individuals" && !enabling){
        setType([
          "DHA Listing",
          "Income Predictions",
          "Telephone Record Listing",
          "Relatives Record Listing",
          "Identity Verification",
          "Person Listing",
          "Payment Profile Listing",
          "Judgement Listing",
          "Income Predictions",
          "Deceased Listing",
          "Debt Review Listing",
          "Proof of Address",
          "Deeds Record Listing",
          "Email Address Validation",
        ])
        setEnabling(true)
      }

      if(boquet === "entities" && !enabling){
        setType([
          "CIPC Audit List",
          "CIPC Directors List",
          "CIPC Enterprise List",
          "Procurement Enquiry",
          "Trust Enquiry",
          "Commercial Enquiry",
        ])
        setEnabling(true)
      }

      if(boquet === "ad" && !enabling){
        setType([
          "Criminal Checks",
          "Qualication Verification",
          "Driver's License",
        ])
        setEnabling(true)
      }
  }, [setBoquet, boquet, types, setType, cookieValue, cookieState])

  const handleSecondFilterChange = (e) => {
    setBoquet(e)
  }

  const handleFirstFilterChange = (e) => {
    setSearch(e)
  }

  return (
    <div className="w-fit mt-6">
      {/* BOQUETS */}
      <select 
      onChange={(e) => handleSecondFilterChange(e.target.value)}
      className="mr-10 rounded shadow-md bg-neutral-300 p-1 cursor-pointer hover:bg-neutral-200 outline-none">
        <option value="bronze">Bronze Bouquet</option>
      </select>
      
        {/* SEARCH TYPES */}
        <select 
        onChange={(e) => handleFirstFilterChange(e.target.value)}
        className="mr-10 w-32 rounded shadow-md bg-neutral-300 p-1 cursor-pointer hover:bg-neutral-200 outline-none">
          <option>
            Option
          </option>
            {types.length > 0 ? types.map((type) => (
              <option value={type}>{type}</option>
            )):""}
        </select>

        {/* PROJECT */}
        {/* <select 
        onChange={(e) => setSelectedProject(e.target.value)}
        className="mr-10 rounded shadow-md bg-neutral-300 p-1 cursor-pointer hover:bg-neutral-200 outline-none">
          <option>
            Project
          </option>
          {projects.map((proj) => (
            <option value={proj._id}>{proj.name}</option>
          ))}
        </select> */}

        {/* SHARE WITH TEAM */}
        {/* <select className="mr-10 rounded shadow-md bg-neutral-300 p-1 cursor-pointer hover:bg-neutral-200 outline-none">
          <option selected>
            Share with team?
          </option>
          <option value="true">
            Yes
          </option>
          <option value="false">
            No
          </option>
        </select> */}

        {/* NOTIFY */}
        {/* <select className="mr-10 rounded shadow-md bg-neutral-300 p-1 cursor-pointer hover:bg-neutral-200 outline-none">
          <option selected>
            Get notified?
          </option>
          <option value="true">
            Yes
          </option>
          <option value="false">
            No
          </option>
        </select> */}
    </div>
  )
}

export default NewSearchSelect