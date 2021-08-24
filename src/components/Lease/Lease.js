import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import "../../style/Loan.css";
import "../../style/House.css";
import { NotificationManager } from "react-notifications";
import { addLease, deleteLease, getSingleLease } from "../../store/Actions/Lease";
import Tab from "../../Reusable/Tab";
import { Util } from "../../Datamanipulation/Util";

const LenderDetails = (props) => {
    
    let houseId = props.location.state.house_id ? props.location.state.house_id : "";
    const [lease_begin,setLease_begin] = useState(Util.getCurrentDate("-"));
    const [lease_end,setLease_end] = useState(Util.getCurrentDate("-"));
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
                pathname: 'tenant',
                state: {
                    house_id : house_id
                }
            });
        }
    }

    const validate = () => {
        if(lease_begin.length === 0) {
            NotificationManager.error("Error Message", "Lease Begin date cannot be empty.");
            return false;
        } else if(lease_end.length === 0) {
            NotificationManager.error("Error Message", "Lease End date cannot be empty.");
            return false;
        } else if(frequency.length === 0) {
            NotificationManager.error("Error Message", "Frequency cannot be empty.");
            return false;
        } else if(rent.length === 0) {
            NotificationManager.error("Error Message", "Rent/Month cannot be empty.");
            return false;
        } else if(rental_insurance.length === 0) {
            NotificationManager.error("Error Message", "Rental Insurance cannot be empty.");
            return false;
        }

        let start = new Date(lease_begin);
        let end = new Date(lease_end);

        end = Math.floor(end.getTime() / 86400000);
        start = Math.floor(start.getTime() / 86400000);

        if(start > end) {
            NotificationManager.error("Error Message", "Lease End Date must be greater than Lease Start Date.");
            return false;
        }

        return true;
    }

    const handleDelete = () => {
        let data = {
            "id": id,
            "house_id": house_id
        }
        props.deleteLease(data)
        props.history.push({
            pathname: 'lease-list',
            state: {
                house_id : house_id
            }
        });
    }
    const tabs = [
        {pathname : "/Lease", label : "Lease"},
        {pathname : "/tenant", label : "Tenants "},
        {pathname : "/realtor", label : "Realtor"},
        {pathname : "/hmo", label : "HMO spaces"},
        {pathname : "/additional", label : "Additional Details"},
    ]

    return (
        <div className="container-fluid house">
            <h4>Add Lease Details</h4>
            <div className="house-form">
                <Tab loanPage="Lease" tabs={tabs} id={id} house_id={house_id}/>
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6 house-form pt-25">
              
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="lease_begin" className="req">Lease Begin Date</label>
                                    <input type="date" value={lease_begin} onChange={e=>setLease_begin(e.target.value)}className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="lease_end" className="req">Lease End Date</label>
                                    <input type="date" value={lease_end} onChange={e=>setLease_end(e.target.value)}className="form-control" />
                                </div>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="Frequency" className="req">Frequency</label>
                                    <select className="form-control" value={frequency} onChange={e=> setFrequency(e.target.value)} >
                                        <option value="" disabled>Select</option>
                                        <option value="Monthly">Monthly</option>
                                        <option value="Yearly">Yearly</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="lease_begin" className="req">Rent/Month</label>
                                    <input type="text" value={rent} onChange={e=>setRent(e.target.value)}className="form-control" />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="rent_due_by">Rent Due By</label>
                                    <input type="text" value={rent_due_by} onChange={e=>setRent_due_by(e.target.value)} className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="rental_insurance" className="req">Rental Insurance ? </label>
                                    <select className="form-control" value={rental_insurance} onChange={e=> setRental_insurance(e.target.value)} >
                                        <option value="" disabled>Select</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                    </div>
                </div>
                <div className="row footer ">
                    <div className="col-md-4">
                        {
                            id ? (
                                <button className="btn btn-default btn-sm addNewItem" onClick={handleDelete}>  <span className="glyphicon glyphicon-trash"> </span> Delete Entry</button>
                            ):""
                        }
                    </div>
                    <div className="col-md-4 pt-pb-10" align="center">
                        <button className="btn btn-primary btn-sm" onClick={handleSubmit}>SAVE</button>
                    </div>
                    <div className="col-md-4">
                        <div className="btn-group pull-right" role="group" aria-label="...">
                        <button type="button" className="btn btn-default btn-sm addNewItem disable" disabled="disabled"><span className="glyphicon glyphicon-arrow-left"></span> Previous</button>
                            <button type="button"  className="btn btn-primary btn-sm addNewItem" onClick={handleSubmit}>Next <span className="glyphicon glyphicon-arrow-right"> </span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    leaseDetails: state.Lease.leaseDetails.data,
});

const mapDispatchToProps = {
    addLease,
    getSingleLease,
    deleteLease
}

export default connect(mapStateToProps, mapDispatchToProps)(LenderDetails);