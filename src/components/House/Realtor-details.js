import React, { useState, useEffect } from 'react';
import "../../style/House.css";
import { connect } from "react-redux";
import { addRealtorDetails, deleteRealtorImage } from "../../store/Actions/house";
import ContactModal from "../Contacts/Contact-Modal";
import { getContact } from "../../store/Actions/contact";
import Tab from "../../Reusable/Tab";
import S3 from "aws-s3";
import { NotificationManager } from "react-notifications";
import JsFileDownloader from "js-file-downloader";
import config from "../Authentication/s3config";

// import addContactLogo from '../addContact.png';

const Realtordetails = (props) => {

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

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [houseId, setHouseId] = useState(props.houseDetails && props.houseDetails.house.length > 0 ? props.houseDetails.house[0].id : "");
  const [id, setId] = useState("");
  const [showGroup, setShowGroup] = useState(false);
  const [img_path, setImg_path] = useState('');
  const [previewImage, setPreviewImage] = useState("../assets/image/dummy.png");
  const [contactData, setContactData] = useState();
  const [download, setDownload] = useState('');

  useEffect(() => {
    if (props.houseDetails && props.houseDetails.house.length > 0 && props.houseDetails.realtor.length > 0) {
      setId(props.houseDetails.realtor[0].id);
      setName(props.houseDetails.realtor[0].name);
      // setPhone(props.houseDetails.realtor[0].phono);
      // setEmail(props.houseDetails.realtor[0].email);
      setPreviewImage(props.houseDetails.realtor[0].img_path ? props.houseDetails.realtor[0].img_path : "../assets/image/dummy.png");
      setDownload(props.houseDetails.realtor[0].img_path);
      setImg_path(props.houseDetails.realtor[0].img_path);
    }
    if (props.houseDetails && props.houseDetails.house.length > 0) {
      setHouseId(props.houseDetails.house[0].id);
      let data = {
        "house_id": props.houseDetails.house[0].id
      }
      props.getContact(data);
    }

  }, [props.houseDetails])
  useEffect(() => {
    if (props.houseDetails && props.houseDetails.house.length > 0 && props.houseDetails.realtor.length > 0) {
      handleContatData(props.houseDetails.realtor[0].name);
    }
  }, [props.houseDetails, props.contactList]);

  const handleContatData = (dataId) => {
    const myObj = props.contactList && props.contactList.find(obj => obj.id === parseInt(dataId.split("-")[0]));
    console.log("props.leaseDetails", myObj);
    setEmail(myObj && myObj.email);
    setPhone(myObj && myObj.phone1);
    setContactData(myObj);
  }

  const handleChangeImage = (event) => {
    if (img_path !== "undefined" && img_path !== "") {
      NotificationManager.error("Error Message", "Firstly, you have to delete old Attachment to Add New Attachment");
    }
    else {
      setImg_path(event.target.files[0]);
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
    }
  }

  const handleSubmit = () => {
    let formdata = {
      "name": name,
      "phono": phone,
      "email": email,
      "details": '',
      "house_id": houseId,
      "id": id
    }

    // var form = new FormData();

    // for (const key in data) {
    //   form.append(key, data[key]);
    // }
    // form.append("img_path", img_path);

    // let valid = validate();
    // if (valid) {
    console.log("vbalid::", img_path)
    if (img_path && img_path.name) {
      const newFileName =
        generate_random_string(4) +
        img_path.name.split(".").slice(0, -1).join(".");
      S3Client.uploadFile(img_path, newFileName)
        .then((data) => {
          var form = new FormData();
          for (const key in formdata) {
            form.append(key, formdata[key]);
          }
          form.append("img_path", data.location);
          props.addRealtorDetails(form);
          props.history.push('/hmo-space');
        })
    }
    else {
      var form = new FormData();
      for (const key in formdata) {
        form.append(key, formdata[key]);
      }
      form.append("lastTab", true)
      props.addRealtorDetails(form);
      props.history.push('/hmo-space');
    }
  }
  // props.addRealtorDetails(form);
  // props.history.push('/hmo-space')
  // }


  const validate = () => {
    return true;
  }

  const handlePrevious = () => {
    props.history.push('/hoa-detail');
  }

  const handleOnChange = (e) => {
    setName(e.target.value);
    handleContatData(e.target.value);
    for (var i = 0; i < props.contactList.length; i++) {
      if (props.contactList[i]['groupname'] == "Expenses&Realtor" && e.target.value == props.contactList[i]['companyname']) {
        setPhone(props.contactList[i].mono);
        setEmail(props.contactList[i].email);
        break;
      }
    }

  }

  // const handleDeleteImg = () => {
  //   setPreviewImage("../assets/image/dummy.png");
  //   setImg_path("");
  //   if (id) {
  //     props.deleteRealtorImage({ id: id });
  //   }
  // }

  const handleDeleteImg = (id, docFile) => {
    if (docFile.name !== undefined) {
      setPreviewImage("../assets/image/dummy.png");
      setImg_path("")
      NotificationManager.error("Success Message", "Attachment deleted");
    }
    else if (docFile) {
      const newFileName = docFile.split('/')[4]
      S3Client.deleteFile(newFileName).then((data) => {
        if (data.message === "File Deleted") {
          props.deleteRealtorImage({ id: id, delete: "doc" })
          setPreviewImage("../assets/image/dummy.png");
          setImg_path("")
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

  const downloadFile = (items) => {
    console.log("download::", items)
    if (items.name !== undefined) {

    }
    const fileUrl = items;
    new JsFileDownloader({
      url: fileUrl,
    })
  };


  const tabs = [
    { pathname: "/house-details", label: "Home Details" },
    { pathname: "/title-holders", label: "Title Holders" },
    { pathname: "/hoa-detail", label: "HOA Details" },
    { pathname: "/realtor-detail", label: "Realtor Details" },
    { pathname: "/hmo-space", label: "HMO Spaces" },
  ]

  const togglePopup = () => {
    setShowGroup(!showGroup);
    let data = {
      house_id: houseId
    }
    props.getContact(data);
  };

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
    if (!isNumericInput(event) && !isModifierKey(event)) {
      event.preventDefault();
    }
  };

  const formatToPhone = (event) => {
    if (isModifierKey(event)) { return; }

    // I am lazy and don't like to type things more than once
    const target = event.target;
    const input = event.target.value.replace(/\D/g, '').substring(0, 10); // First ten digits of input only
    const zip = input.substring(0, 3);
    const middle = input.substring(3, 6);
    const last = input.substring(6, 10);

    if (input.length > 6) { target.value = `${zip}-${middle}-${last}`; }
    else if (input.length > 3) { target.value = `${zip}-${middle}`; }
    else if (input.length > 0) { target.value = `${zip}`; }
  };

  const inputElement = document.getElementById('phoneNumberFormat11');
  if (inputElement != null) {
    inputElement.addEventListener('keydown', enforceFormat);
    inputElement.addEventListener('keyup', formatToPhone);
  }

  return (
    <div className="container-fluid house">
      {/* <ContactModal houseId={houseId} /> */}
      <h4>Realtor Details</h4>
      <div className="house-form">
        <Tab loanPage="Realtor Details" tabs={tabs} id={id} house_id={houseId} />
        <div className="row">
          <div className="col-md-2"></div>
          <div className="row col-md-11">
            <div className="col-md-4">
              <div className="form-group image">
                <div className="input-group">
                  <span className="input-group-btn">
                    <span className="btn btn-default btn-file">
                      Browse… <input type="file" id="imgInp" />
                    </span>
                  </span>
                  <input type="file" onChange={(event) => handleChangeImage(event)} className="form-control fileUpload" readOnly />
                </div>
                <div className="imageArea">
                  <img
                    src={previewImage}
                    alt="Upload Realtor Card"
                    id="img-upload"
                    className="img-rounded"
                  />
                </div>
                {/* <div className="btn-group pull-left" role="group" aria-label="...">
                  <a className="btn btn-primary btn-sm addNewItem attachments" href={download ? download : "javascript:void(0)"} download={img_path}><span className="glyphicon glyphicon-download-alt" id="down"></span>Download Attachment</a>
                  <button type="button" className="btn btn-primary btn-sm addNewItem attachments" onClick={handleDeleteImg}><span className="glyphicon glyphicon-trash" id="down"></span>Delete Attachment</button>
                </div> */}
                <div className="col-md-4"></div>
                <div className="">
                  <div className="dflex">
                    <div onClick={() => downloadFile(img_path)}>
                      <i className="glyphicon glyphicon-download-alt primary  btn-lg blueIcon" value={img_path}></i>
                    </div>
                    <div onClick={() => handleDeleteImg(id, img_path)}>
                      <i className="glyphicon glyphicon-trash primary  btn-lg blueIcon" value={img_path}></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8 house-form ">
              <div className="row">
                <div className="col-md-8 ">
                  <div className="form-group ">
                    <label htmlFor="name">Realtor Name</label>
                    <select className="form-control" value={name} onChange={(e) => handleOnChange(e)}>
                      <option value="" disabled>Select</option>
                      {
                        props.contactList ? (
                          props.contactList.map((data) => {
                            if (data.groupname == "Expenses&Realtors") {
                              return (
                                <option value={`${data.id}-${data.companyname
                                  }`}>{data.companyname}</option>
                              )
                            }
                          })
                        ) : ""
                      }
                    </select>
                  </div>
                </div>
                <div onClick={() => togglePopup()} className="col-md-1"> <img className="addContactLogo" src={"assets/image/addContactIcon.png"} alt="AddContactLogo" /> </div>
              </div>
              <div className="row ">
                <div className="col-md-8">
                  <div className="form-group ">
                    <label htmlFor="phone">Realtor Phone No.</label>
                    <input id="phoneNumberFormat11" maxLength="12" type="text" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} className="form-control" readOnly/>
                  </div>
                </div>
              </div>
              <div className="row ">
                <div className="col-md-8">
                  <div className="form-group ">
                    <label htmlFor="email">Realtor Email</label>
                    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" readOnly/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>

        <div className="row footer ">
          <div className="col-md-4"></div>
          <div className="col-md-4 pt-pb-10" align="center">
            <button className="btn btn-primary btn-sm" onClick={handleSubmit}>Save</button>
          </div>
          <div className="col-md-4">
            <div className="btn-group pull-right" role="group" aria-label="...">
              <button type="button" className="btn btn-primary btn-sm addNewItem " onClick={handlePrevious}><span className="glyphicon glyphicon-arrow-left"></span>Previous</button>
              <button type="button" className="btn btn-primary btn-sm addNewItem " onClick={handleSubmit}>Next <span className="glyphicon glyphicon-arrow-right"> </span></button>
            </div>
          </div>
        </div>
      </div>
      {showGroup ? <ContactModal house_id={houseId} toggle={togglePopup} /> : null}
    </div>
  )
}

const mapStateToProps = (state) => ({
  houseDetails: state.House.houseDetail.data,
  contactList: state.Contact.contacts.data
})

const mapDispatchToProps = {
  addRealtorDetails,
  getContact,
  deleteRealtorImage
}

export default connect(mapStateToProps, mapDispatchToProps)(Realtordetails);