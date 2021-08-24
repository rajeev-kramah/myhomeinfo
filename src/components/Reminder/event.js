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
    const [id, setId] = useState();
   
    const handleSubmit = () => {
        let data = {
           
            "title": title,
            "dateTime" : dateTime,
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