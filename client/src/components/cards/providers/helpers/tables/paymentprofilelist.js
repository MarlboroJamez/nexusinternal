import React from 'react'

function Paymentprofilelist() {
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
								<td className='min-w-20 border border-neutral-300 p-2'>AccountType</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>The Consumer&#39;s account type.</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>Balance</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>The Consumer&#39;s account balance amount in south african rands (R).</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>Installment</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>The Consumer&#39;s account installment amount in south african rands (R).</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>Arrears</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>The Consumer&#39;s number of accounts in arrears.</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>Accounts</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>The number of accounts linked to the Consumer. </td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>AccountsGoodStanding</td>
								<td className='min-w-20 border border-neutral-300 p-2'>Integer</td>
								<td className='min-w-20 border border-neutral-300 p-2'>The Consumer&#39;s number of account that are upto date in installments. </td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>AccountsAdverse</td>
								<td className='min-w-20 border border-neutral-300 p-2'>Integer</td>
								<td className='min-w-20 border border-neutral-300 p-2'>The number of accounts with adverse status code.</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>AccountsAdverseStatusCodes</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>The Consumer&#39;s account adverse status codes (L, W, I or J)
L -&gt; Handed Over
I -&gt; Credit Card Revoked
J -&gt; Repossession
W -&gt; Written Off</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>MaxMIA</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>The Consumer&#39;s maximum months in arrears.</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>DateOfLastPayment</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>The last date the Consumer made a payment to the account.</td>
							</tr>
						</tbody>
					</table>
    </div>
  )
}

export default Paymentprofilelist