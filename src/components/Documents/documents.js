import React, { useState, useEffect } from 'react';
import "../../style/Contact.css";
import { addDocument, deleteDocument, getSingleDocument } from "../../store/Actions/Document";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import { Util } from "../../Datamanipulation/Util";
import JsFileDownloader from "js-file-downloader";
import S3 from "aws-s3";

const Document = (props) => {
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
  const [date, setDate] = useState(Util.getCurrentDate("-"));
  const [category, setCategory] = useState("");
  const [docname, setDocname] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState('');
  const [attachment, setAttachment] = useState('');
  const [download, setDownload] = useState('');
  const [attachment_name, setAttachment_name] = useState('');
  const [house_id, setHouse_id] = useState(houseId);

  useEffect(() => {
    if (props.documentDetails && props.documentDetails.length > 0) {
      console.log("props.documentDetails:: ",props.documentDetails[0] )
      setId(props.documentDetails[0].id);
      setCategory(props.documentDetails[0].category);
      setDocname(props.documentDetails[0].docname);
      setDescription(props.documentDetails[0].description);
      setDate(props.documentDetails[0].date);
      setHouse_id(props.documentDetails[0].house_id);
      setAttachment(props.documentDetails[0].attachment);
      setAttachment_name( props.documentDetails[0].attachment.includes("/") &&props.documentDetails[0].attachment.split("/")[4].slice(4));
      setDownload(props.documentDetails[0].attachment)
    }
  }, [props.documentDetails])

  const handleSubmit = () => {
    let formdata = {
      "house_id": house_id,
      'id': id,
      "date": date,
      "category": category,
      "docname": docname,
      "description": description,
    }

    console.log("vbalid::", attachment)
    if (attachment.name) {
      const newFileName =
        generate_random_string(4) +
        attachment.name.split(".").slice(0, -1).join(".");
      S3Client.uploadFile(attachment, newFileName)
        .then((data) => {
          var form = new FormData();
          for (const key in formdata) {
            form.append(key, formdata[key]);
          }
          form.append("attachment", data.location);
          props.addDocument(form);
          props.history.push({
            pathname: "document-list",
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
      form.append("lastTab", true)
      props.addDocument(form);
      props.history.push({
        pathname: "document-list",
        state: {
          house_id: house_id
        }
      });
    }

    // var form = new FormData();
    // for (const key in data) {
    //   form.append(key, data[key]);
    // }
    // form.append("attachment", attachment);
    // props.addDocument(form);
    // props.history.push({
    //   pathname: "document-list",
    //   state: {
    //     house_id: house_id
    //   }
    // });
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

  const handleViewEvent = (data) => {
    window.open(data, "_blank");
  };

  // upload Document //
  const handleDocumentUpload = (event) => {

    if (attachment !== "undefined" && attachment !== "") {
      NotificationManager.error("Error Message", "Firstly, you have to delete old Attachment to Add New Attachment");
    }
    else {
      setAttachment(event.target.files[0]);
      setAttachment_name(event.target.files[0]['name']);
    }
  }

    // delete Document //
  const handleDelete = (id, docFile) => {
    if (docFile.name !== undefined) {
      setAttachment_name("");
      setAttachment("")
      NotificationManager.error("Success Message", "Attachment deleted");
    }
    else if (docFile) {
      const newFileName = docFile.split('/')[4]
      S3Client.deleteFile(newFileName).then((data) => {
        if (data.message === "File Deleted") {
          props.getSingleDocument({ id: id, delete: "doc" })
          setAttachment_name("");
          setAttachment("")
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

  const handleDeleteDoc = () => {
    let data = {
      id: id,
      house_id: house_id
    }
    props.deleteDocument(data);
    props.history.push({
      pathname: "document-list",
      state: {
        house_id: house_id
      }
    });
  }

  return (
    <div className="container-fluid contact">
      <h4>Documents</h4>
      <div className="contact-form">
        <div className="row pb-2">
          <div className="col-md-3"></div>
          <div className="col-md-6 house-form pt-25">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="Date">Date</label>
                  <input type="date" placeholder="Landline" value={date} onChange={e => setDate(e.target.value)} className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="Category" className="req">Category</label>
                  <select className="form-control" value={category} onChange={e => setCategory(e.target.value)} >
                    <option value="" disabled>Select</option>
                    <option value="Home Documents">Home Documents</option>
                    <option value="Personal">Personal</option>
                    <option value="Others"> Others</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="Date" className="required">Folder</label>
                  <input type="text" placeholder="Folder" value={docname} onChange={e => setDocname(e.target.value)} className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="Document Description">Document Description</label>
                  <input type="text" placeholder="Document Description" value={description} onChange={e => setDescription(e.target.value)} className="form-control" />
                </div>
              </div>
            </div>

            <div className="row buttondisplay">
              <div className="col-md-8">
                <div className="form-group">
                  <label htmlFor="attachment">Attachments</label>
                  <label htmlFor="file" className="fileContainer">
                    <div className="attachfile" align="center">
                      <i>Click here to attach documents</i>
                      <p>{attachment_name ? attachment_name : ""}</p>

                    </div>
                    <input type="file" style={{ height: "0px" }} id="file" onChange={(event) => handleDocumentUpload(event)} className="form-control" style={{ "visibility": "hidden" }} />
                  </label>
                </div>
              </div>

              {/* <div className="col-md-4" style={{ marginTop: "2%" }}> */}
              {/* <a type="button"  className="btn btn-primary btn-sm addNewItem " href={download ? download : "javascript:void(0)"}><span className="glyphicon glyphicon-download-alt"> </span> Download Attachment</a> */}
              {/* <button type="button"  className="btn btn-primary btn-sm addNewItem " href={download ? download : "javascript:void(0)"} download={attachment}>
                                    <span className="glyphicon glyphicon-download-alt"> </span> Download Attachment
                                </button>
                                <button type="button"  className="btn btn-primary btn-sm addNewItem " onClick={()=>handleDelete(id)}><span className="glyphicon glyphicon-trash"> </span> Delete Attachment </button> */}
              <div className="dflex">
                <div onClick={() => handleViewEvent(attachment)}>
                  <i className="glyphicon glyphicon-eye-open primary btn-lg addNewItemlogo1232" value={attachment}></i>
                </div>
                <div onClick={() => downloadFile(attachment)}>
                  <i className="glyphicon glyphicon-download-alt primary btn-lg addNewItemlogo1232" value={attachment}></i>
                </div>
                {/* <a href={download ? download : "javascript:void(0)"} download={attachment}>
                <i className="glyphicon glyphicon-download-alt primary btn-lg addNewItemlogo1232" ></i> */}
                {/* </a> */}
                <i className="glyphicon glyphicon-trash primary  btn-lg d-flex addNewItemlogo1232" value={attachment} onClick={() => handleDelete(id, attachment)}></i>
              </div>
              {/* </div> */}
            </div>

          </div>
          <div className="col-md-3"></div>
        </div>

        <div className="row footer">
          <div className="col-md-4">
            {
              id ? (
                <button className="btn btn-default btn-sm addNewItem" onClick={handleDeleteDoc}>  <span className="glyphicon glyphicon-trash"> </span> Delete Entry</button>
              ) : ""
            }
          </div>
          <div className="col-md-4 pt-pb-10" align="center">
            <button className="btn btn-primary btn-sm" onClick={handleSubmit}>Save</button>
          </div>
          <div className="col-md-4">

          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => (
  {
  documentDetails: state.Document.documentDetails.data,
  houseDetails: state.House.houseDetail.data
});

const mapDispatchToProps = {
  addDocument,
  deleteDocument,
  getSingleDocument
}

export default connect(mapStateToProps, mapDispatchToProps)(Document);