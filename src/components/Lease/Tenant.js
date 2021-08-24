import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import "../../style/Loan.css";
import "../../style/House.css";
import { NotificationManager } from "react-notifications";
import { addLease, getSingleLease } from "../../store/Actions/Lease";
import { Util } from "../../Datamanipulation/Util";
import Tab from "../../Reusable/Tab";
import { getContact } from "../../store/Actions/contact";
import ContactModal from "../Contacts/Contact-Modal";


const Tenant = (props) => {
    
    let houseId = props.location.state.house_id ? props.location.state.house_id : "";
    
    const [lease_begin,setLease_begin] = useState('');
    const [lease_end,setLease_end] = useState('');
    const [frequency,setFrequency] = useState('');
    const [rent,setRent] = useState('');
    const [rent_due_by,setRent_due_by] = useState('');
    const [rental_insurance,setRental_insurance] = useState('');
    const [tenant_name1,setTenant_name1] = useState('');
    const [tenant_email1,setTenant_email1] = useState('');
    const [tenant_phone1,setTenant_phone1] = useState('');
    const [tenant_name2,setTenant_name2] = useState('');
    const [tenant_email2,setTenant_email2] = useState('');
    const [tenant_phone2,setTenant_phone2] = useState('');
    const [people,setPeople] = useState('');
    const [pets,setPets] = useState('');
    const [deposit,setDeposit] = useState('');
    const [renewed,setRenewed] = useState('');
    const [realtor_name, setRealtor_name] = useState("");
    const [realtor_phone, setRealtor_phone] = useState("");
    const [realtor_email, setRealtor_email] = useState("");
    const [hmo_space, setHmo_space] = useState('');
    const [space_description, setSpace_description] = useState('');
    const [document, setDocument] = useState('');
    const [comment,setComment] = useState('');
    const [id, setId] = useState('');
    const [house_id, setHouse_id] = useState(houseId);
    const [showGroup, setShowGroup] = useState(false);

    useEffect(()=> {
        if(props.leaseDetails && props.leaseDetails.length > 0) {
            setId(props.leaseDetails[0].id);
            setLease_begin(props.leaseDetails[0].lease_begin);
            setLease_end(props.leaseDetails[0].lease_end);
            setFrequency(props.leaseDetails[0].frequency);
            setRent(props.leaseDetails[0].rent);
            setRent_due_by(props.leaseDetails[0].rent_due_by);
            setRental_insurance(props.leaseDetails[0].rental_insurance);
            setTenant_name1(props.leaseDetails[0].tenant_name1);
            setTenant_email1(props.leaseDetails[0].tenant_email1);
            setTenant_phone1(props.leaseDetails[0].tenant_phone1);
            setTenant_name2(props.leaseDetails[0].tenant_name2);
            setTenant_email2(props.leaseDetails[0].tenant_email2);
            setTenant_phone2(props.leaseDetails[0].tenant_phone2);
            setPeople(props.leaseDetails[0].people);
            setPets(props.leaseDetails[0].pets);
            setDeposit(props.leaseDetails[0].deposit);
            setRenewed(props.leaseDetails[0].renewed);
            setRealtor_name(props.leaseDetails[0].realtor_name);
            setRealtor_phone(props.leaseDetails[0].realtor_phone);
            setRealtor_email(props.leaseDetails[0].realtor_email);
            setHmo_space(props.leaseDetails[0].hmo_space);
            setSpace_description(props.leaseDetails[0].space_description);
            setDocument(props.leaseDetails[0].document);
            setComment(props.leaseDetails[0].comment);
            setHouse_id(props.leaseDetails[0].house_id);
        }
    }, [props.leaseDetails]);



    const togglePopup = () => {
        setShowGroup(!showGroup);
        let data = {
            house_id : house_id
        }
        props.getContact(data);
    };
    
    const handleSubmit = () => {
        let data = {
            "id": id,
            "lease_begin": lease_begin,
            "lease_end": lease_end,
            "frequency": frequency,
            "rent": rent,
            "rent_due_by": rent_due_by,
            "rental_insurance": rental_insurance,
            "tenant_name1": tenant_name1,
            "tenant_email1": tenant_email1,
            "tenant_phone1": tenant_phone1,
            "tenant_name2": tenant_name2,
            "tenant_email2": tenant_email2,
            "tenant_phone2": tenant_phone2,
            "people": people,
            "pets": pets,
            "deposit": deposit,
            "renewed": renewed,
            "realtor_name": realtor_name,
            "realtor_phone": realtor_phone,
            "realtor_email": realtor_email,
            "hmo_space": hmo_space,
            "space_description": space_description,
            "comment": comment,
            "house_id": house_id
        }

        var form = new FormData();

        for (const key in data) {
            form.append(key, data[key]);
        }

        form.append("document", document);

        let valid = validate();
        if(valid) {
            props.addLease(form)
            props.history.push({
                pathname: 'realtor',
                state: {
                    house_id : house_id
                }
            });
        }
    }

    const validate = () => {
        if(tenant_name1 === '') {
            NotificationManager.error("Error Message", "Tenant1 Name cannot be empty.");
            return false;
        } else if(tenant_name1 === '') {
            NotificationManager.error("Error Message", "Tenant1 Phone cannot be empty.");
            return false;
        }
        return true;
    }

    const handlePrevious = () => {
        props.history.push({
            pathname: 'lease',
            state: {
                house_id : house_id
            }
        });
    } 

    const tabs = [
        {pathname : "/Lease", label : "Lease"},
        {pathname : "/tenant", label : "Tenants"},
        {pathname : "/realtor", label : "Realtor"},
        {pathname : "/hmo", label : "HMO spaces"},
        {pathname : "/additional", label : "Additional Details"},
    ]



    const handleOnChange1 = (e) => {
        setTenant_name1(e.target.value);
        for(var i=0; i<props.contactList.length; i++){
            if(e.target.value === props.contactList[i]['companyname']){
                setTenant_email1(props.contactList[i].contactperson);
                setTenant_phone1(props.contactList[i].mono);
                break;
            }
        }
    }


    const handleOnChange2 = (e) => {
        setTenant_name2(e.target.value);
        for(var i=0; i<props.contactList.length; i++){
            if(e.target.value === props.contactList[i]['companyname']){
                setTenant_email2(props.contactList[i].contactperson);
                setTenant_phone2(props.contactList[i].mono);
                break;
            }
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
    
   
     if(window.document){
        const inputElement = window.document.getElementById('phoneNumberFormat');
        if(inputElement != null) {
            inputElement.addEventListener('keydown',enforceFormat);
            inputElement.addEventListener('keyup',formatToPhone);
        }
    
     }

     if(window.document){
        const inputElement = window.document.getElementById('phoneNumberFormat1');
        if(inputElement != null) {
            inputElement.addEventListener('keydown',enforceFormat);
            inputElement.addEventListener('keyup',formatToPhone);
        }
    
     }

    return (
        <div className="container-fluid house">
            <h4>Add Lease Details</h4>
            <div className="house-form">
               <Tab loanPage="Tenants" tabs={tabs} id={id} house_id={house_id}/>
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6 house-form pt-25">
                        <div className="divWithContact">
                                <div className="form-group">
                                    <label htmlFor="Tenant 1 Name">Tenant 1 Name</label>
                                        <select className="form-control" value={tenant_name1} onChange={e=> handleOnChange1(e)}>
                                            <option value="" disabled>Select</option>
                                        
                                            {
                                                props.contactList ? (
                                                    props.contactList.map((data)=>{
                                                       
                                                            return(
                                                                <option value={data.companyname}>{data.companyname}</option>
                                                            )
                                                      
                                                    })
                                                ): ""
                                            }
                                        </select>
                                </div>
                            
                                <div className="form-group">
                                    <label htmlFor="Tenant 1 Email">Tenant 1 Email</label>
                                    <input type="email" value={tenant_email1} onChange={e=>setTenant_email1(e.target.value)} className="form-control" />
                                </div>
                            
                                <div className="form-group">
                                    <label htmlFor="Tenant 1 Phono">Tenant 1 Phone</label>
                                    <input type="text" id="phoneNumberFormat" maxLength="12" value={tenant_phone1} onChange={e => setTenant_phone1(e.target.value)} onKeyDown={e=> enforceFormat} onKeyUp={e=> formatToPhone} className="form-control" />
                                </div>
                            
                             <div>
                                <img onClick={()=>togglePopup()} className="addContactLogo" src={"assets/image/addContactIcon.png"} alt="AddContactLogo"/>
                            </div>
                            
                            
                        </div>

                        <div className="divWithContact">
                            
                                <div className="form-group">
                                    <label htmlFor="Tenant 2 Name">Tenant 2 Name</label>
                                    <select className="form-control" value={tenant_name2} onChange={e=> handleOnChange2(e)}>
                                            <option value="" disabled>Select</option>
                                        
                                            {
                                                props.contactList ? (
                                                    props.contactList.map((data)=>{
                                                       
                                                            return(
                                                                <option value={data.companyname}>{data.companyname}</option>
                                                            )
                                                      
                                                    })
                                                ): ""
                                            }
                                        </select>
                                </div>
                            
                                <div className="form-group">
                                    <label htmlFor="Tenant 2 Email">Tenant 2 Email</label>
                                    <input type="email" value={tenant_email2} onChange={e=>setTenant_email2(e.target.value)} className="form-control" />
                                </div>
                            
                                <div className="form-group">
                                    <label htmlFor="Tenant 2 Phono">Tenant 2 Phone</label>
                                    <input type="text" value={tenant_phone2} id="phoneNumberFormat1" maxLength="12" onChange={e=>setTenant_phone2(e.target.value)} className="form-control" />
                                </div>
                            
                                <img onClick={()=>togglePopup()} className="addContactLogo" src={"assets/image/addContactIcon.png"} alt="AddContactLogo"/>
                         
                        </div>


                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="No of people">No. of people</label>
                                    <input type="text" value={people} onChange={e=>setPeople(e.target.value)} className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="No. of pets">No. of pets</label>
                                    <input type="email" value={pets} onChange={e=>setPets(e.target.value)} className="form-control" />
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="Security Deposit">Security Deposit</label>
                                    <input type="text" value={deposit} onChange={e=>setDeposit(e.target.value)} className="form-control" />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="Renewed">Renewed ?</label>
                                    <select className="form-control" value={renewed} onChange={e=> setRenewed(e.target.value)} >
                                        <option value="" disabled>Select</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-3"></div>
                </div>
                <div className="row footer ">
                    <div className="col-md-3"></div>
                    <div className="col-md-4 pt-pb-10" align="center">
                        <button className="btn btn-primary btn-sm" onClick={handleSubmit}>SAVE</button>
                    </div>
                    <div className="col-md-5">
                        <div className="btn-group pull-right" role="group" aria-label="...">
                            <button type="button" className="btn btn-primary btn-sm addNewItem " onClick={handlePrevious}><span className="glyphicon glyphicon-arrow-left"></span>Previous</button>
                            <button type="button"  className="btn btn-primary btn-sm addNewItem " onClick={handleSubmit}>Next <span className="glyphicon glyphicon-arrow-right"> </span></button>
                        </div>
                    </div>
                </div>
            </div>
            {showGroup ? <ContactModal house_id={house_id} toggle={togglePopup} /> : null}                   
        </div>
    )
}


const mapStateToProps = (state) => ({
    leaseDetails : state.Lease.leaseDetails.data,
    contactList : state.Contact.contacts.data
});

const mapDispatchToProps = {
    addLease,
    getContact,
    getSingleLease
}

export default connect(mapStateToProps, mapDispatchToProps)(Tenant);