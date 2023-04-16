import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';

// Cards
import Header from '../../../components/cards/header/header';
import Sidebar from '../../../components/cards/searches/sidebar';

// Views
import NewSearch from '../../../components/views/searches/newSearch';
import ScheduleSearch from '../../../components/views/searches/scheduleSearch';
import ScheduleManager from '../../../components/views/searches/scheduleManager';
import DashboardOverview from '../../../components/views/searches/dashboardOverview';
import ProjectManagement from '../../../components/views/searches/projectManagement';
import ReportManagement from '../../../components/views/searches/reportManagement';
import BoquetOverview from '../../../components/views/searches/boquetOverview';
import AdhocOverview from '../../../components/views/searches/adHocs';
import Reporting from '../../../components/views/searches/reporting';
import IncomingSearches from '../../../components/views/searches/incomingSearches';
import useEncryptedCookie from '../../../hooks/cookies/useCookie';
import LinkAnalysis from '../../../components/views/searches/linkAnalysis';
import AuditReport from '../../../components/views/searches/auditReport';

function Search() {
    const [view, setView] = useState("new-search");
     
    const [cookieValue, setCookieValue, getCookieValue] = useEncryptedCookie('ni-uid');
    const [cookieState, setCookieState] = useState(false);

    useEffect(() => {
        setCookieState(true)
        getCookieValue()
        setCookieState(false)
    },[]);


  return (
    <div>
        <Header/>
        <div className="p-10 flex">
            {/* SIDEBASR */}
            <div className="flex-2">
                <Sidebar setView={setView} view={view}/>
            </div>

            <div className="flex-8">
                {view === "link-analysis" && <LinkAnalysis/>}
                {view === "new-search" && <NewSearch/>}
                {view === "schedule-search" && <ScheduleSearch/>}
                {view === "schedule-manager" && <ScheduleManager/>}
                {view === "incoming-searches" && <IncomingSearches/>}
                {view === "dashboard-overview" && <DashboardOverview/>}
                {view === "project-management" && <ProjectManagement/>}
                {view === "report-management" && <ReportManagement/>}
                {view === "boquet-overview" && <BoquetOverview/>}
                {view === "ad-hocs" && <AdhocOverview/>}
                {view === "reporting" && <Reporting/>}
                {view === "audit-report" && <AuditReport/>}
            </div>
        </div>
    </div>
  )
}

export default Search