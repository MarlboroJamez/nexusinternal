import React from 'react'

function Judgementlisting() {
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
								<td className='min-w-20 border border-neutral-300 p-2'>Income</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>The Consumer&#39;s predicted income</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>PredictedLabel</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>The Consumer&#39;s predicted income</td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>Confidence</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>Level of confidence that the income is correct. Outcome is either (High, Medium, Moderate, Low). </td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>LowerBound</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>Lowerbound of the 95% confidence interval. </td>
							</tr>
							<tr>
								<td className='min-w-20 border border-neutral-300 p-2'>UpperBound</td>
								<td className='min-w-20 border border-neutral-300 p-2'>String</td>
								<td className='min-w-20 border border-neutral-300 p-2'>Upperbound of the 95% confidence interval.</td>
							</tr>
						</tbody>
					</table>
    </div>
  )
}

export default Judgementlisting