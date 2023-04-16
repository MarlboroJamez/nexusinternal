import React from 'react'

function Telephonelisting() {
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
            <td className='min-w-20 border border-neutral-300 p-2'>TelNumber</td>
            <td className='min-w-20 border border-neutral-300 p-2'>String</td>
            <td className='min-w-20 border border-neutral-300 p-2'>The contact number of the Consumer.</td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'>TelType</td>
            <td className='min-w-20 border border-neutral-300 p-2'>String</td>
            <td className='min-w-20 border border-neutral-300 p-2'>The type of a contact number. (Cell, Work, Home, Fax, Other)</td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'>IsDiallable</td>
            <td className='min-w-20 border border-neutral-300 p-2'>Boolean</td>
            <td className='min-w-20 border border-neutral-300 p-2'>Whether the Consumer&#39;s TelNumber is 10 digits long and starts with a zero telephone or cellphone number (True or False)</td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'>IsValid</td>
            <td className='min-w-20 border border-neutral-300 p-2'>Boolean</td>
            <td className='min-w-20 border border-neutral-300 p-2'>Whether the Consumer&#39;s TelNumber is a valid telephone or cellphone number (True or False)</td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'>FirstDate</td>
            <td className='min-w-20 border border-neutral-300 p-2'>Date</td>
            <td className='min-w-20 border border-neutral-300 p-2'>The date the Consumer&#39;s IDNumber and TelNumber pair was first recorded.</td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'>LatestDate</td>
            <td className='min-w-20 border border-neutral-300 p-2'>Date</td>
            <td className='min-w-20 border border-neutral-300 p-2'>The date the Consumer&#39;s IDNumber and TelNumber pair was last recorded.</td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'>FirstStatus</td>
            <td className='min-w-20 border border-neutral-300 p-2'>String</td>
            <td className='min-w-20 border border-neutral-300 p-2'>Status when the Consumer&#39;s IDNumber and TelNumber pair was first recorded.</td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'>LatestStatus</td>
            <td className='min-w-20 border border-neutral-300 p-2'>String</td>
            <td className='min-w-20 border border-neutral-300 p-2'>Status when the Consumer&#39;s IDNumber and TelNumber pair was last recorded.</td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'>Score</td>
            <td className='min-w-20 border border-neutral-300 p-2'>Integer</td>
            <td className='min-w-20 border border-neutral-300 p-2'>Score indicating quality and accuracy of the tel number</td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'>Links</td>
            <td className='min-w-20 border border-neutral-300 p-2'>String</td>
            <td className='min-w-20 border border-neutral-300 p-2'>The number of people/companies the telephone number is linked to.</td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'>BusinessName</td>
            <td className='min-w-20 border border-neutral-300 p-2'>String</td>
            <td className='min-w-20 border border-neutral-300 p-2'>The name(s) of people/companies the telephone number is linked to. </td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'>Region</td>
            <td className='min-w-20 border border-neutral-300 p-2'>String</td>
            <td className='min-w-20 border border-neutral-300 p-2'>The province the Consumer&#39;s telephone number is linked to. Applicable to landlines. </td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'>Network</td>
            <td className='min-w-20 border border-neutral-300 p-2'>String</td>
            <td className='min-w-20 border border-neutral-300 p-2'>The network operator the Consumer&#39;s telephone number is registered to (Telkom, Vodacom, MTN, CellC etc).</td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'>Source</td>
            <td className='min-w-20 border border-neutral-300 p-2'>String</td>
            <td className='min-w-20 border border-neutral-300 p-2'>List of sources who provided the telephone number data linked to the Consumer.</td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'>Surname</td>
            <td className='min-w-20 border border-neutral-300 p-2'>String</td>
            <td className='min-w-20 border border-neutral-300 p-2'>The Consumer&#39;s surname.</td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'>FirstNames</td>
            <td className='min-w-20 border border-neutral-300 p-2'>String</td>
            <td className='min-w-20 border border-neutral-300 p-2'>The Consumer&#39;s names.</td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'>KYCSource</td>
            <td className='min-w-20 border border-neutral-300 p-2'>String</td>
            <td className='min-w-20 border border-neutral-300 p-2'>A detailed source of the Consumer&#39;s contact data for KYC purposed.</td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'>TotalRecords</td>
            <td className='min-w-20 border border-neutral-300 p-2'>Integer</td>
            <td className='min-w-20 border border-neutral-300 p-2'>The total number of contact records linked to the Consumer.</td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
        </tr>
        <tr>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
            <td className='min-w-20 border border-neutral-300 p-2'></td>
        </tr>
    </tbody>
</table>
    </div>
  )
}

export default Telephonelisting