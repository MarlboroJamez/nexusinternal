import React from 'react'

function Deceasedlisting() {
  return (
    <div>
        <table cellspacing="0" border="1">
            <tbody>
                <tr className="bg-zinc-700 text-white">
                    <td className='min-w-20 font-bold p-2'>Variable Name</td>
                    <td className='min-w-20 font-bold p-2'>Type </td>
                    <td className='min-w-20 font-bold p-2'>Description</td>
                </tr>
                <tr>
                    <td  className='min-w-20 border border-neutral-300 p-2'>StatusCode</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>String</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>The code which describes the status of the account (see status codes). </td>
                </tr>
                <tr>
                    <td  className='min-w-20 border border-neutral-300 p-2'>StatusDescription</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>String</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>The description of the status code (see status code).</td>
                </tr>
                <tr>
                    <td  className='min-w-20 border border-neutral-300 p-2'>RecordDate</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>Date</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>The date when the Consumer&#39;s debt review data was recorded.</td>
                </tr>
                <tr>
                    <td  className='min-w-20 border border-neutral-300 p-2'>DebtCouncillor</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>String</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>Name of debt councillor. </td>
                </tr>
                <tr>
                    <td  className='min-w-20 border border-neutral-300 p-2'>DebtCouncillorContact</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>String</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>Contact details of debt councillor.</td>
                </tr>
                <tr>
                    <td  className='min-w-20 border border-neutral-300 p-2'>DebtCouncillorNumber</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>String</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>The NCR registration number of debt councillor. </td>
                </tr>
                <tr>
                    <td  className='min-w-20 border border-neutral-300 p-2'>TotalRecords</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>String</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>The total number of debt review records linked to the Consumer.</td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default Deceasedlisting