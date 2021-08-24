import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import "../../style/Loan.css";
import "../../style/House.css";
import { NotificationManager } from "react-notifications";
import { addInsurance } from "../../store/Actions/insurance";
import Tab from "../../Reusable/Tab";
import { Util } from "../../Datamanipulation/Util";

const Reminder = (props) => {

    let houseid = props.location.state.house_id ? props.location.state.house_id : "";

    const [insurance_number, setInsurance_number] = useState('');
    const [provider, setProvider] = useState('');
    const [effective_date, setEffective_date] = useState('');
    const [expiry_date, setExpiry_date] = useState('');
    const [premium, setPremium] = useState('');
    const [renewed, setRenewed] = useState('');
    const [provider_url, setProvider_url] = useState('');
    const [attachments, setAttachments] = useState('');
    const [company_name, setCompany_name] = useState('');
    const [agent_name, setAgent_name] = useState('');
    const [company_phone, setCompany_phone] = useState('');
    const [company_email, setCompany_email] = useState('');
    const [company_address, setCompany_address] = useState('');
    const [reminder_date, setReminder_date] = useState('');
    const [reminder_phone, setReminder_phone] = useState('');
    const [reminder_email, setReminder_email] = useState('');
    const [reminder_alternate_email, setReminder_alternate_email] = useState('');
    const [comments, setComments] = useState('');
    const [house_id, setHouse_id] = useState(houseid);
    const [id, setId] = useState('');
    const [status, setStatus] = useState('');

    
    useEffect(()=> {
        if(props.insuranceDetails && props.insuranceDetails.length > 0) {
            setId(props.insuranceDetails[0].id);
            setInsurance_number(props.insuranceDetails[0].insurance_number);
            setProvider(props.insuranceDetails[0].provider);
            setEffective_date(props.insuranceDetails[0].effective_date);
            setExpiry_date(props.insuranceDetails[0].expiry_date);
            setPremium(props.insuranceDetails[0].premium);
            setRenewed(props.insuranceDetails[0].renewed);
            setProvider_url(props.insuranceDetails[0].provider_url);
            setAttachments(props.insuranceDetails[0].attachments);
            setCompany_name(props.insuranceDetails[0].company_name);
            setAgent_name(props.insuranceDetails[0].agent_name);
            setCompany_phone(props.insuranceDetails[0].company_phone);
            setCompany_email(props.insuranceDetails[0].company_email);
            setCompany_address(props.insuranceDetails[0].company_address);
            setReminder_date(props.insuranceDetails[0].reminder_date);
            setReminder_phone(props.insuranceDetails[0].reminder_phone);
            setReminder_email(props.insuranceDetails[0].reminder_email);
            setReminder_alternate_email(props.insuranceDetails[0].reminder_alternate_email);
            setComments(props.insuranceDetails[0].comments);
            setHouse_id(props.insuranceDetails[0].house_id);
            setStatus(props.insuranceDetails[0].status);
        }
    }, [props.insuranceDetails])

    const handleSubmit = () => {
        
        let data = {
            "insurance_number": insurance_number,
            "provider": provider,
            "effective_date": effective_date,
            "expiry_date": expiry_date,
            "premium": premium,
            "renewed": renewed,
            "provider_url": provider_url,
            "company_name": company_name,
            "agent_name" : agent_name,
            "company_phone" : company_phone,
            "company_email" : company_email,
            "company_address" : company_address,
            "reminder_date" : reminder_date,
            "reminder_phone" : reminder_phone,
            "reminder_email" : reminder_email,
            "reminder_alternate_email" : reminder_alternate_email,
            "comments" : comments,
            "house_id": house_id,
            'id':id,
            'attachments': attachments,
            "status": status
        }
        var form = new FormData();
      
        for (const key in data) {
            form.append(key, data[key]);
        }
        form.append("lastTab", true)
        let valid = validate();
        if(valid) {
            props.addInsurance(form)
            props.history.push({
                pathname: 'insurance-list',
                state: {
                    house_id : house_id
                }
            }); 
        }
    }

    const validate = () => {
        return true;
    }

    const handlePrevious = () => {
        props.history.push({
            pathname: 'agent',
            state: {
                house_id : house_id
            }
        });
    }
    
    const tabs = [
        {pathname : "/insurance", label : "Insurance"},
        {pathname : "/agent", label : "Agent Details"},
        {pathname : "/reminder", label : "Reminders"},
    ]

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
        <div className="container-fluid house">
            <h4>Add Reminder Details</h4>
            <div className="house-form">
                <Tab loanPage="Reminders" tabs={tabs} id={id} house_id={house_id}/>
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6 house-form pt-25">
                        <div className="row pt-25">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="Remind On" className="">Remind On</label>
                                    <input type="date" placeholder="Remind On" value={reminder_date} onChange={e=> {
                                         setReminder_date(e.target.value)
                                    }} className="form-control"/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="Reminder Phone No" className="">Reminder Phone No.</label>
                                    <input type="text" id="phoneNumberFormat" maxLength="12" placeholder="Reminder Phone No" value={reminder_phone} onChange={e=>{
                                          setReminder_phone(e.target.value)
                                    }} className="form-control" />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="Alternate Email" className="">Reminder Email</label>
                                    <input type="email" placeholder="Reminder Email" value={reminder_email} onChange={e=> setReminder_email(e.target.value)} className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="term" className="">Alternate Email</label>
                                    <input type="text" placeholder="Alternate Email" value={reminder_alternate_email} onChange={e=> setReminder_alternate_email(e.target.value)} className="form-control" />
                                </div>
                            </div>
                        </div>

                        <div className="row">

                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="comments">Additional Comments/Notes</label>
                                    <textarea rows="4" placeholder="Comments" value={comments} onChange={e=> setComments(e.target.value)} className="form-control"></textarea>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className="col-md-3"></div>
                </div>
                <div className="row footer ">
                    <div className="col-md-4"></div>
                    <div className="col-md-4 pt-pb-10" align="center">
                        <button className="btn btn-primary btn-sm" onClick={handleSubmit}>SAVE</button>
                    </div>
                    <div className="col-md-4">
                        <div className="btn-group pull-right" role="group" aria-label="...">
                            <button type="button" className="btn btn-primary btn-sm addNewItem " onClick={handlePrevious}><span className="glyphicon glyphicon-arrow-left"></span>Previous</button>
                            {/* <button type="button"  className="btn btn-primary btn-sm addNewItem " onClick={handleSubmit}>Next <span className="glyphicon glyphicon-arrow-right"> </span></button> */}
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    )
}


const mapStateToProps = (state) => ({
    insuranceDetails : state.Insurance.insuranceDetails.data
});

const mapDispatchToProps = {
    addInsurance
}

export default connect(mapStateToProps, mapDispatchToProps)(Reminder);