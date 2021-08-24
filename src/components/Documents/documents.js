import React, { useState, useEffect } from 'react';
import "../../style/Contact.css";
import { addDocument, deleteDocument, getSingleDocument } from "../../store/Actions/Document";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import {Util} from "../../Datamanipulation/Util";

const Document = (props) => {
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

    useEffect(()=> {
        if(props.documentDetails && props.documentDetails.length > 0) {
            setId(props.documentDetails[0].id);
            setCategory(props.documentDetails[0].category);
            setDocname(props.documentDetails[0].docname);
            setDescription(props.documentDetails[0].description);
            setDate(props.documentDetails[0].date);
            setHouse_id(props.documentDetails[0].house_id);
            setAttachment(props.documentDetails[0].attachment);
            setAttachment_name(props.documentDetails[0].attachment.split("-")[1]);
            setDownload(props.documentDetails[0].attachment ?( "../files/" + props.documentDetails[0].attachment.substr(11))  :"")
        }
    }, [props.documentDetails])
  
    const handleSubmit = () => {
        let data = {
            "house_id": house_id,
            'id':id,
            "date": date,
            "category" : category,
            "docname" : docname,
            "description" : description,
        }

        var form = new FormData();
        for (const key in data) {
            form.append(key, data[key]);
        }
        form.append("attachment", attachment);
        props.addDocument(form);
        props.history.push({
            pathname: "document-list",
            state: {
                house_id: house_id
            }
        });
    }

   
    const handleDocumentUpload = (event)=> {
        setAttachment(event.target.files[0])
        setAttachment_name(event.target.files[0]['name']);
    }

    const handleDelete = (id) => {
        props.getSingleDocument({id : id, delete : "doc"})
        NotificationManager.error("Success Message", "Attachment deleted");
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
                                        <input type="date" placeholder="Landline" value={date} onChange={e=> setDate(e.target.value)} className="form-control" />
                                    </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="Category" className="req">Category</label>
                                    <select className="form-control" value={category} onChange={e=> setCategory(e.target.value)} >
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
                                    <label htmlFor="Date" className="required">Folder Name</label>
                                    <input type="text" placeholder="Document Name" value={docname} onChange={e=> setDocname(e.target.value)} className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="Document Description">Document Description</label>
                                    <input type="text" placeholder="Document Description" value={description} onChange={e=> setDescription(e.target.value)} className="form-control" />
                                </div>
                            </div>
                        </div>

                        <div className="row ">
                            <div className="col-md-8">
                                <div className="form-group">
                                    <label htmlFor="attachment">Attachments</label>
                                    <label htmlFor="file" className="fileContainer">
                                        <div className="attachfile" align="center">
                                            <i>Click here to attach documents</i>
                                            <p>{attachment_name ? attachment_name : ""}</p>
                                           
                                        </div>
                                      <input type="file" style={{height:"0px"}} id="file" onChange={(event)=>handleDocumentUpload(event)} className="form-control" style={{"visibility":"hidden"}} />
                                    </label>
                                </div>
                            </div>

                            <div className="col-md-4" style={{marginTop: "2%"}}>
                                {/* <a type="button"  className="btn btn-primary btn-sm addNewItem " href={download ? download : "javascript:void(0)"}><span className="glyphicon glyphicon-download-alt"> </span> Download Attachment</a> */}
                                <button type="button"  className="btn btn-primary btn-sm addNewItem " href={download ? download : "javascript:void(0)"} download={attachment}>
                                    <span className="glyphicon glyphicon-download-alt"> </span> Download Attachment
                                </button>
                                <button type="button"  className="btn btn-primary btn-sm addNewItem " onClick={()=>handleDelete(id)}><span className="glyphicon glyphicon-trash"> </span> Delete Attachment </button>
                                </div>
                        </div>

                    </div>
                    <div className="col-md-3"></div>
                </div>

                <div className="row footer">
                    <div className="col-md-4">
                        {
                            id ? (
                                <button className="btn btn-default btn-sm addNewItem" onClick={handleDeleteDoc}>  <span className="glyphicon glyphicon-trash"> </span> Delete Entry</button>
                            ):""
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

const mapStateToProps = (state) => ({
    documentDetails: state.Document.documentDetails.data,
    houseDetails: state.House.houseDetail.data
});

const mapDispatchToProps = {
    addDocument,
    deleteDocument,
    getSingleDocument
}

export default connect(mapStateToProps, mapDispatchToProps)(Document);