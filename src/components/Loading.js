import React, {useEffect, useState } from 'react';

function Loading(props) {
    const [loading, doneLoading] = useState(true)

    const loadStatus = () => {
        doneLoading(false)
    }

    return (
        <div style={{backgroundColor: 'blue', width: '500px', height: '500px'}}>
            {loading ? 'LOADING' : ''}</div>
    )
} 
export default Loading;