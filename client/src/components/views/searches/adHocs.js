import React from 'react'

// Table
import Table from '../../cards/boquet/adhocsTable';

function AdHocs() {
  return (
    <div>
    <h1 
    className="text-xl font-medium text-sky-700">
      Ad Hocs Per Agreement
    </h1> 
      <div className="mt-10">
        <h1 
        className="mb-6 text-lg font-medium">
          Pricing Summary
        </h1>
        <Table/>
      </div>
    </div>
  )
}

export default AdHocs