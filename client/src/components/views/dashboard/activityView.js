import React from 'react'

// Table
import Table from '../../tables/dashboard/activity';

function ActivityView({activity}) {
  return (
    <div>
      <Table data={activity}/>
    </div>
  )
}

export default ActivityView