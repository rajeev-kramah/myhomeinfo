import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import "../../style/Loan.css";
import "../../style/House.css";
import { NotificationManager } from "react-notifications";
import { addLoan, deleteLoan,getLoanTransaction } from "../../store/Actions/Loan";
import ContactModal from "../Contacts/Contact-Modal";
import { getContact } from "../../store/Actions/contact";
import Tab from "../../Reusable/Tab";

const LenderDetails = (props) => {

    let houseid = props.location.state.house_id ? props.location.state.house_id : "";

    const [loantype, setLoantype] = useState('');
    const [lname, setLname] = useState('');
    const [lcontactperson, setLcontactperson] = useState('');
    const [laddress, setLaddress] = useState('');
    const [lphno, setLphno] = useState('');
    const [lemail, setLemail] = useState('');
    const [lurl, setLurl] = useState('');
    const [purchaseprice, setPurchaseprice] = useState('');
    const [downpayment, setDownpayment] = useState('');
    const [loanamount, setLoanamount] = useState('');
    const [rateofinterest, setRateofinterest] = useState('');
    const [loanterm, setLoanterm] = useState('');
    const [loannumber, setLoannumber] = useState('');
    const [escrow, setEscrow] = useState('');
    const [mortgage, setMortgage] = useState('');
    const [loanbegindate, setLoanbegindate] = useState('');
    const [propertytax, setPropertytax] = useState('');
    const [additionaldetails, setAdditionaldetails] = useState('');
    const [loanclosuredate, setLoanclosuredate] = useState('');
    const [status, setStatus] = useState('');
    const [house_id, setHouse_id] = useState(houseid);
    const [id, setId] = useState('');
    const [escrowstatus, setEscrowstatus] = useState('');
    const [doc_path, setDoc_path] = useState('');
    const [showGroup, setShowGroup] = useState(false);
    const [ptaxpayee, setPropertytaxPayee] = useState('');
    const [escrowpayee, setEscrowPayee] = useState('');
    const [escrowamount, setEscrowAmount] = useState('');
    const [renewal_maturity_date, setRenewal_maturity_date] = useState('');
    const [renewal_intrest_rate, setRenewal_intrest_rate] = useState('');
    if(props.loanDetails && props.loanDetails.length > 0) {
        props.getLoanTransaction({loan_id:props.loanDetails[0].id});
    }
    useEffect(()=> {
        if(props.loanDetails && props.loanDetails.length > 0) {
            setLoantype(props.loanDetails[0].loantype);
            setEscrowAmount(props.loanDetails[0].escrowamount);
            setLname(props.loanDetails[0].lname);
            setLcontactperson(props.loanDetails[0].lcontactperson);
            setLaddress(props.loanDetails[0].laddress);
            setLphno(props.loanDetails[0].lphno);
            setLemail(props.loanDetails[0].lemail);
            setLurl(props.loanDetails[0].lurl);
            setPurchaseprice(props.loanDetails[0].purchaseprice);
            setDownpayment(props.loanDetails[0].downpayment);
            setLoanamount(props.loanDetails[0].loanamount);
            setRateofinterest(props.loanDetails[0].rateofinterest);
            setLoanterm(props.loanDetails[0].loanterm);
            setLoannumber(props.loanDetails[0].loannumber);
            setEscrow(props.loanDetails[0].escrow);
            setEscrowPayee(props.loanDetails[0].escrowPayee)
            setMortgage(props.loanDetails[0].mortgage);
            setLoanbegindate(props.loanDetails[0].loanbegindate);
            setPropertytax(props.loanDetails[0].propertytax);
            setAdditionaldetails(props.loanDetails[0].additionaldetails);
            setLoanclosuredate(props.loanDetails[0].loanclosuredate);
            setStatus(props.loanDetails[0].status);
            setHouse_id(props.loanDetails[0].house_id);
            setId(props.loanDetails[0].id);
            setEscrowstatus(props.loanDetails[0].escrowstatus);
            setDoc_path(props.loanDetails[0].doc_path);
            setPropertytaxPayee(props.loanDetails[0].propertytaxPayee);
            setRenewal_maturity_date(props.loanDetails[0].renewal_maturity_date);
            setRenewal_intrest_rate(props.loanDetails[0].renewal_intrest_rate);
        }

        let data = {
            "house_id":houseid
        }
        props.getContact(data);
    }, [props.loanDetails])

    const handleSubmit = () => {
        
        let data = {
            "loantype": loantype,
            "lname": lname,
            "lcontactperson": lcontactperson,
            "laddress": laddress,
            "lphno": lphno,
            "lemail": lemail,
            "lurl": lurl,
            "purchaseprice": purchaseprice,
            "downpayment" : downpayment,
            "loanamount" : loanamount,
            "rateofinterest" : rateofinterest,
            "loanterm" : loanterm,
            "loannumber" : loannumber,
            "escrow" : escrow,
            "mortgage" : mortgage,
            "loanbegindate" : loanbegindate,
            "propertytax" : propertytax,
            "additionaldetails" : additionaldetails,
            "loanclosuredate" : loanclosuredate,
            "status" : status,
            "house_id": house_id,
            'id':id,
            'escrowstatus': escrowstatus,
            "doc_path": doc_path,
            "propertytaxPayee" : ptaxpayee,
            "escrowPayee" : escrowpayee,
            'escrowamount' : escrowamount,
            'renewal_maturity_date' : renewal_maturity_date,
            'renewal_intrest_rate' : renewal_intrest_rate
        }
        let valid = validate();
        if(valid) {
            props.addLoan(data)
            props.history.push({
                pathname: 'loan-details',
                state: {
                    house_id : house_id
                }
            }); 
        }
    }

    const validate = () => {
        if(loantype === '') {
            NotificationManager.error("Error Message", "Loan Type cannot be empty.");
            return false;
        }
        return true;
    }

    const togglePopup = () => {
        setShowGroup(!showGroup);
        let data = {
            "house_id": house_id
        }
        props.getContact(data);
    };

    const handleOnChange = (e) => {
        setLname(e.target.value);
        for(var i=0; i<props.contactList.length; i++){
            if(e.target.value == props.contactList[i]['id']){
                setLaddress(props.contactList[i].address);
                setLphno(props.contactList[i].mono);
                setLemail(props.contactList[i].email);
                setLcontactperson(props.contactList[i].contactperson);
                break;
            }
        }
    }

    const handleDelete = () => {
        let data = {
            "id": id,
            "house_id": house_id
        }
        props.deleteLoan(data)
        props.history.push({
            pathname: 'loan-list',
            state: {
                house_id : house_id
            }
        });
    }

    let tabs = [
        {pathname : "/loan-lender", label : "Lender Details"},
        {pathname : "/loan-details", label : "Loan Details"}
    ]

    if(loantype === 'Mortgage') {
        tabs.push({pathname : "/loan-additionals", label : "Escrow & Property Tax"});
    }

    tabs.push({pathname : "/loan-transaction", label : "Loan Transactions"});

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
            <h4>Add Loan Details</h4>
            <div className="house-form">
                <Tab loanPage="Lender Details" tabs={tabs} id={id} house_id={house_id}/>
                <div className="row">
                    <div className="col-md-3 imgTop"></div>
                    <div className="col-md-6 house-form pt-25">
                        <div className="divWithContact">
                            <div className="form-group">
                                <label htmlFor="type" className="req">Loan Type</label>
                                <select className="form-control" value={loantype} onChange={e=> setLoantype(e.target.value)} >
                                    <option value="" disabled>Select</option>
                                    <option value="Mortgage">Mortgage</option>
                                    <option value="Personal Loan">Personal Loan</option>
                                    <option value=" Home Equity Loan"> Home Equity Loan</option>
                                </select>
                            </div>
                           
                            <div className="form-group">
                                <label htmlFor="name">Lender Name</label>
                                
                                    <select className="form-control" value={lname} onChange={e=> handleOnChange(e)}>
                                        <option value="" disabled>Select</option>
                                    
                                        {
                                            props.contactList ? (
                                                props.contactList.map((data)=>{
                                                    if(data.groupname.split('&')[0] == "Expenses" && data.groupname.split('&')[1]== "Loans"){
                                                        return(
                                                            <option value={data.id}>{data.companyname} - ({data.contactperson})</option>
                                                        )
                                                    }
                                                })
                                            ): ""
                                        }
                                    </select>
                            </div>
                            <div onClick={()=>togglePopup()} ><img className="addContactLogo" src={"assets/image/addContactIcon.png"} alt="AddContactLogo"/>  </div>
                           
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group inputGroup">
                                    <label htmlFor="contactPerson">Lender Contact Person</label>
                                    <input type="text" placeholder="Lender Contact Person" value={lcontactperson} onChange={e=> setLcontactperson(e.target.value)} className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group inputGroup">
                                    <label htmlFor="address">Lender Address</label>
                                    <input type="text" placeholder="Lender Address" value={laddress} onChange={e=> setLaddress(e.target.value)} className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group inputGroup">
                                    <label htmlFor="phone">Lender Phone No.</label>
                                    <input type="text" id="phoneNumberFormat" maxLength="12" value={lphno} onChange={e=> setLphno(e.target.value)} className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group inputGroup">
                                    <label htmlFor="email">Lender Email</label>
                                    <input type="email" value={lemail} onChange={e=> setLemail(e.target.value)} className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="url">Lender URL</label>
                                    <input type="text" placeholder="http://example.com" value={lurl} onChange={e=> setLurl(e.target.value)} className="form-control" />
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
                        <button type="button" class="btn btn-default btn-sm addNewItem disable" disabled="disabled"><span className="glyphicon glyphicon-arrow-left"></span> Previous</button>
                            <button type="button"  className="btn btn-primary btn-sm addNewItem " onClick={handleSubmit}>Next <span className="glyphicon glyphicon-arrow-right"> </span></button>
                        </div>
                    </div>
                </div>
            </div>
            {showGroup ? <ContactModal house_id={houseid} toggle={togglePopup} /> : null}        
        </div>
    )
}


const mapStateToProps = (state) => ({
    loanDetails: state.Loan.loanDetails.data,
    contactList : state.Contact.contacts.data
});

const mapDispatchToProps = {
    addLoan,
    getContact,
    deleteLoan,
    getLoanTransaction
}

export default connect(mapStateToProps, mapDispatchToProps)(LenderDetails);