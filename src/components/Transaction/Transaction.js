import React, { useState, useEffect } from 'react';
import "../../style/Contact.css";
import { addTransaction, getSingleTransaction} from "../../store/Actions/Transaction";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import { Util } from "../../Datamanipulation/Util";
import { getContactForTransaction,getContact } from "../../store/Actions/contact";
import ContactModal from "../Contacts/Contact-Modal";

const Transaction = (props) => {
    let houseId = props.location.state.house_id ? props.location.state.house_id : "";
    let loggedinUser = Util.getLoggedinUser();
    const [accountName, setAccountName] = useState('');
    const [contactPerson,setContactPerson] = useState("");
    const [transactionType,setTransactionType] = useState("");
    const [date,setDate] = useState(Util.getCurrentDate("-"));
    const [transactionAmount,setTransactionAmount] = useState("");
    const [enteredBy,setEnteredBy] = useState(loggedinUser["name"]);
    const [comments,setComments] = useState("");
    const [addToHomeCost,setAddToHomeCost] = useState(0);
    const [docName, setDocName] = useState('');
    const [document, setDocument] = useState('');
    const [download, setDownload] = useState('');
    const [id, setId] = useState('');
    const [house_id, setHouse_id] = useState(houseId);
    const [addToWarrantyCost, setAddToWarrantyCost] = useState(0);
    const [showGroup, setShowGroup] = useState(false);
    const [product_name, setProduct_name] = useState('');
    const [warranty_id, setWarranty_id] = useState('');

    /**Escrow Details */
    const [principal, setPrincipal] = useState('');
	const [interest, setInterest] = useState('');
    const [extraprincipal, setExtraprincipal] = useState('');
    const [escrow, setEscrow] = useState('');
    const [loanbalance, setLoanbalance] = useState('');
    const [escrowbalance, setEscrowbalance] = useState('');
    const [escrowStatus, setEscrowStatus] = useState('No');

    const togglePopup = () => {
        setShowGroup(!showGroup);
        let data = {
            house_id : house_id
        }
        props.getContact(data);
    };

    
    const handleDocumentUpload = (event)=> {
        setDocument(event.target.files[0])
        setDocName(event.target.files[0]['name']);
    }

    const handleDelete = (id) => {
        props.getSingleTransaction({id : id, delete : "doc"})
        NotificationManager.error("Success Message", "Attachment deleted");
    }

   
    useEffect(()=> {
        if(props.transactionDetails && props.transactionDetails.length > 0){
            setAccountName(props.transactionDetails[0].account_name);
            setContactPerson(props.transactionDetails[0].contact_person);
            setTransactionType(props.transactionDetails[0].type);
            setDate(props.transactionDetails[0].date);
            setTransactionAmount(props.transactionDetails[0].amount);
            setEnteredBy(props.transactionDetails[0].entered_by);
            setComments(props.transactionDetails[0].comments);
            setAddToHomeCost(props.transactionDetails[0].add_to_home_cost);
            setHouse_id(props.transactionDetails[0].house_id);
            setId(props.transactionDetails[0].id);
            setProduct_name(props.transactionDetails[0].product_name ? props.transactionDetails[0].product_name : "");
            setWarranty_id(props.transactionDetails[0].warranty_id ? props.transactionDetails[0].warranty_id : "");
            setAddToWarrantyCost(props.transactionDetails[0].add_to_warranty);
            setDocName(props.transactionDetails[0].receipt.split("-")[1]);
            setDownload(props.transactionDetails[0].receipt ?( "../files/" + props.transactionDetails[0].receipt.substr(11))  :"");
            /**Escrow */
             setPrincipal(props.transactionDetails[0].principal ? props.transactionDetails[0].principal : 0)
             setInterest(props.transactionDetails[0].interest ? props.transactionDetails[0].interest : 0)
             setExtraprincipal(props.transactionDetails[0].extraprincipal ? props.transactionDetails[0].extraprincipal : 0)
             setEscrow(props.transactionDetails[0].escrow ? props.transactionDetails[0].escrow : 0)
             setLoanbalance(props.transactionDetails[0].loanbalance ? props.transactionDetails[0].loanbalance :0)
             setEscrowbalance(props.transactionDetails[0].escrowbalance ? props.transactionDetails[0].escrowbalance : 0)

             setEscrowStatus('No')
             if(props.loan){
                for(let i=0; i<props.loans.length; i++){
                    console.log(props.loans[i]['lname'] == props.transactionDetails[0].account_name && props.loans[i]['escrow'] == "Yes")
                    if(props.loans[i]['lname'] == props.transactionDetails[0].account_name && props.loans[i]['escrow'] == "Yes"){
                        setEscrowStatus('Yes')
                    }
                }
   
             }
            
        }
        if(props.houseDetails && props.houseDetails.house.length > 0){
            setHouse_id(props.houseDetails.house[0].id);
        }
        let data = {
            "house_id":house_id
        }
        props.getContactForTransaction(data);
       
    }, [props.transactionDetails])

    const handleSubmit = () => {
        let data = {
            "account_name": accountName,
            "contact_person": contactPerson,
            "type" : transactionType,
            "date" : date,
            "amount" : transactionAmount,
            "entered_by" : enteredBy,
            "comments" : comments,
            "add_to_home_cost" : addToHomeCost,
            "add_to_warranty" : addToWarrantyCost,
            "debit" : "",
            "house_id" : house_id,
            "id": id,
            "product_name": product_name,
            "principal" : principal,
            "interest" : interest, 
            "extraprincipal" : extraprincipal,
            "escrow" : escrow,
            "loanbalance" : loanbalance,
            "escrowbalance" : escrowbalance,
            "escrowStatus" : escrowStatus
        }
        console.log("datatra",data)
        var form = new FormData();
        for (const key in data) {
            form.append(key, data[key]);
        }

       let closeStatus = true;
       let current = new Date(date);
       if(props.loans){
            for(let i=0; i<props.loans.length; i++){
                // Comparing dates
                let enddate = new Date(props.loans[i].loanclosuredate);
                console.log(props.loans[i].escrowPayee +"=="+ contactPerson)
                if(props.loans[i].escrowPayee == contactPerson){
                    console.log(current);
                    console.log(enddate)
                    enddate = Math.floor(enddate.getTime() / 86400000);
                    current = Math.floor(current.getTime() / 86400000);
                console.log(current +">"+ enddate)
                    if(current > enddate) {
                        closeStatus = false;
                    }
                    break;
                }
        }
        
       }
      
       if(closeStatus){
            form.append("receipt", document);
            let valid = validate();
            if(valid) {
                props.addTransaction(form)
                props.history.push(
                    {
                        pathname : "transaction-list",
                        state : {house_id : house_id}
                    }
                )
            }
       } else {
           NotificationManager.error("Error Message", "Loan already expired.");
        }
    }

    const handleOnChange = (e) => {
        setAccountName(e.target.value);
        if(props.contactList){
            for(var i=0; i<props.contactList.length; i++){
                if(e.target.value == props.contactList[i]['id']){
                    setContactPerson(props.contactList[i].contactperson);
                    setAddToHomeCost(props.contactList[i].add_to_home_cost);
                    if(props.contactList[i].groupname.split("&")[0] === "Income") {
                        setTransactionType("Receipt");
                    } else if(props.contactList[i].groupname.split("&")[0] === "Expenses") {
                        setTransactionType("Payment");
                    }
                    break;
                }
            }
        }
       

        setEscrowStatus('No')
        if(props.loans){
            for(let i=0; i<props.loans.length; i++){
                if(props.loans[i]['lname'] == e.target.value && props.loans[i]['escrow'] == "Yes"){
                    setEscrowStatus('Yes')
                }
            }
        }
    }

    const validate = () => {
        if(addToWarrantyCost === 1 && product_name === '') {
            NotificationManager.error("Error Message", "Product name cannot be empty.");
            return false;
        }
        return true;
    }

    return (
        <div className="container-fluid contact">
            <h4>Transactions</h4>
            <div className="contact-form">
                <div className="row pb-2">
                    <div className="col-md-3">
                    </div>
                    <div className="col-md-6 house-form pt-25">
                    
                        <div className="divWithContact">
                            <div className="form-group">
                                <label htmlFor="name">Company Name / Account Name</label>
                                    <select className="form-control" value={accountName} onChange={e=> handleOnChange(e)}>
                                    <option value="" disabled>Select</option>
                                    {
                                        props.contactList ? (
                                            props.contactList.map((data)=>{
                                                
                                                return(
                                                    <option value={data.id}>{data.companyname} - ({data.contactperson})</option>
                                                )
                                                
                                            })
                                        ): ""
                                    }
                                </select>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="Contact Person" className="">Contact Person</label>
                                <input type="text" placeholder="Contact Person" value={contactPerson} onChange={e=> setContactPerson(e.target.value)} className="form-control" />
                            </div>
                            
                                <div onClick={()=>togglePopup()} ><img className="addContactLogo" src={"assets/image/addContactIcon.png"} alt="AddContactLogo"/>  </div>
                        </div>
                            
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="Transaction Type">Transaction Type</label>
                                    <select className="form-control" value={transactionType} onChange={e=> setTransactionType(e.target.value)} >
                                        <option value="" disabled>Select</option>
                                        <option value="Receipt">Receipt</option>
                                        <option value="Payment">Payment</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="Date" className="">Date</label>
                                    <input type="date" placeholder="Date" value={date} onChange={e=> setDate(e.target.value)} className="form-control" />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="Transaction Amount">Transaction Amount</label>
                                    <input type="text" placeholder="Transaction Amount" value={Util.addCommas(transactionAmount)} onChange={e=> setTransactionAmount(e.target.value)} className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="Entered By" className="">Entered By</label>
                                    <input type="text" placeholder="Entered By" value={enteredBy} onChange={e=> setEnteredBy(e.target.value)} className="form-control" disabled />
                                </div>
                            </div>
                        </div>

                        {/* Escrow Details */}
                        <div style={escrowStatus == "Yes" ?{display: "block"} : {display: "none"}}>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label htmlFor="Principal">Principal</label>
                                        <input type="text" placeholder="Principal" value={Util.addCommas(principal)} onChange={e=> setPrincipal(e.target.value)} className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label htmlFor="Interest" className="">Interest</label>
                                        <input type="text" placeholder="Interest" value={Util.addCommas(interest)} onChange={e=> setInterest(e.target.value)} className="form-control"  />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label htmlFor="Extra Principal" className="">Extra Principal</label>
                                        <input type="text" placeholder="Extra Principal" value={Util.addCommas(extraprincipal)} onChange={e=> setExtraprincipal(e.target.value)} className="form-control"  />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label htmlFor="Escrow">Escrow</label>
                                        <input type="text" placeholder="Escrow" value={Util.addCommas(escrow)} onChange={e=> setEscrow(e.target.value)} className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label htmlFor="Loan Balance" className="">Loan Balance</label>
                                        <input type="text" placeholder="Loan Balance" value={Util.addCommas(loanbalance)} onChange={e=> setLoanbalance(e.target.value)} className="form-control"  />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label htmlFor="Escrow Balance" className="">Escrow Balance</label>
                                        <input type="text" placeholder="Escrow Balance" value={Util.addCommas(escrowbalance)} onChange={e=> setEscrowbalance(e.target.value)} className="form-control"  />
                                    </div>
                                </div>
                            </div>
                        </div>
                    {/* Escrow Details complete*/}
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
                            <div className="col-md-8">
                                <div className="form-group">
                                    <label htmlFor="comments">Comments</label>
                                    <textarea rows="4" placeholder="Comments" value={comments} onChange={e=> setComments(e.target.value)} className="form-control"></textarea>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group" style={{marginTop:"21px"}}>
                                    <label className="checkbox-inline">
                                        <input type="checkbox" name="homecost" value={addToHomeCost} onChange={e=> setAddToHomeCost(addToHomeCost  == 0 ? 1 : 0)}  checked={addToHomeCost === 1 ? "checked" : false}/>Add to Home Cost
                                    </label>
                                </div>
                                <div className="form-group" style={{marginTop:"21px"}}>
                                    <label className="checkbox-inline">
                                        <input type="checkbox" name="warrantycost" value={addToWarrantyCost} onChange={e=> setAddToWarrantyCost(addToWarrantyCost == 0 ? 1 : 0)} checked={addToWarrantyCost === 1 ? "checked" : false} />Add to Warranty
                                    </label>
                                </div>
                            </div>
                        </div>
                            
                        { addToWarrantyCost ? 
                        <div className="row ">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="product" className="req">Product Name</label>
                                    <input type="text" placeholder="Product Name" value={product_name} onChange={e=> setProduct_name(e.target.value)} className="form-control" />
                                </div>
                            </div>
                        </div> : ""
                        } 
                    </div>
                    <div className="col-md-3"></div>
                    
                </div>
                <div className="row footer" style={{marginTop:"-1px"}}>
                    <div className="col-md-4">
                        {
                            id ? (
                                <button className="btn btn-default btn-sm addNewItem">  <span className="glyphicon glyphicon-trash"> </span> Delete Entry</button>
                            ):""
                        }
                    </div>
                    <div className="col-md-4 pt-pb-10" align="center">
                        <button className="btn btn-primary btn-sm" onClick={handleSubmit}>Save</button>
                    </div>
                </div>
                {showGroup ? <ContactModal house_id={house_id} toggle={togglePopup} /> : null}      
            </div> 
        </div>
    )
}

const mapStateToProps = (state) => ({
    transactionDetails: state.Transaction.transactionDetails.data,
    contactList : state.Contact.contacts.data,
    loans : state.Loan.loans.data
});

const mapDispatchToProps = {
    addTransaction,
    getSingleTransaction,
    getContactForTransaction,
    getContact
}

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);