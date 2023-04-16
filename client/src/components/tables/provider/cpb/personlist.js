import React from 'react'
import html2pdf from 'html2pdf.js';

function Personlist({data}) {
    const date = new Date(data[0].creation);

    const exportPDF = () => {
        const element = document.getElementById('pdf-div');
        html2pdf()
          .set({ html2canvas: { scale: 4 } }) // Set scale to improve the quality of the PDF
          .from(element)
          .save();
    };

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'UTC'
    };

  return (
    <div className='w-full h-full'>
        <div className='mt-10 flex w-full mb-10 border-b border-neutral-200 pb-6'>
            <button 
            onClick={exportPDF}
            className='p-2 bg-zinc-600 hover:bg-zinc-500 rounded shadow-md text-white'>
                Download Report
            </button>
        </div>
        {/* EXPORT THIS DIV AS PDF */}
        <div id="pdf-div" className='w-114 p-6'>
            <h1 className='text-black font-bold text-3xl'>
                Perons Listing Overview
            </h1>

            <div className='mt-6'>
                <table>
                    <thead className='p-2 bg-neutral-200 text-black text-sm'>
                        <th className='p-2 font-medium text-sm'>
                            Input ID Number
                        </th>
                        <th className='p-2 font-medium text-sm'>
                            Search Title
                        </th>
                        <th className='p-2 font-medium text-sm'>
                            Team Shared
                        </th>
                        <th className='p-2 font-medium text-sm'>
                            Done By
                        </th>
                        <th className='p-2 font-medium text-sm'>
                            Cost
                        </th>
                        <th className='p-2 font-medium text-sm'>
                            Date
                        </th>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='p-2 text-xs text-center border border-neutral-200'>
                                {data[0].search[0].People[0].InputIDNumber}
                            </td>
                            <td className='p-2 text-xs text-center border border-neutral-200'>
                                {data[0].header}
                            </td>
                            <td className='p-2 text-xs text-center border border-neutral-200'>
                                {data[0].share.toString()}
                            </td>
                            <td className='p-2 text-xs text-center border border-neutral-200'>
                                {data[0].name} {data[0].surname}
                            </td>
                            <td className='p-2 text-xs text-center border border-neutral-200'>
                                R{data[0].cost}
                            </td>
                            <td className='p-2 text-xs text-center border border-neutral-200'>
                                {date.toLocaleDateString('en-US', options)}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className='mt-10 w-114 grid'>
                <label className='font-medium'>
                    Purpose of Person Listing
                </label>
                <div>
                    <p className='text-sm font-light mt-4'>
                        Performs a comparison operation between two instances of the "Person" class and generates a new instance of the "PersonCompare" class as the result. The "PersonCompare" object likely contains information on the differences and similarities between the two "Person" objects, such as variations in their attributes or other relevant metrics. The comparison operation may involve various criteria, depending on the specific implementation and intended purpose of the function. Overall, this process can help to facilitate data analysis, decision-making, or other tasks that require comparisons between different individuals or entities.
                    </p>
                </div>
            </div>

            {/* LISTING DETAILS */}
            <div className='mt-6 w-114'>
                <table className='w-114'>
                    <thead className='w-full p-2 bg-neutral-200 text-black text-sm'>
                        <th className='p-2 font-medium text-sm'>
                            Title
                        </th>
                        <th className='p-2 font-medium text-sm'>
                            Age
                        </th>
                        <th className='p-2 font-medium text-sm'>
                            Age Band
                        </th>
                        <th className='p-2 font-medium text-sm'>
                            Date Of Birth
                        </th>
                        <th className='p-2 font-medium text-sm'>
                            Gender
                        </th>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='p-2 text-xs text-center border border-neutral-200'>
                                {data[0].search[0].People[0].Title}
                            </td>
                            <td className='p-2 text-xs text-center border border-neutral-200'>
                                {data[0].search[0].People[0].Age}
                            </td>
                            <td className='p-2 text-xs text-center border border-neutral-200'>
                            {data[0].search[0].People[0].AgeBand}
                            </td>
                            <td className='p-2 text-xs text-center border border-neutral-200'>
                                {data[0].search[0].People[0].DateOfBirth}
                            </td>
                            <td className='p-2 text-xs text-center border border-neutral-200'>
                                {data[0].search[0].People[0].Gender}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

             {/* LISTING DETAILS */}
             <div className='mt-6 w-114'>
                <table className='w-114'>
                    <thead className='w-full p-2 bg-neutral-200 text-black text-sm'>
                        <th className='p-2 font-medium text-sm'>
                            First Name
                        </th>
                        <th className='p-2 font-medium text-sm'>
                            Second Name
                        </th>
                        <th className='p-2 font-medium text-sm'>
                            Third Name
                        </th>
                        <th className='p-2 font-medium text-sm'>
                            Surname
                        </th>
                        <th className='p-2 font-medium text-sm'>
                            Maiden Name
                        </th>
                        <th className='p-2 font-medium text-sm'>
                            Marital Status
                        </th>
                        <th className='p-2 font-medium text-sm'>
                            Marriage Date
                        </th>
                        <th className='p-2 font-medium text-sm'>
                            Is Minor
                        </th>
                        <th className='p-2 font-medium text-sm'>
                            Country
                        </th>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='p-2 text-xs text-center border border-neutral-200'>
                                {data[0].search[0].People[0].FirstName}
                            </td>
                            <td className='p-2 text-xs text-center border border-neutral-200'>
                                {data[0].search[0].People[0].SecondName}
                            </td>
                            <td className='p-2 text-xs text-center border border-neutral-200'>
                                {data[0].search[0].People[0].ThirdName}
                            </td>
                            <td className='p-2 text-xs text-center border border-neutral-200'>
                                {data[0].search[0].People[0].Surname}
                            </td>
                            <td className='p-2 text-xs text-center border border-neutral-200'>
                                {data[0].search[0].People[0].MaidenName}
                            </td>
                            <td className='p-2 text-xs text-center border border-neutral-200'>
                                {data[0].search[0].People[0].MaritalStatus}
                            </td>
                            <td className='p-2 text-xs text-center border border-neutral-200'>
                                {data[0].search[0].People[0].MarriageDate}
                            </td>
                            <td className='p-2 text-xs text-center border border-neutral-200'>
                                {data[0].search[0].People[0].IsMinor.toString()}
                            </td>
                            <td className='p-2 text-xs text-center border border-neutral-200'>
                                {data[0].search[0].People[0].Country}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <table className='w-114 mt-10'>
                    <thead className='w-full p-2 bg-neutral-200 text-black text-sm'>
                        <th className='p-2 font-medium text-sm'>
                            ID Number
                        </th>
                        <th className='p-2 font-medium text-sm'>
                            Passport
                        </th>
                        <th className='p-2 font-medium text-sm'>
                            Source
                        </th>
                        <th className='p-2 font-medium text-sm'>
                            Original Source
                        </th>
                        <th className='p-2 font-medium text-sm'>
                            Reference
                        </th>
                        <th className='p-2 font-medium text-sm'>
                            Latest Date
                        </th>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='p-2 text-xs text-center border border-neutral-200'>
                                {data[0].search[0].People[0].IDNumber}
                            </td>
                            <td className='p-2 text-xs text-center border border-neutral-200'>
                                {data[0].search[0].People[0].Passport}
                            </td>
                            <td className='p-2 text-xs text-center border border-neutral-200'>
                                {data[0].search[0].People[0].Source}
                            </td>
                            <td className='p-2 text-xs text-center border border-neutral-200'>
                                {data[0].search[0].People[0].OriginalSource}
                            </td>
                            <td className='p-2 text-xs text-center border border-neutral-200'>
                                {data[0].search[0].People[0].Reference}
                            </td>
                            <td className='p-2 text-xs text-center border border-neutral-200'>
                                {data[0].search[0].People[0].LatestDate}
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* RIGHTS */}
                <div className='p-2 w-full text-center mt-20 text-light text-neutral-500'>
                    <div>
                        <p>
                        The Consumer Profile Bureau (Pty) Ltd shall not be liable for any damage or loss, whether direct or indirect, arising out of the use of or the omission to use the statement made in response to the enquiry made herein or for any consequential damages, loss of profit or special damages arising out of the issuing of that statement or any use thereof.
                        </p>
                    </div>
                    <div>
                        <p className='font-bold w-full text-center mt-6'>
                        Copyright © 2022 Consumer Profile Bureau (Pty) Ltd. All Rights Reserved.
                        </p>
                    </div>

                    <div className='mt-2 w-full text-center mt-2 text-light text-neutral-500'>
                        <p>
                            Reg No: 1981/007624/07 | NCR Reg No: NCRCB2 | VAT No: 4320139829
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Personlist