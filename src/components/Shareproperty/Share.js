import React, { useState, useEffect } from 'react';
import "../../style/Contact.css";
import { addShare, deleteShare } from "../../store/Actions/Share";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";


const Shareproperty = (props) => {
    const [id, setId] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [phono, setPhono] = useState('');
    const [email, setEmail] = useState('');
    const [accesslevel, setAccessLevel] = useState('');
    let house_id = props.location.state.house_id ? props.location.state.house_id : "";
   
    useEffect(()=> {
        console.log(props.shareDetails)
        if(props.shareDetails && props.shareDetails.length > 0){
            setFname(props.shareDetails[0].fname);
            setLname(props.shareDetails[0].lname);
            setPhono(props.shareDetails[0].phono);
            setEmail(props.shareDetails[0].email);
            setAccessLevel(props.shareDetails[0].accesslevel);
            setId(props.shareDetails[0].id);
        } 
    }, [props.shareDetails])

    const handleSubmit = () => {
        let data = {
            "fname": fname,
            "lname":lname,
            "phono" : phono,
            "email" : email,
            "accesslevel" : accesslevel,
            "house_id" : house_id,
            "owner_id" : "",
            "id": id,
            
        }
        
        let valid = validate();
        if(valid) {
            props.addShare(data);
            props.history.push(
                {
                    pathname : "share-list",
                    state : {house_id : house_id}
                }
            )
        }
    }

    const validate = () => {
        if(fname === "" || fname === undefined) {
            NotificationManager.error("Error Message", "First Name cannot be empty.");
            return false;
        } else if(email === "" || email === undefined) {
            NotificationManager.error("Error Message", "Email cannot be empty.");
            return false;
        }else if(lname === "" || lname === undefined){
            NotificationManager.error("Error Message", "Last Name cannot be empty.");
            return false;
        }
        
        return true;
    }

    const handleDelete = () => {
        let data = {
            "id": id,
            "house_id" : house_id
        }

        props.deleteShare(data);
        props.history.push(
            {
                pathname : "share-list",
                state : {house_id : house_id}
            }
        )
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
            <h4>Share Property</h4>
            <div className="contact-form">
                <div className="row pb-2">
                    <div className="col-md-3"></div>
                    <div className="col-md-6 house-form pt-25">
                        <div className="row">
                            <div className="col-md-6 ">
                                <div className="form-group">
                                    <label htmlFor="First Name" className="req">First Name</label>
                                    <input type="text" placeholder="First Name" value={fname} onChange={e=> setFname(e.target.value)} className="form-control" />
                                </div>
                            </div>

                            <div className="col-md-6 ">
                                <div className="form-group">
                                    <label htmlFor="Last Name" className="req">Last Name</label>
                                    <input type="text" placeholder="Last Name" value={lname} onChange={e=> setLname(e.target.value)} className="form-control" />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 ">
                                <div className="form-group">
                                    <label htmlFor="Phone No" className="">Phone No.</label>
                                    <input type="text" id="phoneNumberFormat" maxLength="12" placeholder="Phone No." value={phono} onChange={e=> setPhono(e.target.value)} className="form-control" />
                                </div>
                            </div>

                            <div className="col-md-6 ">
                                <div className="form-group">
                                    <label htmlFor="Sharing Email" className="req">Sharing Email</label>
                                    <input type="email" placeholder="Sharing Email" value={email} onChange={e=> setEmail(e.target.value)} className="form-control" />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 ">
                                <div className="form-group">
                                    <label htmlFor="name">Access Level</label>
                                        <select className="form-control" value={accesslevel} onChange={e=> setAccessLevel(e.target.value)}>
                                            <option value="" disabled>Select</option>
                                            <option value="Read-Only">Read-Only</option>
                                            <option value="Full-Access" >Full-Access</option>
                                        </select>
                                </div>

                            </div>
                        </div>
                        
                    </div>
    
                    <div className="col-md-3"></div>
                </div>

                <div className="row footer">
                    <div className="col-md-4">
                        {
                            id ? (
                                <button className="btn btn-default btn-sm addNewItem" onClick={handleDelete}>  <span className="glyphicon glyphicon-trash"> </span> Delete Entry</button>
                            ):""
                        }
                    </div>
                    <div className="col-md-4 pt-pb-10" align="center">
                        <button className="btn btn-primary btn-sm" onClick={handleSubmit}>Share It</button>
                    </div>
                </div>
            </div> 
        </div>
    )
}

const mapStateToProps = (state) => ({
    shareDetails: state.Share.shareDetails.data,
    houseDetails: state.House.houseDetail.data
});

const mapDispatchToProps = {
    addShare,
    deleteShare
}

export default connect(mapStateToProps, mapDispatchToProps)(Shareproperty);