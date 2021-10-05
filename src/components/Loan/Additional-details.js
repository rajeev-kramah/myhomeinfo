import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import "../../style/Loan.css";
import "../../style/House.css";
import { NotificationManager } from "react-notifications";
import { addLoan, getSingleLoan } from "../../store/Actions/Loan";
import { Util } from "../../Datamanipulation/Util";
import Tab from "../../Reusable/Tab";
import ContactModal from "../Contacts/Contact-Modal";
import { getContact } from "../../store/Actions/contact";
import NumberFormat from "react-number-format";
import S3 from "aws-s3";
import JsFileDownloader from "js-file-downloader";

const AdditionalDetails = (props) => {
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


  useEffect(() => {
    if (props.loanDetails && props.loanDetails.length > 0) {
      // console.log("props.loanDetails::",props.leaseDetails[0].document)
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
      setEscrowPayee(props.loanDetails[0].escrowPayee ? props.loanDetails[0].escrowPayee : props.loanDetails[0].lcontactperson + " - " + props.loanDetails[0].loannumber + " - " + "Escrow")
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
      setRenewal_maturity_date(props.loanDetails[0].renewal_maturity_date);
      setRenewal_intrest_rate(props.loanDetails[0].renewal_intrest_rate);
      setDocument(props.loanDetails[0].document);
      setDocName(props.loanDetails[0].document.includes("/")&&props.loanDetails[0].document.split('/')[4].slice(4));
      setDownload(props.loanDetails[0].document);
    }

    let data = {
      "house_id": houseid
    }
    props.getContact(data);
  }, [props.loanDetails])

  const handleSubmit = () => {

    let formdata = {
      "loantype": loantype,
      "lname": lname,
      "lcontactperson": lcontactperson,
      "laddress": laddress,
      "lphno": lphno,
      "lemail": lemail,
      "lurl": lurl,
      "purchaseprice": purchaseprice,
      "downpayment": downpayment,
      "loanamount": loanamount,
      "rateofinterest": rateofinterest,
      "loanterm": loanterm,
      "loannumber": loannumber,
      "escrow": escrow,
      "mortgage": mortgage,
      "escrowPayee": escrowpayee,
      "loanbegindate": loanbegindate,
      "propertytax": propertytax,
      "propertytaxPayee": ptaxpayee,
      "additionaldetails": additionaldetails,
      "loanclosuredate": loanclosuredate,
      "status": status,
      "house_id": house_id,
      'id': id,
      'escrowstatus': escrowstatus,
      'escrowamount': escrowamount,
      'renewal_maturity_date': renewal_maturity_date,
      'renewal_intrest_rate': renewal_intrest_rate
    }

    let valid = validate();
    if (valid) {
      if(document.name)
      { const newFileName =
            generate_random_string(4) +
            document.name.split(".").slice(0, -1).join(".");
             S3Client.uploadFile(document,newFileName)
            .then((data) => {  
                var form = new FormData();
                for (const key in formdata) {
                  form.append(key, formdata[key]);
                }
                form.append("lastTab", true)  
                form.append("document", data.location);
                props.addLoan(form)
                props.history.push({
                  pathname: 'loan-transaction',
                  state: {
                      house_id : house_id
                  }
              });
            })
        }
        else {
          var form = new FormData();
          for (const key in formdata) {
            form.append(key, formdata[key]);
          }
          form.append("lastTab", true) 
          props.addLoan(form);
          props.history.push({
            pathname: 'loan-transaction',
            state: {
                house_id : house_id
            }
        });
        }
    }
  }

  const validate = () => {
    if (status === '') {
      NotificationManager.error("Error Message", "Status cannot be empty.");
      return false;
    }
    return true;
  }

  const handlePropertyTax = (e) => {
   
    setPropertytaxPayee(e.target.value)
    for (var i = 0; i < props.contactList.length; i++) {
      console.log("amount::",props.contactList[i],e.target.value)
      if (e.target.value == props.contactList[i]['id']) {
        console.log("amount::",props.contactList[i])
        setPropertytax(props.contactList[i].transaction_amount);
        break;
      }
    }
  }
 // upload Document //
 const handleDocumentUpload = (event) => {
    
  if(document !== "undefined" && document !== "") {
    NotificationManager.error("Error Message", "Firstly, you have to delete old Attachment to Add New Attachment");
  }
  else 
  {setDocument(event.target.files[0]);
  setDocName(event.target.files[0]['name']);
}  }
  
// delete Document //
const handleDelete = (id,docFile) => {
  if(docFile.name !== undefined && docFile.name !== "") {
   
      setDocName("");
      setDocument("");
      NotificationManager.error("Success Message", "Attachment deleted");
    }
  else if(docFile){
    
    const newFileName = docFile.split('/')[4]
    S3Client.deleteFile(newFileName).then((data) =>
    {
      if(data.message === "File Deleted")
    {
      console.log("docFile",data.message);
      setDocName(" ");
      setDocument(" ");
      props.getSingleLoan({ id: id, delete: "doc" })
  
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
    console.log("download::",items)
    if(items.name !== undefined)
    {

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

  const handlePrevious = () => {
    props.history.push('/loan-details');
  }

  let tabs = [
    { pathname: "/loan-lender", label: "Lender Details" },
    { pathname: "/loan-details", label: "Loan Details" }
  ]

  if (loantype === 'Mortgage') {
    tabs.push({ pathname: "/loan-additionals", label: "Escrow & Property Tax" });
  }

  tabs.push({ pathname: "/loan-transaction", label: "Loan Transactions" });

  return (
    <div className="container-fluid house">
      <h4>Add Loan Details</h4>
      <div className="house-form">
        <Tab loanPage="Escrow & Property Tax" tabs={tabs} id={id} house_id={house_id} />
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
                      <input className="form-check-input" type="radio" name="escrow" checked={escrow == "Yes" ? true : false} onChange={e => setEscrow('Yes')} />
                      <label className="form-check-label pl-10" htmlFor="escrowStatus1"> Yes  </label>
                    </button>
                    <button className="btn radio-btn ml-15">
                      <input className="form-check-input" type="radio" name="escrow" checked={escrow == "No" ? true : false} onChange={e => setEscrow('No')} />
                      <label className="form-check-label pl-10" htmlFor="escrowStatus2"> No </label>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="">Escrow Amount</label>
                  <NumberFormat
                    placeholder="Escrow Amount"
                    thousandsGroupStyle="thousand"
                    className="form-control alignRight"
                    value={escrowamount ? escrowamount : 0}
                    decimalSeparator="."
                    type="text"
                    thousandSeparator={true}
                    allowNegative={true}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    allowEmptyFormatting={true}
                    allowLeadingZeros={false}
                    onChange={e => setEscrowAmount(e.target.value)}
                    isNumericString={true}
                    disabled={escrow == 'No' ? true : false} />
                  {/* <input type="text" placeholder="Escrow Amount" value={Util.addCommas(escrowamount ? escrowamount : 0)} onChange={e => setEscrowAmount(e.target.value)} className="form-control" disabled={escrow == 'No' ? true : false} /> */}
                </div>
              </div>
            </div>

            <div className="row ">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="">Escrow Payee</label>
                  <input type="text" placeholder="Escrow" value={escrowpayee} onChange={e => setEscrowPayee(e.target.value)} className="form-control" disabled={escrow == 'No' ? true : false} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="">Escrow Deposit</label>
                  <NumberFormat
                    placeholder="Escrow"
                    thousandsGroupStyle="thousand"
                    className="form-control alignRight"
                    value={mortgage}
                    decimalSeparator="."
                    type="text"
                    thousandSeparator={true}
                    allowNegative={true}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    allowEmptyFormatting={true}
                    allowLeadingZeros={false}
                    onChange={e => setMortgage(e.target.value)}
                    isNumericString={true}
                    disabled={escrow == 'No' ? true : false} />
                  {/* <input type="text" placeholder="Escrow" value={Util.addCommas(mortgage)} onChange={e => setMortgage(e.target.value)} className="form-control" disabled={escrow == 'No' ? true : false} /> */}
                </div>
              </div>
            </div>

            <div className="row ">
              <hr />
              <span className="section">Property Tax Details</span><br></br><br></br>
            </div>


            {/* <div className="divWithContact "> */}
            <div className="row">
              <div className="form-group col-md-6">
                <label htmlFor="tax" className="req">Porperty Tax Payee</label>
                <select className="form-control" value={ptaxpayee} onChange={e => handlePropertyTax(e)}>
                  <option value="" disabled>Select</option>

                  {
                    props.contactList ? (
                      props.contactList.map((data) => {
                        if (data.groupname == "Expenses&Property Tax") {
                          return (
                            <option value={data.id}>{data.companyname}</option>
                          )
                        }
                      })
                    ) : ""
                  }
                </select>
                {/* <input type="text" placeholder="Porperty Tax" value={ptaxpayee} onChange={e=> setPropertytaxPayee(e.target.value)} className="form-control" /> */}
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="tax" className="req">Porperty Tax Amount</label>
                <NumberFormat
                  placeholder="Porperty Tax Amount"
                  thousandsGroupStyle="thousand"
                  className="form-control alignRight"
                  value={propertytax}
                  decimalSeparator="."
                  type="text"
                  thousandSeparator={true}
                  allowNegative={true}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  allowEmptyFormatting={true}
                  allowLeadingZeros={false}
                  onChange={e => setPropertytax(e.target.value)}
                  isNumericString={true} />
                {/* <input type="text" placeholder="Porperty Tax Amount" value={Util.addCommas(propertytax)} onChange={e => setPropertytax(e.target.value)} className="form-control" /> */}
              </div>
              {/* <div onClick={()=>togglePopup()} ><img className="addContactLogo" src={"assets/image/addContactIcon.png"} alt="AddContactLogo"/>  </div> */}
            </div>
            {/* </div> */}

            <div className="row buttondisplay ">
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

              {/* <div className="col-md-4" style={{marginTop: "2%"}}>
                                <a type="button"  className="btn btn-primary btn-sm addNewItem " href={download ? download : "javascript:void(0)"}><span className="glyphicon glyphicon-download-alt"> </span> Download Attachment</a>
                                <button type="button"  className="btn btn-primary btn-sm addNewItem " onClick={()=>handleDelete(id)}><span className="glyphicon glyphicon-trash"> </span> Delete Attachment </button>
                                </div> */}
              <div className="dflex">
              <div onClick={() => handleViewEvent(document)}>
                  <i className="glyphicon glyphicon-eye-open primary  btn-lg blueIcon" value={document}></i>
                  </div>
                  <div onClick={() => downloadFile(document)}>
                  <i className="glyphicon glyphicon-download-alt primary  btn-lg blueIcon" value={document}></i>
                  </div>
                  <i className="glyphicon glyphicon-trash primary  btn-lg  blueIcon" value={document} 
                  onClick={() => handleDelete(id,document)}></i>
                
              </div>
            </div>

            <div className="row ">
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="comments">Comments</label>
                  <textarea rows="4" placeholder="Comments" value={additionaldetails} onChange={e => setAdditionaldetails(e.target.value)} className="form-control"></textarea>
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
              <button type="button" class="btn btn-primary btn-sm addNewItem" onClick={handleSubmit}> Next <span className="glyphicon glyphicon-arrow-right"> </span></button>
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
  contactList: state.Contact.contacts.data
});

const mapDispatchToProps = {
  addLoan,
  getSingleLoan,
  getContact,
}

export default connect(mapStateToProps, mapDispatchToProps)(AdditionalDetails);