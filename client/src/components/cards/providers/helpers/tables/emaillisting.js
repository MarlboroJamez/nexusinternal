import React from 'react'

function Emaillisting() {
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
								<td   className='min-w-20 border border-neutral-300 p-2'>EmailAddress</td>
								<td   className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td   className='min-w-20 border border-neutral-300 p-2'>The Consumer&#39;s email address.</td>
							</tr>
							<tr>
								<td   className='min-w-20 border border-neutral-300 p-2'>FirstDate</td>
								<td   className='min-w-20 border border-neutral-300 p-2'>Date</td>
								<td   className='min-w-20 border border-neutral-300 p-2'>The first date the Consumer&#39;s email details appeared from sources.</td>
							</tr>
							<tr>
								<td   className='min-w-20 border border-neutral-300 p-2'>LatestDate</td>
								<td   className='min-w-20 border border-neutral-300 p-2'>Date</td>
								<td   className='min-w-20 border border-neutral-300 p-2'>The last date at which the Consumer&#39;s email details appeared from sources.</td>
							</tr>
							<tr>
								<td   className='min-w-20 border border-neutral-300 p-2'>FirstStatus</td>
								<td   className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td   className='min-w-20 border border-neutral-300 p-2'>The initial status of the Consumer&#39;s email details when they appeared from source initially (Confirmed Correct, Possible or Unknown).</td>
							</tr>
							<tr>
								<td   className='min-w-20 border border-neutral-300 p-2'>LatestStatus</td>
								<td   className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td   className='min-w-20 border border-neutral-300 p-2'>The current status of the Consumer&#39;s email details (Confirmed Correct, Possible or Unknown).</td>
							</tr>
							<tr>
								<td   className='min-w-20 border border-neutral-300 p-2'>Score</td>
								<td   className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td   className='min-w-20 border border-neutral-300 p-2'>The Consumer&#39;s email address accuracy score.</td>
							</tr>
							<tr>
								<td   className='min-w-20 border border-neutral-300 p-2'>BusinessName</td>
								<td   className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td   className='min-w-20 border border-neutral-300 p-2'>The Consumer&#39;s business name.</td>
							</tr>
							<tr>
								<td   className='min-w-20 border border-neutral-300 p-2'>KYCSource</td>
								<td   className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td   className='min-w-20 border border-neutral-300 p-2'>A list of all the sources where the Consumer&#39;s email details where obtained for KYC purposes.</td>
							</tr>
							<tr>
								<td   className='min-w-20 border border-neutral-300 p-2'>TotalRecords</td>
								<td   className='min-w-20 border border-neutral-300 p-2'>Integer</td>
								<td   className='min-w-20 border border-neutral-300 p-2'>Total number of email addresses details linked to the Consumer in record.</td>
							</tr>
							<tr>
								<td   className='min-w-20 border border-neutral-300 p-2'>IsRoleBasedEmail</td>
								<td   className='min-w-20 border border-neutral-300 p-2'>Boolean</td>
								<td   className='min-w-20 border border-neutral-300 p-2'> Indicates whether the Consumer&#39;s email address is not associated with a specific person, but rather with a company, department, position or group of recipients(True or False).</td>
							</tr>                    
						</tbody>
					</table>
    </div>
  )
}

export default Emaillisting