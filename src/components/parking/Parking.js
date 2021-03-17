import React, {useEffect, useState} from 'react';
import { getUserInfo, getParking, updateParking } from '../../autho/Repository';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Loading from '../Loading';

export function Parking() {
    const [isLoading, doneLoading] = useState(true)
    const [parking, setParking] = useState()
    const [updateStatus, setUpdate ] = useState(false)

    useEffect(() => {
        getUserInfo()
            .then(getParkingInfo())
            .catch(err => {
                console.log(err)
            })
    }, [])

    const getParkingInfo = () => {
        getParking()
            .then(res => {
                setParking(parking => (res[0].parking))
            })
            .then(() => doneLoading(false))
            .catch(err => {
                console.log(err)
            })
    }

    const onCheck = (e) => {
        updateParking(e)
        .then(() => {
            getParkingInfo()
        })
        .then(() => {
            updateAnimate()
        })
        .catch(err => {
            console.log(err)
        })
    }

    const updateAnimate = () => {
        setUpdate(true)
        setTimeout(() => setUpdate(false), 800 )
    }

    if(isLoading) {
        return <Loading />
    }

    return (
        <div className="separator">
            <h2>Parking</h2>
            <h3>Do you need a prepaid parking spot?</h3>
            <div className={!updateStatus ? "form-container" : "form-container-updated"}>
                
                {!updateStatus ?
                    <div>
                        <FormControlLabel
                            classes={{label: 'checkBoxLabel'}}
                            value="start"
                            control={
                                <Checkbox 
                                    checked={parking === 'Yes' ? true : false} 
                                    color="primary" 
                                    onClick={() => {onCheck('Yes')}} />}
                            label="Yes"
                            labelPlacement="start"
                        />
                        <FormControlLabel
                            classes={{label: 'checkBoxLabel'}}
                            value="No"
                            control={
                                <Checkbox 
                                    checked={parking === 'No' ? true : false} 
                                    color='primary'
                                    onClick={() => {onCheck('No')}} />}
                            label="No"
                            labelPlacement="start"
                        />
                    </div>
                : 
                <p className="update-message">Updated</p>
                }
            </div>
        </div> 
    )
}
export default Parking;