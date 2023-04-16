import React from 'react'

function Eagleeyelisting() {
  return (
    <div>
        <table cellspacing="0" border="1">
            <tbody>
                <tr className="bg-zinc-700 text-white">
                    <td className='min-w-20 font-bold p-2'>Variable Name</td>
                    <td className='min-w-20 font-bold p-2'>Type </td>
                    <td className='min-w-20 font-bold p-2'>Description</td>=
                </tr>
                <tr>
                    <td className='min-w-20 border border-neutral-300 p-2'>InputIDNumber</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>String</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>South African 13 digit identity number of a Consumer.</td>
                </tr>
                <tr>
                    <td  className='min-w-20 border border-neutral-300 p-2'>Reference</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>String</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>The reference number for the Consumer&#39;s enquiry.</td>
                </tr>
                <tr>
                    <td  className='min-w-20 border border-neutral-300 p-2'>DHAFirstNames</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>String</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>Returns the Consumer&#39;s names as they appear in DHA records.</td>
                </tr>
                <tr>
                    <td  className='min-w-20 border border-neutral-300 p-2'>DHASurname</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>Date</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>Returns the Consumer&#39;s surname as it appears in DHA records.</td>
                 </tr>
                <tr>
                    <td  className='min-w-20 border border-neutral-300 p-2'>IDPassesCDV</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>String</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>Indicates whether the Consumer&#39;s ID Number has passed the verification check (Yes or No).</td>
                 </tr>
                <tr>
                    <td  className='min-w-20 border border-neutral-300 p-2'>EnquiryReason</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>String</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>An explanation for enquiring about the Consumer.</td>
                 </tr>
                <tr>
                    <td  className='min-w-20 border border-neutral-300 p-2'>HasDefault</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>String</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>Indicates whether the Consumer has defaulted on payment of one or more accounts in the last 6 months (Yes or No).</td>
                 </tr>
                <tr>
                    <td  className='min-w-20 border border-neutral-300 p-2'>HasJudgment</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>String</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>Indicates whether the Consumer has a judgment files against them (Yes or No).</td>
                 </tr>
                <tr>
                    <td  className='min-w-20 border border-neutral-300 p-2'>HasSAFPS</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>String</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>Indicates whether the Consumer has a membership with SAFPS (Yes or No).</td>
                 </tr>
                <tr>
                    <td  className='min-w-20 border border-neutral-300 p-2'>HasSAFPSPR</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>String</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>Indicates whether the Consumer has registered their personal documents (such as ID) as lost or stolen with the SAFPS Protective Registration (Yes or No).</td>
                 </tr>
                <tr>
                    <td  className='min-w-20 border border-neutral-300 p-2'>HasTraceLocator</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>String</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>Indicated whether there is a Trace Locator against the Consumer (Yes or No).</td>
                 </tr>
                <tr>
                    <td  className='min-w-20 border border-neutral-300 p-2'>IsDeceased</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>Boolean</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>Indicates whether the Consumer is deceased (True or False).</td>
                 </tr>
                <tr>
                    <td  className='min-w-20 border border-neutral-300 p-2'>UnderDebtReview</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>String</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>Indicates whether the debror is under debt review (Yes or No).</td>
                 </tr>
                <tr>
                    <td  className='min-w-20 border border-neutral-300 p-2'>LastEmploymentUpdate</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>String</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>Indicates whether there is employment information linked to the Consumer (No Records, New Record Available or Only Older Records Available).
</td>
                 </tr>
                <tr>
                    <td  className='min-w-20 border border-neutral-300 p-2'>HasPPAccounts</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>String</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>Indicates whether the Consumer has credit accounts (Yes or No).</td>
                 </tr>
                <tr>
                    <td  className='min-w-20 border border-neutral-300 p-2'>HasPPAdverse</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>String</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>Indicates whethere the Consumer has negative account payment information on their credit history (Yes or No).</td>
                 </tr>
                <tr>
                    <td  className='min-w-20 border border-neutral-300 p-2'>Error</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>String</td>
                    <td  className='min-w-20 border border-neutral-300 p-2'>A returned error message when there is no records that match the input ID number.</td>
                 </tr>
                <tr>
                    </tr>
                <tr>
                    </tr>
                <tr>
                    </tr>
                <tr>
                    </tr>
                <tr>
                    </tr>
                <tr>
                    </tr>
                <tr>
                    </tr>
                <tr>
                    </tr>
                <tr>
                    </tr>
                <tr>
                    </tr>
                <tr>
                    </tr>
                <tr>
                    </tr>
                <tr>
                    </tr>
                <tr>
                    </tr>
                <tr>
                   </tr>
                <tr>
                   </tr>
                <tr>
                   </tr>
                <tr>
                   </tr>
                <tr>
                   </tr>
                <tr>
                   </tr>
                <tr>
                   </tr>
                <tr>
                   </tr>
                <tr>
                   </tr>
                <tr>
                   </tr>
                <tr>
                   </tr>
                <tr>
                   </tr>
                <tr>
                   </tr>
                <tr>
                   </tr>
                <tr>
                   </tr>
                <tr>
                   </tr>
                <tr>
                   </tr>
                <tr>
                   </tr>
                <tr>
                   </tr>
                <tr>
                   </tr>
                <tr>
                   </tr>
            </tbody>
        </table>
    </div>
  )
}

export default Eagleeyelisting