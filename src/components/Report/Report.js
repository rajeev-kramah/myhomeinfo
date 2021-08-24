import React, { useState, useEffect } from 'react';
import "../../style/Contact.css";
import { addContact, deleteContact } from "../../store/Actions/contact";
import { connect } from "react-redux";


const Report = (props) => {
     
    const [companyname, setCompanyname] = useState('');
    const [fromdate, setFromdate] = useState('');
    const [todate, setTodate] = useState('');
    let house_id = props.location.state.house_id ? props.location.state.house_id : "";
   
    useEffect(()=> {
      
    }, [props.contactDetails])

    const handleSubmit = () => {
       
    }
    
    return (
        <div className="container-fluid contact">
            <h4>Report Details</h4>
            <div className="contact-form">
                <div className="row pb-2">
                    <div className="col-md-2"></div>
                    <div className="col-md-8 house-form pt-25">
                        <div className="row">
                            <div className="col-md-4 ">
                                <div className="form-group">
                                    <label htmlFor="First Name" className="">Group/Company Name</label>
                                    <input type="text" placeholder="Group/Company Name" value={companyname} onChange={e=> setCompanyname(e.target.value)} className="form-control" />
                                </div>
                            </div>

                            <div className="col-md-4 ">
                                <div className="form-group">
                                    <label htmlFor="From Date" className="">From Date</label>
                                    <input type="date" placeholder="From Date" value={fromdate} onChange={e=> setFromdate(e.target.value)} className="form-control" />
                                </div>
                            </div>

                            <div className="col-md-4 ">
                                <div className="form-group">
                                    <label htmlFor="To Date" className="">To Date</label>
                                    <input type="text" placeholder="To Date" value={todate} onChange={e=> setTodate(e.target.value)} className="form-control" />
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <div className="col-md-2"></div>
                </div>

                <div className="row footer">
                    <div className="col-md-4"></div>
                    <div className="col-md-4 pt-pb-10" align="center">
                        <button className="btn btn-primary btn-sm" onClick={handleSubmit}>Share It</button>
                    </div>
                </div>
            </div> 
        </div>
    )
}

const mapStateToProps = (state) => ({
    contactDetails: state.Contact.contactDetails.data,
    // contacts: state.Contact.contacts.data,
    houseDetails: state.House.houseDetail.data
});

const mapDispatchToProps = {
    addContact,
    deleteContact
}

export default connect(mapStateToProps, mapDispatchToProps)(Report);