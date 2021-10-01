import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import "../../style/Loan.css";
import "../../style/House.css";
import { NotificationManager } from "react-notifications";
import { addWarranty } from "../../store/Actions/Warranty";
import { Util } from "../../Datamanipulation/Util";
import Tab from "../../Reusable/Tab";
import NumberFormat from "react-number-format";

const Warranty = (props) => {

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
    const [mfg_warranty_start_date, setMfg_warranty_start_date] = useState('');
    const [mfg_warranty_end_date, setMfg_warranty_end_date] = useState('');
    const [extended_warranty_start_date, setExtended_warranty_start_date] = useState('');
    const [extended_warranty_end_date, setExtended_warranty_end_date] = useState('');
    const [installation_date, setInstallation_date] = useState('');
    const [installation_company_name, setInstallation_company_name] = useState('');
    const [installed_by, setInstalled_by] = useState('');
    const [contact_number, setContact_number] = useState('');
    const [installation_charges, setInstallation_charges] = useState('');
    const [comments, setComments] = useState('');
    const [image, setImage] = useState('');
    const [house_id, setHouse_id] = useState('');

    useEffect(() => {
        if (props.warrantyDetails && props.warrantyDetails.length > 0) {
            setWarranty_provider(props.warrantyDetails[0].warranty_provider);
            setContact_person(props.warrantyDetails[0].contact_person);
            setEmail(props.warrantyDetails[0].email);
            setPhone_no(props.warrantyDetails[0].phone_no);
            setWebsite_url(props.warrantyDetails[0].website_url);
            setCompany_address(props.warrantyDetails[0].company_address);
            setProduct_name(props.warrantyDetails[0].product_name);
            setManufacturer_serial_no(props.warrantyDetails[0].manufacturer_serial_no == "NULL" || props.warrantyDetails[0].manufacturer_serial_no == null ? "" : props.warrantyDetails[0].manufacturer_serial_no);
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
            "model_type": model_type,
            "model_no": model_no,
            "color": color,
            "product_price": product_price,
            "mfg_warranty_start_date": mfg_warranty_start_date,
            "mfg_warranty_end_date": mfg_warranty_end_date,
            "extended_warranty_start_date": extended_warranty_start_date,
            "extended_warranty_end_date": extended_warranty_end_date,
            "installation_date": installation_date,
            "installation_company_name": installation_company_name,
            "installed_by": installed_by,
            "contact_number": contact_number,
            "installation_charges": installation_charges,
            "comments": comments,
            "image": image,
            "house_id": house_id,
            'id': id
        }
        var form = new FormData();

        for (const key in data) {
            form.append(key, data[key]);
        }

        let valid = validate();
        if (valid) {
            props.addWarranty(form)
            props.history.push({
                pathname: 'warrantydates',
                state: {
                    house_id: house_id
                }
            });
        }
    }

    const validate = () => {
        if (product_name === '') {
            NotificationManager.error("Error Message", "Product name cannot be empty.");
            return false;
        }
        return true;
    }

    const handlePrevious = () => {
        props.history.push({
            pathname: 'provider',
            state: {
                house_id: house_id
            }
        });
    }

    const handleDelete = (id) => {
        // props.getSingleLoan({id : id, delete : "doc"})
        NotificationManager.error("Success Message", "Attachment deleted");
    }

    const tabs = [
        { pathname: "/provider", label: "Provider" },
        { pathname: "/warranty", label: "Product Details" },
        { pathname: "/warrantydates", label: "Warranty Dates" },
        { pathname: "/installation", label: "Installation Details" },
    ]

    return (
        <div className="container-fluid house">
            <h4>Add Warranty Item Details</h4>
            <div className="house-form">
                <Tab loanPage="Product Details" tabs={tabs} id={id} house_id={house_id} />
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="Product Name" className="req">Product Name</label>
                                    <input type="text" placeholder="Product Name" value={product_name} onChange={e => {
                                        setProduct_name(e.target.value)
                                    }} className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="Manufacturer">Manufacturer Serial No.</label>
                                    <input type="text" placeholder="Manufacturer Serial No" value={manufacturer_serial_no} onChange={e => {
                                        setManufacturer_serial_no(e.target.value)
                                    }} className="form-control" />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="Model Type">Model Type</label>
                                    <input type="text" placeholder="Model Type" value={model_type} onChange={e => {
                                        setModel_type(e.target.value)
                                    }} className="form-control" />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="Model Number">Model Number</label>
                                    <input type="text" placeholder="Model Number" value={model_no} onChange={e => {
                                        setModel_no(e.target.value)
                                    }} className="form-control" />
                                </div>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="Color" className="">Color</label>
                                    <input type="text" placeholder="Color" value={color} onChange={e => {
                                        setColor(e.target.value)
                                    }} className="form-control" />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="Product Price" className="">Product Price</label>
                                    <NumberFormat
                                        placeholder="Product Price"
                                        thousandsGroupStyle="thousand"
                                        className="form-control"
                                        value={product_price ? product_price : 0}
                                        decimalSeparator="."
                                        type="text"
                                        thousandSeparator={true}
                                        allowNegative={true}
                                        decimalScale={2}
                                        fixedDecimalScale={true}
                                        allowEmptyFormatting={true}
                                        allowLeadingZeros={false}
                                        onChange={e => setProduct_price(e.target.value)}
                                        isNumericString={true} />
                                    {/* <input type="text" placeholder="Product Price" value={ Util.addCommas(product_price ? product_price : 0)} onChange={e=> {
                                            setProduct_price(e.target.value)
                                    }} className="form-control" /> */}
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
                            <button type="button" className="btn btn-primary btn-sm addNewItem " onClick={handleSubmit}>Next <span className="glyphicon glyphicon-arrow-right"> </span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    warrantyDetails: state.Warranty.warrantyDetails.data
});

const mapDispatchToProps = {
    addWarranty
}

export default connect(mapStateToProps, mapDispatchToProps)(Warranty);