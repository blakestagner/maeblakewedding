import React, {useState } from 'react';

const Loading =   React.forwardRef((props, ref) => {
    const [loading, loaded] = useState(false) 

    React.useImperativeHandle(ref, () => ({
        loadingStatus() {
            loaded(loading => (true))
        }
    }));
     return (
        <div
            className={loading ? 'done-loading' : 'map_canvas loading'} >
        </div>
    )
}); 
export default Loading;