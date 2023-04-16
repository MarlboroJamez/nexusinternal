import React from 'react';
import html2pdf from 'html2pdf.js';

function Table({
    data,
}) {
    const headers = data[0].search.length > 0 ? Object.keys(data[0].search[0]).filter(item => item !== "Photo" && item !== "request_reference" && item !== "http_code" && item !== "bh_response_code" && item !== "status_message" && item !== "TransactionNumber"):"";
    
    const exportPDF = () => {
        const element = document.getElementById('pdf-div');
        html2pdf()
        .set({ html2canvas: { scale: 4 } }) // Set scale to improve the quality of the PDF
        .from(element)
        .save();
    };
    
  return (
    <div className="h-116 w-114">
        <div className='mt-10 flex w-full mb-10 border-b border-neutral-200 pb-6'>
        <button
          onClick={exportPDF}
          className='p-2 bg-zinc-600 hover:bg-zinc-500 rounded shadow-md text-white'>
          Download Report
        </button>
      </div>
      {/* EXPORT THIS DIV AS PDF */}
      <div id='pdf-div' className='w-114 p-6'>
        <h1 className='text-xl font-medium mb-10'>
            Home Affairs Verification
        </h1>

        <div className='w-114'>
            {/* ADD TABLE HERE */}
            {headers.length > 0 ? (
                <div>
                    <img src={`data:image/png;base64,${data[0].search[0].Photo}`} alt=""/>

                    <table className='w-114 p-6 mt-4'>
                    <thead>
                        <tr className='text-sm pl-4 pr-4 bg-neutral-200 text-black border border-neutral-200 p-2'>
                        {headers.map(header => (
                            <th className="font-medium p-2" key={header}>{header}</th>
                        ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data[0].search.map(item => (
                        <tr className="border border-neutral-200 p-2 text-xs" key={item.Id}>
                            {headers.map(header => (
                            <td className="text-xs" key={header}>{item[header]}</td>
                            ))}
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            ):"No results found"}
        </div>
        </div>
    </div>
  )
}

export default Table