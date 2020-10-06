import React from 'react';
import { getRSVP, updateRSVP, getPlusone, updatePlusone, checkPlusone, coupleId, getCoupleInfo, getCoupleRSVP, updateCoupleRSVP } from '../../autho/Repository';
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Loading from '../Loading'

export function RSVP(props) {
    const [rsvp, setRsvp] = React.useState();
    const [hasPlusone, setHasPlusone] = React.useState();
    const [bringPlusone, setBringPlusone] = React.useState();
    const [userCoupleId, setCoupleId] = React.useState();
    const [updated, setUpdate ] = React.useState('none');
    const [isLoading, doneLoading] = React.useState(true);

    const getRSVPInfo = () => {
        getRSVP()
        .then(res => {
            setRsvp(res[0].RSVP)
        })
        .catch(err => {
            console.log(err)
        })
    }
    const onCheckRSVP = (e, x) => {
        updateRSVP(e)
        .then(res => {
            getRSVPInfo()
        })
        .then(() => {
            updateAnimate(x)
        })
        .catch(err => {
            console.log(err)
        })
    }
    const checkHasPlusone = () => {
        checkPlusone()
        .then(res => {
            setHasPlusone(res[0].hasPlusone)
        })
        .catch(err => {
            console.log(err)
        })
    }
    const onCheckPlusone = (e, x) => {
        updatePlusone(e)
        .then(() => {
            getPlusoneInfo()
        })
        .then(() => {
            updateAnimate(x)
        })
        .catch(err => {
            console.log(err)
        })
    }
    const getPlusoneInfo = () => {
        getPlusone()
        .then(res => {
            setBringPlusone(res[0].plusone)
        })
        .catch(err => {
            console.log(err)
        })
    }
    const getCoupleId = () => {
        coupleId()
        .then(res => {
            setCoupleId(res[0].couple)
        })
        .then(() => {
            doneLoading(false)
        })
        .catch(err => {
            console.log(err)
        })
    }
    const updateAnimate = (e) => {
        setUpdate(e)
        setTimeout(() => setUpdate('none'), 800 )
    }
    React.useEffect(() => {
        getRSVPInfo();
        checkHasPlusone();
        getPlusoneInfo();
        getCoupleId()
    }, [])
    
    if(isLoading === true) {
        return <Loading />
    }
    return (
            <div>
            <h2>RSVP to the Wedding</h2>
            <h3>Will you be Attending the Wedding?</h3>
            <div className="separator">
                <div className={updated === '1' ? 'form-container-updated' : 'form-container separator'}>
                {updated === '1' ? 
                    <p className="update-message">Updated</p>
                :
                    <div>
                        <FormControlLabel
                            classes={{label: 'checkBoxLabel'}}
                            value="Yes"
                            control={
                                    <Checkbox 
                                        checked={rsvp === 'Yes' ? true : false} 
                                        color='primary'
                                        onClick={() => onCheckRSVP('Yes', '1')} />}
                            label="Yes"
                            labelPlacement="start"
                        />
                        <FormControlLabel
                            classes={{label: 'checkBoxLabel'}}
                            value="No"
                            control={
                                    <Checkbox 
                                        checked={rsvp === 'No' ? true : false} 
                                        color='primary'
                                        onClick={() => onCheckRSVP('No', '1')} />}
                            label="No"
                            labelPlacement="start"
                        />
                    </div>
                }
                </div>
            </div>
            {hasPlusone === "Yes" ? 
            <div className="separator">
                <h3>Are you bringing a Plus One?</h3>
                <div className={updated === '2' ? 'form-container-updated' : 'form-container'}>
                {updated === '2' ? 
                    <p className="update-message">Updated</p>
                :
                    <div>
                        <FormControlLabel
                            classes={{label: 'checkBoxLabel'}}
                            value="Yes"
                            control={
                                <Checkbox 
                                    checked={bringPlusone === 'Yes' ? true : false} 
                                    color='primary'
                                    onClick={() => onCheckPlusone('Yes', '2')} />}
                            label="Yes"
                            labelPlacement="start"
                        />
                        <FormControlLabel
                            classes={{label: 'checkBoxLabel'}}
                            value="No"
                            control={
                                <Checkbox 
                                    checked={bringPlusone === 'No' ? true : false} 
                                    color='primary'
                                    onClick={() => onCheckPlusone('No', '2')} />}
                            label="No"
                            labelPlacement="start"
                        />
                    </div>
                }
                </div>
            </div>
            : ''
            }
            {userCoupleId > 0 ? 
                <CoupleInfo coupleId={ userCoupleId }/>
            : ''
            }
    </div>
    )
}

export function CoupleInfo(props){
    const [coupleState, setCoupleState] = React.useState({
        name: '',
        rsvp: '',
        updated: 'none'
    })
    const [updated, setUpdate] = React.useState(false)
    React.useEffect(() => {
        getCoupleInfo(props.coupleId)
        .then(res => {
            setCoupleState(coupleState => ({...coupleState, name: res[0].fname, rsvp: res[0].RSVP}))
        })
        .catch(err => {
            console.log(err)
        })
    }, [props.coupleId])
    
    const handleChange = (e, x) => {
        updateCoupleRSVP(e, props.coupleId)
        .then(res => {
            getCoupleRSVP(props.coupleId)
            .then(res => {
                setCoupleState(coupleState => ({...coupleState, rsvp: res[0].RSVP}))
                updateAnimate()
            })
            .catch(err => console.log(err))
        })
        
        .catch(err => {
            console.log(err)
        })
    }
    const updateAnimate = () => {
        setUpdate(true)
        setTimeout(() => setUpdate(false), 800 )
    }
        return (
            <div className="separator">
                <h2>RSVP for {coupleState.name}</h2>
                <h3>Will {coupleState.name} Be Joining You? </h3>
                <div  className={updated ? 'form-container-updated' : 'form-container'}>
                {updated ? 
                    <p className="update-message">Updated</p>
                :
                    <div>
                        <FormControlLabel
                            classes={{label: 'checkBoxLabel'}}
                            value="Yes"
                            control={
                                <Checkbox 
                                    checked={coupleState.rsvp === 'Yes' ? true : false} 
                                    color='secondary'
                                    onClick={() => handleChange('Yes', '1')} />}
                            label="Yes"
                            labelPlacement="start"
                            />
                        <FormControlLabel
                            classes={{label: 'checkBoxLabel'}}
                            value="No"
                            control={
                                <Checkbox 
                                    checked={coupleState.rsvp === 'No' ? true : false} 
                                    color='secondary'
                                    onClick={() => handleChange('No', '1')} />}
                            label="No"
                            labelPlacement="start"
                        />
                    </div>
                    }
                </div>
            </div>
        )
}

export default RSVP;