import React, { useState } from 'react'
import axios from 'axios';

// Cards
import Header from '../../../components/cards/header/header';
import Sidebar from '../../../components/cards/teams/sidebar';

// Views
import TeamOverview from '../../../components/views/teams/teamOverview';
import MyOverview from '../../../components/views/teams/myOverview';
import TeamMessenger from '../../../components/views/teams/teamMessenger';
import MemberManagement from '../../../components/views/teams/memberManagement';
import ExchangeManagement from '../../../components/views/teams/exchangemanagement';
import ReportOverview from '../../../components/views/teams/reportOverview';
import InvoiceOverview from '../../../components/views/teams/invoiceOverview';

function Team() {
  const [view, setView] = useState("team-overview");

  return (
    <div>
        <Header/>
        <div className="p-10 flex">
          <div className="flex-2">
            <Sidebar view={view} setView={setView}/>
          </div>

          <div className="flex-8 w-full">
            {view === "my-overview" && <MyOverview/>}
            {view === "team-overview" && <TeamOverview/>}
            {view === "team-messenger" && <TeamMessenger/>}
            {view === "member-management" && <MemberManagement/>}
            {view === "exchange-management" && <ExchangeManagement/>}
            {view === "report-overview" && <ReportOverview/>}
            {view === "invoice-overview" && <InvoiceOverview/>}
          </div>
        </div>
    </div>
  )
}

export default Team