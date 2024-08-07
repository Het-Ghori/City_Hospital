import React, { useState } from 'react';
import ErrorMsg from '../../user/UI/errorMsg/ErrorMsg';
import Loader from '../../user/UI/loader/Loader';

function Dashboard() {
    const [showLoader, setShowLoader] = useState(true);

    setTimeout(() => {
        setShowLoader(false);
    }, 500);

    return (
        <>
            {showLoader ? (
                <Loader style={{ height: 'calc(100vh - 64px' }} />
            ) : (
                <ErrorMsg style={{ height: "calc(100vh - 64px)" }} text='Data not available in dashboard. ' />
            )}
        </>
    );
}

export default Dashboard;