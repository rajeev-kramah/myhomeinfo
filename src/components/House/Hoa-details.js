import React, { useState,useEffect } from 'react';
import "../../style/House.css";
import "../../style/Loan.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addHOADetails } from "../../store/Actions/house";
import { Util } from "../../Datamanipulation/Util";
import Tab from "../../Reusable/Tab";
import ContactModal from "../Contacts/Contact-Modal";
import { getContact } from "../../store/Actions/contact"; 

const Hoadetails = (props) => {
    const [companyName, setCompanyName] = useState('');
    const [companyName1, setCompanyName1] = useState('');
    const [contactName, setContactName] = useState('');
    const [contactName1, setContactName1] = useState('');
    const [phone, setPhone] = useState('');
    const [phone1, setPhone1] = useState('');
    const [email, setEmail] = useState('');
    const [email1, setEmail1] = useState('');
    const [frequency, setFrequency] = useState('');
    const [frequency1, setFrequency1] = useState('');
    const [reminder_date, setReminder_date] = useState(Util.getCurrentDate("-"));
    const [reminder_phone, setReminder_phone] = useState('');
    const [reminder_email, setReminder_email] = useState('');
    const [reminder_message, setReminder_message] = useState('');
    const [amount, setAmount] = useState('');
    const [amount1, setAmount1] = useState('');
    const [house_id, setHouseId] = useState(props.houseDetails && props.houseDetails.house.length > 0 ? props.houseDetails.house[0].id : "");
    const [id, setId] = useState('');

    const [showGroup, setShowGroup] = useState(false);

    useEffect(()=> {
        if(props.houseDetails && props.houseDetails.house.length > 0 && props.houseDetails.hoadetails.length > 0){
            setHouseId(props.houseDetails.house[0].id);
            setCompanyName(props.houseDetails.hoadetails[0].companyname ? props.houseDetails.hoadetails[0].companyname : "");
            setCompanyName1(props.houseDetails.hoadetails[0].companyname1 ? props.houseDetails.hoadetails[0].companyname1 : "");
            setContactName(props.houseDetails.hoadetails[0].contactname ? props.houseDetails.hoadetails[0].contactname : "");
            setContactName1(props.houseDetails.hoadetails[0].contactname1 ? props.houseDetails.hoadetails[0].contactname1 : "");
            setPhone(props.houseDetails.hoadetails[0].phoneno ? props.houseDetails.hoadetails[0].phoneno : "");
            setPhone1(props.houseDetails.hoadetails[0].phoneno1 ? props.houseDetails.hoadetails[0].phoneno1 : "");
            setEmail(props.houseDetails.hoadetails[0].email ?props.houseDetails.hoadetails[0].email : "");
            setEmail1(props.houseDetails.hoadetails[0].email1 ? props.houseDetails.hoadetails[0].email1 : "");
            setReminder_date(props.houseDetails.hoadetails[0].reminder_date ? props.houseDetails.hoadetails[0].reminder_date : "");
            // setReminder_phone(props.houseDetails.hoadetails[0].reminder_phone != "null" ? props.houseDetails.hoadetails[0].reminder_phone : "");
            // setReminder_email(props.houseDetails.hoadetails[0].reminder_email != "null" ? props.houseDetails.hoadetails[0].reminder_email : "");
            setReminder_message(props.houseDetails.hoadetails[0].reminder_message != "null" ? props.houseDetails.hoadetails[0].reminder_message : "");
            setFrequency(props.houseDetails.hoadetails[0].frequency ? props.houseDetails.hoadetails[0].frequency : "");
            setFrequency1(props.houseDetails.hoadetails[0].frequency1 ? props.houseDetails.hoadetails[0].frequency1 : "");
            setAmount(props.houseDetails.hoadetails[0].amount ? props.houseDetails.hoadetails[0].amount : "");
            setAmount1(props.houseDetails.hoadetails[0].amount1 ? props.houseDetails.hoadetails[0].amount1 : "");
            setId(props.houseDetails.hoadetails[0].id);
        } 

        if(props.houseDetails && props.houseDetails.house.length > 0){
            setHouseId(props.houseDetails.house[0].id);
        }
        if(props.accountDetails && props.accountDetails.length > 0) {
            setReminder_email(props.accountDetails[0].email);
            setReminder_phone(props.accountDetails[0].mono);
        }
        let data = {
            "house_id":house_id
        }
        props.getContact(data);
    },[props.houseDetails,props.accountDetails]);

    const handleSubmit = () => {
        let data = {
            "companyname": companyName,
            "companyname1" : companyName1,
            "contactname": contactName,
            "contactname1" : contactName1,
            "phoneno": phone,
            "phoneno1" : phone1,
            "email": email,
            "email1" : email1,
            "frequency": frequency,
            "frequency1" : frequency1,
            "amount": amount,
            "amount1" : amount1,
            "reminder_date" : reminder_date,
            "reminder_phone" : reminder_phone,
            "reminder_email" : reminder_email,
            "reminder_message" : reminder_message,
            "house_id": house_id,
            "id" : id
        }

        let valid = validate()
        if(valid){
            props.addHOADetails(data);
            props.history.push("/realtor-detail")
        }
    }

    const validate = () => {
        return true;
    }

    const handlePrevious = () => {
        props.history.push('/title-holders');
    } 
   
    const togglePopup = () => {
        setShowGroup(!showGroup);
        let data = {
            house_id : house_id
        }
        props.getContact(data);
    };

    const handleOnChange = (e) => {
        setCompanyName(e.target.value);
        for(var i=0; i<props.contactList.length; i++){
            if(e.target.value == props.contactList[i]['id']){
                setPhone(props.contactList[i].mono);
                setEmail(props.contactList[i].email);
                setContactName(props.contactList[i].contactperson);
                break;
            }
        }
    }
    // const handleOnChange = (e) => {
    //     setLname(e.target.value);
    //     for(var i=0; i<props.contactList.length; i++){
    //         if(e.target.value == props.contactList[i]['id']){
    //             setLaddress(props.contactList[i].address);
    //             setLphno(props.contactList[i].mono);
    //             setLemail(props.contactList[i].email);
    //             setLcontactperson(props.contactList[i].contactperson);
    //             break;
    //         }
    //     }
    // }
    const handleOnChangeSub = (e) => {
        setCompanyName1(e.target.value);
        for(var i=0; i<props.contactList.length; i++){
            if(e.target.value == props.contactList[i]['companyname']){
                setPhone1(props.contactList[i].mono);
                setEmail1(props.contactList[i].email);
                setContactName1(props.contactList[i].contactperson);
                break;
            }
        }
    }

    const tabs = [
        {pathname : "/house-details", label : "Home Details"},
        {pathname : "/title-holders", label : "Title Holders"},
        {pathname : "/hoa-detail", label : "HOA Details"},
        {pathname : "/realtor-detail", label : "Realtor Details"},
        {pathname : "/hmo-space", label : "HMO Spaces"},
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

    const handleSetDate = (lease_frequency) => {
        var chooseDate=new Date();
        if(lease_frequency === "Month"){
            chooseDate.setDate(chooseDate.getDate() + 15);
        }else if(lease_frequency === "Quarter"){
            chooseDate.setDate(chooseDate.getDate() + 75);
        }else {
            chooseDate.setDate(chooseDate.getDate()+15);
        }
        let futureDate = chooseDate.getFullYear()+'-'+('0'+(chooseDate.getMonth()+1)).slice(-2)+'-'+('0'+(chooseDate.getDate())).slice(-2);
        setReminder_date(futureDate);
    }

    const handleRenewalDateChange = (e) => {
        setReminder_date(e.target.value)
    };

    const handleFrequencyChange = (e) => {
        handleSetDate(e.target.value)
        setFrequency1(e.target.value)
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

    const inputElement2 = document.getElementById('phoneNumberFormat2');
    if(inputElement2 != null) {
        inputElement2.addEventListener('keydown',enforceFormat);
        inputElement2.addEventListener('keyup',formatToPhone);
    }

    const inputElement3 = document.getElementById('phoneNumberFormat3');
    if(inputElement3 != null) {
        inputElement3.addEventListener('keydown',enforceFormat);
        inputElement3.addEventListener('keyup',formatToPhone);
    }

    return (
        <div className="container-fluid house">
            <h4>HOA Details</h4>
            <div className="house-form">
                <Tab loanPage="HOA Details" tabs={tabs} id={id} house_id={house_id}/>
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label htmlFor="HOA-Main company name">HOA-Main</label>
                            <select className="form-control" value={companyName} onChange={e=> handleOnChange(e)}>
                                <option value="" disabled>Select</option>
                                {
                                    props.contactList ? (
                                        props.contactList.map((data)=>{
                                            console.log("data22::",data.groupname)
                                            if(data.groupname === "Expenses&HOA"){
                                                console.log("data::",data)
                                                return(
                                                    <option value={data.id}>{data.companyname}</option>
                                                )
                                            }
                                        })
                                    ): ""
                                }
                                   
                            </select>
                            {/* <input type="text" placeholder="Company Name" value={companyName} onChange={e=> setCompanyName(e.target.value)} className="form-control"/> */}
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label htmlFor="HOA-Main Contact">Contact Person</label>
                            <input type="text" placeholder="HOA-Main Name" value={contactName} onChange={e=> {
                                    setContactName(e.target.value)
                            }} className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label htmlFor="HOA-Main Number">Mobile Number</label>
                                <input id="phoneNumberFormat" maxLength="12" type="text" placeholder="HOA-Main No." value={phone} onChange={e=> {
                                        setPhone(e.target.value)
                                }} className="form-control" />
                        </div>
                    </div>
                    {/* <div className="col-md-3">
                        <img onClick={()=>togglePopup()} className="addContactLogo" src={"assets/image/addContactIcon.png"} alt="AddContactLogo"/>
                    </div> */}
                </div>
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label htmlFor="HOA-Sub">HOA-Email</label>
                            <input type="text" placeholder="HOA-Sub" value={ email} onChange={e=> {
                                    setEmail(e.target.value)
                            }} className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label htmlFor="HOA pymt frequency">HOA Pymt Frequency</label>
                            <select className="form-control" value={frequency} onChange={e=> setFrequency(e.target.value)} >
                                <option value="" disabled>Select</option>
                                <option value="Month">Monthly</option>
                                <option value="Quarter">Quarterly</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label htmlFor="HOA-Amount" >HOA-Amount</label>
                            <input type="text" placeholder="HOA-Amount" value={amount} onChange={e=> {
                                    setAmount(e.target.value)
                            }} className="form-control" />
                        </div>
                    </div>
                </div>
                <div className="row">
                <hr/>
                    <div className="col-md-3"></div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label htmlFor="company name">HOA-Sub</label>
                            <select className="form-control" value={companyName1} onChange={e => handleOnChangeSub(e)}>
                                <option value="" disabled>Select</option>
                                {
                                    props.contactList ? (
                                        props.contactList.map((data) => {
                                            if (data.groupname == "Expenses&HOA") {
                                                return (
                                                    <option value={data.companyname}>{data.companyname}</option>
                                                )
                                            }
                                        })
                                    ) : ""
                                }
                            </select>
                            {/* <input type="text" placeholder="Company Name" value={companyName1} onChange={e=> setCompanyName1(e.target.value)} className="form-control" /> */}
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label htmlFor="HOA-Main Contact">Contact Person</label>
                            <input type="text" placeholder="HOA-Main Name" value={contactName1} onChange={e=> {
                                    setContactName1(e.target.value)
                            }} className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label htmlFor="HOA-Main Number">Mobile Number</label>
                            <input id="phoneNumberFormat2" maxLength="12" type="text" placeholder="HOA-Main Number" value={phone1} onChange={e=> {
                                    setPhone1(e.target.value)
                            }} className="form-control" />
                        </div>
                    </div>
                    {/* <div className="col-md-3">
                        <img onClick={()=>togglePopup()} className="addContactLogo" src={"assets/image/addContactIcon.png"} alt="AddContactLogo"/>
                    </div> */}
                </div>
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label htmlFor="HOA-Sub">HOA-Email</label>
                            <input type="text" placeholder="HOA-Sub" value={ email1} onChange={e=> {
                                    setEmail1(e.target.value)
                            }} className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label htmlFor="HOA pymt frequency">HOA Pymt Frequency</label>
                            <select className="form-control" value={frequency1} onChange={e=>handleFrequencyChange(e)} >
                                <option value="" disabled>Select</option>
                                <option value="Month">Monthly</option>
                                <option value="Quarter">Quarterly</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label htmlFor="HOA-Amount" >HOA-Amount</label>
                            <input type="text" placeholder="HOA-Amount" value={amount1} onChange={e=> {
                                    setAmount1(e.target.value)
                            }} className="form-control" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label htmlFor="HOA-Sub">Renewal- Reminder Date</label>
                            {console.log("reminder_date",reminder_date)}
                            <input type="date"  value={reminder_date} onChange={e=> handleRenewalDateChange(e)} className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label htmlFor="Reminder Number">Reminder Phone No.</label>
                            <input id="phoneNumberFormat3" maxLength="12" type="text" placeholder="Reminder Phone No." value={reminder_phone} onChange={e=> {
                                    setReminder_phone(e.target.value)
                            }} className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label htmlFor="Reminder-Email" >Reminder-Email</label>
                            <input type="text" placeholder="Reminder-Email" value={reminder_email} onChange={e=> {
                                    setReminder_email(e.target.value)
                            }} className="form-control" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="Reminder-Message" >Renewal-Reminder Message</label>
                            <input type="text" placeholder="Reminder-Message"  value={reminder_message} onChange={e=> {
                                    setReminder_message(e.target.value)
                            }} className="form-control" />
                        </div>
                    </div>
                </div>

            </div>
            <div className="row footer ">
                <div className="col-md-4"></div>
                <div className="col-md-4 pt-pb-10" align="center">
                    <button className="btn btn-primary btn-sm" onClick={handleSubmit}>Save</button>
                </div>
                <div className="col-md-4">
                    <div className="btn-group pull-right" role="group" aria-label="...">
                        <button type="button" className="btn btn-primary btn-sm addNewItem " onClick={handlePrevious}><span className="glyphicon glyphicon-arrow-left"></span>Previous</button>
                        <button type="button"  className="btn btn-primary btn-sm addNewItem " onClick={handleSubmit}>Next <span className="glyphicon glyphicon-arrow-right"> </span></button>
                    </div>
                </div>
                </div>
            {showGroup ? <ContactModal house_id={house_id} toggle={togglePopup} /> : null} 
        </div>
    )
}

const mapStateToProps = (state) => ({
    houseDetails : state.House.houseDetail.data,
    contactList : state.Contact.contacts.data,
    accountDetails : state.Account.accountDetails.data
})

const mapDispatchToProps = {
    addHOADetails,
    getContact
}

export default connect(mapStateToProps, mapDispatchToProps)(Hoadetails);