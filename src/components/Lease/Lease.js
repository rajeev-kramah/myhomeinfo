import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import "../../style/Loan.css";
import "../../style/House.css";
import { NotificationManager } from "react-notifications";
import { addLease, deleteLease, getSingleLease } from "../../store/Actions/Lease";
import Tab from "../../Reusable/Tab";
import { Util } from "../../Datamanipulation/Util";
import { getHouseHmo } from "../../store/Actions/house";
import NumberFormat from "react-number-format";
import S3 from "aws-s3";
import JsFileDownloader from "js-file-downloader";

const LenderDetails = (props) => {
  const userBucket = JSON.parse(localStorage.getItem('user')).bucket_folder_name;
 // aws-s3 uploader//
 const config = {
  bucketName: "myhomeinfo-s3",
  dirName: userBucket, 
  region: "us-west-2",
  accessKeyId: "AKIAW4MIDXMBT4OOUQMJ",
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
  const [lease_begin, setLease_begin] = useState(Util.getCurrentDate("-"));
  const [lease_end, setLease_end] = useState(Util.getCurrentDate("-"));
  const [lease_date, setLease_date] = useState(Util.getCurrentDate("-"));
  const [frequency, setFrequency] = useState('');
  const [rent, setRent] = useState('');
  const [rent_due_by, setRent_due_by] = useState('');
  const [rental_insurance, setRental_insurance] = useState('');
  const [tenant_name1, setTenant_name1] = useState('');
  const [tenant_email1, setTenant_email1] = useState('');
  const [tenant_phone1, setTenant_phone1] = useState('');
  const [tenant_name2, setTenant_name2] = useState('');
  const [tenant_email2, setTenant_email2] = useState('');
  const [tenant_phone2, setTenant_phone2] = useState('');
  const [people, setPeople] = useState('');
  const [pets, setPets] = useState('');
  const [deposit, setDeposit] = useState('');
  const [renewed, setRenewed] = useState('');
  const [realtor_name, setRealtor_name] = useState("");
  const [realtor_phone, setRealtor_phone] = useState("");
  const [realtor_email, setRealtor_email] = useState("");
  const [hmo_space, setHmo_space] = useState('');
  const [space_description, setSpace_description] = useState('');
  const [document, setDocument] = useState('');
  const [comment, setComment] = useState('');
  const [id, setId] = useState('');
  const [house_id, setHouse_id] = useState(houseId);
  const [docName, setDocName] = useState('');
  const [download, setDownload] = useState('');
  const [lease_amount, setLease_amount] = useState('');


  useEffect(() => {
    if (props.leaseDetails && props.leaseDetails.length > 0) {
      console.log("props.leaseDetails", props.leaseDetails[0])
      setId(props.leaseDetails[0].id);
      setLease_begin(props.leaseDetails[0].lease_begin ? props.leaseDetails[0].lease_begin : Util.getCurrentDate("-"));
      setLease_end(props.leaseDetails[0].lease_end ? props.leaseDetails[0].lease_end : Util.getCurrentDate("-"));
      setLease_date(props.leaseDetails[0].lease_date ? props.leaseDetails[0].lease_date.trim() : Util.getCurrentDate("-"));
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
      setLease_amount(props.leaseDetails[0].lease_amount);
      setRealtor_name(props.leaseDetails[0].realtor_name);
      setRealtor_phone(props.leaseDetails[0].realtor_phone);
      setRealtor_email(props.leaseDetails[0].realtor_email);
      setHmo_space(props.leaseDetails[0].hmo_space);
      setSpace_description(props.leaseDetails[0].space_description);
      setComment(props.leaseDetails[0].comment);
      setHouse_id(props.leaseDetails[0].house_id);
      setDocument(props.leaseDetails[0].document);
      setDocName( props.leaseDetails[0].document.includes("/") &&props.leaseDetails[0].document.split('/')[4].slice("4"));
      setDownload(props.leaseDetails[0].document);
    }
  }, [props.leaseDetails]);
  const handleOnChange = (e) => {
    setHmo_space(e.target.value);
    for (var i = 0; i < props.hmoDetails.length; i++) {
      if (e.target.value === props.hmoDetails[i].name) {
        setSpace_description(props.hmoDetails[i].description);
        break;
      }
    }
  }
  useEffect(() => {
    let data = {
      "house_id": houseId
    }
    props.getHouseHmo(data);
  }, []);


  const handleSubmit = () => {
    let formdata = {
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
      "lease_date": lease_date,
      "realtor_name": realtor_name,
      "realtor_phone": realtor_phone,
      "realtor_email": realtor_email,
      "hmo_space": hmo_space,
      "space_description": space_description,
      "comment": comment,
      "house_id": house_id,
      "lease_amount": lease_amount
    }
    console.log("daalese::",formdata)
    let valid = validate();
    if (valid) {

      if( document && document.name)
      {    const newFileName =
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
                props.addLease(form)
                props.history.push({
                  pathname: 'lease-list',
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
          props.addLease(form);
          props.history.push({
            pathname: 'lease-list',
            state: {
                house_id : house_id
            }
        });
        }
    }
  }

  const validate = () => {
    if (lease_begin.length === 0) {
      NotificationManager.error("Error Message", "Lease Begin date cannot be empty.");
      return false;
    } else if (lease_end.length === 0) {
      NotificationManager.error("Error Message", "Lease End date cannot be empty.");
      return false;
    } else if (frequency.length === 0) {
      NotificationManager.error("Error Message", "Frequency cannot be empty.");
      return false;
    } else if (rent.length === 0) {
      NotificationManager.error("Error Message", "Rent/Month cannot be empty.");
      return false;
    } else if (rental_insurance.length === 0) {
      NotificationManager.error("Error Message", "Rental Insurance cannot be empty.");
      return false;
    }

    let start = new Date(lease_begin);
    let end = new Date(lease_end);

    end = Math.floor(end.getTime() / 86400000);
    start = Math.floor(start.getTime() / 86400000);

    if (start > end) {
      NotificationManager.error("Error Message", "Lease End Date must be greater than Lease Start Date.");
      return false;
    }

    return true;
  }

  const handleDeleteLease = () => {
    let data = {
      "id": id,
      "house_id": house_id
    }
    props.deleteLease(data)
    props.history.push({
      pathname: 'lease-list',
      state: {
        house_id: house_id
      }
    });
  }

  const handleOpen = (id) => {
    let filename = '../../../public/files/1630410748358-hsbc.jpg';
    let data = require('../../Logo.png');
    console.log(data);
    // console.log("Openhere111",document)
    // `window.location.origin + '${data}`, '_blank'
    // location.href=`'../../../public/files/${document.name}'`
    // setDocument(document)


  }
  // const handleDownload = (id) => {
  //     console.log("downloadhere",download)
  //     setDocument(download)
  //     setDownload(document)
  //     if(download) {
  //         props.getSingleLease({id: id, download: "doc.pdf"})

  //     }

  // }


  const handleFrequencyChange = (e) => {
    setFrequency(e.target.value)
    console.log("lease_frequency", e.target.value)
    handleSetDate(lease_end, e.target.value);
  }

  const handleSetDate = (date, lease_frequency) => {
    var chooseDate = new Date(date);
    if (lease_frequency === "Monthly") {
      chooseDate.setMonth(chooseDate.getMonth() + 1);
    } else if (lease_frequency === "Yearly") {
      chooseDate.setMonth(chooseDate.getMonth() + 12);
    } else {
      chooseDate.setMonth(chooseDate.getMonth() + 1);
    }
    let futureDate = chooseDate.getFullYear() + '-' + ('0' + (chooseDate.getMonth() + 1)).slice(-2) + '-' + ('0' + (chooseDate.getDate())).slice(-2);
    lease_end !== '' && setLease_date(futureDate.trim());
  }

  const handleRenewedChange = (e) => {
    handleSetDate(lease_end, frequency);
    setRenewed(e.target.value);
  }

  const handleLeaseEndChange = (e) => {
    handleSetDate(e.target.value, frequency);
    setLease_end(e.target.value);
  }

  const leasedateChange = () => {
    console.log("lease_end", lease_end)
    var date = new Date(lease_end);
    date.setDate(date.getDate() + 30);
    // date.setDate(date.getFullYear());
    console.log("lease_end::", date)
    return date;

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
  if(docFile.name !== undefined) {
      setDocName("");
      setDocument("")
      NotificationManager.error("Success Message", "Attachment deleted");
    }
  else if(docFile){
    const newFileName = docFile.split('/')[4]
    S3Client.deleteFile(newFileName).then((data) =>
    {
      if(data.message === "File Deleted")
  {
    props.getSingleLease({ id: id, delete: "doc" })
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
    props.history.push({
        pathname: 'tenant',
        state: {
            house_id : house_id
        }
    });
} 
  const tabs = [
    { pathname: "/tenant", label: "Tenants " },
    { pathname: "/Lease", label: "Lease" },
    // {pathname : "/realtor", label : "Realtor"},
    // {pathname : "/hmo", label : "HMO spaces"},
    // {pathname : "/additional", label : "Additional Details"},
  ]

  return (
    <div className="container-fluid house">
      <h4>Add Lease Details</h4>
      <div className="house-form">
        <Tab loanPage="Lease" tabs={tabs} id={id} house_id={house_id} />
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6 house-form pt-25">

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="lease_begin" className="req">Lease Begin Date</label>
                  <input type="date" value={lease_begin} onChange={e => setLease_begin(e.target.value)} className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  {console.log("lease_end", lease_end)}
                  <label htmlFor="lease_end" className="req">Lease End Date</label>
                  <input type="date" value={lease_end} onChange={e => handleLeaseEndChange(e)} className="form-control" />
                </div>
              </div>
            </div>


            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="Frequency" className="req">Frequency</label>
                  <select className="form-control" value={frequency} onChange={e => handleFrequencyChange(e)} >
                    <option value="" disabled>Select</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="lease_begin" className="req">Rent/Month</label>
                  <NumberFormat
                    placeholder="Rent/Month"
                    thousandsGroupStyle="thousand"
                    className="form-control alignRight"
                    value={rent}
                    decimalSeparator="."
                    type="text"
                    thousandSeparator={true}
                    allowNegative={true}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    allowEmptyFormatting={true}
                    allowLeadingZeros={false}
                    onChange={e => setRent(e.target.value)}
                    isNumericString={true} />
                  {/* <input type="text" placeholder="Rent/Month" value={rent} onChange={e => setRent(e.target.value)} className="form-control" /> */}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="rent_due_by">Rent Due By</label>
                  <input type="text" value={rent_due_by} placeholder="Rent Due By" onChange={e => setRent_due_by(e.target.value)} className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="rental_insurance" className="req">Rental Insurance ? </label>
                  <select className="form-control" value={rental_insurance} onChange={e => setRental_insurance(e.target.value)} >
                    <option value="" disabled>Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="Renewed">Renewed ?</label>
                  <select className="form-control" value={renewed} onChange={e => handleRenewedChange(e)} >
                    <option value="" disabled>Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
            </div>
            {renewed === "Yes" &&
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="Lease Amount">Lease Amount</label>
                    <NumberFormat
                      placeholder="Lease Amount"
                      thousandsGroupStyle="thousand"
                      className="form-control alignRight"
                      value={lease_amount}
                      decimalSeparator="."
                      type="text"
                      thousandSeparator={true}
                      allowNegative={true}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      allowEmptyFormatting={true}
                      allowLeadingZeros={false}
                      onChange={e => setLease_amount(e.target.value)}
                      isNumericString={true} />
                    {/* <input type="text" placeholder="Lease Amount" value={lease_amount} onChange={e => setLease_amount(e.target.value)} className="form-control" /> */}
                  </div>
                </div>
                <div className="col-md-6">
                  {console.log("lease_date", lease_date)}
                  <div className="form-group">
                    <label htmlFor="lease_end" className="req">Lease Date</label>
                    <input type="date" value={lease_date} onChange={e => setLease_date(e.target.value)} className="form-control" readOnly />
                  </div>
                </div>
              </div>
}
            <div className="row ">
              <div className="col-md-4">
                <div className="form-group">
                  {console.log("props.hmoDetails",props.hmoDetails)}
                  <label htmlFor="name">Space Name</label>
                  <select className="form-control" value={hmo_space} onChange={e => handleOnChange(e)}>
                    <option value="" disabled>Select</option>
                    {
                      props.hmoDetails ? (
                        props.hmoDetails.map((data) => {
                          return (<option value={data.name}>{data.name}</option>)
                        })
                      ) : ""
                    }
                  </select>

                </div>
              </div>
              <div className="col-md-8">
                <div className="form-group">
                  <label htmlFor="description">Space Description</label>
                  <input type="text" placeholder="HMO Space Description" value={space_description} onChange={e => setSpace_description(e.target.value)} className="form-control" readOnly />
                </div>
              </div>
            </div>
            <div className="row ">
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="Additional Details">Additional Details</label>
                  <textarea rows="4" placeholder="Comments" value={comment} onChange={e => setComment(e.target.value)} className="form-control"></textarea>
                </div>
              </div>
            </div>
            <div className="row dflex align-center">
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
            </div>

          </div>
        </div>
        <div className="row footer ">
          <div className="col-md-4">
            {
              id ? (
                <button className="btn btn-default btn-sm addNewItem" onClick={handleDeleteLease}>  <span className="glyphicon glyphicon-trash"> </span> Delete Entry</button>
              ) : ""
            }
          </div>
          <div className="col-md-4 pt-pb-10" align="center">
            <button className="btn btn-primary btn-sm" onClick={handleSubmit}>SAVE</button>
          </div>
          <div className="col-md-4">
            <div className="btn-group pull-right" role="group" aria-label="...">
              <button type="button" className="btn btn-default btn-sm addNewItem" onClick={handlePrevious}><span className="glyphicon glyphicon-arrow-left"></span> Previous</button>
              <button type="button" className="btn btn-primary btn-sm addNewItem" onClick={handleSubmit}>Next <span className="glyphicon glyphicon-arrow-right"> </span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


const mapStateToProps = (state) => ({
  leaseDetails: state.Lease.leaseDetails.data,
  hmoDetails: state.House.houseHmo.data,
});

const mapDispatchToProps = {
  addLease,
  getSingleLease,
  deleteLease,
  getHouseHmo,
}

export default connect(mapStateToProps, mapDispatchToProps)(LenderDetails);