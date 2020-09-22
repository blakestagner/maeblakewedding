import React from 'react';
import { isAuthenticated, getUserInfo, getRSVP, updateRSVP, getPlusone, updatePlusone, checkPlusone, coupleId, getCoupleInfo, getCoupleRSVP, updateCoupleRSVP } from '../../autho/Repository';
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default class RSVP extends React.Component {
    constructor() {
        super();
        this.state = { 
            userDetails: [], 
            auth: true,
            rsvp: '',
            hasPlusone: '',
            plusone: '',
            coupleId: '',
            updated: 'none'
        };
    }
    componentDidMount() {
        this.getRSVPInfo()
        this.checkHasPlusone()
        this.getCoupleId()
    }
    getRSVPInfo() {
        getRSVP()
        .then(res => {
            this.setState({rsvp: res[0].RSVP})
        })
        .catch(err => {
            console.log(err)
        })
    }
    onCheckRSVP(e, x) {
        updateRSVP(e)
        .then(res => {
            this.getRSVPInfo()
            this.updateAnimate(x)
        })
        .catch(err => {
            console.log(err)
        })
    }
    checkHasPlusone() {
        checkPlusone()
        .then(res => {
            this.setState({hasPlusone: res[0].hasPlusone})
        })

        .catch(err => {
            console.log(err)
        })
        .then(() => {         
            if(this.state.hasPlusone ? 'Yes' : 'No')  {
                this.getPlusoneInfo()
            } else ; 
        })
    }
    getPlusoneInfo() {
        getPlusone()
        .then(res => {
            this.setState({plusone: res[0].plusone})
        })
        .catch(err => {
            console.log(err)
        })
    }
    onCheckPlusone(e, x) {
        updatePlusone(e)
        .then(res => {
            this.getPlusoneInfo()
            this.updateAnimate(x)
        })
        .catch(err => {
            console.log(err)
        })
    }
    getCoupleId() {
        coupleId()
        .then(res => {
            this.setState({coupleId: res[0].couple})
        })
        .catch(err => {
            console.log(err)
        })
    }
    updateAnimate(e) {
        this.setState({updated: e})
        const timer = setTimeout(() => this.setState({updated: 'none'}), 800 )
    }
    render() {
        const userDetails = this.props.userDetails
        return (
                <div>
                <h2>RSVP to the Wedding</h2>
                <h3>Will you be Attending the Wedding?</h3>
                <div className="separator">
                    <div className={this.state.updated === '1' ? 'form-container-updated' : 'form-container separator'}>
                    {this.state.updated === '1' ? 
                        <p className="update-message">Updated</p>
                    :
                        <div>
                            <FormControlLabel
                                classes={{label: 'checkBoxLabel'}}
                                value="Yes"
                                control={
                                        <Checkbox 
                                            checked={this.state.rsvp === 'Yes' ? true : false} 
                                            color='primary'
                                            onClick={() => {this.onCheckRSVP('Yes', '1')}} />}
                                label="Yes"
                                labelPlacement="start"
                            />
                            <FormControlLabel
                                classes={{label: 'checkBoxLabel'}}
                                value="No"
                                control={
                                        <Checkbox 
                                            checked={this.state.rsvp === 'No' ? true : false} 
                                            color='primary'
                                            onClick={() => {this.onCheckRSVP('No', '1')}} />}
                                label="No"
                                labelPlacement="start"
                            />
                        </div>
                    }
                    </div>
                </div>
            {(this.state.hasPlusone === "Yes") ? 
            <div className="separator">
                <h3>Are you bringing a Plus One?</h3>
                <div className={this.state.updated === '2' ? 'form-container-updated' : 'form-container'}>
                {this.state.updated === '2' ? 
                    <p className="update-message">Updated</p>
                :
                    <div>
                        <FormControlLabel
                            classes={{label: 'checkBoxLabel'}}
                            value="Yes"
                            control={
                                <Checkbox 
                                    checked={this.state.plusone === 'Yes' ? true : false} 
                                    color='primary'
                                    onClick={() => {this.onCheckPlusone('Yes', '2')}} />}
                            label="Yes"
                            labelPlacement="start"
                        />
                        <FormControlLabel
                            classes={{label: 'checkBoxLabel'}}
                            value="No"
                            control={
                                <Checkbox 
                                    checked={this.state.plusone === 'No' ? true : false} 
                                    color='primary'
                                    onClick={() => {this.onCheckPlusone('No', '2')}} />}
                            label="No"
                            labelPlacement="start"
                        />
                    </div>
                }
                </div>
            </div>
            : ''
            }
            {(this.state.coupleId > 0) ? 
            <CoupleInfo coupleId={ this.state.coupleId }/>
            : ''
            }
        </div>
        )
    }
}
export function CoupleInfo(props){
    const [coupleState, setCoupleState] = React.useState({
        id: props.coupleId,
        name: '',
        rsvp: '',
        updated: 'none'
    })
    const [updated, setUpdate] = React.useState(false)
    React.useEffect(() => {
        getCoupleInfo(props.coupleId)
        .then(res => {
            setCoupleState({...coupleState, name: res[0].fname, rsvp: res[0].RSVP})
        })
        .catch(err => {
            console.log(err)
        })
    }, [])
    const handleChange = (e, x) => {
        updateCoupleRSVP(e, props.coupleId)
        .then(res => {
            getCoupleRSVP(coupleState.id)
            .then(res => {
                setCoupleState({...coupleState, rsvp: res[0].RSVP})
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
        const timer = setTimeout(() => setUpdate(false), 800 )
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