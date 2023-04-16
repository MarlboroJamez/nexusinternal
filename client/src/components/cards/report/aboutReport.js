import React from 'react'

function AboutReport({data, cookie}) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric', 
        second: 'numeric',
        timeZone: 'Africa/Johannesburg'
      };
    const today = new Date().toLocaleString('en-US', options);
      

  return (
    <div className="mt-10">
       {cookie ? (
        <div>
            <p className="text-lg">
            The report presented herein has been meticulously generated on {today} by {cookie.license[0].name} utilizing Nexus Intelligence. As a registered client, we have partnered with Consumer Profile Bureau, a trusted data provider, to provide comprehensive insights into the matter at hand. Our rigorous examination and analysis of relevant data sources aim to facilitate informed decision-making and aid in the resolution of any pertinent issues. We trust that the information presented in this report will be of significant value to our clients.
            </p>
            <div>
            
            </div>
        </div>
       ):"Loading report..."}
    </div>
  )
}

export default AboutReport