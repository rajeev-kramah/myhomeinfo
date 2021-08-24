import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import "../../style/Loan.css";
import "../../style/House.css";
import { NotificationManager } from "react-notifications";
import { addLease, getSingleLease } from "../../store/Actions/Lease";
import Tab from "../../Reusable/Tab";

const AdditionalData = (props) => {

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

    const [docName, setDocName] = useState('');
    const [download, setDownload] = useState('');

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
            setDocName(props.leaseDetails[0].document.split('-')[1]);
            setDownload(props.leaseDetails[0].document);
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
        form.append("lastTab", true)
        
        let valid = validate();
        if(valid) {
            props.addLease(form)
            props.history.push({
                pathname: 'lease-list',
                state: {
                    house_id : house_id
                }
            });
        }
    }

    const validate = () => {
        return true;
    }

    const handleDocumentUpload = (event)=> {
        setDocument(event.target.files[0])
        setDocName(event.target.files[0]['name']);
    }

    const handlePrevious = () => {
        props.history.push({
            pathname: 'hmo',
            state: {
                house_id : house_id
            }
        });
    }

    const handleDelete = () => {
        let data = {
            id: id,
            delete: "doc"
        }
        props.getSingleLease(data);
        NotificationManager.error("Success Message", "Attachment deleted"); 
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
            <h4>Additional Details</h4>
            <div className="house-form">
                <Tab loanPage="Additional Details" tabs={tabs} id={id} house_id={house_id}/>
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6 house-form pt-25">

                        <div className="row ">
                            <div className="col-md-8">
                                <div className="form-group">
                                    <label htmlFor="attachment">Attachments</label>
                                    <label htmlFor="file" className="fileContainer">
                                        <div className="attachfile" align="center">
                                            <i>Click here to attach documents</i>
                                            <p>{docName ? docName : ""}</p>
                                           
                                        </div>
                                      <input type="file" style={{height:"0px"}} id="file" onChange={(event)=>handleDocumentUpload(event)} className="form-control" style={{"visibility":"hidden"}} />
                                    </label>
                                </div>
                            </div>

                            <div className="col-md-4" style={{marginTop: "2%"}}>
                                <a type="button"  className="btn btn-primary btn-sm addNewItem " href={download ? download : "javascript:void(0)"}><span className="glyphicon glyphicon-download-alt"> </span> Download Attachment</a>
                                <button type="button"  className="btn btn-primary btn-sm addNewItem " onClick={()=>handleDelete(id)}><span className="glyphicon glyphicon-trash"> </span> Delete Attachment </button>
                                </div>
                        </div>
                     
                        <div className="row ">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="Additional Details">Additional Details</label>
                                    <textarea rows="4" placeholder="Comments" value={comment} onChange={e=> setComment(e.target.value)} className="form-control"></textarea>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className="col-md-3">
                    </div>
                </div>
                <div className="row footer ">
                    <div className="col-md-4 pt-pb-10" align="center"></div>
                    <div className="col-md-4 pt-pb-10" align="center">
                        <button className="btn btn-primary btn-sm" onClick={handleSubmit}>SAVE</button>
                    </div>
                    <div className="col-md-4">
                        <div className="btn-group pull-right" role="group" aria-label="...">
                        <button type="button" class="btn btn-default btn-sm addNewItem" onClick={handlePrevious}><span className="glyphicon glyphicon-arrow-left"></span> Previous</button>
                            <button type="button"  className="btn btn-primary btn-sm addNewItem disable" disabled="disabled">Next <span className="glyphicon glyphicon-arrow-right"> </span></button>
                        </div>
                    </div>
                </div>
            </div>     
        </div>
    )
}


const mapStateToProps = (state) => ({
    leaseDetails : state.Lease.leaseDetails.data
});

const mapDispatchToProps = {
    addLease,
    getSingleLease
}

export default connect(mapStateToProps, mapDispatchToProps)(AdditionalData);