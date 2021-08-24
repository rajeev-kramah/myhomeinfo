import React, { useState,useEffect } from 'react';
import "../../style/House.css";
import { connect } from "react-redux";
import { addLease } from "../../store/Actions/Lease";
import ContactModal from "../Contacts/Contact-Modal";
import { getContact } from "../../store/Actions/contact";
import Tab from "../../Reusable/Tab";

const Realtordetails = (props) => {

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

    // const [realtorImage, setRealtorImage] = useState('');
    const [showGroup, setShowGroup] = useState('');

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

    props.getContact({house_id: house_id});
    
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
                pathname: 'hmo',
                state: {
                    house_id : house_id
                }
            });
        }
    }

    const validate = () => {
        return true;
    }

    // const handleChangeImage = (event)=> {
    //     setDocument(URL.createObjectURL(event.target.files[0]));
    //     setRealtorImage(event.target.files[0])
    //   }
      
    const togglePopup = () => {
        setShowGroup(!showGroup);
        let data = {
            "house_id": house_id
        }
        props.getContact(data);
    };

    const handlePrevious = () => {
        props.history.push({
            pathname: 'tenant',
            state: {
                house_id : house_id
            }
        });
    } 

    const handleOnChange = (e) => {
        setRealtor_name(e.target.value);
        for(var i=0; i<props.contactList.length; i++){
            if(props.contactList[i]['groupname'] == "Expenses&Realtor" && e.target.value == props.contactList[i]['companyname']){
                setRealtor_phone(props.contactList[i].mono);
                setRealtor_email(props.contactList[i].email);
                break;
            }
        }
    }

    const tabs = [
        {pathname : "/Lease", label : "Lease"},
        {pathname : "/tenant", label : "Tenants "},
        {pathname : "/realtor", label : "Realtor"},
        {pathname : "/hmo", label : "HMO spaces"},
        {pathname : "/additional", label : "Additional Details"},
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
    
    if(window.document){
        const inputElement = window.document.getElementById('phoneNumberFormat');
        if(inputElement != null) {
            inputElement.addEventListener('keydown',enforceFormat);
            inputElement.addEventListener('keyup',formatToPhone);
        }
     }

    return (
        <div className="container-fluid house">
            {/* <ContactModal houseId={houseId} /> */}
            <h4>Realtor Details</h4>
            <div className="house-form">
                <Tab loanPage="Realtor" tabs={tabs} id={id} house_id={house_id}/>
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="row col-md-11">
                        <div className="col-md-4">
                            {/* <div className="form-group image">
                                <div className="input-group">
                                    <span className="input-group-btn">
                                        <span className="btn btn-default btn-file">
                                            Browse… <input type="file" id="imgInp" />
                                        </span>
                                    </span>
                                    <input  type="file" onChange={(event)=>handleChangeImage(event)} className="form-control fileUpload" readOnly/>
                                </div>
                                <div className="imageArea">
                                    <img
                                        src={document}
                                        alt="Upload Realtor Card"
                                        id="img-upload"
                                        className="img-rounded"
                                    />
                                </div>
                                    <div className="btn-group pull-left" role="group" aria-label="...">
                                        <button type="button" className="btn btn-primary btn-sm addNewItem attachments"><span className="glyphicon glyphicon-download-alt" id="down"></span>Download Attachment</button>
                                        <button type="button"  className="btn btn-primary btn-sm addNewItem attachments"><span className="glyphicon glyphicon-trash" id="down"></span>Delete Attachment</button>
                                    </div>
                            </div>  */}
                        </div>
                        <div className="col-md-7 house-form ">
                          
                                <div className="divWithContact realtor">
                                    <div className="form-group ">
                                        <label htmlFor="name">Realtor Name</label>
                                            <select className="form-control" value={realtor_name} onChange={(e)=>handleOnChange(e)}>
                                                <option value="" disabled>Select</option>
                                                {
                                                    props.contactList ? (
                                                        props.contactList.map((data)=>{
                                                            if(data.groupname == "Expenses&Realtor"){
                                                                return(
                                                                    <option value={data.companyname}>{data.companyname}</option>
                                                                )
                                                            }
                                                        })
                                                    ): ""
                                                }
                                            </select>
                                    </div>
                                    <div onClick={()=>togglePopup()} > <img className="addContactLogo" src={"assets/image/addContactIcon.png"} alt="AddContactLogo" /> </div>
                                </div>
                            
                            <div className="row ">
                                <div className="col-md-8">
                                    <div className="form-group ">
                                        <label htmlFor="phone">Realtor Phone No.</label>
                                        <input id="phoneNumberFormat" maxLength="12" type="text" placeholder="Phone Number" value={realtor_phone} onChange={e=> setRealtor_phone(e.target.value)} className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className="row ">
                                <div className="col-md-8">
                                    <div className="form-group ">
                                        <label htmlFor="email">Realtor Email</label>
                                        <input type="email" placeholder="Email" value={realtor_email} onChange={e=> setRealtor_email(e.target.value)} className="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2"></div>
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
            </div>
            {showGroup ? <ContactModal house_id={house_id} toggle={togglePopup} /> : null}
        </div>
    )
}

const mapStateToProps = (state) => ({
    contactList : state.Contact.contacts.data,
    leaseDetails : state.Lease.leaseDetails.data
})

const mapDispatchToProps = {
    addLease,
    getContact
}

export default connect(mapStateToProps, mapDispatchToProps)(Realtordetails);