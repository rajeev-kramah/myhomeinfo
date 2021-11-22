import React, { useState, useEffect } from 'react';
import "../../style/House.css";
import { Link } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import { createHouse, deleteHouseAttachment, deleteHouse } from "../../store/Actions/house";
import { connect } from "react-redux";
import { Util } from "../../Datamanipulation/Util";
import Tab from "../../Reusable/Tab";
import NumberFormat from "react-number-format";
import S3 from "aws-s3";
import JsFileDownloader from "js-file-downloader";

const HouseDetails = (props) => {
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

  const user = JSON.parse(localStorage.getItem('user'));
  let userCountry = user.country
  const [house, setHouse] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [country, setCountry] = useState(userCountry);
  const [zip, setZip] = useState('');
  const [primaryHouse, setPrimaryHouse] = useState('');
  const [houseName, setHouseName] = useState('');
  const [builtYear, setBuiltYear] = useState('');
  const [surveyNo, setSurveyNo] = useState('');
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [purchaseDate, setPurchaseDate] = useState(Util.getCurrentDate("-"));
  const [builder, setBuilder] = useState('');
  const [subdivision, setSubdivision] = useState('');
  const [owner_id, setOwner_id] = useState(JSON.parse(localStorage.getItem('user')).id);
  const [houseId, setHouseId] = useState('');
  const [houseImage, setHouseImage] = useState('');
  const [previewImage, setPreviewImage] = useState("../assets/image/dummy.png");
  const [currency, setCurrency] = useState('');
  const [download, setDownload] = useState('');
  const [img_path, setImg_path] = useState("../assets/image/dummy.png");

  useEffect(() => {
    if (props.houseDetails && props.houseDetails.house.length > 0) {
        console.log("props.houseDetails12",props.houseDetails)
      setHouse(props.houseDetails.house[0].houseno);
      setStreet(props.houseDetails.house[0].streetname);
      setCity(props.houseDetails.house[0].city);
      setStateName(props.houseDetails.house[0].state);
      setCountry(props.houseDetails.house[0].country);
      setZip(props.houseDetails.house[0].zip);
      setPrimaryHouse(props.houseDetails.house[0].primaryHouse);
      setHouseName(props.houseDetails.house[0].housename)
      setBuiltYear(props.houseDetails.house[0].yearbuilt);
      setSurveyNo(props.houseDetails.house[0].surveyno);
      setPurchaseAmount(props.houseDetails.house[0].purchaseamount);
      setPurchaseDate(props.houseDetails.house[0].purchasedate);
      setBuilder(props.houseDetails.house[0].buildername);
      setSubdivision(props.houseDetails.house[0].subdivision);
      setOwner_id(props.houseDetails.house[0].owner_id);
      setHouseId(props.houseDetails.house[0].id);
      setImg_path(props.houseDetails.house[0].img_path.split('/')[4]);
      setPreviewImage(props.houseDetails.house[0].img_path ? props.houseDetails.house[0].img_path : "../assets/image/dummy.png");
      //setBlobImage(props.houseDetails.house[0].img_path);
      setCurrency(props.houseDetails.house[0].currency);
      setDownload(props.houseDetails.house[0].img_path);
    }
  }, [props.houseDetails])

  const handleChangeImage = (event) => {
    // setPreviewImage(URL.createObjectURL(event.target.files[0]));
    // setHouseImage(event.target.files[0])
    console.log("img::",img_path)
    if (img_path !== undefined && img_path !== "undefined" && img_path !== "") {
      NotificationManager.error("Error Message", "Firstly, you have to delete old Attachment to Add New Attachment");
    }
    else {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImg_path(event.target.files[0]);
    }
  }

  // const handleDeleteImg = () => {
  //   setPreviewImage("../assets/image/dummy.png");
  //   setHouseImage("");
  //   if (houseId) {
  //     props.deleteHouseAttachment({ id: houseId });
  //   }
  // }

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

  const handleDeleteImg = (id, docFile) => {
    if (docFile && docFile.name !== undefined) {
      setPreviewImage("../assets/image/dummy.png");
      setImg_path("")
      NotificationManager.error("Success Message", "Attachment deleted");
    }
    else if (docFile) {
      const newFileName = docFile.split('/')[4]
      S3Client.deleteFile(newFileName).then((data) => {
        if (data.message === "File Deleted") {
          props.deleteHouseAttachment({ id: id, delete: "doc" })
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



  const handleSubmit = () => {

    let formdata = {
      "houseno": house,
      "streetname": street,
      "city": city,
      "state": stateName,
      "country": country,
      "zip": zip,
      "primaryHouse": primaryHouse,
      "yearbuilt": builtYear,
      "surveyno": surveyNo,
      "purchaseamount": purchaseAmount,
      "housename": houseName,
      "purchasedate": purchaseDate,
      "buildername": builder,
      "subdivision": subdivision,
      "owner_id": owner_id,
      'id': houseId,
      'currency': currency,
      'ownerEmail': JSON.parse(localStorage.getItem('user')).email
    }
    // var form = new FormData();

    // for (const key in formdata) {
    //   form.append(key, formdata[key]);
    // }

    // form.append("houseImage", houseImage);

    let valid = validate();
    if (valid) {

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
            props.createHouse(form);
            props.history.push('/title-holders');
          })
      }
      else {
        var form = new FormData();
        for (const key in formdata) {
          form.append(key, formdata[key]);
        }
        form.append("lastTab", true)
        props.createHouse(form);
        props.history.push('/title-holders');
      }
    }
  }

  const validate = () => {
    if (house.length === 0) {
      NotificationManager.error("Error Message", "Street Number cannot be empty.");
      return false;
    } else if (street.length === 0) {
      NotificationManager.error("Error Message", "Street Name cannot be empty.");
      return false;
    } else if (primaryHouse.length === 0) {
      NotificationManager.error("Error Message", "Primary House cannot be empty.");
      return false;
    } else if (zip.length === 0) {
      NotificationManager.error("Error Message", "Zip/Postal Code cannot be empty.");
      return false;
    } else if (purchaseDate.length === 0) {
      NotificationManager.error("Error Message", "Purchase Date cannot be empty.");
      return false;
    } else if (purchaseAmount.length === 0) {
      NotificationManager.error("Error Message", "Purchase Amount cannot be empty.");
      return false;
    }
    return true;
  }

  let countries = Object.keys(Util.countryDetails());
  let state = [];
  let curr = "";
  if (Util.countryDetails()[country]) {
    state = Util.countryDetails()[country]['data'];
    curr = Util.countryDetails()[country]['currency'];
  }

  const tabs = [
    { pathname: "/house-details", label: "Home Details" },
    { pathname: "/title-holders", label: "Title Holders" },
    { pathname: "/hoa-detail", label: "HOA Details" },
    { pathname: "/realtor-detail", label: "Realtor Details" },
    { pathname: "/hmo-space", label: "HMO Spaces" },
  ]

  const handleDelete = () => {
    let data = {
      id: houseId
    }
    props.deleteHouse(data);
    props.history.push({
      pathname: "dashboard"
    });
  }

  return (
    <div className="container-fluid house">
      <h4>Property Details</h4>
        <div className="house-form homeDetails">
        <Tab loanPage="Home Details" tabs={tabs} id={houseId} house_id={houseId} />
        <div className="row">
          <div className="col-md-4">
            <div className="form-group imageUpload">
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
                  alt="Upload House Image"
                  className="img-rounded"
                  id="img-upload"
                />
              </div>
              <div className="col-md-4"></div>
              <div className="">
                <div className="dflex">
                  <div onClick={() => downloadFile(img_path)}>
                    <i className="glyphicon glyphicon-download-alt primary  btn-lg blueIcon" value={img_path}></i>
                  </div>
                  <div onClick={() => handleDeleteImg(houseId, img_path)}>
                    <i className="glyphicon glyphicon-trash primary  btn-lg blueIcon" value={img_path}></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8 house-form pt-25">
            <span className="" id="text">Let's start with some basic details of the property.</span><br></br><br></br>
            <div className="row pt-25">
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="house" className="req">Street Number</label>
                  <input type="text" placeholder="Street Number" value={house} onChange={e => setHouse(e.target.value)} className="form-control" />
                </div>
              </div>
              <div className="col-md-8">
                <div className="form-group">
                  <label htmlFor="street" className="req">Street Name</label>
                  <input type="text" placeholder="Street Name" value={street} onChange={e => setStreet(e.target.value)} className="form-control" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input type="text" placeholder="City" value={city} onChange={e => setCity(e.target.value)} className="form-control" />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  {
                    country === 'USA' || country === 'UK' ? <label htmlFor="country">State</label> : <label htmlFor="country">Province</label>
                  }
                  <select className="form-control" value={stateName} onChange={e => setStateName(e.target.value)} >
                    <option value="" disabled>Select</option>
                    {

                      state ? (state.map(state => {
                        return (
                          <option value={state}>{state}</option>
                        )
                      })
                      ) : ""
                    }
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <select className="form-control" value={country} onChange={e => setCountry(e.target.value)} >
                    <option value="" disabled>Select</option>
                    {
                      countries.map(country => {
                        return (
                          <option value={country}>{country}</option>
                        )
                      })
                    }
                  </select>
                </div>
              </div>

            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="zip" className="req">Zip/Postal Code</label>
                  <input type="text" placeholder="Zip/Postal Code" value={zip} onChange={e => setZip(e.target.value)} className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="primaryhouse" className="req">Primary House?</label>
                  <div className="form-check">
                    <button className="btn radio-btn ml-10">
                      <input className="form-check-input" type="radio" name="primaryHouse" id="primaryhouse" checked={primaryHouse == "Yes" ? true : false} onChange={e => setPrimaryHouse('Yes')} />
                      <label className="form-check-label pl-10" htmlFor="primaryHouse1"> Yes  </label>
                    </button>
                    <button className="btn radio-btn ml-15">
                      <input className="form-check-input" type="radio" name="primaryhouse" checked={primaryHouse == "No" ? true : false} id="primaryHouse2" onChange={e => setPrimaryHouse('No')} />
                      <label className="form-check-label pl-10" htmlFor="primaryHouse2"> No </label>
                    </button>
                  </div>
                </div>
              </div>
              {/* <div className="col-md-4">
                                    <div className="form-group">
                                        <label htmlFor="housename">House Name</label>
                                        <input type="text" placeholder="House Name" value={houseName} onChange={e=> setHouseName(e.target.value) } className="form-control" />
                                    </div>
                                </div> */}
            </div>
            <div className="row pt-25">
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="built">Year Built</label>
                  <input type="text" maxLength="4" placeholder="Year" value={builtYear} onChange={e => setBuiltYear(e.target.value)} className="form-control" />
                </div>
              </div>
              <div className="col-md-8">
                <div className="form-group">
                  <label htmlFor="surveyNo">Survey Number</label>
                  <input type="text" placeholder="Survey Number" value={surveyNo} onChange={e => setSurveyNo(e.target.value)} className="form-control" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="currency" className="">Currency</label>
                  <input type="text" placeholder="Currency" value={curr} onChange={e => setCurrency(e.target.value)} className="form-control" readOnly />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="purchaseAmount" className="req">Purchase Amount</label>
                  <NumberFormat
                    placeholder="Amount"
                    thousandsGroupStyle="thousand"
                    className="form-control alignRight"
                    value={purchaseAmount}
                    decimalSeparator="."
                    type="text"
                    thousandSeparator={true}
                    allowNegative={true}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    allowEmptyFormatting={true}
                    allowLeadingZeros={false}
                    onChange={e => setPurchaseAmount(e.target.value)}
                    isNumericString={true} />
                  {/* <input type="text" placeholder="Amount" value={Util.addCommas(purchaseAmount)} onChange={e=>{
                                            setPurchaseAmount(e.target.value);
                                        }} className="form-control" /> */}
                </div>
              </div>
              <div className="col-md-5">
                <div className="form-group">
                  <label htmlFor="purchaseDate" className="req">Purchase Date</label>
                  <input type="date" style={{ textTransform: 'uppercase' }} value={purchaseDate} onChange={e => setPurchaseDate(e.target.value)} className="form-control" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="builder">Builder Name</label>
                  <input type="text" placeholder="Builder Name" value={builder} onChange={e => setBuilder(e.target.value)} className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="subdivision">Subdivision Name</label>
                  <input type="text" placeholder="Subdivision Name" value={subdivision} onChange={e => setSubdivision(e.target.value)} className="form-control" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row footer ">
          <div className="col-md-4">
            {
              houseId ? (
                <button className="btn btn-default btn-sm addNewItem" onClick={handleDelete}>  <span className="glyphicon glyphicon-trash"> </span> Delete Entry</button>
              ) : ""
            }
          </div>
          <div className="col-md-4 pt-pb-10" align="center">
            <button className="btn btn-primary btn-sm" onClick={handleSubmit}>Save</button>
          </div>
          <div className="col-md-4">
            <div className="btn-group pull-right" role="group" aria-label="...">
              <button type="button" className="btn btn-default btn-sm addNewItem disable" disabled="disabled"><span className="glyphicon glyphicon-arrow-left"></span>Previous</button>
              <button type="button" className="btn btn-primary btn-sm addNewItem " onClick={handleSubmit}>Next <span className="glyphicon glyphicon-arrow-right"> </span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  houseDetails: state.House.houseDetail.data,
});

const mapDispatchToProps = {
  createHouse,
  deleteHouseAttachment,
  deleteHouse
}

export default connect(mapStateToProps, mapDispatchToProps)(HouseDetails);