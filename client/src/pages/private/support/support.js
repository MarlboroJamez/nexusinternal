import React, { useState } from 'react'

// Cards
import Header from '../../../components/cards/header/header';
import ActionBar from '../../../components/cards/support/actionBar';

// Views
import SupportView from '../../../components/views/support/support';
import FeedbackView from '../../../components/views/support/feedback';

function Support() {
    const [view, setView] = useState("support")

  return (
    <div>
    <Header/>
        <div className="p-10">
            <div className="mb-10 pb-4 border-b border-neutral-300">
                <ActionBar setView={setView} view={view}/>
            </div>

            {/* ACTION BAR */}
            <div className="w-full">
                {view === "support" && <SupportView/>}
                {view === "feedback" && <FeedbackView/>}
            </div>
        </div>
    </div>
  )
}

export default Support