import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import "../../style/Loan.css";
import "../../style/House.css";
import { NotificationManager } from "react-notifications";
import { addWarranty } from "../../store/Actions/Warranty";
import { Util } from "../../Datamanipulation/Util";
import Tab from "../../Reusable/Tab";

const WarrantyDates = (props) => {

    const [id, setId] = useState('');
    const [warranty_provider, setWarranty_provider] = useState('');
    const [contact_person, setContact_person] = useState('');
    const [email, setEmail] = useState('');
    const [phone_no, setPhone_no] = useState('');
    const [website_url, setWebsite_url] = useState('');
    const [company_address, setCompany_address] = useState('');
    const [product_name, setProduct_name] = useState('');
    const [manufacturer_serial_no, setManufacturer_serial_no] = useState('');
    const [model_type, setModel_type] = useState('');
    const [model_no, setModel_no] = useState('');
    const [color, setColor] = useState('');
    const [product_price, setProduct_price] = useState('');
    const [mfg_warranty_start_date, setMfg_warranty_start_date] = useState(Util.getCurrentDate("-"));
    const [mfg_warranty_end_date, setMfg_warranty_end_date] = useState('');
    const [extended_warranty_start_date, setExtended_warranty_start_date] = useState(Util.getCurrentDate("-"));
    const [extended_warranty_end_date, setExtended_warranty_end_date] = useState('');
    const [installation_date, setInstallation_date] = useState('');
    const [installation_company_name, setInstallation_company_name] = useState('');
    const [installed_by, setInstalled_by] = useState('');
    const [contact_number, setContact_number] = useState('');
    const [installation_charges, setInstallation_charges] = useState('');
    const [comments, setComments] = useState('');
    const [image, setImage] = useState('');
    const [house_id, setHouse_id] = useState('');

    useEffect(()=> {
        if(props.warrantyDetails && props.warrantyDetails.length > 0) {
            setWarranty_provider(props.warrantyDetails[0].warranty_provider);
            setContact_person(props.warrantyDetails[0].contact_person);
            setEmail(props.warrantyDetails[0].email);
            setPhone_no(props.warrantyDetails[0].phone_no);
            setWebsite_url(props.warrantyDetails[0].website_url);
            setCompany_address(props.warrantyDetails[0].company_address);
            setProduct_name(props.warrantyDetails[0].product_name);
            setManufacturer_serial_no(props.warrantyDetails[0].manufacturer_serial_no);
            setModel_type(props.warrantyDetails[0].model_type);
            setModel_no(props.warrantyDetails[0].model_no);
            setColor(props.warrantyDetails[0].color);
            setProduct_price(props.warrantyDetails[0].product_price);
            setMfg_warranty_start_date(props.warrantyDetails[0].mfg_warranty_start_date);
            setMfg_warranty_end_date(props.warrantyDetails[0].mfg_warranty_end_date);
            setExtended_warranty_start_date(props.warrantyDetails[0].extended_warranty_start_date);
            setExtended_warranty_end_date(props.warrantyDetails[0].extended_warranty_end_date);
            setInstallation_date(props.warrantyDetails[0].installation_date);
            setInstallation_company_name(props.warrantyDetails[0].installation_company_name);
            setInstalled_by(props.warrantyDetails[0].installed_by);
            setContact_number(props.warrantyDetails[0].contact_number);
            setInstallation_charges(props.warrantyDetails[0].installation_charges);
            setComments(props.warrantyDetails[0].comments);
            setImage(props.warrantyDetails[0].image);
            setHouse_id(props.warrantyDetails[0].house_id);
            setId(props.warrantyDetails[0].id);
        }
    }, [props.warrantyDetails])

    const handleSubmit = () => {

        let data = {
            "warranty_provider": warranty_provider,
            "contact_person": contact_person,
            "email": email,
            "phone_no": phone_no,
            "website_url": website_url,
            "company_address": company_address,
            "product_name": product_name,
            "manufacturer_serial_no": manufacturer_serial_no,
            "model_type" : model_type,
            "model_no" : model_no,
            "color" : color,
            "product_price" : product_price,
            "mfg_warranty_start_date" : mfg_warranty_start_date,
            "mfg_warranty_end_date" : mfg_warranty_end_date,
            "extended_warranty_start_date" : extended_warranty_start_date,
            "extended_warranty_end_date" : extended_warranty_end_date,
            "installation_date" : installation_date,
            "installation_company_name" : installation_company_name,
            "installed_by" : installed_by,
            "contact_number" : contact_number,
            "installation_charges": installation_charges,
            "comments" : comments,
            "image" : image,
            "house_id": house_id,
            'id':id
        }
        var form = new FormData();
      
        for (const key in data) {
            form.append(key, data[key]);
        }
        
        let valid = validate();
        
        if(valid) {
            props.addWarranty(form)
            props.history.push({
                pathname: 'installation',
                state: {
                    house_id : house_id
                }
            }); 
        }
    }

    const validate = () => {
        
        let start = '';
        let end = '';

        if(mfg_warranty_end_date != '') {
            
            start = new Date(mfg_warranty_start_date);
            end = new Date(mfg_warranty_end_date);

            end = Math.floor(end.getTime() / 86400000);
            start = Math.floor(start.getTime() / 86400000);

            if(start > end) {
                NotificationManager.error("Error Message", "MFG Warranty End Date must be greater than MFG Warranty Start Date.");
                return false;
            }
        }
        if(extended_warranty_end_date != '') {
            
            start = new Date(extended_warranty_start_date);
            end = new Date(extended_warranty_end_date);

            end = Math.floor(end.getTime() / 86400000);
            start = Math.floor(start.getTime() / 86400000);

            if(start > end) {
                NotificationManager.error("Error Message", "Extended Warranty End Date must be greater than Extended Warranty Start Date.");
                return false;
            }
        }
        
        return true;
    }

    const handlePrevious = () => {
        props.history.push({
            pathname: 'warranty',
            state: {
                house_id : house_id
            }
        });
    }

    const tabs = [
        {pathname : "/provider", label : "Provider"},
        {pathname : "/warranty", label : "Product Details"},
        {pathname : "/warrantydates", label : "Warranty Dates"},
        {pathname : "/installation", label : "Installation Details"},
    ]
    return (
        <div className="container-fluid house">
            <h4>Add Warranty Dates</h4>
            <div className="house-form">
                <Tab  loanPage="Warranty Dates" tabs={tabs} id={id} house_id={house_id}/>
                <div className="row">
                    <div className="col-md-3"></div>
                     <div className="col-md-6">
                        
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="MFG Warranty Start Date">MFG Warranty Start Date</label>
                                    <input type="date" style={{textTransform:'uppercase'}} placeholder="MFG Warranty Start Date" value={ mfg_warranty_start_date} onChange={e=> {
                                            setMfg_warranty_start_date(e.target.value)
                                    }} className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="MFG Warranty End Date">MFG Warranty End Date</label>
                                    <input type="date" style={{textTransform:'uppercase'}} placeholder="MFG Warranty End Date" value={ mfg_warranty_end_date} onChange={e=> {
                                            setMfg_warranty_end_date(e.target.value)
                                    }} className="form-control" />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="Extended Warranty End Date">Extended Warranty Start Date</label>
                                    <input type="date" style={{textTransform:'uppercase'}} placeholder="Extended Warranty Start Date" value={extended_warranty_start_date} onChange={e=> {
                                            setExtended_warranty_start_date(e.target.value)
                                    }} className="form-control" />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="Extended Warranty End Date">Extended Warranty End Date</label>
                                    <input type="date" style={{textTransform:'uppercase'}} placeholder="Extended Warranty End Date" value={ extended_warranty_end_date} onChange={e=> {
                                            setExtended_warranty_end_date(e.target.value)
                                    }} className="form-control" />
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
                            <button type="button"  className="btn btn-primary btn-sm addNewItem " onClick={handleSubmit}>Next <span className="glyphicon glyphicon-arrow-right"> </span></button>
                        </div>
                    </div>
                </div>
            </div>           
        </div>
    )
}


const mapStateToProps = (state) => ({
    warrantyDetails : state.Warranty.warrantyDetails.data
});

const mapDispatchToProps = {
    addWarranty
}

export default connect(mapStateToProps, mapDispatchToProps)(WarrantyDates);