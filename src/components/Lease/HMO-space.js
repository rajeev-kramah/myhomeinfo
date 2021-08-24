import React, { useState,useEffect } from 'react';
import "../../style/House.css";
import { Link } from "react-router-dom";
import { addLease } from "../../store/Actions/Lease";
import { getHouseHmo } from "../../store/Actions/house";
import { connect } from "react-redux";
import Tab from "../../Reusable/Tab";

const HMOSpace = (props) => {
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

    useEffect(()=> {
        let data = {
            "house_id": houseId
        }
        props.getHouseHmo(data);    
    }, []);
    
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
                pathname: 'additional',
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
            pathname: 'realtor',
            state: {
                house_id : house_id
            }
        });
    } 

    const handleOnChange = (e) => {
        setHmo_space(e.target.value);
        for(var i=0; i<props.hmoDetails.length; i++){
            if(e.target.value === props.hmoDetails[i].name ) {
                setSpace_description(props.hmoDetails[i].description);
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

    return (
        <div className="container-fluid house">
            <h4>HMO Details</h4>
            <div className="house-form">
               <Tab loanPage="HMO spaces" tabs={tabs} id={id} house_id={house_id}/>
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8 house-form ">
                        <div className="row ">
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label htmlFor="name">Space Name</label>
                                    <select className="form-control" value={hmo_space} onChange={e=> handleOnChange(e)}>
                                        <option value="" disabled>Select</option>
                                        {
                                            props.hmoDetails ? (
                                                props.hmoDetails.map((data)=>{
                                                    return(<option value={data.name}>{data.name}</option>)
                                                })
                                            ): ""
                                        }
                                    </select>
                                    {/* <input type="text" placeholder="HMO Space Name" value={hmo_space} onChange={e=> setHmo_space(e.target.value)} className="form-control" readOnly/> */}
                                </div>
                            </div>
                            <div className="col-md-7">
                                <div className="form-group">
                                    <label htmlFor="description">Space Description</label>
                                    <input type="text" placeholder="HMO Space Description" value={space_description} onChange={e=> setSpace_description(e.target.value)} className="form-control" readOnly/>
                                </div>
                            </div>
                            {/* <div className="col-md-2 addHmo">
                                <button className="btn btn-primary btn-sm" onClick={handleSubmit}><span className="glyphicon glyphicon-plus"></span> ADD</button>
                            </div> */}
                        </div>
                    </div>
                    <div className="col-md-2"></div>
                </div>
                {/* <div className="row ">
                    <div className="col-md-2"></div>
                    <div className="col-md-8 house-form">
                        <table className="row table table-striped">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    
                                    house_id ? props.houseDetails.hmodetails.map((data)=>{
                                        return(<tr>
                                            <td>{data.name}</td>
                                            <td>{data.description}</td>
                                            <td>
                                                <Link to="" className="btn house-btn2"><span className="glyphicon glyphicon-remove"></span></Link>
                                            </td>
                                         </tr>
                                        )
                                    }) : ""
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-2"></div>
                </div> */}
                <div className="row footer ">
                    <div className="col-md-4"></div>
                    <div className="col-md-4 pt-pb-10" align="center">
                        <button className="btn btn-primary btn-sm" onClick={handleSubmit}>SAVE</button>
                    </div>
                    <div className="col-md-4">
                        <div className="btn-group pull-right" role="group" aria-label="...">
                            <button type="button" className="btn btn-primary btn-sm addNewItem " onClick={handlePrevious}><span className="glyphicon glyphicon-arrow-left"></span>Previous</button>
                            <button type="button" class="btn btn-default btn-sm addNewItem" onClick={handleSubmit}>Next <span className="glyphicon glyphicon-arrow-right"> </span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    houseDetails : state.House.houseDetail.data,
    leaseDetails : state.Lease.leaseDetails.data,
    hmoDetails : state.House.houseHmo.data
});

const mapDispatchToProps = {
    addLease,
    getHouseHmo
}

export default connect(mapStateToProps, mapDispatchToProps)(HMOSpace);
