import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import "../../style/Loan.css";
import "../../style/House.css";
import { NotificationManager } from "react-notifications";
import { addWarranty } from "../../store/Actions/Warranty";
import { Util } from "../../Datamanipulation/Util";
import Tab from "../../Reusable/Tab";
import NumberFormat from "react-number-format";

const Installtion = (props) => {

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
    const [mfg_warranty_end_date, setMfg_warranty_end_date] = useState(Util.getCurrentDate("-"));
    const [extended_warranty_start_date, setExtended_warranty_start_date] = useState(Util.getCurrentDate("-"));
    const [extended_warranty_end_date, setExtended_warranty_end_date] = useState(Util.getCurrentDate("-"));
    const [installation_date, setInstallation_date] = useState(Util.getCurrentDate("-"));
    const [installation_company_name, setInstallation_company_name] = useState('');
    const [installed_by, setInstalled_by] = useState('');
    const [contact_number, setContact_number] = useState('');
    const [installation_charges, setInstallation_charges] = useState('');
    const [comments, setComments] = useState('');
    const [image, setImage] = useState('');
    const [house_id, setHouse_id] = useState('');
    const [previewImage, setPreviewImage] = useState("");

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
            setMfg_warranty_start_date(props.warrantyDetails[0].mfg_warranty_start_date ? props.warrantyDetails[0].mfg_warranty_start_date : Util.getCurrentDate("-"));
            setMfg_warranty_end_date(props.warrantyDetails[0].mfg_warranty_end_date ? props.warrantyDetails[0].mfg_warranty_end_date : Util.getCurrentDate("-"));
            setExtended_warranty_start_date(props.warrantyDetails[0].extended_warranty_start_date ? props.warrantyDetails[0].extended_warranty_start_date : Util.getCurrentDate("-"));
            setExtended_warranty_end_date(props.warrantyDetails[0].extended_warranty_end_date ?props.warrantyDetails[0].extended_warranty_end_date : Util.getCurrentDate("-"));
            setInstallation_date(props.warrantyDetails[0].installation_date ? props.warrantyDetails[0].installation_date:Util.getCurrentDate("-"));
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

        form.append("InstalltionImage", image);
        form.append("lastTab", true)

        let valid = validate();
        if(valid) {
            props.addWarranty(form);
            props.history.push({
                pathname: 'warranty-list',
                state: {
                    house_id : house_id
                }
            }); 
        }
    }

    const handleChangeImage = (event)=> {
        setPreviewImage(URL.createObjectURL(event.target.files[0]));
        setImage(event.target.files[0]);
    }

    const validate = () => {
        if(contact_number === '') {
            NotificationManager.error("Error Message", "Contact number cannot be empty.");
            return false;
        }
        return true;
    }

    const handlePrevious = () => {
        props.history.push({
            pathname: 'warrantydates',
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
        <div className="container-fluid house">
            <h4>Add Installation Details</h4>
            <div className="house-form">
                <Tab loanPage="Installation Details" tabs={tabs} id={id} house_id={house_id}/>
                <div className="row installdetails">
                    <div className="col-md-1"></div>
                    <div className="col-md-9 house-form pt-25">
                       <div className="row">
                           <div className="col-md-2">
                                {/* <div className="form-group imageUpload">
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
                                                src={previewImage}
                                                alt="Upload Warranty Image"
                                                className="img-rounded"
                                                id="img-upload"
                                            />
                                        </div>
                                    </div>  */}
                           </div>
                           <div className="col-md-8">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="Installtion Date" className="">Installtion Date</label>
                                        <input type="date" style={{textTransform:'uppercase'}} placeholder="Installtion Date" value={ installation_date} onChange={e=> {
                                            setInstallation_date(e.target.value)
                                        }} className="form-control"/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="Installtion Company Name" className="">Installtion Company Name</label>
                                            <input type="text" placeholder="Installtion Company Name" value={ installation_company_name} onChange={e=>{
                                                setInstallation_company_name(e.target.value)
                                            }} className="form-control" />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="Installed By" className="">Installed By</label>
                                        <input type="text" placeholder="Installed By" value={installed_by} onChange={e=> setInstalled_by(e.target.value)} className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="Contact Number" className="req">Contact Number</label>
                                        <input id="phoneNumberFormat" maxLength="12" type="text" placeholder="Contact Number" value={contact_number} onChange={e=> setContact_number(e.target.value)} className="form-control" />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="Installation Charges" className="">Installation Charges</label>
                                        <NumberFormat
                                        placeholder="Installtion Charges"
                                        thousandsGroupStyle="thousand"
                                        className="form-control alignRight"
                                        value={installation_charges ? installation_charges : 0}
                                        decimalSeparator="."
                                        type="text"
                                        thousandSeparator={true}
                                        allowNegative={true}
                                        decimalScale={2}
                                        fixedDecimalScale={true}
                                        allowEmptyFormatting={true}
                                        allowLeadingZeros={false}
                                        onChange={e =>setInstallation_charges(e.target.value)}
                                        isNumericString={true} />
                                        {/* <input type="text" placeholder="Installation Charges" value={Util.addCommas(installation_charges ? installation_charges : 0)} onChange={e=> setInstallation_charges(e.target.value)} className="form-control" /> */}
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="comments">Comments</label>
                                        <textarea rows="4" placeholder="Comments" value={comments} onChange={e=> setComments(e.target.value)} className="form-control"></textarea>
                                    </div>
                                </div>
                            </div>
                          </div>
                            <div className="col-md-2"></div>
                        </div>
                    </div>
                    <div className="col-md-1"></div>
                </div>
                <div className="row footer ">
                    <div className="col-md-4"></div>
                    <div className="col-md-4 pt-pb-10" align="center">
                        <button className="btn btn-primary btn-sm" onClick={handleSubmit}>SAVE</button>
                    </div>
                    <div className="col-md-4">
                        <div className="btn-group pull-right" role="group" aria-label="...">
                            <button type="button" className="btn btn-primary btn-sm addNewItem " onClick={handlePrevious}><span className="glyphicon glyphicon-arrow-left"></span>Previous</button>
                            {/* <button type="button"  className="btn btn-primary btn-sm addNewItem " onClick={handleSubmit}>Next <span className="glyphicon glyphicon-arrow-right"> </span></button> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Installtion);