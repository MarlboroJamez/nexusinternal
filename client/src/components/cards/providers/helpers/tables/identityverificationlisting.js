import React from 'react'

function Identityverificationlisting() {
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
								<td className='min-w-20 border border-neutral-300 p-2'>IDNumber</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>South African 13 digit identity number of a Consumer.</td>
								 
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>Name</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>Name of the Consumer.</td>
								 
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>Surname</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>Surname of the Consumer.</td>
								 
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>SmartCardIssued</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>Indicates whether a SA smartcard ID has been issued for the Consumer.</td>
								 
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>IDIssueDate</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>Date the SA smartcard ID was issued.</td>
								 
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>IDSequenceNumber</td>
								<td className='min-w-20 border border-neutral-300 p-2'>Date</td>
								<td className='min-w-20 border border-neutral-300 p-2'></td>
								 
								 
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>DeadIndicator</td>
								<td className='min-w-20 border border-neutral-300 p-2'>Date</td>
								<td className='min-w-20 border border-neutral-300 p-2'>Indicates whether the Consumer is deceased.</td>
								 
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>IDNumberBlocked</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>Indicates whether the Consumer&#39;s ID number is blocked.</td>
								 
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>DateOfDeath</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>Consumer&#39;s date of death.</td>
								 
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>MaritalStatus</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>Marital status of Consumer (Single, Married, Divorced, Widowed).</td>
								 
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>DateOfMarriage</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>Consumer&#39;s marriage registration date.</td>
								 
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>OnHANIS</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>If the Consumer is on the Home Affair National Identification System (Yes, or No).</td>
								 
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>OnNPR</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>If the Consumer is on the National Population Register (Yes, or No).</td>
								 
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>BirthPlaceCountryCode</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>Consumer&#39;s country of birth code.</td>
								 
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>TotalRecords</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>The total number of IDV details linked to the Consumer in record.</td>
								 
							</tr>
						</tbody>
					</table>
    </div>
  )
}

export default Identityverificationlisting