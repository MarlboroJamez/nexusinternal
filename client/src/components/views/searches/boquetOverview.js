import React from 'react'

// Table
import Table from '../../cards/boquet/boquetTable';

function BoquetOverview() {
  return (
    <div>
      <h1 
      className="text-xl font-medium text-sky-700">
        Boquet Per Agreement
      </h1>

      <p className="mt-4 font-light text-neutral-700">The table displayed below showcases a bouquet consisting of a range of options offered at discounted prices. While certain types of searches have been pre-selected, Telkom reserves the right to utilize any search option available at the unit prices stated in clause 11, "Search Bouquet," in order to reach the monthly search cost sub-total. Telkom is therefore not restricted solely to Bronze option searches in order to achieve the budgeted monthly search cost of R29,641-00, and may also use credits to augment this amount.</p>

      <p className="mt-4 font-light text-neutral-700">Credits for under-usage may be issued for a period of 3 months only. In the event that such credits are not utilized by the end of the third month, they will expire and any remaining units will be invoiced after the end of the third month. It is important to note that any searches available on the NexusIntelTM system may be used to supplement available credits.</p>
      <div className="mt-20">
        <h1 
        className="mb-6 text-lg font-medium">
          Pricing Summary
        </h1>
        <Table/>
      </div>
    </div>
  )
}

export default BoquetOverview