import React from 'react'

function Personlisting() {
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
								<td className='min-w-20 border border-neutral-300 p-2'>InputIDNumber</td>
								<td className='min-w-20 border border-neutral-300 p-2'></td>
								<td className='min-w-20 border border-neutral-300 p-2'>The ID Number inserted for enquiry.</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>IDNumber</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>South African 13 digit identity number of a Consumer.</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>ConsumerHashID</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>Internal unique reference for Consumer.</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>Passport</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>Passport number of a Consumer.</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>FirstName</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>The Consumer&#39;s first name.</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>SecondName</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>The Consumer&#39;s second name.</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>ThirdName</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>The Consumer&#39;s third name.</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>Surname</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>The Consumer&#39;s surname.</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>MaidenName</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>The Consumer&#39;s maiden name.</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>DateOfBirth</td>
								<td className='min-w-20 border border-neutral-300 p-2'>Date</td>
								<td className='min-w-20 border border-neutral-300 p-2'>The Consumer&#39;s date of birth.</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>Age</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>Age of Consumer (in Years).</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>AgeBand</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>The Consumer&#39;s age band.</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>Title</td>
								<td className='min-w-20 border border-neutral-300 p-2'>Date</td>
								<td className='min-w-20 border border-neutral-300 p-2'>The Consumer&#39;s title (Mr, Mrs, Ms, Miss, Dr, Prof).</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>IsMinor</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>Indicates whether the Consumer&#39;s is minor (under 18 years of age).</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>InputIDPassedCDV</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>Indicates whether the Consumer&#39;s ID number has passed the verification check (True or False).</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>IDExists</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>Indicates whether the Consumer&#39;s ID number exists (True or False)</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>Gender</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>The Consumer&#39;s gender (Male or Female).</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>MarriageDate</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>The Consumer&#39;s marriage registration date.</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>MaritalStatus</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>Marital status of Consumer (Single, Married, Divorced, Widowed).</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>Score</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>The Consumer&#39;s personal details accuracy score.</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>Country</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>The Consumer&#39;s country of birth.</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>Source</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>List of sources who provided the personal details of the Consumer.</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>OriginalSource</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>The original source where the Consumer&#39;s person details first appeared.</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>LatestDate</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>The last date the Consumer&#39;s person details appeared from source.</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>UsingDHARealtime</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>Indicates whether the data was retrieved from the Department of Home Affairs.</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>Reference</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>The reference inserted for the enquiry.</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>Cached</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>Indicates whether the data was retrieved from Bureau sources.</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>DHAError</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>Indicates whether an error occured when the data was requested from Department of Home Affairs.</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>DHA_TransactionNumber</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>The enquiry reference number at the Department of Home Affairs.</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>DHA_IDNumber</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>The Consumer&#39;s ID from the Department of Home Affairs.</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>DHA_Name</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>The Consumer&#39;s names from the Department of Home Affairs.</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>DHA_Surname</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>The Consumer&#39;s surname from the Department of Home Affairs.</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>DHA_SmartCardIssued</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>Indicates whether a smart card ID has been issued for the Consumer (Yes or No).</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>DHA_IDIssueDate</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>Indicates the date the Consumer&#39;s ID was issued.</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>DHA_IDSequenceNumber</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>Indicates the number of ID re-issued for the Consumer.</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>DHA_DeadIndicator</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>Indicates whethe the consumer&#39;s living status (Alive or Deceased).</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>DHA_IDNumberBlocked</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>Indicates whether the Consumer&#39;s ID number is blocked (Yes or No).</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>DHA_DateOfDeath</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>Indicates the date ot the Consumer&#39;s death if deceased.</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>DHA_MaritalStatus</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>Marital status of Consumer on record at the Department of Home Affairs (Single, Married, Divorced, Widowed).</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>DHA_DateOfMarriage</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>The Consumer&#39;s marriage registration date on record at the Department of Home Affairs.</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>DHA_Photo</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>Returns the Consumer&#39;s ID photo.</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>DHA_OnHANIS</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>If the Consumer is on the Home Affair National Identification System (Yes, or No).</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>DHA_OnNPR</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>If the Consumer is on the National Population Register (Yes, or No).</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>DHA_BirthPlaceCountryCode</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>Indicates the Consumer&#39;s country of birth. </td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>DHA_CacheUsed</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>Indicates whether the information was retrieved from the Department of Home Affairs.</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>DHAExtra</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>Indicates whether the data was retrieved from the Department of Home Affairs.</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>TotalRecords</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>The total number of person details linked to the Consumer.</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>TotalReturnedRecords</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>The total number of contact records returned for the inquiry.</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>Status_message</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>Indicates whether the inquiry was successful or not.</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>BH_response_code</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>Indicates the error code if an error was returned. See Error Description table.</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>HTTP_code</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>Indicates the error code if an error was returned. See Error Description table.</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>Request_reference</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>The reference for the Consumer&#39;s request.</td>
							</tr>
						</tbody>
					</table>
    </div>
  )
}

export default Personlisting