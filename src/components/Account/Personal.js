import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import { Util } from "../../Datamanipulation/Util";
import { getAccount, updateAccount } from "../../store/Actions/Account";
import "../../style/account.css";
import { getUserReference } from "../../store/Actions/Reference";


const Personal = (props) => {

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [address, setAddress] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [refferedby, setRefferedby] = useState('');
    const [maxProperty, setMaxProperty] = useState('');
    const [substartdate, setSubstartdate] = useState(Util.getCurrentDate("-"));
    const [subenddate, setSubenddate] = useState(Util.getCurrentDate("-"));
    const [mono, setMono] = useState('');

    const[user, setUser] = useState(Util.getLoggedinUser());

    useEffect(()=> {
        if(props.accountDetails && props.accountDetails.length > 0) {
            console.log("props.accountDetails",props.accountDetails)
            setId(props.accountDetails[0].id);
            setName(props.accountDetails[0].name);
            setEmail(props.accountDetails[0].email);
            setUsername(props.accountDetails[0].username);
            setAddress(props.accountDetails[0].address);
            setZipcode(props.accountDetails[0].zipcode);
            setRefferedby(props.accountDetails[0].refferedby);
            setMaxProperty(props.accountDetails[0].maxProperty);
            setSubstartdate(props.accountDetails[0].substartdate);
            setSubenddate(props.accountDetails[0].subenddate);
            setMono(props.accountDetails[0].mono);
        } else {
            let data = {
                id: user['id']
            }
            props.getAccount(data);
        }
    }, [props.accountDetails])

    const handleSubmit = () => {
        
        let data = {
            "name": name,
            "email": email,
            "username" : username,
            "address" : address,
            "zipcode" : zipcode,
            "refferedby" : refferedby,
            "maxProperty" : maxProperty,
            "substartdate" : substartdate,
            "subenddate" : subenddate,
            "mono" : mono,
            "id": id
        }
        
        let valid = validate();
        if(valid) {
            props.updateAccount(data);
            console.log("data2::",props.updateAccount(data))
        }
        console.log("data:::",data)
    }

    const validate = () => {
        if(name === "" || name === undefined) {
            NotificationManager.error("Error Message", "Name cannot be empty.");
            return false;
        } else if(email === "" || email === undefined) {
            NotificationManager.error("Error Message", "Email cannot be empty.");
            return false;
        } else if(username === "" || username === undefined) {
            NotificationManager.error("Error Message", "Username cannot be empty.");
            return false;
        } else if(mono === "" || mono === undefined) {
            NotificationManager.error("Error Message", "Mobile Number cannot be empty.");
            return false;
        }
        return true;
    }

    const handleTabs = (tab) => {
        if(tab === 'personal') {
            props.history.push("/personal");
        } else if(tab === 'referral') {
            let data = {
                "owner_id": user['id']
            }
            props.getUserReference(data);
            props.history.push("/referral");
        } else if(tab === 'subs') {
            props.history.push("/subscription");
        }
    }

    const isNumericInput = (event) => {
        const key = event.keyCode;
        return ((key >= 48 && key <= 57) || // Allow number line
            (key >= 96 && key <= 105) // Allow number pad
        );
    };
    
    const isModifierKey = (event) => {
        const key = event.keyCode;
        return (event.shiftKey === true || key === 35 || key === 36) || // Allow Shift, Home, End
            (key === 8 || key === 9 || key === 13 || key === 46) || // Allow Backspace, Tab, Enter, Delete
            (key > 36 && key < 41) || // Allow left, up, right, down
            (
                // Allow Ctrl/Command + A,C,V,X,Z
                (event.ctrlKey === true || event.metaKey === true) &&
                (key === 65 || key === 67 || key === 86 || key === 88 || key === 90)
            )
    };
    
    const enforceFormat = (event) => {
        // Input must be of a valid number format or a modifier key, and not longer than ten digits
        if(!isNumericInput(event) && !isModifierKey(event)){
            event.preventDefault();
        }
    };
    
    const formatToPhone = (event) => {
        if(isModifierKey(event)) {return;}
    
        // I am lazy and don't like to type things more than once
        const target = event.target;
        const input = event.target.value.replace(/\D/g,'').substring(0,10); // First ten digits of input only
        const zip = input.substring(0,3);
        const middle = input.substring(3,6);
        const last = input.substring(6,10);
    
        if(input.length > 6){target.value = `${zip}-${middle}-${last}`;}
        else if(input.length > 3){target.value = `${zip}-${middle}`;}
        else if(input.length > 0){target.value = `${zip}`;}
    };
    
    const inputElement = document.getElementById('phoneNumberFormat');
    if(inputElement != null) {
        inputElement.addEventListener('keydown',enforceFormat);
        inputElement.addEventListener('keyup',formatToPhone);
    }

    return (
        <div className="container-fluid contact">
            <h4>Account Details</h4>
            <div className="contact-form">
                <div className="row top-bar">
                    <div className="col-md-12">
                        <span className="active-bar mr-50" onClick={(e)=> handleTabs("personal")}>Personal Information</span>
                        <span className="mr-50" onClick={(e)=> handleTabs("referral")}>Referrals</span>
                        <span className="mr-50" onClick={(e) => handleTabs("subs")}>Subscription</span>
                    </div>
                </div>
                <div className="row pb-2">
                    <div className="col-md-3">
                    </div>
                    <div className="col-md-6 house-form pt-25">
                    <div className="row pt-pb-10">
                        <div className="col-md-12">
                            <p className="">You can edit your personal information and save them.</p>
                        </div>
                    </div>
                        <div className="row pt-25">
                            <div className="col-md-6">
                                <div className="form-group inputGroup">
                                    <label htmlFor="name" className="req">Name</label>
                                    <input type="text" placeholder="Enter Name" className="form-control" value={name} onChange={e=> setName(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-md-6 ">
                                <div className="form-group inputGroup">
                                    <label htmlFor="email" className="req">Email Address</label>
                                    <input type="email" placeholder="Enter Email Address" value={email} onChange={e => setEmail(e.target.value)} className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="row pt-25">
                            <div className="col-md-6">
                                <div className="form-group inputGroup">
                                    <label htmlFor="username" className="req">Username</label>
                                    <input type="text" placeholder="Enter Username" className="form-control" value={username} onChange={e=> setUsername(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-md-6 ">
                                <div className="form-group inputGroup">
                                    <label htmlFor="mono" className="req">Mobile Number</label>
                                    <input id="phoneNumberFormat" maxLength="12" type="text" placeholder="Enter Mobile Number" value={mono} onChange={e => setMono(e.target.value)} className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="row pt-25">
                            <div className="col-md-6">
                                <div className="form-group inputGroup">
                                <label htmlFor="address">Address</label>
                                    <input type="text" placeholder="Enter Address" value={address} onChange={e => setAddress(e.target.value)} className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6 ">
                                <div className="form-group inputGroup">
                                <label htmlFor="zip">Zipcode</label>
                                    <input type="text" className="form-control" value={zipcode} onChange={e=> setZipcode(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="row pt-25">
                            <div className="col-md-6">
                                <div className="form-group inputGroup">
                                    <label htmlFor="referred">Referred By</label>
                                    <input type="text" placeholder="Enter Referred Name" className="form-control" value={refferedby} onChange={e=> setRefferedby(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-md-6 ">
                                <div className="form-group inputGroup">
                                    <label htmlFor="referred">Maximum Property</label>
                                    <input type="number" min="0" placeholder="Maximum Property" className="form-control" value={maxProperty} onChange={e=> setMaxProperty(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="row pt-25">
                            <div className="col-md-6">
                                <div className="form-group inputGroup">
                                    <label htmlFor="start">Subscription Start Date</label>
                                    <input type="date" className="form-control" value={substartdate} onChange={e=> setSubstartdate(e.target.value)} readOnly/>
                                </div>
                            </div>
                            <div className="col-md-6 ">
                                <div className="form-group inputGroup">
                                    <label htmlFor="end">Subscription End Date</label>
                                    <input type="date" value={subenddate} onChange={e => setSubenddate(e.target.value)} className="form-control" readOnly />
                                </div>
                            </div>
                        </div>
                        <div className="row pt-pb-10">
                            <div className="col-md-4"></div>
                            <div className="col-md-4 " align="center">
                                <button className="btn btn-primary btn-sm" onClick={handleSubmit}>Save</button>
                            </div>
                            <div className="col-md-4"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => (
    {
    accountDetails : state.Account.accountDetails.data
    
});

const mapDispatchToProps = {
    getAccount,
    updateAccount,
    getUserReference
}

export default connect(mapStateToProps, mapDispatchToProps)(Personal);