import React, {useEffect, useState } from 'react';

function Loading(props) {
    const [loading, doneLoading] = useState(0)

    const loadStatus = () => {
        doneLoading(1)
    }

    return (
        <div style={{backgroundCOlor: '#000', width: '500px', height: '500px'}}>
            {loading ? 'LOADING' : ''}</div>
    )
} 
export default Loading;