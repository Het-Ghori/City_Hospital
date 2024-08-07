import React from 'react';
import ErrorMsg from '../UI/errorMsg/ErrorMsg';

function NotFound(props) {
    return (
        <div className='text-center'>
            <ErrorMsg style={{ height: "calc(100vh - 350px)" }} text='Page not found' />
        </div>
    );
}

export default NotFound;