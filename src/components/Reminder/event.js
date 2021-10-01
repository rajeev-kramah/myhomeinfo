import React, { useState,useEffect} from 'react';
import "../../style/Contact.css";
import { addEvent } from "../../store/Actions/Reminder";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import { getAccount, updateAccount } from "../../store/Actions/Account";
import {Util} from "../../Datamanipulation/Util";

//2018-06-12T19:30
const CreateEvent = (props) => {
    const user = JSON.parse(localStorage.getItem('user'));
console.log("props::",props,"user::",user)
    const [title, setTitle] = useState('');
    const [dateTime, setDateTime] = useState(Util.getCurrentDate("-") +"T"+new Date().getHours()+":"+new Date().getMinutes());
    const [house_id, setHouse_id] = useState(props.house_id);
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');   
    const [id, setId] = useState();
    const [emailChecked, setEmailChecked] = useState(0);
    const [mobileChecked, setMobileChecked] = useState(0);
    const [both_email_mobile, setboth_email_mobile] = useState(0);
   
    useEffect(()=> {
        if(props.accountDetails && props.accountDetails.length > 0) {
            setEmail(props.accountDetails[0].email);
            setMobile(props.accountDetails[0].mono);
        }
        //  else {
        //     let data = {
        //         id: user['id']
        //     }
        //     props.getAccount(data);
        // }
    }, [props.accountDetails])

    const handleSubmit = () => {
        let data = {
            "title": title,
            "dateTime" : dateTime,
            "mobileChecked" :mobileChecked,
            "mobile" : mobile,
            "emailChecked" : emailChecked,
            "email" : email,
            "house_id" : house_id,
            "id": id,
        }
        console.log("dataEvent",data)
        let valid = validate();
        if(valid) {
            props.addEvent(data);
            props.toggle();
        }
     
    }


    const validate = () => {
        if(title === "" || title === undefined) {
            NotificationManager.error("Error Message", "Title cannot be empty.");
            return false;
        } else if(dateTime === "" || dateTime === undefined) {
            NotificationManager.error("Error Message", "Date & Time cannot be empty.");
            return false;
        }
        
        return true;
    }

    
    const handleClick = () => {
        props.toggle();
    };
    
    // ----  mobile no --- //

    const enforceFormat = (event) => {
        // Input must be of a valid number format or a modifier key, and not longer than ten digits
        if(!isNumericInput(event) && !isModifierKey(event)){
            event.preventDefault();
        }
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
    const isNumericInput = (event) => {
        const key = event.keyCode;
        return ((key >= 48 && key <= 57) || // Allow number line
            (key >= 96 && key <= 105) // Allow number pad
        );
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
   const bothEmail_mobile_change =()=>{
       console.log("chexckbox",emailChecked,mobileChecked)
       setEmailChecked(1)
       setMobileChecked(1)
       if (emailChecked && mobileChecked === 1){
          setboth_email_mobile(0)
          setEmailChecked(0)
          setMobileChecked(0)
         console.log("chexckbox::true")
       }
       else{
           console.log("chexckbox::false")
       }
   }
    return(
        <div className="modal">
        <div className="modal_content">
            <span className="close" onClick={handleClick}>&times;</span>
            <div className="inner-popup">
            <h4>Event Details</h4>
            <div className="contact-form">
                <div className="row pt-25">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Event title" className="req">Event title</label>
                                <input type="text" placeholder="Event title" value={title} onChange={e=> setTitle(e.target.value)} className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Event Date" className="req">Event Date</label>
                                <input type="datetime-local" placeholder="Event Date"  value={dateTime} onChange={e => setDateTime(e.target.value)} className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-5">
                            <label htmlFor="mobile" className="emaillabel">Mobile No.</label>
                            <div className="checkedPhone checkbox-inline">
                                <input type="checkbox" name="mobileChecked" value={mobileChecked} onChange={e=>setMobileChecked(mobileChecked === 0 ? 1 : 0)} checked={mobileChecked === 1 ? "checked" : false}/> 
                                <input id="phoneNumberFormat" maxLength="12" type="text" placeholder="Mobile No." value={mobile} onChange={e => setMobile(e.target.value)} className="form-control" />
                            </div>
                            {/* <input type="checkbox" name="post" value={auto_post} onChange={e=> setAuto_post(auto_post  == 0 ? 1 : 0)}  checked={auto_post === 1 ? "checked" : false}/>Auto Post   */}
                        </div>
                        <div className="col-md-5">
                            <div className="form-group">
                                <label htmlFor="email" className="emaillabel">Email</label>
                                <div className="checkedPhone checkbox-inline">
                                    <input type="checkbox" name="emailChecked"  value={emailChecked} onChange={e=>setEmailChecked(emailChecked === 0 ? 1 : 0)} checked={emailChecked === 1 ? "checked" : false}/>
                                    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group">
                                <label className="checkbox-inline bothmo_email"  id="both"  checked={(mobileChecked && emailChecked )=== 1 ? "checked" : false }>
                                    <input type="checkbox" name="both" value={both_email_mobile} onChange={bothEmail_mobile_change} checked={(mobileChecked && emailChecked )=== 1 ? "checked" : false } />both
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                <div className="row footer">
                    <div className="col-md-5"></div>
                    <div className="col-md-2 pt-pb-10">
                        <button className="btn btn-primary btn-sm" onClick={handleSubmit}>Save</button>
                    </div>
                    <div className="col-md-3"></div>
                    <div className="col-md-2 pt-pb-10"></div>
                </div>
        </div>
    </div>
    )
}


const mapStateToProps = (state) => (
    console.log("accountDetails::satate",state.Account.accountDetails.data),{
    accountDetails : state.Account.accountDetails.data
});

const mapDispatchToProps = {
    addEvent, 
    getAccount
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);