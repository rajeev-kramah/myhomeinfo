import React, { useState} from 'react';
import "../../style/Contact.css";
import { addEvent } from "../../store/Actions/Reminder";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import {Util} from "../../Datamanipulation/Util";

//2018-06-12T19:30
const CreateEvent = (props) => {

    const [title, setTitle] = useState('');
    const [dateTime, setDateTime] = useState(Util.getCurrentDate("-") +"T"+new Date().getHours()+":"+new Date().getMinutes());
    const [house_id, setHouse_id] = useState(props.house_id);
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');   
    const [id, setId] = useState();
   
    const handleSubmit = () => {
        let data = {
           
            "title": title,
            "dateTime" : dateTime,
            "mobile" : mobile,
            "email" : email,
            "house_id" : house_id,
            "id": id,
           
        }
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
                        <div className="col-md-6">
                            <label htmlFor="mobile">Mobile No.</label>
                            <input id="phoneNumberFormat" maxLength="12" type="text" placeholder="Mobile No." value={mobile} onChange={e => setMobile(e.target.value)} className="form-control" />
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" placeholder="Email" value={email} onChange={e=> setEmail(e.target.value)} className="form-control" />
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


const mapStateToProps = (state) => ({
   
});

const mapDispatchToProps = {
    addEvent
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);