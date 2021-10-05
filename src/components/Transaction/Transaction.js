import React, { useState, useEffect } from 'react';
import "../../style/Contact.css";
import { addTransaction, getSingleTransaction, deleteTransaction } from "../../store/Actions/Transaction";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import { Util } from "../../Datamanipulation/Util";
import { getContactForTransaction, getContact } from "../../store/Actions/contact";
import ContactModal from "../Contacts/Contact-Modal";
import NumberFormat from "react-number-format";
import S3 from "aws-s3";
import JsFileDownloader from "js-file-downloader";

const Transaction = (props) => {
  const userBucket = JSON.parse(localStorage.getItem('user')).bucket_folder_name;
  // aws-s3 uploader//
  const config = {
    bucketName: "myhomeinfouseruploads",
    dirName: userBucket,
    region: "us-west-2",
    accessKeyId: "AKIARSK5NHWUVJNO6G45",
    secretAccessKey: "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",
  };
  const S3Client = new S3(config);
  const generate_random_string = (string_length) => {
    let random_string = "";
    let random_ascii;
    let ascii_low = 65;
    let ascii_high = 90;
    for (let i = 0; i < string_length; i++) {
      random_ascii = Math.floor(
        Math.random() * (ascii_high - ascii_low) + ascii_low,
      );
      random_string += String.fromCharCode(random_ascii);
    }
    return random_string;
  };

  let houseId = props.location.state.house_id ? props.location.state.house_id : "";
  let loggedinUser = Util.getLoggedinUser();
  console.log("loggedinUser", loggedinUser)

  const [accountName, setAccountName] = useState('');
  const [contactPerson, setContactPerson] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [date, setDate] = useState(Util.getCurrentDate("-"));
  const [transactionAmount, setTransactionAmount] = useState("");
  const [enteredBy, setEnteredBy] = useState(loggedinUser["name"]);
  const [comments, setComments] = useState("");
  const [addToHomeCost, setAddToHomeCost] = useState(0);
  const [docName, setDocName] = useState('');
  const [document, setDocument] = useState('');
  const [download, setDownload] = useState('');
  const [id, setId] = useState('');
  const [house_id, setHouse_id] = useState(houseId);
  const [addToWarrantyCost, setAddToWarrantyCost] = useState(0);
  const [showGroup, setShowGroup] = useState(false);
  const [product_name, setProduct_name] = useState('');
  const [warranty_id, setWarranty_id] = useState('');
  const [is_deleted, setIs_deleted] = useState(0);

  /**Escrow Details */
  const [principal, setPrincipal] = useState('');
  const [interest, setInterest] = useState('');
  const [extraprincipal, setExtraprincipal] = useState('');
  const [escrow, setEscrow] = useState('');
  const [loanbalance, setLoanbalance] = useState('');
  const [escrowbalance, setEscrowbalance] = useState('');
  const [escrowStatus, setEscrowStatus] = useState('No');
  const [contactData, setContactData] = useState();

  const togglePopup = () => {
    setShowGroup(!showGroup);
    let data = {
      house_id: house_id
    }
    props.getContact(data);
  };





  useEffect(() => {
    if (props.transactionDetails && props.transactionDetails.length > 0) {
      handleContatData(props.transactionDetails[0].account_name);
      setAccountName(props.transactionDetails[0].account_name);
      //setContactPerson(props.transactionDetails[0].contact_person);
      //setTransactionType(props.transactionDetails[0].type);
      setDate(props.transactionDetails[0].date);
      //setTransactionAmount(props.transactionDetails[0].amount);
      setEnteredBy(props.transactionDetails[0].entered_by);
      setComments(props.transactionDetails[0].comments);
      setAddToHomeCost(props.transactionDetails[0].add_to_home_cost);
      setHouse_id(props.transactionDetails[0].house_id);
      setId(props.transactionDetails[0].id);
      setProduct_name(props.transactionDetails[0].product_name ? props.transactionDetails[0].product_name : "");
      setWarranty_id(props.transactionDetails[0].warranty_id ? props.transactionDetails[0].warranty_id : "");
      setAddToWarrantyCost(props.transactionDetails[0].add_to_warranty);
      setDocName(props.transactionDetails[0].receipt.includes("/") &&props.transactionDetails[0].receipt.split('/')[4].slice(4));
      setDownload(props.transactionDetails[0].receipt);
      setDocument(props.transactionDetails[0].receipt);
      /**Escrow */
      setPrincipal(props.transactionDetails[0].principal ? props.transactionDetails[0].principal : 0)
      setInterest(props.transactionDetails[0].interest ? props.transactionDetails[0].interest : 0)
      setExtraprincipal(props.transactionDetails[0].extraprincipal ? props.transactionDetails[0].extraprincipal : 0)
      setEscrow(props.transactionDetails[0].escrow ? props.transactionDetails[0].escrow : 0)
      setLoanbalance(props.transactionDetails[0].loanbalance ? props.transactionDetails[0].loanbalance : 0)
      setEscrowbalance(props.transactionDetails[0].escrowbalance ? props.transactionDetails[0].escrowbalance : 0)

      setEscrowStatus('No')
      if (props.loan) {
        for (let i = 0; i < props.loans.length; i++) {
          console.log(props.loans[i]['lname'] == props.transactionDetails[0].account_name && props.loans[i]['escrow'] == "Yes")
          if (props.loans[i]['lname'] == props.transactionDetails[0].account_name && props.loans[i]['escrow'] == "Yes") {
            setEscrowStatus('Yes')
          }
        }

      }

    }
    if (props.houseDetails && props.houseDetails.house.length > 0) {
      setHouse_id(props.houseDetails.house[0].id);
    }
    let data = {
      "house_id": house_id
    }
    props.getContactForTransaction(data);

  }, [props.transactionDetails])

  useEffect(()=>{
    if (props.transactionDetails && props.transactionDetails.length > 0) {
      handleContatData(props.transactionDetails[0].account_name);
    }
  },[props.transactionDetails, props.contactList])

  const handleContatData = (dataId) => {
    const myObj = props.contactList.find(obj => obj.id === parseInt(dataId.split("-")[0]));
    console.log("props.leaseDetails", myObj);
    setContactPerson(myObj && myObj.contactperson);
    setTransactionType(myObj && myObj.transaction_type);
    setTransactionAmount(myObj && myObj.transaction_amount);
    setContactData(myObj);
  }

  const handleSubmit = () => {
    let formdata = {
      "account_name": accountName,
      "contact_person": contactPerson,
      "type": transactionType,
      "date": date,
      "amount": transactionAmount,
      "entered_by": enteredBy,
      "comments": comments,
      "add_to_home_cost": addToHomeCost,
      "add_to_warranty": addToWarrantyCost,
      "debit": "",
      "house_id": house_id,
      "id": id,
      "product_name": product_name,
      "principal": principal,
      "interest": interest,
      "extraprincipal": extraprincipal,
      "escrow": escrow,
      "loanbalance": loanbalance,
      "escrowbalance": escrowbalance,
      "escrowStatus": escrowStatus
    }


    let closeStatus = true;
    let current = new Date(date);
    if (props.loans) {
      for (let i = 0; i < props.loans.length; i++) {
        // Comparing dates
        let enddate = new Date(props.loans[i].loanclosuredate);
        console.log(props.loans[i].escrowPayee + "==" + contactPerson)
        if (props.loans[i].escrowPayee == contactPerson) {
          console.log(current);
          console.log(enddate)
          enddate = Math.floor(enddate.getTime() / 86400000);
          current = Math.floor(current.getTime() / 86400000);
          console.log(current + ">" + enddate)
          if (current > enddate) {
            closeStatus = false;
          }
          break;
        }
      }

    }

    if (closeStatus) {

      let valid = validate();
      if (valid) {
        if (document.name) {
          const newFileName =
            generate_random_string(4) +
            document.name.split(".").slice(0, -1).join(".");
          S3Client.uploadFile(document, newFileName)
            .then((data) => {
              var form = new FormData();
              for (const key in formdata) {
                form.append(key, formdata[key]);
              }
              form.append("receipt", data.location);
              props.addTransaction(form)
              props.history.push({
                pathname: 'transaction-list',
                state: {
                  house_id: house_id
                }
              });
            })
        }
        else {
          var form = new FormData();
          for (const key in formdata) {
            form.append(key, formdata[key]);
          }
          props.addTransaction(form)
          props.history.push({
            pathname: 'transaction-list',
            state: {
              house_id: house_id
            }
          });
        }
      }
    } else {
      NotificationManager.error("Error Message", "Loan already expired.");
    }
  }
  const handleDeleteTransaction = () => {
    let data = {
      "id": id,
      "house_id": house_id,

    }
    props.deleteTransaction(data);
    props.history.push(
      {
        pathname: "transaction-list",
        state: { house_id: house_id }
      }
    )
  }

  const handleOnChange = (e) => {
    setAccountName(e.target.value);
    handleContatData(e.target.value);
    if (props.contactList) {
      for (var i = 0; i < props.contactList.length; i++) {
        console.log("compasnyname::", props.contactList[i], e.target.value)
        if (e.target.value == props.contactList[i]['id']) {
          setContactPerson(props.contactList[i].contactperson);
          setAddToHomeCost(props.contactList[i].add_to_home_cost);
          setTransactionAmount(props.contactList[i].transaction_amount)
          setComments(props.contactList[i].comment)
          if (props.contactList[i].groupname.split("&")[0] === "Income") {
            setTransactionType("Receipt");
          } else if (props.contactList[i].groupname.split("&")[0] === "Expenses") {
            setTransactionType("Payment");
          }
          break;
        }
      }
    }


    setEscrowStatus('No')
    if (props.loans) {
      for (let i = 0; i < props.loans.length; i++) {
        if (props.loans[i]['lname'] == e.target.value && props.loans[i]['escrow'] == "Yes") {
          setEscrowStatus('Yes')
        }
      }
    }
  }

  const validate = () => {
    if (addToWarrantyCost === 1 && product_name === '') {
      NotificationManager.error("Error Message", "Product name cannot be empty.");
      return false;
    }
    return true;
  }
  // upload document //
  const handleDocumentUpload = (event) => {
    if (document !== "undefined" && document !== "") {
      NotificationManager.error("Error Message", "Firstly, you have to delete old Attachment to Add New Attachment");
    }
    else {
      setDocument(event.target.files[0])
      setDocName(event.target.files[0]['name']);
    }
  }
  // delete Document //
  const handleDelete = (id, docFile) => {
    if (docFile.name !== undefined) {
      setDocName("");
      setDocument("")
      NotificationManager.error("Success Message", "Attachment deleted");
    }
    else if (docFile) {
      const newFileName = docFile.split('/')[4]
      S3Client.deleteFile(newFileName).then((data) => {
        if (data.message === "File Deleted") {
          props.getSingleTransaction({ id: id, delete: "doc" })
          setDocName("");
          setDocument("")
          NotificationManager.error("Success Message", "Attachment deleted");
        }
        else {
          NotificationManager.error("Error Message", "Oops!! Somwthing went wrong");
        }
      }
      )
    }
    else {
      NotificationManager.error("Error Message", "There is no Attachment to delete");
    }
  }
  // download Document //
  const downloadFile = (items) => {
    console.log("download::", items)
    if (items.name !== undefined) {

    }
    const fileUrl = items;
    new JsFileDownloader({
      url: fileUrl,
    })
  };

  // view Document //
  const handleViewEvent = (data) => {
    window.open(data, "_blank");
  };


  return (
    <div className="container-fluid contact">
      <h4>Transactions</h4>
      <div className="contact-form">
        <div className="row pb-2">
          <div className="col-md-3">
          </div>
          <div className="col-md-6 house-form pt-25">

            {/* <div className="divWithContact">
                            <div className="form-group">
                                <label htmlFor="name">Company Name / Account Name</label>
                                    <select className="form-control" value={accountName} onChange={e=> handleOnChange(e)}>
                                    <option value="" disabled>Select</option>
                                    {
                                        props.contactList ? (
                                            props.contactList.map((data)=>{
                                                    return(
                                                    <option value={data.companyname}>{data.companyname} - ({data.contactperson})</option>
                                                )
                                            })
                                        ): ""
                                    }
                                </select>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="Contact Person" className="">Contact Person</label>
                                <input type="text" placeholder="Contact Person" value={contactPerson} onChange={e=> setContactPerson(e.target.value)} className="form-control" readOnly/>
                            </div>
                            
                                <div onClick={()=>togglePopup()} ><img className="addContactLogo" src={"assets/image/addContactIcon.png"} alt="AddContactLogo"/>  </div>
                        </div> */}

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="name">Company Name / Account Name</label>
                  <select className="form-control" value={accountName} onChange={e => handleOnChange(e)}>
                    <option value="" disabled>Select</option>
                    {
                      props.contactList ? (
                        props.contactList.map((data) => {
                          return (
                            <option value={`${data.id}-${data.companyname
                              }`}>{data.companyname} - ( {data.contactperson} )</option>
                          )
                        })
                      ) : ""
                    }
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="Contact Person" className="">Contact Person</label>
                  <input type="text" placeholder="Contact Person" value={contactPerson} onChange={e => setContactPerson(e.target.value)} className="form-control" readOnly />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="Transaction Type">Transaction Type</label>
                  <select className="form-control" value={transactionType} onChange={e => setTransactionType(e.target.value)} disabled>
                    <option value="" disabled>Select</option>
                    <option value="Receipt">Receipt</option>
                    <option value="Payment">Payment</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="Date" className="">Date</label>
                  <input type="date" placeholder="Date" value={date} onChange={e => setDate(e.target.value)} className="form-control" />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="Transaction Amount">Transaction Amount</label>
                  <NumberFormat
                    placeholder="Transaction Amount"
                    thousandsGroupStyle="thousand"
                    className="form-control alignRight"
                    value={transactionAmount}
                    decimalSeparator="."
                    type="text"
                    thousandSeparator={true}
                    allowNegative={true}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    allowEmptyFormatting={true}
                    allowLeadingZeros={false}
                    onChange={e => setTransactionAmount(e.target.value)}
                    isNumericString={true}
                    readOnly />
                  {/* <input type="text" placeholder="Transaction Amount" value={Util.addCommas(transactionAmount)} onChange={e=> setTransactionAmount(e.target.value)} className="form-control" /> */}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="Entered By" className="">Entered By</label>
                  <input type="text" placeholder="Entered By" value={enteredBy} onChange={e => setEnteredBy(e.target.value)} className="form-control" disabled />
                </div>
              </div>
            </div>

            {/* Escrow Details */}
            <div style={escrowStatus == "Yes" ? { display: "block" } : { display: "none" }}>
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="Principal">Principal</label>
                    <input type="text" placeholder="Principal" value={Util.addCommas(principal)} onChange={e => setPrincipal(e.target.value)} className="form-control" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="Interest" className="">Interest</label>
                    <input type="text" placeholder="Interest" value={Util.addCommas(interest)} onChange={e => setInterest(e.target.value)} className="form-control" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="Extra Principal" className="">Extra Principal</label>
                    <input type="text" placeholder="Extra Principal" value={Util.addCommas(extraprincipal)} onChange={e => setExtraprincipal(e.target.value)} className="form-control" />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="Escrow">Escrow</label>
                    <input type="text" placeholder="Escrow" value={Util.addCommas(escrow)} onChange={e => setEscrow(e.target.value)} className="form-control" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="Loan Balance" className="">Loan Balance</label>
                    <input type="text" placeholder="Loan Balance" value={Util.addCommas(loanbalance)} onChange={e => setLoanbalance(e.target.value)} className="form-control" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="Escrow Balance" className="">Escrow Balance</label>
                    <input type="text" placeholder="Escrow Balance" value={Util.addCommas(escrowbalance)} onChange={e => setEscrowbalance(e.target.value)} className="form-control" />
                  </div>
                </div>
              </div>
            </div>
            {/* Escrow Details complete*/}
            <div className="row d_flex">
              <div className="col-md-8">
                <div className="form-group">
                  <label htmlFor="attachment">Attachments</label>
                  <label htmlFor="file" className="fileContainer">
                    <div className="attachfile" align="center">
                      <i>Click here to attach documents</i>
                      <p>{docName ? docName : ""}</p>

                    </div>
                    <input type="file" style={{ height: "0px" }} id="file" onChange={(event) => handleDocumentUpload(event)} className="form-control" style={{ "visibility": "hidden" }} />
                  </label>
                </div>
              </div>

              <div className="col-md-4">
                {/* <a type="button"  className="btn btn-primary btn-sm addNewItem " href={download ? download : "javascript:void(0)"}><span className="glyphicon glyphicon-download-alt"> </span> Download Attachment</a>
                                <button type="button"  className="btn btn-primary btn-sm addNewItem " onClick={()=>handleDelete(id)}><span className="glyphicon glyphicon-trash"> </span> Delete Attachment </button> */}
                <div className="dflex">
                  <div onClick={() => handleViewEvent(document)}>
                    <i className="glyphicon glyphicon-eye-open primary  btn-lg blueIcon" value={document}></i>
                  </div>
                  <div onClick={() => downloadFile(document)}>
                    <i className="glyphicon glyphicon-download-alt primary  btn-lg blueIcon" value={document}></i>
                  </div>
                  <i className="glyphicon glyphicon-trash primary  btn-lg  blueIcon" value={document}
                    onClick={() => handleDelete(id, document)}></i>
                </div>
              </div>
            </div>

            <div className="row  d_flex">
              <div className="col-md-8">
                <div className="form-group">
                  <label htmlFor="comments">Comments</label>
                  <textarea rows="4" placeholder="Comments" value={comments} onChange={e => setComments(e.target.value)} className="form-control"></textarea>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label className="checkbox-inline">
                    <input type="checkbox" name="homecost" value={addToHomeCost} onChange={e => setAddToHomeCost(addToHomeCost == 0 ? 1 : 0)} checked={addToHomeCost === 1 ? "checked" : false} />Add to Home Cost
                  </label>
                </div>
                <div className="form-group">
                  <label className="checkbox-inline">
                    <input type="checkbox" name="warrantycost" value={addToWarrantyCost} onChange={e => setAddToWarrantyCost(addToWarrantyCost == 0 ? 1 : 0)} checked={addToWarrantyCost === 1 ? "checked" : false} />Add to Warranty
                  </label>
                </div>
              </div>
            </div>

            {addToWarrantyCost ?
              <div className="row ">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="product" className="req">Product Name</label>
                    <input type="text" placeholder="Product Name" value={product_name} onChange={e => setProduct_name(e.target.value)} className="form-control" />
                  </div>
                </div>
              </div> : ""
            }
          </div>
          <div className="col-md-3"></div>

        </div>
        <div className="row footer" style={{ marginTop: "-1px" }}>
          <div className="col-md-4">
            {
              id ? (
                <button className="btn btn-default btn-sm addNewItem" onClick={handleDeleteTransaction}>  <span className="glyphicon glyphicon-trash"> </span> Delete Entry</button>
              ) : ""
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
  contactList: state.Contact.contacts.data,
  loans: state.Loan.loans.data
});

const mapDispatchToProps = {
  addTransaction,
  getSingleTransaction,
  getContactForTransaction,
  getContact,
  deleteTransaction
}

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);