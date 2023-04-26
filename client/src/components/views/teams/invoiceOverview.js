import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import axios from 'axios';

// Assets
import NexusLogo from '../../../assets/images/logo.png';
import LoadingGIF from '../../../assets/gifs/loading.gif'

// Tables
import SearchesView from '../../tables/invoice/searches';

// Graphs
import SearchTypes from '../../graphs/report/searchTypesBar';
import MonthlyActivity from '../../graphs/report/monthlyActivity';
import TotalSearchSpendings from '../../graphs/report/totalSpendings';

// Hooks
import useEncryptedCookie from '../../../hooks/cookies/useCookie';

function InvoiceOverview() {
    const [loading, setLoading] = useState(false);
    const [cookieValue, setCookieValue, getCookieValue] = useEncryptedCookie('ni-uid');
    const [cookieState, setCookieState] = useState(false);

    const [searches, setSearches] = useState([]);
    const [license, setLicense] = useState([]);

    useEffect(() => {
      setCookieState(true)
      getCookieValue()
      setCookieState(false)
    },[])

    const config = {
      headers: {
          "Content-Type": "application/json",
      }
    }
  
    useEffect(() => {
      const fetchSearches = async () => {
        if(!cookieState && cookieValue){
          try {
            setLoading(true);
            await axios.post('/api/v1/client/dashboard/data', {
              uid: cookieValue._id,
              pid: cookieValue.license[0]._id,
              meta: [],
            }, config).then(res => {
              setSearches(res.data.teamprojects);
            });
            
            await axios.post('/api/v1/client/searches/license', {
                id: cookieValue.license[0]._id,
              }, config).then(res => {
                setLicense(res.data.data);
              });
            setLoading(false);
          } catch(e) {
            console.log(e)
          }
        }
      }
  
      fetchSearches();
    },[cookieState, cookieValue])

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "Africa/Johannesburg"
    };

    const currentDate = new Date().toLocaleString("en-US", options);

    const handleExportPDF = () => {
        const input = document.getElementById('rep-overview');
      
        html2canvas(input, {
          scale: 2, // Adjust the scale as needed
        }).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'mm', 'a4');
          const imgProps = pdf.getImageProperties(imgData);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save('report.pdf');
        });
    };

    const totalCost = searches.length > 0 ? searches.reduce((accumulator, currentValue) => {
        const cost = parseFloat(currentValue.cost);
        return accumulator + cost;
    }, 0).toFixed(2) : 0;

    const transactions = searches.length > 0 ? Object.values(searches.reduce((accumulator, currentValue) => {
        const { cost, title } = currentValue;
        const count = accumulator[title] ? accumulator[title].count + 1 : 1;
        accumulator[title] = { title, count, cost: parseFloat(cost) };
        return accumulator;
    }, {})).sort((a, b) => a.title.localeCompare(b.title)).map(item => {
        const searchItem = license.length > 0 ? license[0].restrictions.find(license => license.type === item.title):[];
        return searchItem ? { ...item, searches: searchItem.searches, units: searchItem.units } : item;
    }) : [];

  return (
    <>
    {loading ? (
        <div className='w-full h-110 grid place-items-center'>
            <div className='w-fit grid place-items-center'>
                <img src={LoadingGIF} alt="" className='h-32'/>
                <p className='text-neutral-600 text-lg mt-6'>Please be patient while we are generating your invoice...</p>
            </div>
        </div>
    ):(
        <>
        {searches.length > 0 ? (
                    <div className='pl-10 pr-10'>
                    <div className='flex w-full justify-between'>
                        <h1 className="text-xl font-medium text-sky-700">
                            Report Overview
                        </h1>

                        <div className="flex">

                        </div>
                        
                        <div>
                            <button onClick={handleExportPDF} className='transition duration-400 hover:bg-sky-500 hover:shadow-lg pl-10 pr-10 pt-2 pb-2 text-white bg-sky-600 rounded shadow-md'>
                                Download Invoice
                            </button>
                        </div>
                    </div>
            
                    <div id="rep-overview" className='p-6'>
                        {/* REPORT HEADER */}
                        <div className='flex w-full justify-between mt-20'>
                            <div className='flex'>
                                <h1 className="text-2xl font-medium">
                                    Nexus Forensic Services - Invoices Overview
                                </h1>
                            </div>
            
                            {/* NEXUS & CPB LOGO */}
                            <div className='flex'>
                                <img src={NexusLogo} className="h-14 mr-8" alt=""/>
                            </div>
                        </div>
            
                        {/* REPORT SUMMARY */}
                        <div className='mt-8 w-120'>
                            <h1 className="text-xl font-medium text-neutral-700">
                                Summary
                            </h1>
                            <p className='mt-2 text-neutral-600 text-base'>
                            This invoice, generated on <mark className='bg-transparent font-medium italic text-neutral-600'>{currentDate}</mark> via the Nexus Intelligence application, presents a comprehensive summary and overview of the searches, costs, and audit trails conducted across Nexus's team environment.
                            </p>
                        </div>
            
                        {/* SEARCHES TABLE VISUAL */}
                        <div className='mt-10'>
                            <h1 className="text-xl font-medium text-neutral-700">
                                Financial Tracking
                            </h1>
            
                            {/* FINANCIAL TABLE */}
                            <div className='mt-4'>
                                <table className='text-left text-sm'>
                                    <tbody>
                                    <tr rowSpan='1'>
                                        <th className='p-1 font-normal bg-neutral-700 text-white' rowSpan='1'>Report Date</th>
                                        <td className='pl-3 pr-3 border border-neutral-300'>{currentDate}</td>
                                    </tr>
                                    <tr rowSpan='1'>
                                        <th className='p-1 font-normal bg-neutral-700 text-white' rowSpan='1'>Total Searches Done</th>
                                        <td className='pl-3 pr-3 border border-neutral-300'>{searches.length}</td>
                                    </tr>
                                    <tr rowSpan='1'>
                                        <th className='p-1 font-normal bg-neutral-700 text-white' rowSpan='1'>Total Spent on Searches</th>
                                        <td className='pl-3 pr-3 border border-neutral-300'>R{totalCost}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
            
                            <div className='mt-8 mb-20'>
                                <table className='w-full text-left text-sm'>
                                    <thead>
                                        <th className='p-1 font-normal bg-neutral-700 text-white'>Total Transactions</th>
                                        <th className='p-1 font-normal bg-neutral-700 text-white'>Searches by Type</th>
                                        <th className='p-1 font-normal bg-neutral-700 text-white'>Cost per Unit</th>
                                        <th className='p-1 font-normal bg-neutral-700 text-white'>Monthly Units</th>
                                        <th className='p-1 font-normal bg-neutral-700 text-white'>Remainder Units</th>
                                    </thead>
                                    <tbody>
                                        {transactions.map((trans) => (
                                        <tr rowSpan='1'>
                                            <td className='p-1 border border-neutral-300'>{trans.count} transactions</td>
                                            <td className='p-1 border border-neutral-300'>{trans.title}</td>
                                            <td className='p-1 border border-neutral-300'>R{trans.cost} per unit</td>
                                            <td className='p-1 border border-neutral-300'>{trans.units} units</td>
                                            <td className='p-1 border border-neutral-300'>{trans.searches} units</td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
            
            
                        </div>
            
                        {/* GRAPHS VISUAL */}
                        <div className="mt-6 w-full min-h-screen">
                            <div className='flex w-full justify-evenly'>
                                <div className='mr-6'>
                                    <SearchTypes searches={searches}/>
                                </div>
                                <div className='mr-6'>
                                    <MonthlyActivity activity={searches}/>
                                </div>
                                <div className='mr-6'>
                                    <TotalSearchSpendings searches={transactions}/>
                                </div>
                            </div>
                        </div>

                        {/* FILTERING */}
                        <div className="flex mb-6 -mt-60">
                                <select 
                                className="mr-10 rounded shadow-md bg-neutral-300 p-1 cursor-pointer hover:bg-neutral-200 outline-none">
                                    <option value="All">All</option>
                                    {searches.map((ser) => (
                                        <option value={ser.header}>{ser.header}</option>
                                    ))}
                                </select>

                            <select 
                            className="mr-10 rounded shadow-md bg-neutral-300 p-1 cursor-pointer hover:bg-neutral-200 outline-none">
                                <option value="">Filter by Month</option>
                                <option value="January">January</option>
                                <option value="February">February</option>
                                <option value="March">March</option>
                                <option value="April">April</option>
                                <option value="May">May</option>
                                <option value="June">June</option>
                                <option value="July">July</option>
                                <option value="August">August</option>
                                <option value="September">September</option>
                                <option value="October">October</option>
                                <option value="November">November</option>
                                <option value="December">December</option>
                            </select>
                        </div>

                        {/* ALL SEARCHES VISUAL */}
                        <div className=''>
                            <SearchesView data={searches} loading={loading}/>
                        </div>
                    </div>
                </div>
        ):(
            <div className='w-full h-110 grid place-items-center'>
                <div className='w-fit grid place-items-center p-6 rounded bg-white border border-neutral-300 h-fit w-fit shadow-lg'>
                    <p className='text-neutral-600 text-lg'>A invoice could not be generated due to no searches being run yet...</p>
                </div>
            </div>
        )}
        </>
    )}
    </>
  )
}

export default InvoiceOverview;