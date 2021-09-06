import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import "../../style/Loan.css";
import "../../style/House.css";
import { NotificationManager } from "react-notifications";
import { addInsurance, getSingleInsurance, deleteInsurance } from "../../store/Actions/insurance";
import Tab from "../../Reusable/Tab";
import { getContact } from "../../store/Actions/contact";
import { Util } from "../../Datamanipulation/Util";
import ContactModal from "../Contacts/Contact-Modal";

const Insurance = (props) => {

    let houseid = props.location.state.house_id ? props.location.state.house_id : "";

    const [insurance_number, setInsurance_number] = useState('');
    const [provider, setProvider] = useState('');
    const [contact_person, setContactPerson] = useState('');
    const [effective_date, setEffective_date] = useState(Util.getCurrentDate("-"));
    const [expiry_date, setExpiry_date] = useState(Util.getCurrentDate("-"));
    const [provider_phone, setProvider_phone] = useState('');
    const [premium, setPremium] = useState('');
    const [renewed, setRenewed] = useState('');
    const [provider_url, setProvider_url] = useState('');
    const [attachments, setAttachments] = useState('');
    const [company_name, setCompany_name] = useState('');
    const [addToHomeCost,setAddToHomeCost] = useState(0);
    const [agent_name, setAgent_name] = useState('');
    const [company_phone, setCompany_phone] = useState('');
    const [company_email, setCompany_email] = useState('');
    const [company_address, setCompany_address] = useState('');
    const [reminder_date, setReminder_date] = useState(Util.getCurrentDate("-"));
    const [reminder_phone, setReminder_phone] = useState('');
    const [reminder_email, setReminder_email] = useState('');
    const [reminder_alternate_email, setReminder_alternate_email] = useState('');
    const [comments, setComments] = useState('');
    const [house_id, setHouse_id] = useState(houseid);
    const [id, setId] = useState('');
    const [status, setStatus] = useState('Active');
    const [showGroup, setShowGroup] = useState(false);
    const [attachment, setAttachment] = useState('');
    const [attachment_name, setAttachment_name] = useState('');
    const [download, setDownload] = useState('');

    useEffect(()=> {
        if(props.insuranceDetails && props.insuranceDetails.length > 0) {
            console.log("props.insuranceDetails",props.insuranceDetails)
            setId(props.insuranceDetails[0].id);
            setInsurance_number(props.insuranceDetails[0].insurance_number);
            setProvider(props.insuranceDetails[0].provider);
            setContactPerson(props.insuranceDetails[0].contact_person);
            setEffective_date(props.insuranceDetails[0].effective_date);
            setProvider_phone(props.insuranceDetails[0].provider_phone);
            setExpiry_date(props.insuranceDetails[0].expiry_date);
            setPremium(props.insuranceDetails[0].premium);
            setRenewed(props.insuranceDetails[0].renewed);
            setProvider_url(props.insuranceDetails[0].provider_url);
            setAttachments(props.insuranceDetails[0].attachments);
            setCompany_name(props.insuranceDetails[0].company_name);
            setAgent_name(props.insuranceDetails[0].agent_name);
            setCompany_phone(props.insuranceDetails[0].company_phone);
           // setAddToHomeCost(props.transactionDetails[0].add_to_home_cost);
            setCompany_email(props.insuranceDetails[0].company_email);
            setCompany_address(props.insuranceDetails[0].company_address);
            setReminder_date(props.insuranceDetails[0].reminder_date);
            // setReminder_phone(props.insuranceDetails[0].reminder_phone);
            // setReminder_email(props.insuranceDetails[0].reminder_email);
            setReminder_alternate_email(props.insuranceDetails[0].reminder_alternate_email);
            setComments(props.insuranceDetails[0].comments);
            setHouse_id(props.insuranceDetails[0].house_id);
            setStatus(props.insuranceDetails[0].status);
            setAttachment_name(props.insuranceDetails[0].attachments.split('-')[1]);
            setDownload(props.insuranceDetails[0].attachments ?( "../files/" + props.insuranceDetails[0].attachments.substr(11))  :"");
        }
        if(props.accountDetails && props.accountDetails.length > 0) {
            setReminder_email(props.accountDetails[0].email);
            setReminder_phone(props.accountDetails[0].mono);
        }
        let data = {
            "house_id":house_id
        }
        props.getContact(data);
    },[props.insuranceDetails,props.accountDetails]);

    const handleSubmit = () => {
        
        let data = {
            "insurance_number": insurance_number,
            "provider" : provider,
            "contact_person" : contact_person,
            "provider_phone": provider_phone,
            "effective_date": effective_date,
            "expiry_date": expiry_date,
            "premium": premium,
            "renewed": renewed,
            "provider_url": provider_url,
            "company_name": company_name,
            "agent_name" : agent_name,
            "company_phone": company_phone,
            "company_email" : company_email,
            "company_address" : company_address,
            "reminder_date" : reminder_date,
            "reminder_phone" : reminder_phone,
            "reminder_email" : reminder_email,
            "reminder_alternate_email" : reminder_alternate_email,
            "add_to_home_cost" : addToHomeCost,
            "comments" : comments,
            "house_id": house_id,
            'id':id,
            "status": status
        }
        console.log("data:::0:",data)
        var form = new FormData();
      
        for (const key in data) {
            form.append(key, data[key]);
        }

        form.append("attachment", attachment);

        let valid = validate();
        // if(valid) {
        //     props.addInsurance(form)
        //     props.history.push({
        //         pathname: 'agent',
        //         state: {
        //             house_id : house_id
        //         }
        //     }); 
        // }
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
        if(insurance_number === '') {
            NotificationManager.error("Error Message", "Insurance Number cannot be empty.");
            return false;
        } else if(effective_date === '') {
            NotificationManager.error("Error Message", "Effective Date cannot be empty.");
            return false;
        } else if(expiry_date === '') {
            NotificationManager.error("Error Message", "Expiry Date cannot be empty.");
            return false;
        }
        
        let start = new Date(effective_date);
        let end = new Date(expiry_date);

        end = Math.floor(end.getTime() / 86400000);
        start = Math.floor(start.getTime() / 86400000);

        if(start > end) {
            NotificationManager.error("Error Message", "Expiry Date must be greater than Effective Date.");
            return false;
        }
        return true;
    }

    // const handlePrevious = () => {
    //     props.history.push({
    //         pathname: 'loan-lender',
    //         state: {
    //             house_id : house_id
    //         }
    //     });
    // }

    const togglePopup = () => {
        setShowGroup(!showGroup);
        let data = {
            house_id : house_id
        }
        props.getContact(data);
    };

    const handleDocumentUpload = (event)=> {
        setAttachment(event.target.files[0]);
        setAttachment_name(event.target.files[0]['name']);
    }

    const handleDelete = (id) => {
       setAttachment_name("");
        setAttachments("")
        props.getSingleInsurance({id : id, delete : "doc"})
        NotificationManager.error("Success Message", "Attachment deleted");
    }

    const handleOnChange = (e) => {
        setProvider(e.target.value);
        for(var i=0; i<props.contactList.length; i++){
            if(props.contactList[i]['groupname'] == "Expenses&Insurance" && e.target.value == props.contactList[i]['companyname']){
                setContactPerson(props.contactList[i].contactperson);
                setProvider_phone(props.contactList[i].mono);
                setProvider_url(props.contactList[i].url);
                setAddToHomeCost(props.contactList[i].add_to_home_cost);
                break;
           }
        }
    }
    
    const onChangehandle =(e) =>  {
        setCompany_name(e.target.value);
        for(var i=0; i<props.contactList.length; i++){
            if(props.contactList[i]['groupname'] == "Expenses&Insurance" && e.target.value == props.contactList[i]['companyname']){
                setAgent_name(props.contactList[i].contactperson)
                setCompany_phone(props.contactList[i].mono)
                break;
            }
        }
            
    }


    const handleDeleteInsurance = () => {
        let data = {
            "id": id,
            "house_id" : house_id
        }

        props.deleteInsurance(data);
        props.history.push(
            {
                pathname : "insurance-list",
                state : {house_id : house_id}
            }
        )
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
    const inputElement1 = document.getElementById('phoneNumberFormat1');
    if(inputElement1 != null) {
        inputElement1.addEventListener('keydown',enforceFormat);
        inputElement1.addEventListener('keyup',formatToPhone);
    }
    const inputElement2 = document.getElementById('phoneNumberFormat2');
    if(inputElement2 != null) {
        inputElement2.addEventListener('keydown',enforceFormat);
        inputElement2.addEventListener('keyup',formatToPhone);
    }

    const handleExpiryDate = (e) => {

        setExpiry_date(e.target.value);
        let exp = new Date(e.target.value);
        let curr = new Date();

        exp = Math.floor(exp.getTime() / 86400000);
        curr = Math.floor(curr.getTime() / 86400000);

        if(curr > exp) {
            setStatus("Expired");
        } else {
            setStatus("Active");
        }
    }

    return (
        <div className="container-fluid house">
            <h4>Add Insurance Details</h4>
            <div className="house-form pb-2">
              {/* <Tab loanPage="Insurance" tabs={tabs} id={id} house_id={house_id}/> */}
                <div className="row">
                    <div className="col-md-3"></div>
                     <div className="col-md-2">
                        <div className="form-group">
                            <label htmlFor="Insurance company" className="req">Provider</label>
                            <select className="form-control" value={provider} onChange={e=> handleOnChange(e)}>
                                <option value="" disabled>Select</option>
                            
                                {
                                    props.contactList ? (
                                        props.contactList.map((data)=>{
                                            if(data.groupname == "Expenses&Insurance"){
                                                return(
                                                    <option value={data.companyname}>{data.companyname}</option>
                                                )
                                            }
                                        })
                                    ): ""
                                }
                            </select>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label htmlFor="Insurance Number" >Contact Person</label>
                            <input type="text" placeholder="Provider Name" value={contact_person} onChange={e=> {
                                    setContactPerson(e.target.value)
                            }} className="form-control" readOnly/>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label htmlFor="provider Number">Mobile Number</label>
                            <input type="text" id="phoneNumberFormat" maxLength="12" placeholder="Provider Number" value={provider_phone} onChange={e=> {
                                    setProvider_phone(e.target.value)
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
                            <label htmlFor="Company Name">Company Name</label>
                            <select className="form-control" value={company_name} onChange={e=> onChangehandle(e)}>
                                <option value="" disabled>Select</option>
                                {
                                    props.contactList ? (
                                        props.contactList.map((data)=>{
                                            if(data.groupname == "Expenses&Insurance"){
                                                return(
                                                    <option value={data.companyname}>{data.companyname}</option>
                                                )
                                            }
                                        })
                                    ): ""
                                }
                            </select>
                        </div>
                        {/* <div className="form-group">
                            <label htmlFor="Insurance company" className="req">Provider</label>
                            <select className="form-control" value={provider} onChange={e=> handleOnChange(e)}>
                                <option value="" disabled>Select</option>
                            
                                {
                                    props.contactList ? (
                                        props.contactList.map((data)=>{
                                            if(data.groupname == "Expenses&Insurance"){
                                                return(
                                                    <option value={data.companyname}>{data.companyname}</option>
                                                )
                                            }
                                        })
                                    ): ""
                                }
                            </select>
                        </div> */}
                    </div>

                    <div className="col-md-2">
                        <div className="form-group">
                            <label htmlFor="name">Agent Name</label>
                            <input type="text" placeholder="Agent Name" value={agent_name} onChange={e=> {
                                setAgent_name(e.target.value)
                                }} className="form-control" readOnly/>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label htmlFor="Phone No" className="">Phone No.</label>
                            <input type="text" id="phoneNumberFormat1" maxLength="12" placeholder="Phone No" value={company_phone} onChange={e=> {
                                    setCompany_phone(e.target.value)
                            }} className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-3">
                        {/* <img onClick={()=>togglePopup()} className="addContactLogo" src={"assets/image/addContactIcon.png"} alt="AddContactLogo"/> */}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3"></div>
                            <div className="col-md-2">
                                <div className="form-group">
                                    <label htmlFor="Insurance Number" className="req">Insurance Number</label>
                                    <input type="text" placeholder="Insurance Number" value={ insurance_number } onChange={e=> {
                                            setInsurance_number(e.target.value)
                                    }} className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="form-group">
                                    <label htmlFor="Effective Date" className="req">Policy Effective Date</label>
                                    <input type="date" style={{textTransform:'uppercase'}} placeholder="Policy Effective Date" value={effective_date} onChange={e=> {
                                            setEffective_date(e.target.value)
                                    }} className="form-control" />
                                </div>
                            </div>

                            <div className="col-md-2">
                                <div className="form-group">
                                    <label htmlFor="Expiry Date" className="req">Expiry Date</label>
                                    <input type="date" style={{textTransform:'uppercase'}} placeholder="Expiry Date" value={expiry_date} onChange={e=> {
                                            handleExpiryDate(e)
                                    }} className="form-control" />
                                </div>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-md-3"></div>
                            <div className="col-md-2">
                                <div className="form-group">
                                    <label htmlFor="Premium" className="">Premium(Yearly)</label>
                                    <input type="text" placeholder="Premium" value={Util.addCommas(premium)} onChange={e=> {
                                            setPremium(e.target.value)
                                    }} className="form-control" />
                                </div>
                            </div>

                          
                            <div className="col-md-2">
                                <div className="form-group">
                                    <label htmlFor="type" className="">Renewed</label>
                                    <select className="form-control" value={renewed} onChange={e=> setRenewed(e.target.value)} >
                                        <option value="" disabled>Select</option>
                                        <option value="Mortgage">Yes</option>
                                        <option value="Personal Loan">No</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-2">
                                <div className="form-group">
                                    <label htmlFor="status" className="">Status</label>
                                    <input type="text" className="form-control" value={status} readOnly />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-3"></div>
                            <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="Provider" className="">Provider URL</label>
                                        <input type="text" placeholder="Provider URL" value={provider_url} onChange={e=> {
                                                setProvider_url(e.target.value)
                                        }} className="form-control" />
                                    </div>
                                </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3"></div>
                            <div className="col-md-2">
                                <div className="form-group">
                                    <label htmlFor="Remind On" className="">Renewal-Reminder Date</label>
                                    <input type="date" style={{textTransform:'uppercase'}} placeholder="Remind On" value={reminder_date} onChange={e=> {
                                         setReminder_date(new Date(e.target.value).toDateString().toString());
                                    }} className="form-control"/>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="form-group">
                                    <label htmlFor="Reminder Phone No" className="">Reminder Phone No.</label>
                                    <input type="text" id="phoneNumberFormat2" maxLength="12" placeholder="Reminder Phone No" value={reminder_phone} onChange={e=>{
                                          setReminder_phone(e.target.value)
                                    }} className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="form-group">
                                    <label htmlFor="Alternate Email" className="">Reminder Email Id</label>
                                    <input type="email" placeholder="Reminder Email" value={reminder_email} onChange={e=> setReminder_email(e.target.value)} className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3"></div>
                            <div className="col-md-6">
                                 <div className="form-group">
                                    <label htmlFor="attachment">Attachments</label>
                                    <label htmlFor="file" className="fileContainer">
                                        <div className="attachfile" align="center">
                                            <i>Attach Policy &amp; Receipt</i>
                                            <p>{attachment_name ? attachment_name : ""}</p>

                                        </div>
                                        <input type="file" style={{ height: "0px" }} id="file" onChange={(event) => handleDocumentUpload(event)} className="form-control" style={{ "visibility": "hidden" }} />
                                    </label>
                                </div>
                                </div>
                        </div>
                        {/* <div className="row "> */}
                            {/* <div className="col-md-3"></div> */}
                            {/* <div className="col-md-12">
                                <
                            </div>
                        </div> */}
                <div className="row">
                    <div className="col-md-3"></div>
                    {/* <div className="col-md-6" style={{marginTop:"-20px", marginBottom:"10px"}}>
                                        <button type="button"  className="btn btn-primary btn-sm addNewItem " href={download ? download : "javascript:void(0)"} download={attachments}>
                                            <span className="glyphicon glyphicon-download-alt"> </span> Download Attachment
                                        </button>
                                        <button type="button"  className="btn btn-primary btn-sm addNewItem pull-right " style={{marginRight:"0px"}} onClick={()=>handleDelete(id)}>
                                            <span className="glyphicon glyphicon-trash"> </span> Delete Attachment 
                                        </button>
                                    </div> */}

                    <div className="dflex">
                        <i className="glyphicon glyphicon-eye-open primary  btn-lg addNewItemlogo1232" value={attachment} ></i>
                        <i className="glyphicon glyphicon-download-alt primary  btn-lg addNewItemlogo1232" value={attachment}  ></i>
                        <i className="glyphicon glyphicon-trash primary  btn-lg d-flex addNewItemlogo1232" value={attachment} onClick={()=>handleDelete(id)}></i>
                    </div>
                </div>
                      
                    
                    
                </div>
                <div className="row footer ">
                    <div className="col-md-4">
                        {
                            id ? (
                                <button className="btn btn-default btn-sm addNewItem" onClick={handleDeleteInsurance}>  <span className="glyphicon glyphicon-trash"> </span> Delete Entry</button>
                            ):""
                        }
                    </div>
                    <div className="col-md-4 pt-pb-10" align="center">
                        <button className="btn btn-primary btn-sm" onClick={handleSubmit}>Save</button>
                    </div>
                </div>
            {showGroup ? <ContactModal house_id={house_id} toggle={togglePopup} /> : null}        
        </div>
    )
}


const mapStateToProps = (state) => 
({
    insuranceDetails : state.Insurance.insuranceDetails.data,
    houseDetails: state.House.houseDetail.data,
    contactList : state.Contact.contacts.data,
    accountDetails : state.Account.accountDetails.data
    
});

const mapDispatchToProps = {
    addInsurance,
    getContact,
    getSingleInsurance,
    deleteInsurance
}

export default connect(mapStateToProps, mapDispatchToProps)(Insurance);