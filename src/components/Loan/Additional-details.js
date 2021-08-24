import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import "../../style/Loan.css";
import "../../style/House.css";
import { NotificationManager } from "react-notifications";
import { addLoan,getSingleLoan } from "../../store/Actions/Loan";
import { Util } from "../../Datamanipulation/Util";
import Tab from "../../Reusable/Tab";
import ContactModal from "../Contacts/Contact-Modal";
import { getContact } from "../../store/Actions/contact";

const AdditionalDetails = (props) => {
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
    const [escrow, setEscrow] = useState('No');
    const [escrowpayee, setEscrowPayee] = useState('');
    const [mortgage, setMortgage] = useState('');
    const [loanbegindate, setLoanbegindate] = useState('');
    const [propertytax, setPropertytax] = useState('');
    const [ptaxpayee, setPropertytaxPayee] = useState('');
    const [additionaldetails, setAdditionaldetails] = useState('');
    const [loanclosuredate, setLoanclosuredate] = useState('');
    const [status, setStatus] = useState('');
    const [house_id, setHouse_id] = useState(houseid);
    const [id, setId] = useState('');
    const [escrowstatus, setEscrowstatus] = useState('');
    const [document, setDocument] = useState('');
    const [docName, setDocName] = useState('');
    const [download, setDownload] = useState('');
    const [escrowamount, setEscrowAmount] = useState('');
    const [showGroup, setShowGroup] = useState(false);
    const [renewal_maturity_date, setRenewal_maturity_date] = useState('');
    const [renewal_intrest_rate, setRenewal_intrest_rate] = useState('');

    const togglePopup = () => {
        setShowGroup(!showGroup);
        let data = {
            "house_id": house_id
        }
        props.getContact(data);
    };
    

    useEffect(()=> {
        if(props.loanDetails && props.loanDetails.length > 0) {
            setLoantype(props.loanDetails[0].loantype);
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
            setEscrowPayee(props.loanDetails[0].escrowPayee ? props.loanDetails[0].escrowPayee : props.loanDetails[0].lcontactperson+" - "+props.loanDetails[0].loannumber +" - "+ "Escrow")
            setMortgage(props.loanDetails[0].mortgage);
            setLoanbegindate(props.loanDetails[0].loanbegindate);
            setPropertytax(props.loanDetails[0].propertytax);
            setPropertytaxPayee(props.loanDetails[0].propertytaxPayee);
            setAdditionaldetails(props.loanDetails[0].additionaldetails);
            setLoanclosuredate(props.loanDetails[0].loanclosuredate);
            setStatus(props.loanDetails[0].status);
            setHouse_id(props.loanDetails[0].house_id);
            setId(props.loanDetails[0].id);
            setEscrowAmount(props.loanDetails[0].escrowamount);
            setEscrowstatus(props.loanDetails[0].escrowstatus);
            setDocName(props.loanDetails[0].doc_path.split("-")[1]);
            setDownload(props.loanDetails[0].doc_path ?( "../files/" + props.loanDetails[0].doc_path.substr(11))  :"")
            setRenewal_maturity_date(props.loanDetails[0].renewal_maturity_date);
            setRenewal_intrest_rate(props.loanDetails[0].renewal_intrest_rate);
        }

        let data = {
            "house_id":houseid
        }
        props.getContact(data);
    }, [props.loanDetails])

    const handleDocumentUpload = (event)=> {
        setDocument(event.target.files[0])
        setDocName(event.target.files[0]['name']);
      }


    const handleDelete = (id) => {
        props.getSingleLoan({id : id, delete : "doc"})
        NotificationManager.error("Success Message", "Attachment deleted");
    }

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
            "escrowPayee" : escrowpayee,
            "loanbegindate" : loanbegindate,
            "propertytax" : propertytax,
            "propertytaxPayee" : ptaxpayee,
            "additionaldetails" : additionaldetails,
            "loanclosuredate" : loanclosuredate,
            "status" : status,
            "house_id": house_id,
            'id':id,
            'escrowstatus': escrowstatus,
            'escrowamount' : escrowamount,
            'renewal_maturity_date' : renewal_maturity_date,
            'renewal_intrest_rate' : renewal_intrest_rate
        }


        var form = new FormData();
        for (const key in data) {
            form.append(key, data[key]);
        }

        form.append("document", document);
        form.append("lastTab", true)
       
        let valid = validate();
        if(valid) {
            props.addLoan(form)
            props.history.push({
                pathname: "loan-transaction",
                state: {
                    house_id : house_id
                }
            });
        }
    }

    const validate = () => {
        if(status === '') {
            NotificationManager.error("Error Message", "Status cannot be empty.");
            return false;
        }
        return true;
    }

    const handlePrevious = () => {
        props.history.push('/loan-details');
    }
    
    let tabs = [
        {pathname : "/loan-lender", label : "Lender Details"},
        {pathname : "/loan-details", label : "Loan Details"}
    ]

    if(loantype === 'Mortgage') {
        tabs.push({pathname : "/loan-additionals", label : "Escrow & Property Tax"});
    }

    tabs.push({pathname : "/loan-transaction", label : "Loan Transactions"});

    return (
        <div className="container-fluid house">
            <h4>Add Loan Details</h4>
            <div className="house-form">
               <Tab loanPage="Escrow & Property Tax" tabs={tabs} id={id} house_id={house_id}/>
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6  house-form pt-25">
                        <div className="row pt-25">
                        <span className="section">Escrow Details</span><br></br><br></br>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="escrow">Escrow</label>
                                    <div className="form-check">
                                        <button className="btn radio-btn">
                                            <input className="form-check-input" type="radio" name="escrow" checked={escrow == "Yes" ? true : false }  onChange={e=> setEscrow('Yes')} />
                                            <label className="form-check-label pl-10" htmlFor="escrowStatus1"> Yes  </label>
                                        </button>
                                        <button className="btn radio-btn ml-15">
                                            <input className="form-check-input" type="radio" name="escrow" checked={escrow == "No" ? true : false } onChange={e=> setEscrow('No')} />
                                            <label className="form-check-label pl-10" htmlFor="escrowStatus2"> No </label>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="">Escrow Amount</label>
                                    <input type="text" placeholder="Escrow Amount" value={Util.addCommas(escrowamount ?escrowamount : 0)} onChange={e=> setEscrowAmount(e.target.value)} className="form-control" disabled={escrow == 'No'? true : false } />
                                </div>
                            </div>
                        </div>
                        
                        <div className="row ">
                           <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="">Escrow Payee</label>
                                    <input type="text" placeholder="Escrow" value={escrowpayee} onChange={e=> setEscrowPayee(e.target.value)} className="form-control" disabled={escrow == 'No'? true : false } />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="">Escrow Deposit</label>
                                    <input type="text" placeholder="Escrow" value={Util.addCommas(mortgage)} onChange={e=> setMortgage(e.target.value)} className="form-control" disabled={escrow == 'No'? true : false } />
                                </div>
                            </div>
                        </div>
                        
                        <div className="row ">
                            <hr/>
                            <span className="section">Property Tax Details</span><br></br><br></br>
                        </div>
                        
                      
                        <div className="divWithContact ">
                            <div className="form-group">
                                <label htmlFor="tax" className="req">Porperty Tax Payee</label>
                                <select className="form-control" value={ptaxpayee} onChange={e=> setPropertytaxPayee(e.target.value)}>
                                        <option value="" disabled>Select</option>
                                    
                                        {
                                            props.contactList ? (
                                                props.contactList.map((data)=>{
                                                    if(data.groupname == "Expenses&Property Tax"){
                                                        return(
                                                            <option value={data.id}>{data.companyname}</option>
                                                        )
                                                    }
                                                })
                                            ): ""
                                        }
                                    </select>
                                {/* <input type="text" placeholder="Porperty Tax" value={ptaxpayee} onChange={e=> setPropertytaxPayee(e.target.value)} className="form-control" /> */}
                            </div>
                        
                            <div className="form-group">
                                <label htmlFor="tax" className="req">Porperty Tax Amount</label>
                                <input type="text" placeholder="Porperty Tax Amount" value={Util.addCommas(propertytax)} onChange={e=> setPropertytax(e.target.value)} className="form-control" />
                            </div>
                            <div onClick={()=>togglePopup()} ><img className="addContactLogo" src={"assets/image/addContactIcon.png"} alt="AddContactLogo"/>  </div>
                        </div>

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
                                    <label htmlFor="comments">Comments</label>
                                    <textarea rows="4" placeholder="Comments" value={additionaldetails} onChange={e=> setAdditionaldetails(e.target.value)} className="form-control"></textarea>
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
                            <button type="button" class="btn btn-primary btn-sm addNewItem"onClick={handleSubmit}> Next <span className="glyphicon glyphicon-arrow-right"> </span></button>
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
    getSingleLoan,
    getContact,
}

export default connect(mapStateToProps, mapDispatchToProps)(AdditionalDetails);